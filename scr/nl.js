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
                            transition: opacity 0.3s ease !important;
                        }
                        
                        .navigation-bar .navigation-bar__body {
                            flex-direction: row !important;
                            width: 100% !important;
                            backdrop-filter: none !important;
                            -webkit-backdrop-filter: none !important;
                        }

                        .layer--width {
                            min-height: 90vh !important;
                        }

                        .layer--wheight {
                            min-height: 90vh !important;
                        }

                        .scroll--mask {
                            min-height: 90vh !important;
                        }

                        .navigation-bar--hidden {
                            opacity: 0 !important;
                            pointer-events: none !important;
                        }
                    }
                </style>
            `);
        }

        let timeout;
        const navBar = document.querySelector('.navigation-bar');
        
        function showNavBar() {
            if (navBar) {
                navBar.classList.remove('navigation-bar--hidden');
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    navBar.classList.add('navigation-bar--hidden');
                }, 3000);
            }
        }

        // Показываем панель при движении мыши или касании
        document.addEventListener('mousemove', showNavBar);
        document.addEventListener('touchstart', showNavBar);
        document.addEventListener('touchmove', showNavBar);

        // Инициализация: скрыть панель через 3 секунды после загрузки
        showNavBar();
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
