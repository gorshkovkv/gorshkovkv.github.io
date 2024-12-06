!function() {
    "use strict";
    
    // Добавляем настройку для мобильного режима
    Lampa.SettingsApi.addParam({
        component: "interface",
        param: {
            name: "mobile_mode",
            type: "trigger",
            default: false
        },
        field: {
            name: "Мобильный режим",
            description: "Включить мобильный режим интерфейса (только для ландшафтной ориентации)"
        }
    });

    function checkMobileMode() {
        // Проверяем ориентацию экрана
        var isLandscape = window.innerWidth > window.innerHeight;
        
        // Проверяем включена ли настройка
        var mobileEnabled = Lampa.Storage.field('mobile_mode');

        // Добавляем или удаляем класс для мобильного режима
        if (mobileEnabled && isLandscape) {
            $('body').addClass('true--mobile');
        } else {
            $('body').removeClass('true--mobile');
        }
    }

    // Следим за изменением ориентации экрана
    window.addEventListener('resize', checkMobileMode);

    // Следим за изменением настройки
    Lampa.Storage.listener.follow('change', function (event) {
        if (event.name == 'mobile_mode') {
            checkMobileMode();
        }
    });

    // Инициализация при запуске
    setTimeout(checkMobileMode, 1000);
}();
