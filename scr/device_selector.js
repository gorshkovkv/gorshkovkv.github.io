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
            @media screen and (orientation: portrait) {
                .navigation-bar {
                    position: fixed;
                    top: 50%;
                    right: 0;
                    transform: translateY(-50%);
                    width: 60px;
                    height: auto;
                    background: rgba(0, 0, 0, 0.85);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border-radius: 16px 0 0 16px;
                    border-left: 1px solid rgba(255, 255, 255, 0.1);
                    z-index: 999;
                    padding: 15px 0;
                }

                .navigation-bar__content {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 20px;
                    height: 100%;
                    padding: 0;
                }
            }

            @media screen and (orientation: landscape) {
                .navigation-bar {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 60px;
                    background: rgba(0, 0, 0, 0.85);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    z-index: 999;
                }

                .navigation-bar__content {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 40px;
                    height: 100%;
                    padding: 0 20px;
                }
            }

            .navigation-bar__item {
                display: flex;
                flex-direction: column;
                align-items: center;
                color: rgba(255, 255, 255, 0.5);
                text-decoration: none;
                transition: all 0.3s ease;
                padding: 5px;
                border-radius: 12px;
            }

            .navigation-bar__item.active {
                color: #fff;
                background: rgba(255, 255, 255, 0.1);
            }

            .navigation-bar__icon {
                font-size: 20px;
                margin-bottom: 2px;
            }

            .navigation-bar__text {
                font-size: 10px;
                font-weight: 500;
            }

            @media screen and (orientation: portrait) {
                .page {
                    padding-right: 60px !important;
                }
            }

            @media screen and (orientation: landscape) {
                .page {
                    padding-bottom: 60px !important;
                }
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
                        <div class="navigation-bar__text">Избр</div>
                    </a>
                    <a href="#" class="navigation-bar__item" data-action="settings">
                        <div class="navigation-bar__icon">⚙️</div>
                        <div class="navigation-bar__text">Настр</div>
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
