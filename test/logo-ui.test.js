const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

function loadPluginUi() {
    const params = [];
    const components = [];
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
        $: (value) => value && value.jqueryStub ? value.jqueryStub : Object.create(chain),
        Lampa: {
            Listener: { follow() {} },
            SettingsApi: {
                addComponent(component) { components.push(component); },
                addParam(param) { params.push(param); }
            },
            Storage: { field() { return false; }, get() { return false; } },
            TMDB: { image(url) { return url; } }
        }
    };

    vm.runInNewContext(
        fs.readFileSync(path.join(__dirname, '..', 'scr', 'logo.js'), 'utf8'),
        sandbox
    );

    return { ui: sandbox.window.logoplugin.ui, params, components };
}

test('ongoing series show the latest episode with an unambiguous season separator', () => {
    const { ui } = loadPluginUi();

    const info = ui.getEpisodeInfo({
        name: 'Hell Mode',
        status: 'Returning Series',
        number_of_episodes: 24,
        last_episode_to_air: { season_number: 2, episode_number: 6 }
    });

    assert.equal(info.latest, 'Вышла серия: S02:E06');
    assert.equal(info.totalText, 'Всего будет: 24');
    assert.equal(info.aired, 6);
    assert.equal(info.total, 24);
});

test('serial info is not rendered for films or without episode data', () => {
    const { ui } = loadPluginUi();

    assert.equal(ui.getEpisodeInfo({ title: 'A Film', number_of_episodes: 120 }), null);
    assert.equal(ui.getEpisodeInfo({ name: 'Unknown Series' }), null);
});

test('known TMDB series statuses map to a visual state', () => {
    const { ui } = loadPluginUi();

    assert.equal(ui.getStatusKind('Returning Series'), 'ongoing');
    assert.equal(ui.getStatusKind('Ended'), 'ended');
    assert.equal(ui.getStatusKind('Canceled'), 'cancelled');
    assert.equal(ui.getStatusKind('Planned'), null);
    const finished = ui.getEpisodeInfo({
        name: 'Finished Series',
        status: 'Ended',
        number_of_episodes: 24,
        last_episode_to_air: { season_number: 2, episode_number: 12 }
    });
    assert.equal(finished.latest, 'Последняя серия: S02:E12');
    assert.equal(finished.totalText, 'Всего: 24');
    assert.equal(finished.aired, 12);
    assert.equal(finished.total, 24);
});

test('Cardify receives episode progress inside its existing details row', () => {
    const { ui } = loadPluginUi();
    const details = {
        removedSelector: null,
        nativeDetailsRemoved: false,
        inserted: null,
        find(selector) {
            return {
                remove: () => { this.removedSelector = selector; }
            };
        },
        children() {
            return { slice: () => ({ remove: () => { this.nativeDetailsRemoved = true; } }) };
        },
        prepend(html) { this.inserted = html; },
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
        status: 'Returning Series',
        number_of_episodes: 24,
        last_episode_to_air: { season_number: 2, episode_number: 18 }
    }, root);

    assert.equal(details.removedSelector, '.logo-series-info');
    assert.equal(details.nativeDetailsRemoved, true);
    assert.equal(details.inserted, '<span class="logo-series-info logo-series-info--inline">Вышла серия: S02:E18</span><span class="full-start-new__split">●</span><span class="logo-series-info logo-series-info--inline">Всего будет: 24</span>');
});

test('ordinary cards keep episode progress in the native details row instead of a poster chip', () => {
    const { ui } = loadPluginUi();
    const details = {
        inserted: null,
        find(selector) {
            return { remove() {} };
        },
        children() { return { slice: () => ({ remove() {} }) }; },
        prepend(html) { this.inserted = html; },
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
        status: 'Returning Series',
        number_of_episodes: 24,
        last_episode_to_air: { season_number: 2, episode_number: 6 }
    }, root);

    assert.equal(details.inserted, '<span class="logo-series-info logo-series-info--inline">Вышла серия: S02:E06</span><span class="full-start-new__split">●</span><span class="logo-series-info logo-series-info--inline">Всего будет: 24</span>');
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

test('TV badges in opened and catalogue series cards become Сериал', () => {
    const { ui } = loadPluginUi();
    const badge = {
        value: 'TV',
        text(value) {
            if (arguments.length) this.value = value;
            return this.value;
        }
    };
    const badgeElement = { jqueryStub: badge };
    const root = {
        find(selector) {
            assert.equal(selector, '.card--tv .card__type');
            return { each(callback) { callback.call(badgeElement); } };
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

test('logo and series settings live in their own settings component', () => {
    const { params, components } = loadPluginUi();

    assert.ok(components.some((component) => component.component === 'logo_plugin'));
    assert.ok(params.filter((entry) => entry.param.name.startsWith('logo_'))
        .every((entry) => entry.component === 'logo_plugin'));
});
