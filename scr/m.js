!function() {
    'use strict';

    // Добавляем настройку для мобильного режима
    Lampa.SettingsApi.addParam({
        component: 'interface',
        param: {
            name: 'force_mobile_mode',
            type: 'trigger',
            default: false
        },
        field: {
            name: 'Принудительный мобильный режим',
            description: 'Включает мобильный режим интерфейса в ландшафтной ориентации'
        }
    });

    function updateMobileMode() {
        // Проверяем ориентацию экрана
        const isLandscape = window.innerWidth > window.innerHeight;
        
        // Проверяем настройку
        const forceMobileMode = Lampa.Storage.get('force_mobile_mode');

        // Добавляем или удаляем классы для мобильного режима
        if (forceMobileMode && isLandscape) {
            $('body').addClass('true--mobile');
            $('body').addClass('orientation--landscape');
        } else {
            if (!Lampa.Platform.is('mobile')) {
                $('body').removeClass('true--mobile');
                $('body').removeClass('orientation--landscape');
            }
        }

        // Даем время на применение стилей
        setTimeout(() => {
            // Пересчитываем все скроллы
            $('.scroll').each(function() {
                const scroll = $(this).data('scroll');
                if (scroll) {
                    scroll.destroy();
                    scroll.reset();
                    scroll.update();
                }
            });

            // Обновляем маски скроллов
            $('.scroll--mask').each(function() {
                const scroll = $(this).data('scroll');
                if (scroll) {
                    scroll.destroy();
                    scroll.updateSize();
                }
            });

            // Принудительно обновляем текущий активный скролл
            if (Lampa.Activity.active()) {
                const activity = Lampa.Activity.active().activity;
                if (activity.scroll) {
                    activity.scroll.destroy();
                    activity.scroll.reset();
                    activity.scroll.update();
                }
            }
        }, 100);
    }

    // Простая реализация debounce
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Обновляем режим при изменении настройки
    Lampa.Storage.listener.follow('change', function(event) {
        if (event.name == 'force_mobile_mode') {
            updateMobileMode();
        }
    });

    // Обновляем режим при изменении размера окна
    $(window).on('resize', debounce(updateMobileMode, 200));

    // Ждем полной инициализации приложения
    Lampa.Listener.follow('app', function(e) {
        if (e.type == 'ready') {
            // Инициализация при старте
            updateMobileMode();
        }
    });
}();
