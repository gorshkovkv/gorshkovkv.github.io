!function() {
    'use strict';

    // Создаем уникальный ID для стилей
    var styleId = 'nav-landscape-style';

    // Функция для добавления стилей
    function addStyles() {
        // Проверяем, не добавлены ли уже стили
        if (!$('#' + styleId).length) {
            var style = `
                <style id="${styleId}">
                    body.true--mobile.orientation--landscape .navigation-bar {
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 50%;
                        padding: 1.5em;
                    }
                    body.true--mobile.orientation--landscape .navigation-bar .navigation-bar__body {
                        flex-direction: row;
                        justify-content: space-between;
                        width: 100%;
                    }
                    body.true--mobile.orientation--landscape .navigation-bar__item {
                        flex: 1;
                        text-align: center;
                        margin: 0 0.5em;
                    }
                </style>
            `;
            $('head').append(style);
        }
    }

    // Функция для удаления стилей
    function removeStyles() {
        $('#' + styleId).remove();
    }

    // Добавляем настройку для включения/выключения модификации
    Lampa.SettingsApi.addParam({
        component: 'interface',
        param: {
            name: 'nav_landscape_mode',
            type: 'trigger',
            default: false
        },
        field: {
            name: 'Навигация по центру в ландшафте',
            description: 'Отображает навигационную панель по центру экрана в ландшафтном режиме'
        }
    });

    // Следим за изменением настройки
    Lampa.Storage.listener.follow('change', function(event) {
        if (event.name == 'nav_landscape_mode') {
            if (Lampa.Storage.get('nav_landscape_mode')) {
                addStyles();
            } else {
                removeStyles();
            }
        }
    });

    // Инициализация при запуске
    if (Lampa.Storage.get('nav_landscape_mode')) {
        addStyles();
    }
}();
