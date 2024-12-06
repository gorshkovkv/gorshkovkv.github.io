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

    if (!window.logoplugin_glav) {
        window.logoplugin_glav = true;

        // Добавляем стили для логотипов
        if (!$('#logo-glav-style').length && Lampa.Storage.get('logo_glav')) {
            $('head').append(`
                <style id="logo-glav-style">
                    @media screen and (orientation: portrait) {
                        .full-start-new__title img {
                            padding-top: 5px !important;
                            max-height: fit-content !important;
                            max-width: 60% !important;
                        }
                    }
                </style>
            `);
        }

        async function tryGetLogo(lang) {
            let movie = Lampa.Activity.active().card;
            if (!movie) return null;
            
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

        async function findLogo() {
            if (!Lampa.Storage.get("logo_glav")) return;

            let movie = Lampa.Activity.active().card;
            if (!movie) return;

            // Инициализируем переменные для логотипа
            let path = null;
            let logoLang = null;

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

            // Если нашли логотип, отображаем его
            if (path) {
                // Сохраняем информацию о логотипе в объекте movie
                movie.logo = path;
                movie.logo_lang = logoLang;

                // Создаем контейнер для логотипа
                var imgElement = $('<img style="matging-top: 0.2em; margin-bottom: 0.1em; max-height: 1.5em;" src="' + Lampa.TMDB.image("/t/p/w500" + path.replace(".svg", ".png")) + '" />');
                
                // Заменяем текстовое название логотипом
                $(".full-start-new__title", Lampa.Activity.active().activity.render()).html(imgElement);
            }
        }

        // Слушаем изменения в активности
        Lampa.Listener.follow('full', function(e) {
            if (e.type == "complite") {
                setTimeout(findLogo, 100);
            }
        });

        // Следим за изменением настройки
        Lampa.Storage.listener.follow('change', function(event) {
            if (event.name == 'logo_glav') {
                // Обновляем стили
                if (event.value) {
                    if (!$('#logo-glav-style').length) {
                        $('head').append(`
                            <style id="logo-glav-style">
                                @media screen and (orientation: portrait) {
                                    .full-start-new__title img {
                                        padding-top: 5px !important;
                                        max-height: fit-content !important;
                                        max-width: 60% !important;
                                    }
                                }
                            </style>
                        `);
                    }
                } else {
                    $('#logo-glav-style').remove();
                }
                
                // Перезапускаем поиск логотипа
                setTimeout(findLogo, 100);
            }
        });
    }
}();
