(function() {
    'use strict';

    // Конфигурация
    var Defined = {
        api: 'lampac',
        localhost: window.location.protocol === 'https:' ? 'https://showy.online/' : 'http://showy.online/',
    };

    // Список поддерживаемых балансеров
    var balancers = ['rezka2', 'kinobase', 'cdnmovies', 'collaps', 'filmix', 'zetflix', 'redheadsound', 'anilibria'];

    function component(object) {
        var network = new Lampa.Reguest();
        var scroll = new Lampa.Scroll({
            mask: true,
            over: true
        });
        var files = new Lampa.Explorer(object);
        var filter = new Lampa.Filter(object);
        var sources = {};
        var initialized = false;
        var current_quality = '1080p';
        var filter_translate = {
            season: Lampa.Lang.translate('torrent_serial_season'),
            voice: Lampa.Lang.translate('torrent_parser_voice'),
            source: Lampa.Lang.translate('settings_rest_source')
        };

        // Функция для проверки качества видео
        function getQualityScore(quality) {
            var resolutions = {
                '2160p': 4,
                '1440p': 3,
                '1080p': 2,
                '720p': 1,
                '480p': 0
            };
            return resolutions[quality] || -1;
        }

        // Функция для сравнения источников
        function compareStreams(a, b) {
            var score_a = getQualityScore(a.quality);
            var score_b = getQualityScore(b.quality);
            return score_b - score_a;
        }

        // Функция для получения потоков от каждого балансера
        function getStreams(movie, balancer) {
            return new Promise((resolve, reject) => {
                var params = {
                    title: movie.title,
                    original_title: movie.original_title,
                    year: movie.year,
                    type: movie.type
                };

                network.timeout(15000);
                network.silent(Defined.localhost + 'api/v1/' + balancer + '/search', (found) => {
                    if (found && found.streams) {
                        resolve({
                            balancer: balancer,
                            streams: found.streams.sort(compareStreams)
                        });
                    } else {
                        resolve({
                            balancer: balancer,
                            streams: []
                        });
                    }
                }, (err) => {
                    resolve({
                        balancer: balancer,
                        streams: []
                    });
                }, params);
            });
        }

        // Основная функция для поиска лучшего источника
        function findBestSource(movie) {
            Promise.all(balancers.map(balancer => getStreams(movie, balancer)))
                .then(results => {
                    var best_source = null;
                    var best_quality = -1;

                    results.forEach(result => {
                        if (result.streams.length > 0) {
                            var stream = result.streams[0];
                            var quality_score = getQualityScore(stream.quality);
                            
                            if (quality_score > best_quality) {
                                best_quality = quality_score;
                                best_source = {
                                    balancer: result.balancer,
                                    stream: stream
                                };
                            }
                        }
                    });

                    if (best_source) {
                        // Запускаем воспроизведение лучшего источника
                        playSource(best_source);
                    } else {
                        Lampa.Noty.show('Не найдено подходящих источников');
                    }
                });
        }

        // Функция воспроизведения
        function playSource(source) {
            var video = {
                url: source.stream.url,
                quality: source.stream.quality,
                timeline: source.stream.timeline,
                title: object.title,
                subtitles: source.stream.subtitles
            };

            Lampa.Player.play(video);
            Lampa.Player.playlist([video]);
        }

        // Создание кнопки в интерфейсе
        function addButton() {
            var btn = $('<div class="full-start__button selector view--smart_source"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"/></svg><span>Умный поиск</span></div>');
            btn.on('hover:enter', function() {
                findBestSource(object);
            });
            $('.full-start__buttons', Lampa.Activity.active().activity.render()).append(btn);
        }

        // Инициализация компонента
        this.create = function() {
            this.activity.loader(false);
            this.activity.toggle();
            addButton();
        };

        this.start = function() {
            if (!initialized) {
                initialized = true;
                this.create();
            }
        };

        this.pause = function() {};
        this.stop = function() {};
        this.destroy = function() {};
    }

    function startPlugin() {
        window.plugin_smart_source_ready = true;
        Lampa.Component.add('smart_source', component);
        
        // Добавляем кнопку при загрузке каждой карточки
        Lampa.Listener.follow('full', function(e) {
            if (e.type == 'complite') {
                setTimeout(function() {
                    component.addButton();
                }, 100);
            }
        });
    }

    if (!window.plugin_smart_source_ready) startPlugin();

})();
