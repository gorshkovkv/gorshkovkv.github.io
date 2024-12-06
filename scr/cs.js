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

        // Добавляем общие стили для адаптивного отображения
        if (!$('#logo-common-style').length && Lampa.Storage.field('logo_common_style')) {
            $('head').append(`
                <style id="logo-common-style">
                    @media screen and (orientation: portrait) {
                        .full-start-new__head,
                        .full-start-new__details,
                        .full-start-new__title,
                        .full-start-new__rate-line,
                        .full-start-new__buttons {
                            padding: 0 !important;
                            margin-top: 1.5em !important;
                        }
                        .full-start-new__rate-line {
                            margin: 0 !important;
                            margin-top: 1.5em !important;
                        }
                        .full-start-new__reactions {
                            margin-top: 1.5em !important;
                        }
                        .full-start-new__title {
                            margin-top: 0.5em !important;
                        }
                        .full-start-new__details {
                            margin-top: 0.8em !important;
                        }
                        .full-start-new__title-original {
                            display: none !important;
                        }
                        .full-start-new__title > div {
                            text-align: center !important;
                        }
                        .full-start-new__poster {
                            margin: 0 !important;
                            padding: 0 !important;
                            width: 100% !important;
                        }
                        .full-start-new__img > img {
                            width: 100% !important;
                        }
                        .full-start-new__tags {
                            text-align: center !important;
                        }
                        .full-start-new__tags > span {
                            margin: 4px !important;
                        }
                        .full-start-new__description {
                            margin-top: 1.5em !important;
                            text-align: center !important;
                        }
                        .full-start-new__rate > div:first-child {
                            margin: 0 auto !important;
                        }
                        .full-start-new__rate {
                            display: block !important;
                            text-align: center !important;
                        }
                        .full-start-new__rate > div {
                            margin: 0.5em auto !important;
                        }
                        .full-start-new__buttons {
                            text-align: center !important;
                        }
                        .full-start-new__buttons > div {
                            margin: 0.5em auto !important;
                            display: inline-block !important;
                        }
                        .full-start-new__left {
                            margin-bottom: 0 !important;
                            padding-bottom: 0 !important;
                        }
                        .full-start-new__right {
                            padding-top: 0 !important;
                        }
                    }
                    @media screen and (orientation: landscape) {
                        .full-start-new__rate > div {
                            margin-right: 1em !important;
                        }
                    }
                </style>
            `);
        }

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
                                    .full-start-new__title,
                                    .full-start-new__rate-line,
                                    .full-start-new__buttons {
                                        padding: 0 !important;
                                        margin-top: 1.5em !important;
                                    }
                                    .full-start-new__rate-line {
                                        margin: 0 !important;
                                        margin-top: 1.5em !important;
                                    }
                                    .full-start-new__reactions {
                                        margin-top: 1.5em !important;
                                    }
                                    .full-start-new__title {
                                        margin-top: 0.5em !important;
                                    }
                                    .full-start-new__details {
                                        margin-top: 0.8em !important;
                                    }
                                    .full-start-new__title-original {
                                        display: none !important;
                                    }
                                    .full-start-new__title > div {
                                        text-align: center !important;
                                    }
                                    .full-start-new__poster {
                                        margin: 0 !important;
                                        padding: 0 !important;
                                        width: 100% !important;
                                    }
                                    .full-start-new__img > img {
                                        width: 100% !important;
                                    }
                                    .full-start-new__tags {
                                        text-align: center !important;
                                    }
                                    .full-start-new__tags > span {
                                        margin: 4px !important;
                                    }
                                    .full-start-new__description {
                                        margin-top: 1.5em !important;
                                        text-align: center !important;
                                    }
                                    .full-start-new__rate > div:first-child {
                                        margin: 0 auto !important;
                                    }
                                    .full-start-new__rate {
                                        display: block !important;
                                        text-align: center !important;
                                    }
                                    .full-start-new__rate > div {
                                        margin: 0.5em auto !important;
                                    }
                                    .full-start-new__buttons {
                                        text-align: center !important;
                                    }
                                    .full-start-new__buttons > div {
                                        margin: 0.5em auto !important;
                                        display: inline-block !important;
                                    }
                                    .full-start-new__left {
                                        margin-bottom: 0 !important;
                                        padding-bottom: 0 !important;
                                    }
                                    .full-start-new__right {
                                        padding-top: 0 !important;
                                    }
                                }
                                @media screen and (orientation: landscape) {
                                    .full-start-new__rate > div {
                                        margin-right: 1em !important;
                                    }
                                }
                            </style>
                        `);
                    }
                } else {
                    $('#logo-common-style').remove();
                }
            }
        });

        // Добавляем обработчики для обновления стилей при изменении ориентации
        window.addEventListener('orientationchange', function() {
            setTimeout(function() {
                if (Lampa.Storage.field('logo_common_style')) {
                    $('#logo-common-style').remove();
                    $('head').append(`
                        <style id="logo-common-style">
                            @media screen and (orientation: portrait) {
                                .full-start-new__head,
                                .full-start-new__details,
                                .full-start-new__title,
                                .full-start-new__rate-line,
                                .full-start-new__buttons {
                                    padding: 0 !important;
                                    margin-top: 1.5em !important;
                                }
                                .full-start-new__rate-line {
                                    margin: 0 !important;
                                    margin-top: 1.5em !important;
                                }
                                .full-start-new__reactions {
                                    margin-top: 1.5em !important;
                                }
                                .full-start-new__title {
                                    margin-top: 0.5em !important;
                                }
                                .full-start-new__details {
                                    margin-top: 0.8em !important;
                                }
                                .full-start-new__title-original {
                                    display: none !important;
                                }
                                .full-start-new__title > div {
                                    text-align: center !important;
                                }
                                .full-start-new__poster {
                                    margin: 0 !important;
                                    padding: 0 !important;
                                    width: 100% !important;
                                }
                                .full-start-new__img > img {
                                    width: 100% !important;
                                }
                                .full-start-new__tags {
                                    text-align: center !important;
                                }
                                .full-start-new__tags > span {
                                    margin: 4px !important;
                                }
                                .full-start-new__description {
                                    margin-top: 1.5em !important;
                                    text-align: center !important;
                                }
                                .full-start-new__rate > div:first-child {
                                    margin: 0 auto !important;
                                }
                                .full-start-new__rate {
                                    display: block !important;
                                    text-align: center !important;
                                }
                                .full-start-new__rate > div {
                                    margin: 0.5em auto !important;
                                }
                                .full-start-new__buttons {
                                    text-align: center !important;
                                }
                                .full-start-new__buttons > div {
                                    margin: 0.5em auto !important;
                                    display: inline-block !important;
                                }
                                .full-start-new__left {
                                    margin-bottom: 0 !important;
                                    padding-bottom: 0 !important;
                                }
                                .full-start-new__right {
                                    padding-top: 0 !important;
                                }
                            }
                            @media screen and (orientation: landscape) {
                                .full-start-new__rate > div {
                                    margin-right: 1em !important;
                                }
                            }
                        </style>
                    `);
                }
            }, 100);
        });
    }
}();
