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
            description: "Включить мобильный режим интерфейса (работает только в ландшафтной ориентации)"
        }
    });

    function checkMobileMode() {
        // Проверяем ориентацию экрана
        var isLandscape = window.innerWidth > window.innerHeight;
        
        // Получаем текущее состояние настройки
        var forceMobileMode = Lampa.Storage.field('force_mobile_mode');
        
        // Удаляем предыдущие классы мобильного режима
        document.body.classList.remove('true--mobile');
        
        // Если включен принудительный мобильный режим и ориентация ландшафтная
        if (forceMobileMode && isLandscape) {
            document.body.classList.add('true--mobile');
            
            // Добавляем класс ориентации
            document.body.classList.remove('orientation--portrait');
            document.body.classList.add('orientation--landscape');
        }
    }

    // Слушаем изменение размера окна для обновления режима
    window.addEventListener('resize', checkMobileMode);

    // Слушаем изменение настройки
    Lampa.Storage.listener.follow('change', function(event) {
        if (event.name == 'force_mobile_mode') {
            checkMobileMode();
        }
    });

    // Инициализация при загрузке
    checkMobileMode();
}();
