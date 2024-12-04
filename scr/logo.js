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

    if (!window.logoplugin) {
        window.logoplugin = true;
        Lampa.Listener.follow("full", function(e) {
            if (e.type == "complite" && Lampa.Storage.get("logo_glav") != "1") {
                var movie = e.data.movie;
                
                async function tryGetLogo(lang) {
                    var url = Lampa.TMDB.api((movie.name ? "tv" : "movie") + "/" + movie.id + "/images?api_key=" + Lampa.TMDB.key() + "&language=" + lang);
                    try {
                        const resp = await $.get(url);
                        if (resp.logos && resp.logos[0]) {
                            return resp.logos[0].file_path;
                        }
                    } catch (e) {}
                    return null;
                }

                async function findLogo() {
                    // Пробуем найти на текущем языке
                    let path = await tryGetLogo(Lampa.Storage.get("language"));
                    
                    // Если нет на текущем языке, пробуем английский
                    if (!path) {
                        path = await tryGetLogo("en");
                    }
                    
                    // Если нет на английском, пробуем язык оригинала
                    if (!path) {
                        path = await tryGetLogo(null);
                    }

                    if (path) {
                        var imgElement = $('<img style="margin-top: 5px;max-height: 125px;" src="' + Lampa.TMDB.image("/t/p/w300" + path.replace(".svg", ".png")) + '" />');
                        imgElement.on('error', function() {
                            $(".full-start-new__title").html(movie.title || movie.name);
                        });
                        
                        // Создаем контейнер для логотипа и позиционируем его
                        var logoContainer = $('<div class="logo-container" style="position: relative; z-index: 2; margin-bottom: 1em;"></div>');
                        logoContainer.append(imgElement);
                        
                        // Вставляем логотип перед .full-start-new__title
                        $(".full-start-new__title").before(logoContainer);
                        // Скрываем текстовый заголовок
                        $(".full-start-new__title").hide();
                    } else {
                        $(".full-start-new__title").show();
                        $(".full-start-new__title").html(movie.title || movie.name);
                    }
                }

                findLogo();
            }
        });
    }
}();