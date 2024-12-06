!function() {
    "use strict";
    
    // Добавляем настройку для мобильного режима
    Lampa.SettingsApi.addParam({
        component: "interface",
        param: {
            name: "force_mobile_mode",
            type: "trigger",
            default: false
        },
        field: {
            name: "Мобильный режим",
            description: "Принудительно включает мобильный режим в ландшафтной ориентации"
        }
    });

    function checkMobileMode() {
        // Проверяем ориентацию экрана
        const isLandscape = window.matchMedia("(orientation: landscape)").matches;
        
        // Проверяем настройку мобильного режима
        const forceMobileMode = Lampa.Storage.field('force_mobile_mode');
        
        // Получаем элемент body
        const body = document.body;
        
        // Если включен принудительный мобильный режим и ориентация ландшафтная
        if (forceMobileMode && isLandscape) {
            body.classList.add('true--mobile');
            body.classList.add('orientation--landscape');
        } else if (forceMobileMode) {
            // Если только мобильный режим без ландшафтной ориентации
            body.classList.add('true--mobile');
            body.classList.remove('orientation--landscape');
        } else {
            // Если мобильный режим выключен, удаляем все классы
            body.classList.remove('true--mobile');
            body.classList.remove('orientation--landscape');
        }

        // Обновляем скроллы
        updateScrolls();
    }

    function updateScrolls() {
        // Находим все элементы с масками скролла
        const scrollMasks = document.querySelectorAll('.scroll--mask');
        const horizontalScrollMasks = document.querySelectorAll('.scroll--horizontal.scroll--mask');
        
        // Обновляем стили в зависимости от ширины экрана
        const isMobileWidth = window.innerWidth <= 400;
        
        scrollMasks.forEach(mask => {
            const content = mask.querySelector('.scroll__content');
            if (content) {
                content.style.padding = isMobileWidth ? '1.5em 0' : '2.5em 0';
            }
        });

        horizontalScrollMasks.forEach(mask => {
            const content = mask.querySelector('.scroll__content');
            if (content) {
                content.style.padding = isMobileWidth ? '0 1.5em' : '0 2.5em';
            }
        });
    }

    // Добавляем стили для корректной работы скроллов
    if (!$('#mobile-mode-style').length) {
        $('head').append(`
            <style id="mobile-mode-style">
                body.true--mobile.orientation--landscape .scroll__content {
                    padding: 1em 0;
                }
                
                body.true--mobile.orientation--landscape .scroll--mask .scroll__content {
                    padding: 1.5em 0;
                }
                
                body.true--mobile.orientation--landscape .scroll--horizontal.scroll--mask .scroll__content {
                    padding: 0 1.5em;
                }
                
                @media screen and (max-width: 400px) {
                    .scroll__content {
                        padding: 1em 0;
                    }
                    
                    .scroll--mask .scroll__content {
                        padding: 1.5em 0;
                    }
                    
                    .scroll--horizontal.scroll--mask .scroll__content {
                        padding: 0 1.5em;
                    }
                }
            </style>
        `);
    }

    // Слушаем изменение ориентации экрана
    window.addEventListener('orientationchange', checkMobileMode);
    
    // Слушаем изменение размера окна
    window.addEventListener('resize', checkMobileMode);
    
    // Слушаем изменение настроек
    Lampa.Storage.listener.follow('change', function(event) {
        if (event.name === 'force_mobile_mode') {
            checkMobileMode();
        }
    });

    // Инициализация при загрузке
    Lampa.Listener.follow('app', function(e) {
        if (e.type === 'ready') {
            checkMobileMode();
        }
    });
}();
