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

        // Инициализация компонента
        this.create = function() {
            this.activity.loader(false);
            this.activity.toggle();
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

        // Добавляем пункт в меню
        var button = $('<li class="menu__item selector">\
            <div class="menu__ico">\
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">\
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />\
                </svg>\
            </div>\
            <div class="menu__text">Умный поиск</div>\
        </li>');

        // Добавляем кнопку при загрузке карточки
        Lampa.Listener.follow('full', function(e) {
            if (e.type == 'complite') {
                setTimeout(function() {
                    var btn = $('<div class="full-start__button selector view--smart_source">\
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">\
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />\
                        </svg>\
                        <span>Умный поиск</span>\
                    </div>');
                    
                    btn.on('hover:enter', function() {
                        var card = Lampa.Activity.active().card;
                        if (card) {
                            findBestSource(card);
                        }
                    });

                    // Добавляем кнопку в интерфейс
                    $('.full-start__buttons', Lampa.Activity.active().activity.render()).append(btn);
                }, 500);
            }
        });

        // Добавляем кнопку в меню
        $('.menu .menu__list').eq(0).append(button);

        // Обработчик клика по кнопке в меню
        button.on('hover:enter', function() {
            Lampa.Activity.push({
                url: '',
                title: 'Умный поиск',
                component: 'smart_source',
                page: 1
            });
        });
    }

    if (!window.plugin_smart_source_ready) startPlugin();

})();
