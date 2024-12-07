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
                            left: 30% !important;
                            right: 30% !important;
                            top: auto !important;
                            bottom: 2em !important;
                            padding: 0 !important;
                        }
                        
                        .navigation-bar .navigation-bar__body {
                            flex-direction: row !important;
                            width: 100% !important;
                            backdrop-filter: none !important;
                            -webkit-backdrop-filter: none !important;
                        }

                        .layer--width {
                            min-height: 95vh !important;
                        }

                        .layer--wheight {
                            min-height: 95vh !important;
                        }

                        .scroll--mask {
                            min-height: 95vh !important;
                        }

                        .scroll__content {
                            min-height: 95vh !important;
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
