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

    // Функция для поиска навигационного элемента
    function findNavigationElement() {
        debug('Searching for navigation element...');
        
        // Пробуем разные селекторы
        const selectors = [
            '.navigation',
            '[class*="navigation"]',
            '[class*="nav"]',
            '#navigation',
            'nav'
        ];

        for (let selector of selectors) {
            const element = document.querySelector(selector);
            if (element) {
                debug('Found navigation element with selector:', selector);
                debug('Element classes:', element.className);
                debug('Element HTML:', element.outerHTML);
                return element;
            }
        }

        // Поиск по всем элементам с похожими классами
        debug('Searching all elements with navigation-related classes...');
        const allElements = document.getElementsByTagName('*');
        const navigationElements = Array.from(allElements).filter(el => 
            el.className && typeof el.className === 'string' && 
            (el.className.includes('nav') || el.className.includes('menu'))
        );

        if (navigationElements.length > 0) {
            debug('Found potential navigation elements:', 
                navigationElements.map(el => ({
                    className: el.className,
                    id: el.id,
                    tagName: el.tagName
                }))
            );
        } else {
            debug('No navigation elements found in DOM');
        }

        return null;
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
            
            // Расширяем селекторы для поиска навигации
            const navigationSelectors = `
                .navigation,
                [class*="navigation"],
                .nav-panel,
                .menu-panel,
                nav
            `;
            
            // Базовые стили для обоих режимов
            const baseStyles = `
                ${navigationSelectors} {
                    position: fixed !important;
                    background: rgba(0,0,0,0.7) !important;
                    backdrop-filter: blur(10px) !important;
                    -webkit-backdrop-filter: blur(10px) !important;
                    z-index: 999 !important;
                    transition: all 0.3s ease !important;
                }
                ${navigationSelectors} a,
                ${navigationSelectors} .navigation__link {
                    padding: 8px !important;
                }
                ${navigationSelectors} a.active,
                ${navigationSelectors} .navigation__link.active {
                    background: rgba(255,255,255,0.2) !important;
                    border-radius: 15px !important;
                }
            `;

            // Стили для портретного режима
            const portraitStyles = `
                ${navigationSelectors} {
                    bottom: 20px !important;
                    left: 50% !important;
                    transform: translateX(-50%) !important;
                    width: auto !important;
                    height: auto !important;
                    border-radius: 20px !important;
                    padding: 10px 20px !important;
                }
                ${navigationSelectors} > div,
                ${navigationSelectors} > ul {
                    display: flex !important;
                    flex-direction: row !important;
                    justify-content: center !important;
                }
                ${navigationSelectors} a,
                ${navigationSelectors} .navigation__link {
                    margin: 0 15px !important;
                }
            `;

            // Стили для ландшафтного режима
            const landscapeStyles = `
                ${navigationSelectors} {
                    top: 50% !important;
                    bottom: auto !important;
                    right: 20px !important;
                    left: auto !important;
                    transform: translateY(-50%) !important;
                    width: auto !important;
                    height: auto !important;
                    border-radius: 20px !important;
                    padding: 20px 10px !important;
                }
                ${navigationSelectors} > div,
                ${navigationSelectors} > ul {
                    display: flex !important;
                    flex-direction: column !important;
                    justify-content: center !important;
                    align-items: center !important;
                }
                ${navigationSelectors} a,
                ${navigationSelectors} .navigation__link {
                    margin: 10px 0 !important;
                    width: auto !important;
                }
            `;

            // Принудительно сбрасываем все возможные стили позиционирования
            const resetStyles = `
                ${navigationSelectors} {
                    max-width: none !important;
                    min-width: 0 !important;
                }
            `;

            const finalStyles = resetStyles + baseStyles + (orientation === 'portrait' ? portraitStyles : landscapeStyles);
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

            // Поиск и обновление навигации
            const navigation = findNavigationElement();
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
        // Ждем немного, чтобы DOM полностью загрузился
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
            // Добавляем небольшую задержку для стабильности
            setTimeout(setNavbarStyle, 100);
        }
    });

    debug('Plugin initialization completed');
}();
