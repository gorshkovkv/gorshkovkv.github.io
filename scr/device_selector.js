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
            
            // Базовые стили для обоих режимов
            const baseStyles = `
                .navigation-bar {
                    position: fixed !important;
                    z-index: 11 !important;
                    right: 0 !important;
                    background: rgba(0,0,0,0.85) !important;
                    backdrop-filter: blur(20px) !important;
                    -webkit-backdrop-filter: blur(20px) !important;
                    width: 4em !important;
                    display: flex !important;
                    flex-direction: column !important;
                }
                .navigation-bar__content {
                    display: flex !important;
                    flex-direction: column !important;
                    justify-content: flex-start !important;
                    align-items: center !important;
                    padding: 1em 0 !important;
                    gap: 1.5em !important;
                }
                .navigation-bar__item {
                    padding: 0.5em !important;
                    display: flex !important;
                    flex-direction: column !important;
                    align-items: center !important;
                    justify-content: center !important;
                    width: 100% !important;
                    color: rgba(255,255,255,0.6) !important;
                }
                .navigation-bar__item.active {
                    color: #fff !important;
                }
                .navigation-bar__icon {
                    font-size: 1.5em !important;
                    margin-bottom: 0.3em !important;
                }
                .navigation-bar__text {
                    font-size: 0.8em !important;
                    text-align: center !important;
                }
            `;

            // Стили для портретного режима
            const portraitStyles = `
                .navigation-bar {
                    top: 0 !important;
                    bottom: 0 !important;
                    height: 100% !important;
                }
            `;

            // Стили для ландшафтного режима
            const landscapeStyles = `
                .navigation-bar {
                    top: 50% !important;
                    transform: translateY(-50%) !important;
                    height: auto !important;
                    min-height: 400px !important;
                }
            `;

            const finalStyles = baseStyles + (orientation === 'portrait' ? portraitStyles : landscapeStyles);
            debug('Applied styles type:', orientation === 'portrait' ? 'portrait' : 'landscape');
            
            style.textContent = finalStyles;
            
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
            const navigation = document.querySelector('.navigation-bar');
            if (navigation) {
                debug('Navigation element found, forcing refresh');
                debug('Navigation current styles:', {
                    display: navigation.style.display,
                    position: window.getComputedStyle(navigation).position,
                    top: window.getComputedStyle(navigation).top,
                    right: window.getComputedStyle(navigation).right,
                    bottom: window.getComputedStyle(navigation).bottom,
                    left: window.getComputedStyle(navigation).left,
                    transform: window.getComputedStyle(navigation).transform
                });

                navigation.style.display = 'none';
                setTimeout(() => {
                    navigation.style.display = '';
                    debug('Navigation display restored');
                    debug('Navigation updated styles:', {
                        display: navigation.style.display,
                        position: window.getComputedStyle(navigation).position,
                        top: window.getComputedStyle(navigation).top,
                        right: window.getComputedStyle(navigation).right,
                        bottom: window.getComputedStyle(navigation).bottom,
                        left: window.getComputedStyle(navigation).left,
                        transform: window.getComputedStyle(navigation).transform
                    });
                }, 50);
            } else {
                debug('Navigation element not found!');
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
    if (window.appready) {
        debug('App is ready, initializing immediately');
        setNavbarStyle();
    } else {
        debug('Waiting for app ready event');
        Lampa.Listener.follow('app', function(e) {
            debug('App event received:', e.type);
            if (e.type == 'ready') {
                setNavbarStyle();
            }
        });
    }

    // Отслеживаем изменение ориентации экрана
    window.addEventListener('resize', function() {
        debug('Window resized');
        if (Lampa.Storage.get("navbar_position") === "iphone") {
            setNavbarStyle();
        }
    });

    debug('Plugin initialization completed');
}();
