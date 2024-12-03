(function () {
    'use strict';

    // Добавляем настройку в интерфейс
    Lampa.SettingsApi.addParam({
        component: 'interface',
        param: {
            name: 'iphone_interface',
            type: 'toggle',
            default: true
        },
        field: {
            name: 'iPhone Pro Max интерфейс',
            description: 'Всегда использовать интерфейс iPhone Pro Max'
        }
    });

    // Функция для применения стилей iPhone Pro Max
    function applyIPhoneProMaxStyles() {
        // Добавляем CSS стили для имитации интерфейса iPhone Pro Max
        const style = document.createElement('style');
        style.textContent = `
            .navigation {
                padding-bottom: env(safe-area-inset-bottom, 34px);
                background: rgba(0,0,0,0.3);
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
            }
            
            .navigation__body {
                padding-bottom: 0;
                padding-top: 0.5em;
            }
            
            .navigation__split {
                padding: 0.5em 0;
            }
            
            .navigation__button {
                padding: 0.3em 0.5em;
                margin: 0 0.3em;
                border-radius: 12px;
                transition: background-color 0.3s, transform 0.2s;
            }
            
            .navigation__button.active {
                background-color: rgba(255,255,255,0.1);
                transform: scale(1.05);
            }
            
            .navigation__button-icon {
                width: 1.8em;
                height: 1.8em;
            }
        `;
        document.head.appendChild(style);
    }

    // Применяем стили при загрузке
    Lampa.Listener.follow('app', function(e) {
        if (e.type == 'ready') {
            // Проверяем настройку и применяем стили если включено
            if (Lampa.Storage.get('iphone_interface', true)) {
                applyIPhoneProMaxStyles();
            }
        }
    });

})();
