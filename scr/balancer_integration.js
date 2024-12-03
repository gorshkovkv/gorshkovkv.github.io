(function () {
    'use strict';

    // Интеграция с основным модулем
    function initBalancerQuality() {
        const originalComponent = Lampa.Component.get('online_mod');

        if (!originalComponent) {
            console.error('online_mod component not found');
            return;
        }

        // Переопределяем оригинальный компонент
        Lampa.Component.add('online_mod', function(object) {
            // Сначала определим лучший балансер
            if (window.BalancerQuality) {
                window.BalancerQuality.getBestBalancer(object).then(bestBalancer => {
                    if (bestBalancer) {
                        // Устанавливаем лучший балансер как активный
                        Lampa.Storage.set('online_mod_balanser', bestBalancer);
                        console.log('Set best balanser:', bestBalancer);
                    }
                    // Вызываем оригинальный компонент
                    originalComponent(object);
                });
            } else {
                // Если модуль качества недоступен, используем оригинальный компонент
                originalComponent(object);
            }
        });
    }

    // Добавляем настройки для автоматического выбора балансера
    function addAutoBalancerSettings() {
        const autoBalancerSettings = {
            component: 'settings_mod',
            name: 'online_mod_auto_balanser',
            default: true
        };

        Lampa.Settings.main().render().find('[data-component="online_mod"]').on('hover:enter', function () {
            const enableAutoBalancer = $('<div class="settings-param selector" data-type="toggle" data-name="online_mod_auto_balanser">\
                <div class="settings-param__name">Автовыбор балансера</div>\
                <div class="settings-param__value"></div>\
                <div class="settings-param__descr">Автоматически выбирать балансер с лучшим качеством</div>\
            </div>');

            Lampa.Settings.main().update();
        });
    }

    // Инициализация при загрузке приложения
    if (window.appready) {
        initBalancerQuality();
        addAutoBalancerSettings();
    } else {
        Lampa.Listener.follow('app', function(e) {
            if (e.type == 'ready') {
                initBalancerQuality();
                addAutoBalancerSettings();
            }
        });
    }
})();
