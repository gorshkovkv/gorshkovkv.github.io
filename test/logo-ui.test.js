const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

function loadPluginUi() {
    const params = [];
    const chain = {
        length: 0,
        append() { return this; },
        after() { return this; },
        css() { return this; },
        find() { return this; },
        html() { return this; },
        on() { return this; },
        text() { return this; }
    };
    const sandbox = {
        window: {},
        $: () => Object.create(chain),
        Lampa: {
            Listener: { follow() {} },
            SettingsApi: { addParam(param) { params.push(param); } },
            Storage: { field() { return false; }, get() { return false; } },
            TMDB: { image(url) { return url; } }
        }
    };

    vm.runInNewContext(
        fs.readFileSync(path.join(__dirname, '..', 'scr', 'logo.js'), 'utf8'),
        sandbox
    );

    return { ui: sandbox.window.logoplugin.ui, params };
}

test('serial info shows aired episodes instead of a clipped poster label', () => {
    const { ui } = loadPluginUi();

    const info = ui.getSeriesInfo({
        name: 'Hell Mode',
        number_of_seasons: 2,
        number_of_episodes: 24,
        last_episode_to_air: { episode_number: 18 }
    });

    assert.equal(info.text, 'Сериал · 2 сезона · 18 из 24');
    assert.equal(info.aired, 18);
    assert.equal(info.total, 24);
});

test('serial info is not rendered for films or without episode data', () => {
    const { ui } = loadPluginUi();

    assert.equal(ui.getSeriesInfo({ title: 'A Film', number_of_episodes: 120 }), null);
    assert.equal(ui.getSeriesInfo({ name: 'Unknown Series' }), null);
});

test('known TMDB series statuses map to a visual state', () => {
    const { ui } = loadPluginUi();

    assert.equal(ui.getStatusKind('Returning Series'), 'ongoing');
    assert.equal(ui.getStatusKind('Ended'), 'ended');
    assert.equal(ui.getStatusKind('Canceled'), 'cancelled');
    assert.equal(ui.getStatusKind('Planned'), null);
});

test('Cardify receives episode progress inside its existing details row', () => {
    const { ui } = loadPluginUi();
    const details = {
        removedSelector: null,
        inserted: null,
        find(selector) {
            if (selector === '.full-start-new__split') {
                return {
                    length: 1,
                    first: () => ({ after: (html) => { this.inserted = html; } })
                };
            }
            return {
                remove: () => { this.removedSelector = selector; }
            };
        },
        append() { throw new Error('Episode progress must be inserted before the series count'); }
    };
    const root = {
        hasClass(name) { return name === 'cardify'; },
        find(selector) {
            if (selector === '.full-start-new__details') return details;
            if (selector === '.logo-series-info--chip') return { remove() {} };
            throw new Error('Unexpected selector: ' + selector);
        }
    };

    ui.appendSeriesInfo({
        name: 'Hell Mode',
        number_of_seasons: 2,
        number_of_episodes: 24,
        last_episode_to_air: { episode_number: 18 }
    }, root);

    assert.equal(details.removedSelector, '.logo-series-info');
    assert.equal(details.inserted, '<span class="logo-series-info logo-series-info--inline">Вышло: 18</span><span class="full-start-new__split">●</span>');
});

test('ordinary cards keep episode progress in the native details row instead of a poster chip', () => {
    const { ui } = loadPluginUi();
    const details = {
        inserted: null,
        find(selector) {
            if (selector === '.full-start-new__split') {
                return {
                    length: 1,
                    first: () => ({ after: (html) => { this.inserted = html; } })
                };
            }
            return { remove() {} };
        },
        append() { throw new Error('Poster chips must not be created'); }
    };
    const root = {
        hasClass() { return false; },
        find(selector) {
            if (selector === '.full-start-new__details') return details;
            if (selector === '.logo-series-info--chip') return { remove() {} };
            throw new Error('Poster chips must not be created: ' + selector);
        }
    };

    ui.appendSeriesInfo({
        name: 'Hell Mode',
        number_of_episodes: 24,
        last_episode_to_air: { episode_number: 6 }
    }, root);

    assert.equal(details.inserted, '<span class="logo-series-info logo-series-info--inline">Вышло: 6</span><span class="full-start-new__split">●</span>');
});

test('series without a known aired episode do not duplicate the native series count', () => {
    const { ui } = loadPluginUi();
    const details = {
        find() { return { remove() {} }; },
        append() { throw new Error('No extra series information should be rendered'); }
    };
    const root = {
        find(selector) {
            if (selector === '.full-start-new__details') return details;
            if (selector === '.logo-series-info--chip') return { remove() {} };
            throw new Error('Unexpected selector: ' + selector);
        }
    };

    ui.appendSeriesInfo({ name: 'Unknown Series', number_of_episodes: 24 }, root);
});

test('the TV badge on the opened series poster becomes Сериал', () => {
    const { ui } = loadPluginUi();
    const badge = {
        value: 'TV',
        text(value) { this.value = value; }
    };
    const root = {
        find(selector) {
            assert.equal(selector, '.full-start-new__poster.card--tv .card__type');
            return badge;
        }
    };

    ui.replaceTvLabel(root);

    assert.equal(badge.value, 'Сериал');
});

test('series features have independent interface settings enabled by default', () => {
    const { params } = loadPluginUi();
    const names = params.map((entry) => entry.param.name);

    assert.deepEqual(
        names.filter((name) => name.startsWith('logo_series_')),
        ['logo_series_label', 'logo_series_info', 'logo_series_status']
    );
    assert.ok(params.filter((entry) => entry.param.name.startsWith('logo_series_'))
        .every((entry) => entry.param.default === true));
});
