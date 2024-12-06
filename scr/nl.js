!function() {
    'use strict';

    // Добавляем настройку для центрированной навигации в ландшафтном режиме
    Lampa.SettingsApi.addParam({
        component: 'interface',
        param: {
            name: 'centered_landscape_nav',
            type: 'trigger',
            default: true
        },
        field: {
            name: 'Центрированная навигация',
            description: 'Центрирует навигационную панель в ландшафтном режиме'
        }
    });

    function updateNavigationStyles() {
        // Удаляем старые стили, если они есть
        $('#nav-landscape-style').remove();

        // Добавляем новые стили только если настройка включена
        if (Lampa.Storage.get('centered_landscape_nav')) {
            const style = `
                <style id="nav-landscape-style">
                    @media screen and (orientation: landscape) {
                        .navigation-bar {
                            left: 25% !important;
                            right: 25% !important;
                            top: auto !important;
                            bottom: 2em !important;
                            padding: 0 !important;
                            background: none !important;
                            box-shadow: none !important;
                            z-index: 999 !important;
                        }
                        
                        .navigation-bar .navigation-bar__body {
                            flex-direction: row !important;
                            width: 100% !important;
                            background: none !important;
                            box-shadow: none !important;
                            backdrop-filter: none !important;
                            -webkit-backdrop-filter: none !important;
                        }

                        .navigation-bar:after,
                        .navigation-bar:before,
                        .navigation-bar .navigation-bar__body:after,
                        .navigation-bar .navigation-bar__body:before {
                            display: none !important;
                        }

                        .navigation-bar__item {
                            background-color: rgba(0,0,0,0.5) !important;
                            backdrop-filter: blur(10px) !important;
                            -webkit-backdrop-filter: blur(10px) !important;
                            border-radius: 1em !important;
                            margin: 0 0.3em !important;
                        }
                    }
                </style>
            `;
            $('head').append(style);
        }
    }

    // Обновляем стили при изменении настройки
    Lampa.Storage.listener.follow('change', function(event) {
        if (event.name === 'centered_landscape_nav') {
            updateNavigationStyles();
        }
    });

    // Применяем стили при загрузке
    updateNavigationStyles();

}();
