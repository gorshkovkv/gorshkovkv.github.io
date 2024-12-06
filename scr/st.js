!function() {
    "use strict";
    
    Lampa.SettingsApi.addParam({
        component: "interface",
        param: {
            name: "logo_show_average_time",
            type: "trigger",
            default: false
        },
        field: {
            name: "Показывать среднее время серии",
            description: "Отображает среднее время серии в карточке сериала"
        }
    });

    if (!window.logoplugin_show_average_time) {
        window.logoplugin_show_average_time = true;

        function calculateAverageTime(card) {
            if (!card || !card.seasons || !card.number_of_seasons) return '';
            
            let totalEpisodes = 0;
            let totalRuntime = 0;
            
            // Проходим по всем сезонам
            for (let i = 1; i <= card.number_of_seasons; i++) {
                let season = card.seasons[i];
                if (season && season.episodes) {
                    for (let episode of season.episodes) {
                        if (episode && episode.runtime) {
                            totalRuntime += episode.runtime;
                            totalEpisodes++;
                        }
                    }
                }
            }
            
            // Вычисляем среднее время
            if (totalEpisodes > 0) {
                let averageTime = Math.round(totalRuntime / totalEpisodes);
                return averageTime + ' мин';
            }
            
            return '';
        }

        function showAverageTime() {
            if (!Lampa.Storage.get('logo_show_average_time')) return;

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
                    let tv = response.tv_results[0];
                    if (tv) {
                        let tmdb_id = tv.id;
                        let apiUrl = 'http://api.themoviedb.org/3/tv/' + tmdb_id + '?api_key=4ef0d7355d9ffb5151e987764708ce96&append_to_response=season/1,season/2,season/3,season/4,season/5,season/6,season/7,season/8,season/9,season/10';

                        $.ajax({
                            url: apiUrl,
                            type: 'GET',
                            dataType: 'json',
                            success: function (data) {
                                if (data) {
                                    // Сохраняем данные о сезонах в карточке
                                    card.seasons = {};
                                    card.number_of_seasons = data.number_of_seasons;
                                    
                                    // Собираем информацию о сезонах
                                    for (let i = 1; i <= Math.min(10, data.number_of_seasons); i++) {
                                        let seasonData = data['season/' + i];
                                        if (seasonData) {
                                            card.seasons[i] = seasonData;
                                        }
                                    }
                                    
                                    // Вычисляем среднее время
                                    let averageTime = calculateAverageTime(card);
                                    
                                    if (averageTime) {
                                        // Добавляем информацию о среднем времени серии
                                        let $details = $('.full-start-new__details', Lampa.Activity.active().activity.render());
                                        let $averageTime = $('.average-episode-time');
                                        
                                        if (!$averageTime.length) {
                                            $averageTime = $('<div class="full-start-new__tag average-episode-time"></div>');
                                            $details.append($averageTime);
                                        }
                                        
                                        $averageTime.text('Среднее время серии: ' + averageTime);
                                    }
                                }
                            },
                            error: function() {
                                console.error('Failed to fetch TV show details');
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
                setTimeout(showAverageTime, 100);
            }
        });

        // Следим за изменением настройки
        Lampa.Storage.listener.follow('change', function(event) {
            if (event.name == 'logo_show_average_time') {
                // Если настройка выключена, удаляем информацию о среднем времени
                if (!event.value) {
                    $('.average-episode-time').remove();
                } else {
                    // Иначе показываем информацию
                    setTimeout(showAverageTime, 100);
                }
            }
        });

        // Добавляем стили для отображения среднего времени
        if (!$('#logo-average-time-style').length) {
            $('head').append(`
                <style id="logo-average-time-style">
                    .average-episode-time {
                        display: inline-block;
                        margin-right: 1em;
                        padding: 0.3em 0.8em;
                        background-color: rgba(0, 0, 0, 0.3);
                        border-radius: 0.3em;
                    }
                    @media screen and (orientation: portrait) {
                        .average-episode-time {
                            margin: 0.5em;
                        }
                    }
                </style>
            `);
        }
    }
}();
