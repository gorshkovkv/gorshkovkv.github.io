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
                        // Вставляем логотип перед .full-start-new__details
                        $(".full-start-new__details").before('<div class="full-start-new__title" style="margin-bottom: 1em;">' + imgElement[0].outerHTML + '</div>');
                        // Удаляем старый заголовок
                        $(".full-start-new__title").first().remove();
                    } else {
                        $(".full-start-new__title").html(movie.title || movie.name);
                    }
                }

                findLogo();
            }
        });
    }
}();