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
                if (!movie) return null;
                
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
            if (!movie) return;

            // Получаем заранее все названия для переводов
            const ruTitle = await getTitle("ru");
            const enTitle = await getTitle("en");
            const origTitle = movie.original_title || movie.original_name;

            // Отображаем переводы названий
            var titlesContainer = $('<div class="title-translations"></div>').css({
                'font-size': '1.1em',
                '-webkit-text-stroke': '0.1px #000000',
                'opacity': '1'
            });

            const currentLang = Lampa.Storage.get("language");
            let displayLang = currentLang;

            if (Lampa.Storage.get("logo_glav")) {
                if (movie.logo) {
                    displayLang = movie.logo_lang || 'en';
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
