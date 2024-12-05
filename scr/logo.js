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

    // Добавляем настройку для навигационной панели
    Lampa.SettingsApi.addParam({
        component: "interface",
        param: {
            name: "logo_nav_right",
            type: "trigger",
            default: false
        },
        field: {
            name: "Навигация справа в ландшафте",
            description: "Отображает навигационную панель справа в ландшафтном режиме"
        }
    });

    if (!window.logoplugin) {
        window.logoplugin = true;

        // Добавляем стили для адаптивного центрирования и навигации
        if (!$('#logo-order-style').length && Lampa.Storage.get('logo_translations')) {
            $('head').append(`
                <style id="logo-order-style">
                    @media screen and (orientation: portrait) {
                        .full-start-new__right {
                            display: flex !important;
                            flex-direction: column !important;
                        }
                        .full-start-new__title {
                            order: 1 !important;
                        }
                        .title-translations {
                            order: 2 !important;
                        }
                        .full-start-new__head {
                            order: 3 !important;
                        }
                        .full-start-new__rate-line {
                            order: 4 !important;
                        }
                        .full-start-new__details {
                            order: 5 !important;
                        }
                        .full-start-new__reactions {
                            order: 6 !important;
                        }
                        .full-start-new__buttons {
                            order: 7 !important;
                        }
                    }
                </style>
            `);
        }

        if (!$('#logo-nav-style').length && Lampa.Storage.get('logo_nav_right')) {
            $('head').append(`
                <style id="logo-nav-style">
                    @media screen and (orientation: landscape) {
                        body[data-nav-right="true"] .navigation-bar {
                            top: 0;
                            left: auto;
                            right: 0;
                            display: -webkit-box;
                            display: -webkit-flex;
                            display: -moz-box;
                            display: -ms-flexbox;
                            display: flex;
                            padding: 0.5em;
                            padding-left: 0;
                        }
                        body[data-nav-right="true"] .navigation-bar .navigation-bar__body {
                            -webkit-box-orient: vertical;
                            -webkit-box-direction: normal;
                            -webkit-flex-direction: column;
                            -moz-box-orient: vertical;
                            -moz-box-direction: normal;
                            -ms-flex-direction: column;
                            flex-direction: column;
                        }
                    }
                </style>
            `);
        }

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

        if (!$('#logo-scroll-style').length) {
            $('head').append(`
                <style id="logo-scroll-style">
                    .scroll--mask {
                        height: 100% !important;
                    }
                    .settings__body .scroll--mask {
                        height: calc(100vh - 6em) !important;
                    }
                    @media screen and (orientation: landscape) {
                        .settings__body .scroll--mask {
                            height: calc(100vh - 4em) !important;
                        }
                    }
                </style>
            `);
        }

        if (!$('#logo-common-style').length) {
            $('head').append(`
                <style id="logo-common-style">
                    @media screen and (orientation: portrait) {
                        .full-start-new__head,
                        .full-start-new__title,
                        .full-start-new__tagline,
                        .title-translations,
                        .full-start-new__rate-line,
                        .full-start-new__details,
                        .full-start-new__reactions,
                        .full-start-new__buttons {
                            margin: 5px 0 !important;
                            -webkit-text-stroke: 0px #000000 !important;
                            text-align: center !important;
                            justify-content: center !important;
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
                            margin: 5px 0 0 0 !important;
                            -webkit-text-stroke: 0.1px #000000 !important;
                            text-align: left !important;
                            justify-content: left !important;
                        }
                    }
                </style>
            `);
        }

        // Функция для пересчета высоты скролла
        function updateScrollHeight() {
            let windowHeight = window.innerHeight;
            $('.scroll--mask').css('height', windowHeight + 'px');
        }

        // Слушаем изменение ориентации
        window.addEventListener('orientationchange', function() {
            setTimeout(updateScrollHeight, 100); // Небольшая задержка для уверенности, что DOM обновился
        });

        // Также обновляем при изменении размера окна
        window.addEventListener('resize', function() {
            updateScrollHeight();
        });

        // Инициализируем при загрузке
        setTimeout(updateScrollHeight, 100);

        // Обновляем высоту при открытии настроек
        Lampa.Settings.listener.follow('open', updateScrollHeight);

        // Следим за изменением настройки навигационной панели
        Lampa.Storage.listener.follow('change', function (event) {
            if (event.name == 'logo_nav_right') {
                $('body').attr('data-nav-right', event.value);
            }
        });

        // Устанавливаем начальное значение
        $('body').attr('data-nav-right', Lampa.Storage.get('logo_nav_right'));

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
                            'font-size': '1.1em',
                            '-webkit-text-stroke': '0.1px #000000',
                            'opacity': '1'
                        });

                        const currentLang = Lampa.Storage.get("language");
                        let displayLang = currentLang;

                        if (Lampa.Storage.get("logo_glav")) {
                            if (path) {
                                displayLang = logoLang;
                            }
                        } else {
                            const currentTitle = movie.title || movie.name;
                            if (currentTitle === ruTitle) displayLang = 'ru';
                            else if (currentTitle === enTitle) displayLang = 'en';
                            else displayLang = 'orig';
                        }

                        let translations = [];

                        if (displayLang === currentLang) {
                            if (enTitle && enTitle !== (currentLang === 'ru' ? ruTitle : enTitle)) {
                                translations.push(`<div style="margin-bottom: 0.3em;">🇬🇧 ${enTitle}</div>`);
                            }
                            if (origTitle && origTitle !== enTitle && origTitle !== (currentLang === 'ru' ? ruTitle : enTitle)) {
                                translations.push(`<div style="margin-bottom: 0.3em;">🌐 ${origTitle}</div>`);
                            }
                        } else if (displayLang === 'en') {
                            if (currentLang === 'ru' && ruTitle && ruTitle !== enTitle) {
                                translations.push(`<div style="margin-bottom: 0.3em;">🇷🇺 ${ruTitle}</div>`);
                            }
                            if (origTitle && origTitle !== enTitle && origTitle !== (currentLang === 'ru' ? ruTitle : enTitle)) {
                                translations.push(`<div style="margin-bottom: 0.3em;">🌐 ${origTitle}</div>`);
                            }
                        } else {
                            if (currentLang === 'ru' && ruTitle && ruTitle !== origTitle) {
                                translations.push(`<div style="margin-bottom: 0.3em;">🇷🇺 ${ruTitle}</div>`);
                            }
                            if (enTitle && enTitle !== origTitle) {
                                translations.push(`<div style="margin-bottom: 0.3em;">🇬🇧 ${enTitle}</div>`);
                            }
                        }

                        // Добавляем переводы в контейнер
                        titlesContainer.html(translations.join(''));

                        // Если есть хотя бы один перевод, добавляем контейнер
                        if (translations.length > 0) {
                            $(".full-start-new__title").after(titlesContainer);
                        }
                    }

                    // Если включена настройка логотипов, пробуем найти и отобразить логотип
                    if (Lampa.Storage.get("logo_glav")) {
                        // Создаем контейнер для логотипа
                        var imgElement = $('<img style="matging-top: 0.2em; margin-bottom: 0.1em; max-height: 1.5em;" src="' + Lampa.TMDB.image("/t/p/w500" + path.replace(".svg", ".png")) + '" />');
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