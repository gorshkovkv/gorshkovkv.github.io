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
        const styleElement = document.getElementById('nav-landscape-style');
        if (!styleElement) {
            document.head.insertAdjacentHTML('beforeend', `
                <style id="nav-landscape-style">
                    @media screen and (orientation: landscape) {
                        .navigation-bar {
                            left: 30% !important;
                            right: 30% !important;
                            top: auto !important;
                            bottom: 2em !important;
                            padding: 0 !important;
                            transition: opacity 0.3s ease-in-out !important;
                        }
                        
                        .navigation-bar .navigation-bar__body {
                            flex-direction: row !important;
                            width: 100% !important;
                            backdrop-filter: none !important;
                            -webkit-backdrop-filter: none !important;
                        }

                        .navigation-bar.hide-nav {
                            opacity: 0 !important;
                            pointer-events: none !important;
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
                    }
                </style>
            `);
        }

        let hideTimeout;
        const navBar = document.querySelector('.navigation-bar');

        function showNavigation() {
            if (navBar) {
                navBar.classList.remove('hide-nav');
                clearTimeout(hideTimeout);
                hideTimeout = setTimeout(() => {
                    navBar.classList.add('hide-nav');
                }, 3000);
            }
        }

        // Показываем панель при движении мыши или касании
        document.addEventListener('mousemove', showNavigation);
        document.addEventListener('touchstart', showNavigation);
        
        // Инициируем таймер при загрузке
        showNavigation();
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
