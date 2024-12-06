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
                    // Сначала сбрасываем стили трансформации
                    $(this).find('.scroll__body').addClass('notransition');
                    scroll.reset();
                    
                    // Принудительно вызываем reflow
                    $(this)[0].offsetHeight;
                    
                    // Убираем класс notransition и обновляем скролл
                    $(this).find('.scroll__body').removeClass('notransition');
                    scroll.update();

                    // Если это маскированный скролл, обновляем его размеры
                    if ($(this).hasClass('scroll--mask')) {
                        scroll.updateSize(true);
                    }
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
                        // Сначала сбрасываем стили трансформации
                        $(this).find('.scroll__body').addClass('notransition');
                        scroll.reset();
                        
                        // Принудительно вызываем reflow
                        $(this)[0].offsetHeight;
                        
                        // Убираем класс notransition и обновляем скролл
                        $(this).find('.scroll__body').removeClass('notransition');
                        scroll.update();

                        // Если это маскированный скролл, обновляем его размеры
                        if ($(this).hasClass('scroll--mask')) {
                            scroll.updateSize(true);
                        }
                    }
                });
            }
        }
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

    // Инициализация при старте
    updateMobileMode();
}();
