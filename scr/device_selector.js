!function() {
    "use strict";
    
    // Add settings option
    Lampa.SettingsApi.addParam({
        component: "interface",
        param: {
            name: "iphone_interface",
            type: "select",
            values: {
                1: "iPhone Pro Max",
                0: "Стандартный"
            },
            default: "1"
        },
        field: {
            name: "Стиль навигации",
            description: "Использовать стиль навигации от iPhone Pro Max"
        }
    });

    // Plugin initialization flag
    if (!window.iphone_interface_plugin) {
        window.iphone_interface_plugin = true;

        // Add iPhone Pro Max styles
        const styles = `
            .navigation-bar {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                height: 84px;
                background: rgba(0, 0, 0, 0.85);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                z-index: 999;
            }

            .navigation-bar__content {
                display: flex;
                justify-content: space-around;
                align-items: center;
                height: 100%;
                padding: 0 20px;
                max-width: 500px;
                margin: 0 auto;
            }

            .navigation-bar__item {
                display: flex;
                flex-direction: column;
                align-items: center;
                color: rgba(255, 255, 255, 0.5);
                text-decoration: none;
                transition: color 0.3s ease;
            }

            .navigation-bar__item.active {
                color: #fff;
            }

            .navigation-bar__icon {
                font-size: 24px;
                margin-bottom: 4px;
            }

            .navigation-bar__text {
                font-size: 12px;
                font-weight: 500;
            }

            .page {
                padding-bottom: 84px !important;
            }
        `;

        // Add styles to document
        const styleElement = document.createElement('style');
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);

        // Create navigation bar
        function createNavigationBar() {
            const nav = document.createElement('div');
            nav.className = 'navigation-bar';
            nav.innerHTML = `
                <div class="navigation-bar__content">
                    <a href="#" class="navigation-bar__item" data-action="main">
                        <div class="navigation-bar__icon">🏠</div>
                        <div class="navigation-bar__text">Главная</div>
                    </a>
                    <a href="#" class="navigation-bar__item" data-action="search">
                        <div class="navigation-bar__icon">🔍</div>
                        <div class="navigation-bar__text">Поиск</div>
                    </a>
                    <a href="#" class="navigation-bar__item" data-action="favorites">
                        <div class="navigation-bar__icon">⭐</div>
                        <div class="navigation-bar__text">Избранное</div>
                    </a>
                    <a href="#" class="navigation-bar__item" data-action="settings">
                        <div class="navigation-bar__icon">⚙️</div>
                        <div class="navigation-bar__text">Настройки</div>
                    </a>
                </div>
            `;

            // Handle navigation clicks
            nav.addEventListener('click', function(e) {
                const item = e.target.closest('.navigation-bar__item');
                if (item) {
                    e.preventDefault();
                    const action = item.dataset.action;
                    
                    // Remove active class from all items
                    nav.querySelectorAll('.navigation-bar__item').forEach(i => i.classList.remove('active'));
                    
                    // Add active class to clicked item
                    item.classList.add('active');

                    // Handle navigation actions
                    switch(action) {
                        case 'main':
                            Lampa.Activity.push({component: 'main'});
                            break;
                        case 'search':
                            Lampa.Activity.push({component: 'search'});
                            break;
                        case 'favorites':
                            Lampa.Activity.push({component: 'favorites'});
                            break;
                        case 'settings':
                            Lampa.Activity.push({component: 'settings'});
                            break;
                    }
                }
            });

            return nav;
        }

        // Add navigation bar to the page
        Lampa.Listener.follow('app', function(e) {
            if (e.type == 'ready' && Lampa.Storage.get('iphone_interface') == '1') {
                const nav = createNavigationBar();
                document.body.appendChild(nav);

                // Update active state based on current activity
                Lampa.Listener.follow('activity', function(e) {
                    if (e.component) {
                        const items = document.querySelectorAll('.navigation-bar__item');
                        items.forEach(item => {
                            if (item.dataset.action === e.component) {
                                item.classList.add('active');
                            } else {
                                item.classList.remove('active');
                            }
                        });
                    }
                });
            }
        });
    }
}();
