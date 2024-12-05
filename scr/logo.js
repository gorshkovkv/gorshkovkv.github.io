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

    // Добавляем настройку для замены отсутствующего описания
    Lampa.SettingsApi.addParam({
        component: "interface",
        param: {
            name: "logo_missing_desc",
            type: "trigger",
            default: true
        },
        field: {
            name: "Замена отсутствующего описания",
            description: "Заменять отсутствующее описание на описание на другом языке"
        }
    });

    if (!window.logoplugin) {
        window.logoplugin = true;

        // Добавляем стили для адаптивного центрирования
        if (!$('#logo-adaptive-style').length) {
            $('head').append(`
                <style id="logo-adaptive-style">
                    @media screen and (orientation: portrait) {
                        .full-start-new__head,
                        .full-start-new__title,
                        .full-start-new__tagline,
                        .title-translations,
                        .full-start-new__rate-line,
                        .full-start-new__details,
                        .full-start-new__reactions,
                        .full-start-new__buttons {
                            //font-size: 1em !important;
                            margin: 5px 0 !important;
                            -webkit-text-stroke: 0px #000000 !important;
                            text-align: center !important;
                            justify-content: center !important;
                        }
                        .full-start-new__title img {
                            //margin: 5px auto !important;
                             max-height: 5% !important;
                            //max-width: 45% !important;
                        }
                    }
                    @media screen and (orientation: landscape) {
                        .full-start-new__head,
                        .full-start-new__title,
                        .full-start-new__tagline,
                        .title-translations,
                        .full-start-new__rate-line,
                        .full-start-new__details,
                        .full-start-new__reactions,
                        .full-start-new__buttons {
                            //display: flex !important;
                            margin: 5px 0 0 0 !important;
                            -webkit-text-stroke: 0.1px #000000 !important;
                            text-align: left !important;
                            justify-content: left !important;
                        }
                        .full-start-new__title img {
                            //margin-right: 15px !important;
                            //margin-bottom: 15px !important;
                            //max-height: 100% !important;
                            //max-width: 20% !important;
                        }
                    }
                </style>
            `);
        }

        Lampa.Listener.follow("full", function(e) {
            if (e.type == "complite") {
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

                async function getDescription(lang) {
                    try {
                        const url = Lampa.TMDB.api((movie.name ? "tv" : "movie") + "/" + movie.id + "?api_key=" + Lampa.TMDB.key() + "&language=" + lang);
                        const resp = await $.get(url);
                        return resp.overview;
                    } catch (e) {
                        return null;
                    }
                }

                async function findLogo() {
                    // Получаем заранее все названия для переводов
                    const ruTitle = await getTitle("ru");
                    const enTitle = await getTitle("en");
                    const origTitle = movie.original_title || movie.original_name;

                    // Инициализируем переменные для логотипа
                    let path = null;
                    let logoLang = null;

                    // Если включены логотипы, пробуем их найти
                    if (Lampa.Storage.get("logo_glav")) {
                        // Пробуем найти на текущем языке
                        path = await tryGetLogo(Lampa.Storage.get("language"));
                        logoLang = Lampa.Storage.get("language");
                        
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
                    }

                    // Проверяем и заменяем отсутствующее описание
                    if (Lampa.Storage.get("logo_missing_desc")) {
                        const currentDesc = movie.overview;
                        if (!currentDesc || currentDesc.trim() === "") {
                            let newDesc = null;
                            if (Lampa.Storage.get("language") === "ru") {
                                newDesc = await getDescription("en");
                                if (!newDesc) newDesc = await getDescription("");
                            } else {
                                newDesc = await getDescription("ru");
                                if (!newDesc) newDesc = await getDescription("");
                            }
                            
                            if (newDesc) {
                                movie.overview = newDesc;
                                // Обновляем описание во всех местах
                                $(".full-start__description").text(newDesc);
                                $(".full-descr__text").text(newDesc);
                                // Меняем заголовок на английский
                                //$(".items-line__title").text("Description in English");
                            }
                        }
                    }

                    // Отображаем переводы названий, если включена соответствующая настройка
                    if (Lampa.Storage.get("logo_translations")) {
                        var titlesContainer = $('<div class="title-translations"></div>').css({
                            //'margin-top': '10px',
                            //'margin-bottom': '15px',
                            //'margin-right': '10px',
                            'font-size': '1.1em',
                            '-webkit-text-stroke': '0.1px #000000',
                            'opacity': '1'
                        });

                        const currentLang = Lampa.Storage.get("language");
                        let displayLang = currentLang; // язык текущего отображения (логотипа или названия)

                        if (Lampa.Storage.get("logo_glav")) {
                            // Если включены логотипы, используем язык найденного логотипа
                            if (path) {
                                displayLang = logoLang;
                            }
                        } else {
                            // Если логотипы выключены, определяем язык текущего названия
                            const currentTitle = movie.title || movie.name;
                            if (currentTitle === ruTitle) displayLang = 'ru';
                            else if (currentTitle === enTitle) displayLang = 'en';
                            else displayLang = 'orig';
                        }

                        // Добавляем переводы в зависимости от языка отображения
                        if (displayLang === currentLang) {
                            // Если отображается на языке приложения
                            if (enTitle && enTitle !== (currentLang === 'ru' ? ruTitle : enTitle)) {
                                titlesContainer.append(`<div>🇬🇧 ${enTitle} </div>`);
                            }
                            if (origTitle && origTitle !== enTitle && origTitle !== (currentLang === 'ru' ? ruTitle : enTitle)) {
                                titlesContainer.append(`<div>🌐 ${origTitle}</div>`);
                            }
                        } else if (displayLang === 'en') {
                            // Если отображается на английском
                            if (currentLang === 'ru' && ruTitle && ruTitle !== enTitle) {
                                titlesContainer.append(`<div>🇷🇺 ${ruTitle} </div>`);
                            }
                            if (origTitle && origTitle !== enTitle && origTitle !== (currentLang === 'ru' ? ruTitle : enTitle)) {
                                titlesContainer.append(`<div>🌐 ${origTitle}</div>`);
                            }
                        } else {
                            // Если отображается на другом языке
                            if (currentLang === 'ru' && ruTitle && ruTitle !== origTitle) {
                                titlesContainer.append(`<div>🇷🇺 ${ruTitle} </div>`);
                            }
                            if (enTitle && enTitle !== origTitle) {
                                titlesContainer.append(`<div>🇬🇧 ${enTitle}</div>`);
                            }
                        }

                        // Добавляем переводы после заголовка
                        $(".full-start-new__title").after(titlesContainer);
                    }

                    // Если включена настройка логотипов, пробуем найти и отобразить логотип
                    if (Lampa.Storage.get("logo_glav")) {
                        // Создаем контейнер для логотипа
                        var imgElement = $('<img style="matging-top: 0.1em; margin-bottom: 0.1em; max-height: 1.5em;" src="' + Lampa.TMDB.image("/t/p/w500" + path.replace(".svg", ".png")) + '" />');
                        //var imgElement = $('<img style="margin-top: 5px; margin-left: 0; width: auto; height: auto; object-fit: contain; display: block;" src="' + Lampa.TMDB.image("/t/p/w300" + path.replace(".svg", ".png")) + '" />');
                        imgElement.on('error', function() {
                            $(".full-start-new__title").html(movie.title || movie.name);
                        });
                        // Заменяем текстовый заголовок на логотип
                        $(".full-start-new__title").html(imgElement);
                    }
                }

                findLogo();
            }
        });
    }
}();