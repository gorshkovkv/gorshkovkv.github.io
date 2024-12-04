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
                        console.log('Trying to get description for language:', lang, 'URL:', url);
                        const resp = await $.get(url);
                        console.log('Response for', lang, ':', resp);
                        return resp.overview;
                    } catch (e) {
                        console.error('Error getting description for language:', lang, e);
                        return null;
                    }
                }

                async function findLogo() {
                    // Получаем заранее все названия для переводов
                    const ruTitle = await getTitle("ru");
                    const enTitle = await getTitle("en");
                    const origTitle = movie.original_title || movie.original_name;

                    // Проверяем и заменяем отсутствующее описание
                    if (Lampa.Storage.get("logo_missing_desc")) {
                        const currentDesc = movie.overview;
                        console.log('Current description:', currentDesc);
                        if (!currentDesc || currentDesc.trim() === "") {
                            console.log('Description is empty, trying to find alternative');
                            let newDesc = null;
                            if (Lampa.Storage.get("language") === "ru") {
                                console.log('Current language is RU, trying EN first');
                                newDesc = await getDescription("en");
                                console.log('Got EN description:', newDesc);
                                if (!newDesc) {
                                    console.log('No EN description, trying original');
                                    newDesc = await getDescription("");
                                    console.log('Got original description:', newDesc);
                                }
                            } else {
                                console.log('Current language is not RU, trying RU first');
                                newDesc = await getDescription("ru");
                                console.log('Got RU description:', newDesc);
                                if (!newDesc) {
                                    console.log('No RU description, trying original');
                                    newDesc = await getDescription("");
                                    console.log('Got original description:', newDesc);
                                }
                            }
                            
                            if (newDesc) {
                                console.log('Setting new description:', newDesc);
                                movie.overview = newDesc;
                                $(".full-start__description").text(newDesc);
                            } else {
                                console.log('No alternative description found');
                            }
                        } else {
                            console.log('Description is not empty, keeping current');
                        }
                    } else {
                        console.log('Description replacement is disabled');
                    }

                    // Отображаем переводы названий, если включена соответствующая настройка
                    if (Lampa.Storage.get("logo_translations")) {
                        var titlesContainer = $('<div class="title-translations"></div>').css({
                            'margin-top': '10px',
                            'margin-bottom': '15px',
                            'font-size': '0.9em',
                            'opacity': '0.7'
                        });

                        // Добавляем разные переводы
                        if (ruTitle && ruTitle !== enTitle) titlesContainer.append(`<div>🇷🇺 ${ruTitle}</div>`);
                        if (enTitle && enTitle !== origTitle) titlesContainer.append(`<div>🇬🇧 ${enTitle}</div>`);
                        if (origTitle && origTitle !== ruTitle && origTitle !== enTitle) titlesContainer.append(`<div>🌐 ${origTitle}</div>`);

                        // Добавляем переводы после заголовка
                        $(".full-start-new__title").after(titlesContainer);
                    }

                    // Если включена настройка логотипов, пробуем найти и отобразить логотип
                    if (Lampa.Storage.get("logo_glav")) {
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
                            // Создаем контейнер для логотипа
                            var imgElement = $('<img style="margin-top: 5px; max-height: 125px; max-width: 100%; width: auto; height: auto; object-fit: contain; display: block;" src="' + Lampa.TMDB.image("/t/p/w300" + path.replace(".svg", ".png")) + '" />');
                            imgElement.on('error', function() {
                                $(".full-start-new__title").html(movie.title || movie.name);
                            });
                            // Заменяем текстовый заголовок на логотип
                            $(".full-start-new__title").html(imgElement);
                        }
                    }
                }

                findLogo();
            }
        });
    }
}();