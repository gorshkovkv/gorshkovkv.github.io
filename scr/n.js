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
        let scroll;
        
        function initScroll() {
            if (scroll) scroll.destroy();
            
            if (Lampa.Storage.get('logo_nav_right')) {
                scroll = new Lampa.Scroll({
                    mask: true,
                    over: true
                });
                
                let where = Lampa.Activity.active().activity.render();
                let content = where.find('.scroll-wrapper');
                
                if (content.length) {
                    scroll.render().appendTo(content);
                } else {
                    content = where.find('.activity__body');
                    if (content.length) {
                        scroll.render().appendTo(content);
                    }
                }
                
                // Добавляем обработчик для обновления скролла при изменении контента
                where.on('update', function() {
                    if (scroll) scroll.reset();
                });
            }
        }

        // Слушаем события для пересоздания скролла
        Lampa.Listener.follow('activity', function(e){
            if(e.type == 'start') setTimeout(initScroll, 100);
        });

        // Слушаем события для обновления скролла при изменении контента
        Lampa.Listener.follow('content', function(e){
            if(e.type == 'update') setTimeout(initScroll, 100);
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
