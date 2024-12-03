!function() {
    "use strict";
    
    function debug(msg, data) {
        console.log('NavbarPlugin Debug:', msg, data || '');
    }

    debug('Plugin initialization started');
    
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
        const orientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
        debug('Current orientation:', orientation);
        debug('Window dimensions:', { width: window.innerWidth, height: window.innerHeight });
        return orientation;
    }

    // Основная функция для изменения стиля навигационной панели
    function setNavbarStyle() {
        debug('Setting navbar style');
        const currentPosition = Lampa.Storage.get("navbar_position");
        debug('Current navbar position setting:', currentPosition);

        if (currentPosition === "iphone") {
            const orientation = getOrientation();
            debug('Applying styles for orientation:', orientation);

            const style = document.createElement('style');
            
            // Базовые стили
            const baseStyles = `
                .navigation {
                    position: fixed !important;
                    background: rgba(0,0,0,0.8) !important;
                    backdrop-filter: blur(20px) !important;
                    -webkit-backdrop-filter: blur(20px) !important;
                    z-index: 999 !important;
                    transition: all 0.3s ease !important;
                    border: 1px solid rgba(255,255,255,0.1) !important;
                }
                .navigation__body {
                    padding: 0 !important;
                }
                .navigation__split {
                    padding: 0.3em !important;
                }
                .navigation__link {
                    padding: 0.7em !important;
                    margin: 0.2em !important;
                    border-radius: 0.8em !important;
                }
                .navigation__link.active {
                    background: rgba(255,255,255,0.2) !important;
                }
                .navigation__link > svg {
                    width: 1.4em !important;
                    height: 1.4em !important;
                }
            `;

            // Стили для портретного режима
            const portraitStyles = `
                body.orientation--portrait .navigation {
                    bottom: 1em !important;
                    left: 50% !important;
                    transform: translateX(-50%) !important;
                    width: auto !important;
                    border-radius: 2em !important;
                    padding: 0.3em 1em !important;
                }
                body.orientation--portrait .navigation__body {
                    display: flex !important;
                    flex-direction: row !important;
                    justify-content: center !important;
                    gap: 0.5em !important;
                }
            `;

            // Стили для ландшафтного режима
            const landscapeStyles = `
                html body.orientation--landscape .navigation {
                    position: fixed !important;
                    top: 50% !important;
                    bottom: auto !important;
                    right: 1em !important;
                    left: auto !important;
                    transform: translateY(-50%) !important;
                    border-radius: 2em !important;
                    padding: 0.5em 0.3em !important;
                    width: auto !important;
                    min-height: auto !important;
                }
                html body.orientation--landscape .navigation__body {
                    display: flex !important;
                    flex-direction: column !important;
                    justify-content: center !important;
                    gap: 0.5em !important;
                    width: auto !important;
                }
            `;

            style.textContent = baseStyles + portraitStyles + landscapeStyles;
            
            // Удаляем старые стили
            const oldStyle = document.getElementById('navbar-iphone-style');
            if (oldStyle) {
                debug('Removing old styles');
                oldStyle.remove();
            }
            
            // Добавляем новые стили
            style.id = 'navbar-iphone-style';
            document.head.appendChild(style);
            debug('New styles added');

            // Принудительно обновляем DOM
            const navigation = document.querySelector('.navigation');
            if (navigation) {
                debug('Navigation element found, forcing refresh');
                navigation.style.display = 'none';
                setTimeout(() => {
                    navigation.style.display = '';
                    debug('Navigation display restored');
                }, 50);
            }
        } else {
            debug('Using default style');
            const oldStyle = document.getElementById('navbar-iphone-style');
            if (oldStyle) {
                debug('Removing custom styles');
                oldStyle.remove();
            }
        }
    }

    // Слушаем изменения в настройках
    Lampa.Settings.listener.follow('open', function (e) {
        debug('Settings opened:', e.name);
        if (e.name == 'interface') {
            setNavbarStyle();
        }
    });

    // Инициализация плагина
    function initPlugin() {
        debug('Initializing plugin...');
        setTimeout(() => {
            setNavbarStyle();
            debug('Initial styles applied');
        }, 1000);
    }

    if (window.appready) {
        debug('App is ready, initializing immediately');
        initPlugin();
    } else {
        debug('Waiting for app ready event');
        Lampa.Listener.follow('app', function(e) {
            debug('App event received:', e.type);
            if (e.type == 'ready') {
                initPlugin();
            }
        });
    }

    // Отслеживаем изменение ориентации экрана
    window.addEventListener('resize', function() {
        debug('Window resized');
        if (Lampa.Storage.get("navbar_position") === "iphone") {
            setTimeout(setNavbarStyle, 100);
        }
    });

    debug('Plugin initialization completed');
}();
