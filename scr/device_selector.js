!function() {
    "use strict";
    
    // Добавляем настройки для позиции навигационной панели
    Lampa.SettingsApi.addParam({
        component: "interface",
        param: {
            name: "navbar_position",
            type: "select",
            values: {
                "iphone": "iPhone Pro Max Style",
                "default": "Default Style"
            },
            default: "default"
        },
        field: {
            name: "Стиль навигационной панели",
            description: "Выберите стиль отображения навигационной панели"
        }
    });

    // Определяем ориентацию экрана
    function getOrientation() {
        return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
    }

    // Основная функция для изменения стиля навигационной панели
    function setNavbarStyle() {
        if (Lampa.Storage.get("navbar_position") === "iphone") {
            const orientation = getOrientation();
            const style = document.createElement('style');
            
            // Базовые стили для обоих режимов
            const baseStyles = `
                .navigation {
                    position: fixed !important;
                    background: rgba(0,0,0,0.7) !important;
                    backdrop-filter: blur(10px) !important;
                    -webkit-backdrop-filter: blur(10px) !important;
                    z-index: 999 !important;
                }
                .navigation__link {
                    padding: 8px !important;
                }
                .navigation__link.active {
                    background: rgba(255,255,255,0.2) !important;
                    border-radius: 15px !important;
                }
                .navigation__body {
                    display: flex !important;
                    justify-content: center !important;
                }
            `;

            // Стили для портретного режима
            const portraitStyles = `
                .navigation {
                    bottom: 20px !important;
                    left: 50% !important;
                    transform: translateX(-50%) !important;
                    width: auto !important;
                    border-radius: 20px !important;
                    padding: 10px 20px !important;
                }
                .navigation__link {
                    margin: 0 15px !important;
                }
            `;

            // Стили для ландшафтного режима
            const landscapeStyles = `
                .navigation {
                    top: 50% !important;
                    right: 20px !important;
                    transform: translateY(-50%) !important;
                    border-radius: 20px !important;
                    padding: 20px 10px !important;
                }
                .navigation__body {
                    flex-direction: column !important;
                }
                .navigation__link {
                    margin: 10px 0 !important;
                }
            `;

            style.textContent = baseStyles + (orientation === 'portrait' ? portraitStyles : landscapeStyles);
            
            // Удаляем старые стили
            const oldStyle = document.getElementById('navbar-iphone-style');
            if (oldStyle) oldStyle.remove();
            
            // Добавляем новые стили
            style.id = 'navbar-iphone-style';
            document.head.appendChild(style);
        } else {
            // Удаляем стили если выбран дефолтный режим
            const oldStyle = document.getElementById('navbar-iphone-style');
            if (oldStyle) oldStyle.remove();
        }
    }

    // Слушаем изменения в настройках
    Lampa.Settings.listener.follow('open', function (e) {
        if (e.name == 'interface') {
            setNavbarStyle();
        }
    });

    // Применяем стили при запуске
    Lampa.ready(function() {
        setNavbarStyle();
    });

    // Следим за изменениями в навигации и ориентации
    Lampa.Listener.follow('app', function(e) {
        if (e.type == 'ready') {
            setNavbarStyle();
        }
    });

    // Отслеживаем изменение ориентации экрана
    window.addEventListener('resize', function() {
        if (Lampa.Storage.get("navbar_position") === "iphone") {
            setNavbarStyle();
        }
    });
}();
