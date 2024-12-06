!function() {
    'use strict';

    // Добавляем настройку для центрирования навигации
    Lampa.SettingsApi.addParam({
        component: 'interface',
        param: {
            name: 'nav_landscape_center',
            type: 'trigger',
            default: true
        },
        field: {
            name: 'Центрирование навигации',
            description: 'Центрирует навигационную панель в ландшафтном режиме'
        }
    });

    function updateNavStyles() {
        // Удаляем старые стили, если они есть
        $('#nav-landscape-style').remove();

        // Добавляем новые стили, если опция включена
        if (Lampa.Storage.get('nav_landscape_center')) {
            var style = `
                <style id="nav-landscape-style">
                    body.true--mobile.orientation--landscape .navigation-bar {
                        left: 50% !important;
                        transform: translateX(-50%) !important;
                        width: 50% !important;
                        padding: 1.5em !important;
                    }
                    body.true--mobile.orientation--landscape .navigation-bar .navigation-bar__body {
                        width: 100% !important;
                    }
                </style>
            `;
            $('head').append(style);
        }
    }

    // Обновляем стили при изменении настройки
    Lampa.Storage.listener.follow('change', function(event) {
        if (event.name === 'nav_landscape_center') {
            updateNavStyles();
        }
    });

    // Применяем стили при запуске
    updateNavStyles();

}();
