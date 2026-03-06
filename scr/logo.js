!function() {
    "use strict";
    
    Lampa.SettingsApi.addParam({
        component: "interface",
        param: { name: "logo_glav", type: "trigger", default: true },
        field: { name: "Логотипы вместо названий", description: "Отображает логотипы фильмов вместо текста" }
    });

    Lampa.SettingsApi.addParam({
        component: "interface",
        param: { name: "logo_translations", type: "trigger", default: true },
        field: { name: "Переводы названий", description: "Показывать названия на разных языках под названием или логотипом." }
    });

    Lampa.SettingsApi.addParam({
        component: "interface",
        param: { name: "logo_missing_desc", type: "trigger", default: true },
        field: { name: "Замена отсутствующего описания", description: "Заменять отсутствующее описание на описание на другом языке" }
    });

    Lampa.SettingsApi.addParam({
        component: "interface",
        param: { name: "logo_high_quality", type: "trigger", default: true },
        field: { name: "Высокое качество изображений", description: "Всегда использовать высокое качество изображений, даже на мобильных устройствах" }
    });

    Lampa.SettingsApi.addParam({
        component: "interface",
        param: { name: "logo_common_style", type: "trigger", default: true },
        field: { name: "Стили", description: "Применять стили для адаптивного отображения, на телевизоре лучше отключить" }
    });

    if (!window.logoplugin) {
        window.logoplugin = true;

        if (!$('#logo-order-style').length && Lampa.Storage.get('logo_translations')) {
            $('head').append(`
                <style id="logo-order-style">
                    @media screen and (orientation: portrait) {
                        .full-start-new__right { display: flex !important; flex-direction: column !important; }
                        .full-start-new__title { order: 1 !important; }
                        .title-translations { order: 2 !important; }
                        .full-start-new__head { order: 3 !important; }
                        .full-start-new__rate-line { order: 4 !important; }
                        .full-start-new__details { order: 5 !important; }
                        .full-start-new__reactions { order: 6 !important; }
                        .full-start-new__buttons { order: 7 !important; }
                    }
                </style>
            `);
        }

        if (!$('#logo-glav-style').length && Lampa.Storage.get('logo_glav')) {
            $('head').append(`
                <style id="logo-glav-style">
                    @media screen and (orientation: portrait) {
                        .full-start-new__title img {
                            padding-top: 5px !important;
                            max-height: fit-content !important;
                            max-width: 60% !important;
                        }
                    }
                </style>
            `);
        }

        if (!$('#logo-common-style').length && Lampa.Storage.field('logo_common_style')) {
            $('head').append(`
                <style id="logo-common-style">
                    @media screen and (orientation: portrait) {
                        .full-start-new__head, .full-start-new__title, .full-start-new__tagline,
                        .title-translations, .full-start-new__rate-line, .full-start-new__details,
                        .full-start-new__reactions, .full-start-new__buttons {
                            margin: 5px 0 !important;
                            -webkit-text-stroke: 0px #000000 !important;
                            text-align: center !important;
                            justify-content: center !important;
                        }
                    }
                    @media screen and (orientation: landscape) {
                        .full-start-new__head, .full-start-new__title, .full-start-new__tagline,
                        .title-translations, .full-start-new__rate-line, .full-start-new__details,
                        .full-start-new__reactions, .full-start-new__buttons {
                            margin: 5px 0 0 0 !important;
                            -webkit-text-stroke: 0.1px #000000 !important;
                            text-align: left !important;
                            justify-content: left !important;
                        }
                        .full-start-new__right {
                            display: flex !important;
                            flex-direction: column !important;
                            justify-content: space-between !important;
                            align-items: flex-start !important;
                            align-self: flex-start !important;
                            height: 25.5em !important;
                        }
                    }
                </style>
            `);
        }

        if (!$('#logo-ios-fix').length && Lampa.Storage.field('logo_high_quality')) {
            $('head').append(`
                <style id="logo-ios-fix">
                    @media screen and (orientation: portrait) {
                        .full-bg::after {
                            content: '';
                            position: absolute;
                            top: 40%; left: 0; right: 0; bottom: 0;
                            background: linear-gradient(to bottom, transparent 0%, #000000 40%, #000000 100%) !important;
                            z-index: 1;
                            pointer-events: none;
                        }
                        .full-bg img, .full-start-new__head img {
                            image-rendering: high-quality !important;
                            -webkit-transform: translateZ(0);
                        }
                    }
                </style>
            `);
        }

        var originalImageFunction = Lampa.TMDB.image;

        Lampa.TMDB.image = function(url) {
            if (Lampa.Storage.field('logo_high_quality') && url) {
                if (url.includes('t/p/w200')) {
                    url = url.replace('t/p/w200', 't/p/w500');
                } else if (url.includes('t/p/w300') || url.includes('t/p/w342')) {
                    url = url.replace(/t\/p\/w(300|342)/, 't/p/w500');
                } else if (url.includes('t/p/w500')) {
                    url = url.replace('t/p/w500', 't/p/w780'); 
                }
            }
            return originalImageFunction(url);
        };

        Lampa.Listener.follow("full", function(e) {
            if (e.type == "complite") {
                var movie = e.data.movie;
                
                async function tryGetLogo(lang) {
                    var url = Lampa.TMDB.api((movie.name ? "tv" : "movie") + "/" + movie.id + "/images?api_key=" + Lampa.TMDB.key() + (lang ? "&language=" + lang : ""));
                    try {
                        const resp = await $.get(url);
                        if (resp.logos && resp.logos[0]) {
                            return resp.logos[0].file_path;
                        }
                    } catch (e) {}
                    return null;
                }

                async function getTitle(lang) {
                    try {
                        const url = Lampa.TMDB.api((movie.name ? "tv" : "movie") + "/" + movie.id + "?api_key=" + Lampa.TMDB.key() + "&language=" + lang);
                        const resp = await $.get(url);
                        return resp.title || resp.name;
                    } catch (e) { return null; }
                }

                async function getDescription(lang) {
                    try {
                        const url = Lampa.TMDB.api((movie.name ? "tv" : "movie") + "/" + movie.id + "?api_key=" + Lampa.TMDB.key() + "&language=" + lang);
                        const resp = await $.get(url);
                        if (resp.overview) return resp.overview;
                        
                        if (Lampa.Storage.get('logo_missing_desc', true) && lang !== 'en') {
                            const url_en = Lampa.TMDB.api((movie.name ? "tv" : "movie") + "/" + movie.id + "?api_key=" + Lampa.TMDB.key() + "&language=en");
                            const resp_en = await $.get(url_en);
                            if (resp_en.overview) return resp_en.overview;
                        }
                        return null;
                    } catch (e) { return null; }
                }

                async function findLogo() {
                    const ruTitle = await getTitle("ru");
                    const enTitle = await getTitle("en");
                    const origTitle = movie.original_title || movie.original_name;

                    let path = null;
                    let logoLang = null;

                    if (Lampa.Storage.get("logo_glav")) {
                        path = await tryGetLogo(Lampa.Storage.get("language"));
                        logoLang = Lampa.Storage.get("language");
                        
                        if (!path) {
                            path = await tryGetLogo("en");
                            if (path) logoLang = "en";
                        }
                        if (!path) {
                            path = await tryGetLogo("");
                            if (path) logoLang = "orig";
                        }
                    }

                    if (Lampa.Storage.get("logo_missing_desc")) {
                        const currentDesc = movie.overview;
                        if (!currentDesc || currentDesc.trim() === "") {
                            let newDesc = null;
                            if (Lampa.Storage.get("language") === "ru") {
                                newDesc = await getDescription("en");
                                if (!newDesc) newDesc = await getDescription("");
                            } else {
                                newDesc = await getDescription("ru");
                                if (!newDesc) newDesc = await getDescription("");
                            }
                            
                            if (newDesc) {
                                movie.overview = newDesc;
                                $(".full-start__description").text(newDesc);
                                $(".full-descr__text").text(newDesc);
                            }
                        }
                    }

                    if (Lampa.Storage.get("logo_translations")) {
                        var titlesContainer = $('<div class="title-translations"></div>').css({
                            'font-size': '1.1em',
                            '-webkit-text-stroke': '0.1px #000000',
                            'opacity': '1'
                        });

                        const currentLang = Lampa.Storage.get("language");
                        let displayLang = currentLang;

                        if (Lampa.Storage.get("logo_glav") && path) {
                            displayLang = logoLang;
                        } else {
                            const currentTitle = movie.title || movie.name;
                            if (currentTitle === ruTitle) displayLang = 'ru';
                            else if (currentTitle === enTitle) displayLang = 'en';
                            else displayLang = 'orig';
                        }

                        let translations = [];

                        if (displayLang === currentLang) {
                            if (enTitle && enTitle !== (currentLang === 'ru' ? ruTitle : enTitle)) {
                                translations.push(`<div style="margin-bottom: 0.3em;">🇬🇧 ${enTitle}</div>`);
                            }
                            if (origTitle && origTitle !== enTitle && origTitle !== (currentLang === 'ru' ? ruTitle : enTitle)) {
                                translations.push(`<div style="margin-bottom: 0.3em;">🌐 ${origTitle}</div>`);
                            }
                        } else if (displayLang === 'en') {
                            if (currentLang === 'ru' && ruTitle && ruTitle !== enTitle) {
                                translations.push(`<div style="margin-bottom: 0.3em;">🇷🇺 ${ruTitle}</div>`);
                            }
                            if (origTitle && origTitle !== enTitle && origTitle !== (currentLang === 'ru' ? ruTitle : enTitle)) {
                                translations.push(`<div style="margin-bottom: 0.3em;">🌐 ${origTitle}</div>`);
                            }
                        } else {
                            if (currentLang === 'ru' && ruTitle && ruTitle !== origTitle) {
                                translations.push(`<div style="margin-bottom: 0.3em;">🇷🇺 ${ruTitle}</div>`);
                            }
                            if (enTitle && enTitle !== origTitle) {
                                translations.push(`<div style="margin-bottom: 0.3em;">🇬🇧 ${enTitle}</div>`);
                            }
                        }

                        titlesContainer.html(translations.join(''));
                        if (translations.length > 0) {
                            $(".full-start-new__title").after(titlesContainer);
                        }
                    }

                    if (Lampa.Storage.get("logo_glav") && path) {
                        var imgElement = $('<img style="max-height: 2em;" src="' + Lampa.TMDB.image("/t/p/w500" + path.replace(".svg", ".png")) + '" />');
                        imgElement.on('error', function() {
                            $(".full-start-new__title").html(movie.title || movie.name);
                        });
                        $(".full-start-new__title").html(imgElement);
                    }
                }

                findLogo();
            }
        });
    }
}();
