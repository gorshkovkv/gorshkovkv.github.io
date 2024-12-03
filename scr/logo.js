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
                var url = Lampa.TMDB.api((movie.name ? "tv" : "movie") + "/" + movie.id + "/images?api_key=" + Lampa.TMDB.key() + "&language=" + Lampa.Storage.get("language"));
                
                $.get(url, function(resp) {
                    if (resp.logos && resp.logos[0]) {
                        var path = resp.logos[0].file_path;
                        if (path != "") {
                            var imgElement = $('<img style="margin-top: 5px;max-height: 125px;" src="' + Lampa.TMDB.image("/t/p/w300" + path.replace(".svg", ".png")) + '" />');
                            imgElement.on('error', function() {
                                $(".full-start-new__title").html(movie.title || movie.name);
                            });
                            $(".full-start-new__title").html(imgElement);
                        }
                    } else {
                        $(".full-start-new__title").html(movie.title || movie.name);
                    }
                });
            }
        });
    }
}();