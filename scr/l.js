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

        function tryGetLogo(lang) {
            let logos = Lampa.Activity.active().card.logo;
            if (logos && logos[lang]) {
                return logos[lang];
            }
            return '';
        }

        function getTitle(lang) {
            let card = Lampa.Activity.active().card;
            if (card) {
                return card.title || '';
            }
            return '';
        }

        function findLogo() {
            if (!Lampa.Storage.get('logo_glav')) return;

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
                        let apiUrl = 'http://api.themoviedb.org/3/' + type + '/' + tmdb_id + '/images?api_key=4ef0d7355d9ffb5151e987764708ce96';

                        $.ajax({
                            url: apiUrl,
                            type: 'GET',
                            dataType: 'json',
                            success: function (data) {
                                if (data.logos && data.logos.length > 0) {
                                    let logos = {};
                                    data.logos.forEach(function(logo) {
                                        logos[logo.iso_639_1 || 'en'] = 'https://image.tmdb.org/t/p/w500' + logo.file_path;
                                    });

                                    // Сохраняем логотипы в карточке
                                    card.logo = logos;

                                    // Проверяем, есть ли логотип на нужном языке
                                    let currentLogo = tryGetLogo('ru') || tryGetLogo('en');
                                    
                                    if (currentLogo) {
                                        $('.full-start-new__title', Lampa.Activity.active().activity.render()).html('<img src="' + currentLogo + '" alt="' + getTitle('ru') + '">');
                                    }
                                }
                            },
                            error: function() {
                                console.error('Failed to fetch logos');
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
