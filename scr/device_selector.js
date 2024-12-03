!function() {
    'use strict';

    // Force iPhone Pro Max interface
    function applyIPhoneProMaxStyles() {
        // Set device type to iPhone Pro Max
        Lampa.Storage.set('device_type', 'iphone');
        
        // Set screen dimensions for iPhone Pro Max
        //Lampa.Storage.set('screen_width', 428);
        //Lampa.Storage.set('screen_height', 926);
        
        // Add settings to interface section
        Lampa.SettingsApi.addParam({
            component: 'interface',
            param: {
                name: 'force_iphone_interface',
                type: 'toggle',
                default: true
            },
            field: {
                name: 'Интерфейс iPhone Pro Max',
                description: 'Всегда использовать интерфейс iPhone Pro Max'
            },
            onChange: function(value) {
                if (value) {
                    applyIPhoneProMaxStyles();
                } else {
                    // Reset to default device detection
                    Lampa.Storage.remove('device_type');
                    //Lampa.Storage.remove('screen_width');
                    //Lampa.Storage.remove('screen_height');
                }
                // Reload interface
                location.reload();
            }
        });
    }

    // Apply styles on plugin load if enabled
    if (Lampa.Storage.get('force_iphone_interface', true)) {
        applyIPhoneProMaxStyles();
    }

    // Add plugin to Lampa
    window.plugin_iphone_interface = true;
    Lampa.Plugin.add('iphone_interface', '🔲 iPhone Interface');
}();
