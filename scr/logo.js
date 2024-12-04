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

                async function getAverageRuntime() {
                    if (movie.imdb_id) {
                        try {
                            const response = await $.get("https://api.tvmaze.com/lookup/shows?imdb=" + movie.imdb_id);
                            if (response.averageRuntime) {
                                const hours = Math.floor(response.averageRuntime / 60);
                                const minutes = response.averageRuntime % 60;
                                return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                            }
                        } catch (error) {
                            console.error("Ошибка при получении среднего времени:", error);
                        }
                    }
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
                    var logoPath = await tryGetLogo(Lampa.Storage.get("language"));
                    var runtimeText = await getAverageRuntime();
                    
                    if (logoPath) {
                        var logoUrl = "https://image.tmdb.org/t/p/w500" + logoPath;
                        var $title = $(e.object).find(".full-start-new__title");
                        var $logo = $("<img>", {
                            src: logoUrl,
                            class: "full-start__logo"
                        });

                        // Создаем контейнер для логотипа и времени
                        var $container = $("<div>", {
                            class: "full-start__logo-container"
                        });

                        $container.append($logo);

                        // Добавляем время если оно есть
                        if (runtimeText) {
                            var $runtime = $("<div>", {
                                class: "full-start__runtime",
                                text: runtimeText
                            });
                            $container.append($runtime);
                        }

                        $title.empty().append($container);

                        // Добавляем стили для контейнера и времени
                        var style = `
                            <style>
                                .full-start__logo-container {
                                    display: flex;
                                    flex-direction: column;
                                    align-items: center;
                                    gap: 10px;
                                }
                                .full-start__runtime {
                                    color: rgba(255, 255, 255, 0.8);
                                    font-size: 1.2em;
                                }
                            </style>
                        `;
                        $('head').append(style);

                        // Если включено отображение переводов
                        if (Lampa.Storage.get("logo_translations")) {
                            // Получаем заранее все названия
                            const ruTitle = await getTitle("ru");
                            const enTitle = await getTitle("en");
                            const origTitle = movie.original_title || movie.original_name;

                            // Пробуем найти на текущем языке
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

                            // Добавляем названия в зависимости от языка логотипа
                            if (logoLang === "ru") {
                                if (enTitle) $container.append('<div class="title-line">En: ' + enTitle + '</div>');
                                if (origTitle && origTitle !== enTitle) {
                                    $container.append('<div class="title-line">Orig: ' + origTitle + '</div>');
                                }
                            } else if (logoLang === "en") {
                                if (ruTitle) $container.append('<div class="title-line">Ru: ' + ruTitle + '</div>');
                                if (origTitle && origTitle !== enTitle) {
                                    $container.append('<div class="title-line">Orig: ' + origTitle + '</div>');
                                }
                            } else { // orig
                                if (ruTitle) $container.append('<div class="title-line">Ru: ' + ruTitle + '</div>');
                                if (enTitle && enTitle !== origTitle) {
                                    $container.append('<div class="title-line">En: ' + enTitle + '</div>');
                                }
                            }
                        }
                    } else {
                        $(".full-start-new__title").html(movie.title || movie.name);
                    }
                }

                findLogo();
            }
        });
    }
}();