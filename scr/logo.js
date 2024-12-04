!function() {
    "use strict";
    
    Lampa.SettingsApi.addParam({
        component: "interface",
        param: {
            name: "logo_glav",
            type: "select",
            values: {
                1: "Скрыть",
                0: "Отображать"
            },
            default: "0"
        },
        field: {
            name: "Логотипы вместо названий",
            description: "Отображает логотипы фильмов вместо текста"
        }
    });

    Lampa.SettingsApi.addParam({
        component: "interface",
        param: {
            name: "logo_translations",
            type: "select",
            values: {
                1: "Скрыть",
                0: "Отображать"
            },
            default: "0"
        },
        field: {
            name: "Переводы под логотипом",
            description: "Отображает названия на других языках под логотипом"
        }
    });

    if (!window.logoplugin) {
        window.logoplugin = true;
        Lampa.Listener.follow("full", function(e) {
            if (e.type == "complite" && Lampa.Storage.get("logo_glav") != "1") {
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
                    // Получаем заранее все названия
                    const ruTitle = await getTitle("ru");
                    const enTitle = await getTitle("en");
                    const origTitle = movie.original_title || movie.original_name;

                    // Пробуем найти на текущем языке
                    let path = await tryGetLogo(Lampa.Storage.get("language"));
                    let logoLang = Lampa.Storage.get("language");
                    
                    // Если нет на текущем языке, пробуем английский
                    if (!path) {
                        path = await tryGetLogo("en");
                        if (path) logoLang = "en";
                    }
                    
                    // Если нет на английском, пробуем язык оригинала
                    if (!path) {
                        path = await tryGetLogo("");
                        if (path) logoLang = "orig";
                    }

                    if (path) {
                        // Создаем контейнер для логотипа и названий
                        var container = $('<div class="logo-container"></div>');
                        
                        // Добавляем логотип
                        var imgElement = $('<img style="margin-top: 5px;max-height: 125px;display: block;" src="' + Lampa.TMDB.image("/t/p/w300" + path.replace(".svg", ".png")) + '" />');
                        imgElement.on('error', function() {
                            $(".full-start-new__title").html(movie.title || movie.name);
                        });
                        container.append(imgElement);

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

                        // Добавляем названия в зависимости от языка логотипа только если включено в настройках
                        if (Lampa.Storage.get("logo_translations") !== "1") {
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

                        $(".full-start-new__title").html(container);
                    } else {
                        $(".full-start-new__title").html(movie.title || movie.name);
                    }
                }

                findLogo();
            }
        });
    }
}();