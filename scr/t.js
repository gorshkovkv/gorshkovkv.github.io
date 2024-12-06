!function() {
    "use strict";
    
    Lampa.SettingsApi.addParam({
        component: "interface",
        param: {
            name: "logo_translations",
            type: "trigger",
            default: true
        },
        field: {
            name: "Переводы названий",
            description: "Показывать названия на разных языках под названием или логотипом."
        }
    });

    if (!window.logoplugin_translations) {
        window.logoplugin_translations = true;

        // Добавляем стили для адаптивного центрирования
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

        async function getTitle(lang) {
            try {
                let movie = Lampa.Activity.active().card;
                if (!movie || !movie.id) return null;
                
                const url = Lampa.TMDB.api((movie.name ? "tv" : "movie") + "/" + movie.id + "?api_key=" + Lampa.TMDB.key() + "&language=" + lang);
                const resp = await $.get(url);
                return resp.title || resp.name;
            } catch (e) {
                return null;
            }
        }

        async function findTranslations() {
            if (!Lampa.Storage.get('logo_translations')) return;

            let movie = Lampa.Activity.active().card;
            if (!movie || !movie.id) return;

            try {
                // Получаем заранее все названия для переводов
                const ruTitle = await getTitle("ru");
                const enTitle = await getTitle("en");
                const origTitle = movie.original_title || movie.original_name;

                // Создаем блок с переводами
                let translationsHtml = '';
                
                if (ruTitle && ruTitle !== origTitle) {
                    translationsHtml += '<div class="translation-item"> ' + ruTitle + '</div>';
                }
                
                if (enTitle && enTitle !== origTitle && enTitle !== ruTitle) {
                    translationsHtml += '<div class="translation-item"> ' + enTitle + '</div>';
                }
                
                if (origTitle && origTitle !== ruTitle && origTitle !== enTitle) {
                    translationsHtml += '<div class="translation-item"> ' + origTitle + '</div>';
                }

                if (translationsHtml) {
                    let $translations = $('.title-translations');
                    if (!$translations.length) {
                        $translations = $('<div class="title-translations"></div>');
                        $('.full-start-new__title', Lampa.Activity.active().activity.render()).after($translations);
                    }
                    $translations.html(translationsHtml);
                }

            } catch (e) {
                console.error('Failed to fetch translations:', e);
            }
        }

        // Добавляем стили для переводов
        if (!$('#logo-translations-style').length) {
            $('head').append(`
                <style id="logo-translations-style">
                    .title-translations {
                        margin: 1em 0;
                        text-align: center;
                    }
                    .translation-item {
                        display: inline-block;
                        margin: 0.3em;
                        padding: 0.4em 0.8em;
                        background-color: rgba(0, 0, 0, 0.3);
                        border-radius: 0.3em;
                    }
                    @media screen and (orientation: portrait) {
                        .title-translations {
                            margin: 0.5em 0;
                        }
                    }
                </style>
            `);
        }

        // Слушаем изменения в активности
        Lampa.Listener.follow('full', function(e) {
            if (e.type == "complite") {
                setTimeout(findTranslations, 100);
            }
        });

        // Следим за изменением настройки
        Lampa.Storage.listener.follow('change', function(event) {
            if (event.name == 'logo_translations') {
                // Обновляем стили
                if (event.value) {
                    if (!$('#logo-order-style').length) {
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
                } else {
                    $('#logo-order-style').remove();
                    $('.title-translations').remove();
                }
                
                // Перезапускаем поиск переводов
                setTimeout(findTranslations, 100);
            }
        });
    }
}();
