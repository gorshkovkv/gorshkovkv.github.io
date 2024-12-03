!function() {
    "use strict";
    
    // Добавляем параметр в настройки
    Lampa.SettingsApi.addParam({
        component: "interface",
        param: {
            name: "device_type",
            type: "select",
            values: {
                tv: "TV",
                ipad: "iPad",
                iphone: "iPhone"
            },
            default: "tv"
        },
        field: {
            name: "Тип устройства",
            description: "Выберите тип устройства, на котором запущено приложение"
        },
        onChange: function(value) {
            // Перезагружаем страницу при изменении устройства
            window.location.reload();
        }
    });

    // Функция для применения стилей в зависимости от устройства
    function applyDeviceStyles() {
        var device = Lampa.Storage.get("device_type", "tv");
        var styles = document.createElement('style');
        
        // Определяем ориентацию устройства
        function checkOrientation() {
            if (device === 'ipad') {
                if (window.innerWidth > window.innerHeight) {
                    document.body.classList.add('orientation--landscape');
                } else {
                    document.body.classList.remove('orientation--landscape');
                }
            }
        }

        // Добавляем слушатель изменения ориентации
        window.addEventListener('resize', checkOrientation);
        
        // Устанавливаем начальную ориентацию
        checkOrientation();
        
        var cssRules = {
            tv: `
                .card__view {
                    padding-top: 150%;
                }
                .card--collection {
                    width: 18.3em;
                }
                .card__plus {
                    padding: 0.3em;
                }
            `,
            ipad: `
                .card__view {
                    padding-top: 140%;
                }
                .card--collection {
                    width: 14em;
                }
                .card__plus {
                    padding: 0.4em;
                }
                .menu__item {
                    padding: 1em;
                }
                body.orientation--landscape .navigation-bar {
                    position: fixed;
                    left: 0;
                    top: 0;
                    width: 4.5em;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    padding: 1em 0;
                }
                body.orientation--landscape .navigation-bar__content {
                    flex-direction: column;
                }
                body.true--mobile.orientation--landscape .navigation-bar {
                    bottom: auto;
                }
            `,
            iphone: `
                .card__view {
                    padding-top: 130%;
                }
                .card--collection {
                    width: 12em;
                }
                .card__plus {
                    padding: 0.5em;
                }
                .menu__item {
                    padding: 0.8em;
                }
                .menu__text {
                    font-size: 1.1em;
                }
            `
        };

        styles.textContent = cssRules[device] || cssRules.tv;
        document.head.appendChild(styles);
    }

    // Применяем стили при загрузке
    if (!window.device_plugin) {
        window.device_plugin = true;
        Lampa.Listener.follow('app', function(e) {
            if (e.type == 'ready') {
                applyDeviceStyles();
            }
        });
    }
}();
