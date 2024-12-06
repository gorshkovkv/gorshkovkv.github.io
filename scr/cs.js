!function() {
    "use strict";
    
    Lampa.SettingsApi.addParam({
        component: "interface",
        param: {
            name: "logo_common_style",
            type: "trigger",
            default: true
        },
        field: {
            name: "Стили",
            description: "Применять стили для адаптивного отображения, на телевизоре лучше отключить"
        }
    });

    if (!window.logoplugin_common_style) {
        window.logoplugin_common_style = true;

        if (!$('#logo-common-style').length && Lampa.Storage.field('logo_common_style')) {
            $('head').append(`
                <style id="logo-common-style">
                    @media screen and (orientation: portrait) {
                        .full-start-new__head,
                        .full-start-new__details,
                        .full-start-new__rate-line,
                        .full-start-new__description,
                        .full-start-new__title,
                        .full-start-new__tagline,
                        .full-start-new__icons,
                        .full-start-new__buttons,
                        .full-start-new__reactions,
                        .full-start-new__bookmark {
                            width: 100% !important;
                            max-width: 100% !important;
                        }
                        .full-start-new__left {
                            margin-right: 0 !important;
                            flex-shrink: 0 !important;
                            padding-bottom: 0.8em !important;
                        }
                        .full-start-new__right {
                            padding-left: 0 !important;
                            margin-top: 0 !important;
                        }
                        .full-start-new__poster {
                            -webkit-border-radius: 1em !important;
                            -moz-border-radius: 1em !important;
                            border-radius: 1em !important;
                            max-width: 100% !important;
                        }
                        .full-start-new__img {
                            padding-top: 150% !important;
                            height: auto !important;
                        }
                        .full-start-new__tags {
                            flex-wrap: wrap !important;
                        }
                        .full-start-new__tag {
                            margin-bottom: 0.4em !important;
                        }
                        .full-start-new__title {
                            font-size: 1.9em !important;
                            margin-top: 0.2em !important;
                        }
                        .full-start-new__tagline {
                            font-size: 1.2em !important;
                        }
                        .full-start-new__rate-line > div {
                            font-size: 1.4em !important;
                        }
                        .full-start-new__description {
                            font-size: 1.2em !important;
                        }
                        .full-start-new__icons > div {
                            margin: 0 1.5em 0.7em 0 !important;
                        }
                        .full-start-new__icons {
                            flex-wrap: wrap !important;
                            padding-bottom: 0.3em !important;
                        }
                        .full-start-new__button {
                            padding: 0.8em !important;
                        }
                        .full-start-new__button:not(:last-child) {
                            margin-right: 1em !important;
                        }
                        .full-start-new__details {
                            margin-top: 0.8em !important;
                        }
                        .full-start-new__reactions {
                            margin-top: 0.8em !important;
                        }
                        .full-start-new__footer {
                            margin-top: 1em !important;
                        }
                    }
                </style>
            `);
        }

        // Добавляем стили для скролла
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

        // Функция инициализации скролла
        function initScroll() {
            let scroll = document.querySelector('.scroll');
            if (scroll) {
                let height = window.innerHeight;
                let offset = 0;
                
                // Учитываем высоту заголовка в настройках
                if (document.querySelector('.settings')) {
                    if (window.innerWidth > window.innerHeight) {
                        offset = height * 0.1;
                    } else {
                        offset = height * 0.15;
                    }
                }
                
                scroll.style.height = (height - offset) + 'px';
            }
        }

        // Вызываем initScroll вместо updateScrollHeight
        window.addEventListener('orientationchange', function() {
            setTimeout(initScroll, 100);
        });

        // Следим за изменением настройки
        Lampa.Storage.listener.follow('change', function(event) {
            if (event.name == 'logo_common_style') {
                // Обновляем стили
                if (event.value) {
                    if (!$('#logo-common-style').length) {
                        $('head').append(`
                            <style id="logo-common-style">
                                @media screen and (orientation: portrait) {
                                    .full-start-new__head,
                                    .full-start-new__details,
                                    .full-start-new__rate-line,
                                    .full-start-new__description,
                                    .full-start-new__title,
                                    .full-start-new__tagline,
                                    .full-start-new__icons,
                                    .full-start-new__buttons,
                                    .full-start-new__reactions,
                                    .full-start-new__bookmark {
                                        width: 100% !important;
                                        max-width: 100% !important;
                                    }
                                    .full-start-new__left {
                                        margin-right: 0 !important;
                                        flex-shrink: 0 !important;
                                        padding-bottom: 0.8em !important;
                                    }
                                    .full-start-new__right {
                                        padding-left: 0 !important;
                                        margin-top: 0 !important;
                                    }
                                    .full-start-new__poster {
                                        -webkit-border-radius: 1em !important;
                                        -moz-border-radius: 1em !important;
                                        border-radius: 1em !important;
                                        max-width: 100% !important;
                                    }
                                    .full-start-new__img {
                                        padding-top: 150% !important;
                                        height: auto !important;
                                    }
                                    .full-start-new__tags {
                                        flex-wrap: wrap !important;
                                    }
                                    .full-start-new__tag {
                                        margin-bottom: 0.4em !important;
                                    }
                                    .full-start-new__title {
                                        font-size: 1.9em !important;
                                        margin-top: 0.2em !important;
                                    }
                                    .full-start-new__tagline {
                                        font-size: 1.2em !important;
                                    }
                                    .full-start-new__rate-line > div {
                                        font-size: 1.4em !important;
                                    }
                                    .full-start-new__description {
                                        font-size: 1.2em !important;
                                    }
                                    .full-start-new__icons > div {
                                        margin: 0 1.5em 0.7em 0 !important;
                                    }
                                    .full-start-new__icons {
                                        flex-wrap: wrap !important;
                                        padding-bottom: 0.3em !important;
                                    }
                                    .full-start-new__button {
                                        padding: 0.8em !important;
                                    }
                                    .full-start-new__button:not(:last-child) {
                                        margin-right: 1em !important;
                                    }
                                    .full-start-new__details {
                                        margin-top: 0.8em !important;
                                    }
                                    .full-start-new__reactions {
                                        margin-top: 0.8em !important;
                                    }
                                    .full-start-new__footer {
                                        margin-top: 1em !important;
                                    }
                                }
                            </style>
                        `);
                    }
                } else {
                    $('#logo-common-style').remove();
                }
                
                // Обновляем скролл
                setTimeout(initScroll, 100);
            }
        });
    }
}();
