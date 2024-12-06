!function() {
    "use strict";
    
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

    if (!window.logoplugin_missing_desc) {
        window.logoplugin_missing_desc = true;

        async function getDescription(lang) {
            try {
                let movie = Lampa.Activity.active().card;
                if (!movie) return null;

                // Сначала пробуем получить описание из TMDB
                const url = Lampa.TMDB.api((movie.name ? "tv" : "movie") + "/" + movie.id + "?api_key=" + Lampa.TMDB.key() + "&language=" + lang);
                const resp = await $.get(url);
                
                if (resp.overview) return resp.overview;
                
                // Если описание не найдено и включена опция logo_missing_desc
                if (Lampa.Storage.get('logo_missing_desc', true)) {
                    // Пробуем получить описание на английском как запасной вариант
                    if (lang !== 'en') {
                        const url_en = Lampa.TMDB.api((movie.name ? "tv" : "movie") + "/" + movie.id + "?api_key=" + Lampa.TMDB.key() + "&language=en");
                        const resp_en = await $.get(url_en);
                        if (resp_en.overview) return resp_en.overview;
                    }
                }
                
                return null;
            } catch (e) {
                return null;
            }
        }

        async function findDescription() {
            if (!Lampa.Storage.get('logo_missing_desc')) return;

            let movie = Lampa.Activity.active().card;
            if (!movie) return;

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
                }
            }
        }

        // Слушаем изменения в активности
        Lampa.Listener.follow('full', function(e) {
            if (e.type == "complite") {
                setTimeout(findDescription, 100);
            }
        });

        // Следим за изменением настройки
        Lampa.Storage.listener.follow('change', function(event) {
            if (event.name == 'logo_missing_desc') {
                // Перезапускаем поиск описания
                setTimeout(findDescription, 100);
            }
        });
    }
}();
