!function() {
    "use strict";
    
    Lampa.SettingsApi.addParam({
        component: "interface",
        param: {
            name: "logo_glav",
            type: "trigger",
            default: true
        },
        field: {
            name: "Логотипы вместо названий",
            description: "Отображает логотипы фильмов вместо текста"
        }
    });

    // Добавляем настройку для отображения переводов
    Lampa.SettingsApi.addParam({
        component: "interface",
        param: {
            name: "logo_translations",
            type: "trigger",
            default: true
        },
        field: {
            name: "Переводы названий",
            description: "Показывать названия на разных языках под логотипом"
        }
    });

    // Добавляем настройку для отображения среднего времени серии
    Lampa.SettingsApi.addParam({
        component: "interface",
        param: {
            name: "logo_average_runtime",
            type: "trigger",
            default: true
        },
        field: {
            name: "Среднее время серии",
            description: "Показывать среднее время серии под логотипом"
        }
    });

    if (!window.logoplugin) {
        window.logoplugin = true;
        Lampa.Listener.follow("full", function(e) {
            if (e.type == "complite" && Lampa.Storage.get("logo_glav")) {
                var movie = e.data.movie;
                
                async function tryGetLogo(lang) {
                    // Для языка оригинала не указываем параметр language в URL
                    var url = Lampa.TMDB.api((movie.name ? "tv" : "movie") + "/" + movie.id + "/images?api_key=" + Lampa.TMDB.key() + (lang ? "&language=" + lang : ""));
                    try {
                        const resp = await $.get(url);
                        if (resp.logos && resp.logos[0]) {
                            return resp.logos[0].file_path;
                        }
                    } catch (e) {}
                    return null;
                }

                async function getTitle(lang) {
                    try {
                        const url = Lampa.TMDB.api((movie.name ? "tv" : "movie") + "/" + movie.id + "?api_key=" + Lampa.TMDB.key() + "&language=" + lang);
                        const resp = await $.get(url);
                        return resp.title || resp.name;
                    } catch (e) {
                        return null;
                    }
                }

                async function findLogo() {
                    try {
                        const logoPath = await tryGetLogo(Lampa.Storage.get("language"));
                        let logoLang = Lampa.Storage.get("language");
                        
                        // Если нет на текущем языке, пробуем английский
                        if (!logoPath) {
                            logoPath = await tryGetLogo("en");
                            if (logoPath) logoLang = "en";
                        }
                        
                        // Если нет на английском, пробуем язык оригинала
                        if (!logoPath) {
                            logoPath = await tryGetLogo("");
                            if (logoPath) logoLang = "orig";
                        }

                        if (logoPath) {
                            // Получаем заранее все названия
                            const ruTitle = await getTitle("ru");
                            const enTitle = await getTitle("en");
                            const origTitle = movie.original_title || movie.original_name;

                            // Получаем imdb_id для запроса среднего времени
                            const imdbId = movie.imdb_id;
                            let averageRuntime = '';
                            
                            // Если включена настройка показа среднего времени и есть imdb_id
                            if (Lampa.Storage.get("logo_average_runtime") && imdbId && movie.name) {
                                try {
                                    const response = await $.ajax({
                                        url: "https://api.tvmaze.com/lookup/shows?imdb=" + imdbId,
                                        method: "GET"
                                    });
                                    if (response.averageRuntime) {
                                        const hours = Math.floor(response.averageRuntime / 60);
                                        const minutes = response.averageRuntime % 60;
                                        averageRuntime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                                    }
                                } catch (error) {
                                    console.error("Ошибка при получении среднего времени:", error);
                                }
                            }

                            var logo = $("<img class='full--logo' src='https://image.tmdb.org/t/p/w500" + logoPath + "' />");
                            var container = $("<div class='full--logo-container'></div>").append(logo);
                            
                            // Добавляем среднее время, если оно есть
                            if (averageRuntime) {
                                container.append(`<div class="full--logo-runtime">~${averageRuntime}</div>`);
                            }

                            // Добавляем названия в зависимости от языка логотипа
                            if (Lampa.Storage.get("logo_translations")) {
                                if (logoLang === "ru") {
                                    if (enTitle) container.append('<div class="title-line">En: ' + enTitle + '</div>');
                                    if (origTitle && origTitle !== enTitle) {
                                        container.append('<div class="title-line">Orig: ' + origTitle + '</div>');
                                    }
                                } else if (logoLang === "en") {
                                    if (ruTitle) container.append('<div class="title-line">Ru: ' + ruTitle + '</div>');
                                    if (origTitle && origTitle !== enTitle) {
                                        container.append('<div class="title-line">Orig: ' + origTitle + '</div>');
                                    }
                                } else { // orig
                                    if (ruTitle) container.append('<div class="title-line">Ru: ' + ruTitle + '</div>');
                                    if (enTitle && enTitle !== origTitle) {
                                        container.append('<div class="title-line">En: ' + enTitle + '</div>');
                                    }
                                }
                            }

                            // Добавляем стили для названий
                            if (!$('#logo-titles-style').length) {
                                $('head').append(`
                                    <style id="logo-titles-style">
                                        .logo-container { text-align: left; }
                                        .title-line {
                                            font-size: 0.6em;
                                            white-space: nowrap;
                                            overflow: hidden;
                                            text-overflow: ellipsis;
                                            text-align: left;
                                            margin: 0.1em 0;
                                            opacity: 0.7;
                                            width: 100%;
                                            min-width: 0;
                                        }
                                        @media screen and (max-width: 480px) {
                                            .title-line {
                                                font-size: 0.5em;
                                            }
                                        }
                                    </style>
                                `);
                            }

                            $(".full-start-new__title").html(container);
                        } else {
                            $(".full-start-new__title").html(movie.title || movie.name);
                        }
                    } catch (error) {
                        console.error("Ошибка при получении логотипа:", error);
                    }
                }

                findLogo();
            }
        });
    }
}();