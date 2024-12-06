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
            
            // Пересчитываем все скроллы
            $('.scroll').each(function() {
                const scroll = $(this).data('scroll');
                if (scroll) {
                    scroll.reset();
                    scroll.update();
                }
            });

            // Обновляем маски скроллов
            $('.scroll--mask').each(function() {
                const scroll = $(this).data('scroll');
                if (scroll) {
                    scroll.updateSize();
                }
            });
        } else {
            if (!Lampa.Platform.is('mobile')) {
                $('body').removeClass('true--mobile');
                $('body').removeClass('orientation--landscape');
                
                // Пересчитываем все скроллы
                $('.scroll').each(function() {
                    const scroll = $(this).data('scroll');
                    if (scroll) {
                        scroll.reset();
                        scroll.update();
                    }
                });
            }
        }
    }

    // Обновляем режим при изменении настройки
    Lampa.Storage.listener.follow('change', function(event) {
        if (event.name == 'force_mobile_mode') {
            updateMobileMode();
        }
    });

    // Обновляем режим при изменении размера окна
    $(window).on('resize', _.debounce(updateMobileMode, 200));

    // Инициализация при старте
    updateMobileMode();
}();
