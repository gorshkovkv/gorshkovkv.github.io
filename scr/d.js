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

        function getDescription(lang) {
            let card = Lampa.Activity.active().card;
            if (card && card.descriptions && card.descriptions[lang]) {
                return card.descriptions[lang];
            }
            return '';
        }

        function findDescription() {
            if (!Lampa.Storage.get('logo_missing_desc')) return;

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
                                    let descriptions = {};
                                    data.translations.forEach(function(trans) {
                                        let desc = trans.data.overview || '';
                                        if (desc) {
                                            descriptions[trans.iso_639_1] = desc;
                                        }
                                    });

                                    // Сохраняем описания в карточке
                                    card.descriptions = descriptions;

                                    // Если русского описания нет, пробуем заменить английским
                                    let $overview = $('.full-start-new__description', Lampa.Activity.active().activity.render());
                                    if ($overview.length && !$overview.text().trim() && descriptions.en) {
                                        $overview.text(descriptions.en);
                                    }
                                }
                            },
                            error: function() {
                                console.error('Failed to fetch descriptions');
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
