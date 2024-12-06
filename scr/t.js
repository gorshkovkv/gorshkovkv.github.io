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

        function getTitle(lang) {
            let card = Lampa.Activity.active().card;
            if (card && card.translations && card.translations[lang]) {
                return card.translations[lang];
            }
            return card ? (card.original_title || card.original_name || '') : '';
        }

        function findTranslations() {
            if (!Lampa.Storage.get('logo_translations')) return;

            let card = Lampa.Activity.active().card;
            if (!card) return;

            let imdb_id = card.imdb_id;
            if (!imdb_id) return;

            let url = 'http://api.themoviedb.org/3/find/' + imdb_id + '?api_key=4ef0d7355d9ffb5151e987764708ce96&external_source=imdb_id';

            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                success: function (response) {
                    let movie = response.movie_results[0] || response.tv_results[0];
                    if (movie) {
                        let tmdb_id = movie.id;
                        let type = movie.title ? 'movie' : 'tv';
                        let apiUrl = 'http://api.themoviedb.org/3/' + type + '/' + tmdb_id + '/translations?api_key=4ef0d7355d9ffb5151e987764708ce96';

                        $.ajax({
                            url: apiUrl,
                            type: 'GET',
                            dataType: 'json',
                            success: function (data) {
                                if (data.translations && data.translations.length > 0) {
                                    let translations = {};
                                    data.translations.forEach(function(trans) {
                                        let title = trans.data.title || trans.data.name || '';
                                        if (title) {
                                            translations[trans.iso_639_1] = title;
                                        }
                                    });

                                    // Сохраняем переводы в карточке
                                    card.translations = translations;

                                    // Создаем блок с переводами
                                    let translationsHtml = '';
                                    let langs = ['en', 'es', 'de', 'fr', 'it', 'zh'];
                                    
                                    langs.forEach(function(lang) {
                                        let title = translations[lang];
                                        if (title) {
                                            translationsHtml += '<div class="translation-item">' + title + ' (' + lang.toUpperCase() + ')</div>';
                                        }
                                    });

                                    if (translationsHtml) {
                                        let $translations = $('.title-translations');
                                        if (!$translations.length) {
                                            $translations = $('<div class="title-translations"></div>');
                                            $('.full-start-new__title', Lampa.Activity.active().activity.render()).after($translations);
                                        }
                                        $translations.html(translationsHtml);
                                    }
                                }
                            },
                            error: function() {
                                console.error('Failed to fetch translations');
                            }
                        });
                    }
                },
                error: function() {
                    console.error('Failed to fetch TMDB ID');
                }
            });
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
