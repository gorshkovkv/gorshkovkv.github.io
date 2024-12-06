!function() {
    "use strict";
    
    Lampa.SettingsApi.addParam({
        component: "interface",
        param: {
            name: "logo_nav_right",
            type: "trigger",
            default: false
        },
        field: {
            name: "Навигация справа в ландшафте",
            description: "Отображает навигационную панель справа в ландшафтном режиме"
        }
    });

    if (!window.logoplugin_nav_right) {
        window.logoplugin_nav_right = true;

        // Инициализация Scroll для основного интерфейса
        let mainScroll;
        let pluginScrolls = {};
        
        function initScroll() {
            // Конфигурация скролла
            let scrollConfig = {
                mask: true,
                over: true
            };
            
            if (Lampa.Storage.get('logo_nav_right')) {
                // Уничтожаем старые скроллы
                if (mainScroll) mainScroll.destroy();
                Object.values(pluginScrolls).forEach(scroll => scroll.destroy());
                pluginScrolls = {};
                
                // Создаем скролл для основного контейнера
                mainScroll = new Lampa.Scroll(scrollConfig);
                let mainContainer = $('.activity--active .activity__body');
                if (mainContainer.length) {
                    mainScroll.render().appendTo(mainContainer);
                }
                
                // Создаем скроллы для контейнеров плагинов
                $('.activity--active .scroll-wrapper').each(function() {
                    let container = $(this);
                    let containerId = container.attr('data-scroll-id') || 'scroll_' + Math.random();
                    container.attr('data-scroll-id', containerId);
                    
                    let scroll = new Lampa.Scroll(scrollConfig);
                    scroll.render().appendTo(container);
                    pluginScrolls[containerId] = scroll;
                });
            }
        }

        // Слушаем события для пересоздания скролла
        Lampa.Listener.follow('activity', function(e){
            if(e.type == 'start') setTimeout(initScroll, 50);
        });

        // Слушаем события для обновления скролла при изменении контента
        Lampa.Listener.follow('content', function(e){
            if(e.type == 'update' || e.type == 'render') {
                setTimeout(function() {
                    if(mainScroll) mainScroll.reset();
                    Object.values(pluginScrolls).forEach(scroll => scroll.reset());
                    
                    // Проверяем новые контейнеры
                    $('.activity--active .scroll-wrapper').each(function() {
                        let container = $(this);
                        let containerId = container.attr('data-scroll-id');
                        
                        if (!containerId || !pluginScrolls[containerId]) {
                            containerId = 'scroll_' + Math.random();
                            container.attr('data-scroll-id', containerId);
                            
                            let scroll = new Lampa.Scroll({
                                mask: true,
                                over: true
                            });
                            scroll.render().appendTo(container);
                            pluginScrolls[containerId] = scroll;
                        }
                    });
                }, 10);
            }
        });

        // Добавляем стили для навигации справа
        if (!$('#logo-nav-style').length && Lampa.Storage.get('logo_nav_right')) {
            $('head').append(`
                <style id="logo-nav-style">
                    @media screen and (orientation: landscape) {
                        body[data-nav-right="true"] .navigation-bar {
                            top: 0;
                            left: auto;
                            right: 0;
                            display: -webkit-box;
                            display: -webkit-flex;
                            display: -moz-box;
                            display: -ms-flexbox;
                            display: flex;
                            padding: 0.5em;
                            padding-left: 0;
                        }
                        body[data-nav-right="true"] .navigation-bar .navigation-bar__body {
                            -webkit-box-orient: vertical;
                            -webkit-box-direction: normal;
                            -webkit-flex-direction: column;
                            -moz-box-orient: vertical;
                            -moz-box-direction: normal;
                            -ms-flex-direction: column;
                            flex-direction: column;
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

        // Вызываем initScroll при изменении ориентации
        window.addEventListener('orientationchange', function() {
            setTimeout(initScroll, 100);
        });
        
        // Также обновляем при изменении размера окна
        window.addEventListener('resize', function() {
            initScroll();
        });
        
        // Инициализируем при загрузке
        setTimeout(initScroll, 100);
        
        // Обновляем при открытии настроек
        Lampa.Settings.listener.follow('open', initScroll);
        
        // Следим за изменением настройки навигационной панели
        Lampa.Storage.listener.follow('change', function(event) {
            if (event.name == 'logo_nav_right') {
                // Обновляем атрибут body
                $('body').attr('data-nav-right', event.value);
                
                // Обновляем стили
                if (event.value) {
                    if (!$('#logo-nav-style').length) {
                        $('head').append(`
                            <style id="logo-nav-style">
                                @media screen and (orientation: landscape) {
                                    body[data-nav-right="true"] .navigation-bar {
                                        top: 0;
                                        left: auto;
                                        right: 0;
                                        display: -webkit-box;
                                        display: -webkit-flex;
                                        display: -moz-box;
                                        display: -ms-flexbox;
                                        display: flex;
                                        padding: 0.5em;
                                        padding-left: 0;
                                    }
                                    body[data-nav-right="true"] .navigation-bar .navigation-bar__body {
                                        -webkit-box-orient: vertical;
                                        -webkit-box-direction: normal;
                                        -webkit-flex-direction: column;
                                        -moz-box-orient: vertical;
                                        -moz-box-direction: normal;
                                        -ms-flex-direction: column;
                                        flex-direction: column;
                                    }
                                }
                            </style>
                        `);
                    }
                } else {
                    $('#logo-nav-style').remove();
                }
                
                // Перезапускаем скролл
                initScroll();
            }
        });
        
        // Устанавливаем начальное значение
        $('body').attr('data-nav-right', Lampa.Storage.get('logo_nav_right'));
    }
}();
