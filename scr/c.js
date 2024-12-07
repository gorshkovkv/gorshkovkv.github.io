(function () {
  'use strict';

  Lampa.Platform.tv();
  (function () {
    var _0x2c3ae7 = function () {
      var _0x594c4a = true;
      return function (_0x546723, _0x28ccc0) {
        var _0x52878f = _0x594c4a ? function () {
          if (_0x28ccc0) {
            var _0x574dbf = _0x28ccc0.apply(_0x546723, arguments);
            _0x28ccc0 = null;
            return _0x574dbf;
          }
        } : function () {};
        _0x594c4a = false;
        return _0x52878f;
      };
    }();
    var _0x8cf205 = function () {
      var _0x13afb8 = true;
      return function (_0x242f0a, _0x5e8207) {
        var _0x24f56b = _0x13afb8 ? function () {
          if (_0x5e8207) {
            var _0x3878f2 = _0x5e8207.apply(_0x242f0a, arguments);
            _0x5e8207 = null;
            return _0x3878f2;
          }
        } : function () {};
        _0x13afb8 = false;
        return _0x24f56b;
      };
    }();
    var _0x3bb54c = function () {
      var _0x2c6239 = true;
      return function (_0x5c5237, _0xb258cc) {
        var _0x21eb30 = _0x2c6239 ? function () {
          if (_0xb258cc) {
            var _0x54e1dc = _0xb258cc.apply(_0x5c5237, arguments);
            _0xb258cc = null;
            return _0x54e1dc;
          }
        } : function () {};
        _0x2c6239 = false;
        return _0x21eb30;
      };
    }();
    'use strict';
    if (Lampa.Manifest.origin !== "bylampa") {
      Lampa.Noty.show("Ошибка доступа");
      return;
    }
    var _0x8a191b = {
      api: "lampac"
    };
    _0x8a191b.localhost = "http://185.87.48.42:2626/";
    _0x8a191b.apn = "https://apn.watch/";
    var _0x35832b = Lampa.Reguest;
    function _0x2febfc(_0x69e429) {
      var _0x14cec0 = new _0x35832b();
      var _0x41f6cd = {
        mask: true,
        over: true
      };
      var _0x2afcab = new Lampa.Scroll(_0x41f6cd);
      var _0x1d5981 = new Lampa.Explorer(_0x69e429);
      var _0x136c9c = new Lampa.Filter(_0x69e429);
      var _0x326068 = {};
      var _0x1a99ca;
      var _0x4ab1e2;
      var _0x25c00d;
      var _0x2cc8bc;
      var _0x2eff50;
      var _0x105f72 = [];
      var _0x84946a = 0;
      var _0x2bb4dd;
      var _0x311365 = 0;
      var _0x4dfacf;
      var _0x4ffccb;
      var _0xd59ff1;
      var _0x21ba83 = {};
      var _0x3ea3d7 = {
        'season': Lampa.Lang.translate("torrent_serial_season"),
        'voice': Lampa.Lang.translate("torrent_parser_voice"),
        'source': Lampa.Lang.translate("settings_rest_source")
      };
      var _0x5ca297 = {
        season: [],
        voice: []
      };
      var _0x572d75 = ["eneyida", "seasonvar", "lostfilmhd", "kinotochka", "kinopub", "kinoprofi", "kinokrad", "kinobase", "filmix", "redheadsound", "animevost", "animego", "animedia", "animebesst", "anilibria", "rezka", "kodik", "remux"];
      function _0x803443(_0x3b8243) {
        _0x3b8243 = _0x3b8243 + '';
        if (_0x3b8243.indexOf("account_email") == -1) {
          var _0xbd08a1 = Lampa.Storage.get("account_email");
          if (_0xbd08a1) {
            _0x3b8243 = Lampa.Utils.addUrlComponent(_0x3b8243, "account_email=" + encodeURIComponent(_0xbd08a1));
          }
        }
        return _0x3b8243;
      }
      function _0x1e8d9a(_0x205c0c) {
        var _0x2f28ba = _0x205c0c.balanser;
        var _0x3107d6 = _0x205c0c.name.split(" ")[0];
        return (_0x2f28ba || _0x3107d6).toLowerCase();
      }
      this.initialize = function () {
        var _0x4f1acc = this;
        this.loading(true);
        _0x136c9c.onSearch = function (_0x52293b) {
          var _0x40e555 = {
            search: _0x52293b,
            clarification: true
          };
          Lampa.Activity.replace(_0x40e555);
        };
        _0x136c9c.onBack = function () {
          _0x4f1acc.start();
        };
        _0x136c9c.render().find(".selector").on("hover:enter", function () {
          clearInterval(_0x2eff50);
        });
        _0x136c9c.render().find(".filter--search").appendTo(_0x136c9c.render().find(".torrent-filter"));
        _0x136c9c.onSelect = function (_0x574a9e, _0x21d569, _0x1d8f3f) {
          if (_0x574a9e == "filter") {
            if (_0x21d569.reset) {
              var _0x16e567 = {
                season: 0x0,
                voice: 0x0,
                voice_url: '',
                voice_name: ''
              };
              _0x4f1acc.replaceChoice(_0x16e567);
              setTimeout(function () {
                Lampa.Select.close();
                Lampa.Activity.replace();
              }, 10);
            } else {
              var _0x3e96b9 = _0x5ca297[_0x21d569.stype][_0x1d8f3f.index].url;
              var _0x2622bd = _0x4f1acc.getChoice();
              if (_0x21d569.stype == "voice") {
                _0x2622bd.voice_name = _0x5ca297.voice[_0x1d8f3f.index].title;
                _0x2622bd.voice_url = _0x3e96b9;
              }
              _0x2622bd[_0x21d569.stype] = _0x1d8f3f.index;
              _0x4f1acc.saveChoice(_0x2622bd);
              _0x4f1acc.reset();
              _0x4f1acc.request(_0x3e96b9);
              setTimeout(Lampa.Select.close, 10);
            }
          } else if (_0x574a9e == "sort") {
            Lampa.Select.close();
            _0x69e429.lampac_custom_select = _0x21d569.source;
            _0x4f1acc.changeBalanser(_0x21d569.source);
          }
        };
        if (_0x136c9c.addButtonBack) {
          _0x136c9c.addButtonBack();
        }
        _0x136c9c.render().find(".filter--sort span").text(Lampa.Lang.translate("lampac_balanser"));
        _0x2afcab.body().addClass("torrent-list");
        _0x1d5981.appendFiles(_0x2afcab.render());
        _0x1d5981.appendHead(_0x136c9c.render());
        _0x2afcab.minus(_0x1d5981.render().find(".explorer__files-head"));
        _0x2afcab.body().append(Lampa.Template.get("lampac_content_loading"));
        Lampa.Controller.enable("content");
        this.loading(false);
        this.externalids().then(function () {
          return _0x4f1acc.createSource();
        }).then(function (_0x573b89) {
          if (!_0x572d75.find(function (_0x251047) {
            return _0x25c00d.slice(0, _0x251047.length) == _0x251047;
          })) {
            _0x136c9c.render().find(".filter--search").addClass("hide");
          }
          _0x4f1acc.search();
        })["catch"](function (_0x23edbf) {
          _0x4f1acc.noConnectToServer(_0x23edbf);
        });
      };
      this.rch = function (_0x548f70) {
        var _0x32481b = this;
        var _0x1037a7 = function _0x216455() {
          if (_0x4ffccb) {
            _0x4ffccb.stop();
            _0x4ffccb = null;
          }
          _0x4ffccb = new signalR.HubConnectionBuilder().withUrl(_0x548f70.ws).build();
          _0x4ffccb.on("RchClient", function (_0x152aac, _0xbe27e9, _0x24b157) {
            var _0x13eccc = $("head meta[name=\"referrer\"]").attr("content");
            function _0x5bfb6a(_0x1a912a) {
              $("head meta[name=\"referrer\"]").attr("content", _0x13eccc);
              if (Lampa.Arrays.isObject(_0x1a912a) || Lampa.Arrays.isArray(_0x1a912a)) {
                _0x1a912a = JSON.stringify(_0x1a912a);
              }
              var _0x4be0b7 = {
                id: _0x152aac,
                value: _0x1a912a
              };
              var _0x3d0ac9 = {
                dataType: "text"
              };
              _0x14cec0.silent(_0x548f70.result, false, false, _0x4be0b7, _0x3d0ac9);
            }
            $("head meta[name=\"referrer\"]").attr("content", "origin");
            var _0x16f192 = _0xbe27e9.indexOf("cdnmovies") >= 0 ? {
              'Origin': "https://cdnmovies.net",
              'Referer': "https://cdnmovies.net/"
            } : {};
            _0x14cec0.native(_0xbe27e9, _0x5bfb6a, function () {
              _0x5bfb6a('');
            }, _0x24b157, {
              'dataType': "text",
              'timeout': 10000,
              'headers': _0x16f192
            });
          });
          _0x4ffccb.start().then(function () {
            _0x4ffccb.invoke("Registry", "rch").then(function () {
              _0x32481b.find();
            });
          })["catch"](function (_0x5ad622) {
            return console.error(_0x5ad622.toString());
          });
          _0xd59ff1 = setTimeout(function () {
            _0x4ffccb.stop();
          }, 1000 * _0x548f70.keepalive);
        };
        if (typeof signalR == "undefined") {
          Lampa.Utils.putScript(["https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/6.0.1/signalr.js"], function () {}, false, function () {
            _0x1037a7();
          }, true);
        } else {
          _0x1037a7();
        }
      };
      this.externalids = function () {
        return new Promise(function (_0xae70e0, _0x290892) {
          if (!_0x69e429.movie.imdb_id || !_0x69e429.movie.kinopoisk_id) {
            var _0xc949fa = [];
            _0xc949fa.push("id=" + _0x69e429.movie.id);
            _0xc949fa.push("serial=" + (_0x69e429.movie.name ? 1 : 0));
            if (_0x69e429.movie.imdb_id) {
              _0xc949fa.push("imdb_id=" + (_0x69e429.movie.imdb_id || ''));
            }
            if (_0x69e429.movie.kinopoisk_id) {
              _0xc949fa.push("kinopoisk_id=" + (_0x69e429.movie.kinopoisk_id || ''));
            }
            var _0x135bac = _0x8a191b.localhost + "externalids?" + _0xc949fa.join('&');
            _0x14cec0.timeout(10000);
            _0x14cec0.silent(_0x803443(_0x135bac), function (_0x24a61e) {
              for (var _0x3deabc in _0x24a61e) {
                _0x69e429.movie[_0x3deabc] = _0x24a61e[_0x3deabc];
              }
              _0xae70e0();
            }, function () {
              _0xae70e0();
            });
          } else {
            _0xae70e0();
          }
        });
      };
      this.updateBalanser = function (_0x5705f7) {
        var _0x1c115f = Lampa.Storage.cache("online_last_balanser", 3000, {});
        _0x1c115f[_0x69e429.movie.id] = _0x5705f7;
        Lampa.Storage.set("online_last_balanser", _0x1c115f);
      };
      this.changeBalanser = function (_0x171f75) {
        this.updateBalanser(_0x171f75);
        Lampa.Storage.set("online_balanser", _0x171f75);
        var _0x2f715d = this.getChoice(_0x171f75);
        var _0x34b6f4 = this.getChoice();
        if (_0x34b6f4.voice_name) {
          _0x2f715d.voice_name = _0x34b6f4.voice_name;
        }
        this.saveChoice(_0x2f715d, _0x171f75);
        Lampa.Activity.replace();
      };
      this.requestParams = function (_0x558bed) {
        var _0xab85af = [];
        var _0x3a93c0 = _0x69e429.movie.source || "tmdb";
        _0xab85af.push("id=" + _0x69e429.movie.id);
        if (_0x69e429.movie.imdb_id) {
          _0xab85af.push("imdb_id=" + (_0x69e429.movie.imdb_id || ''));
        }
        if (_0x69e429.movie.kinopoisk_id) {
          _0xab85af.push("kinopoisk_id=" + (_0x69e429.movie.kinopoisk_id || ''));
        }
        _0xab85af.push("title=" + encodeURIComponent(_0x69e429.clarification ? _0x69e429.search : _0x69e429.movie.title || _0x69e429.movie.name));
        _0xab85af.push("original_title=" + encodeURIComponent(_0x69e429.movie.original_title || _0x69e429.movie.original_name));
        _0xab85af.push("serial=" + (_0x69e429.movie.name ? 1 : 0));
        _0xab85af.push("original_language=" + (_0x69e429.movie.original_language || ''));
        _0xab85af.push("year=" + ((_0x69e429.movie.release_date || _0x69e429.movie.first_air_date || "0000") + '').slice(0, 4));
        _0xab85af.push("source=" + _0x3a93c0);
        _0xab85af.push("clarification=" + (_0x69e429.clarification ? 1 : 0));
        if (Lampa.Storage.get("account_email", '')) {
          _0xab85af.push("cub_id=" + Lampa.Utils.hash(Lampa.Storage.get("account_email", '')));
        }
        return _0x558bed + (_0x558bed.indexOf('?') >= 0 ? '&' : '?') + _0xab85af.join('&');
      };
      this.getLastChoiceBalanser = function () {
        var _0x3733a7 = Lampa.Storage.cache("online_last_balanser", 3000, {});
        if (_0x3733a7[_0x69e429.movie.id]) {
          return _0x3733a7[_0x69e429.movie.id];
        } else {
          return Lampa.Storage.get("online_balanser", _0x21ba83.length ? _0x21ba83[0] : '');
        }
      };
      this.startSource = function (_0x396598) {
        return new Promise(function (_0x5bdc1b, _0x40b0e4) {
          _0x396598.forEach(function (_0x34b8ed) {
            var _0x5ae87c = _0x1e8d9a(_0x34b8ed);
            _0x326068[_0x5ae87c] = {
              'url': _0x34b8ed.url,
              'name': _0x34b8ed.name,
              'show': typeof _0x34b8ed.show == "undefined" ? true : _0x34b8ed.show
            };
          });
          _0x21ba83 = Lampa.Arrays.getKeys(_0x326068);
          if (_0x21ba83.length) {
            var _0x5336e0 = Lampa.Storage.cache("online_last_balanser", 3000, {});
            if (_0x5336e0[_0x69e429.movie.id]) {
              _0x25c00d = _0x5336e0[_0x69e429.movie.id];
            } else {
              _0x25c00d = Lampa.Storage.get("online_balanser", _0x21ba83[0]);
            }
            if (!_0x326068[_0x25c00d]) {
              _0x25c00d = _0x21ba83[0];
            }
            if (!_0x326068[_0x25c00d].show && !_0x69e429.lampac_custom_select) {
              _0x25c00d = _0x21ba83[0];
            }
            _0x4ab1e2 = _0x326068[_0x25c00d].url;
            _0x5bdc1b(_0x396598);
          } else {
            _0x40b0e4();
          }
        });
      };
      this.lifeSource = function () {
        var _0x49be52 = this;
        return new Promise(function (_0x1cd000, _0x37f246) {
          var _0x104028 = _0x49be52.requestParams(_0x8a191b.localhost + "lifeevents");
          var _0x4deb28 = false;
          var _0x14535b = function _0x2f31ff(_0x1867cf, _0x174ca4) {
            if (_0x1867cf.accsdb) {
              return _0x37f246(_0x1867cf);
            }
            var _0x277ac3 = _0x49be52.getLastChoiceBalanser();
            if (!_0x4deb28) {
              var _0x16f255 = _0x1867cf.online.filter(function (_0x528bd8) {
                return _0x174ca4 ? _0x528bd8.show : _0x528bd8.show && _0x528bd8.name.toLowerCase() == _0x277ac3;
              });
              if (_0x16f255.length) {
                _0x4deb28 = true;
                _0x1cd000(_0x1867cf.online.filter(function (_0x48fdc6) {
                  return _0x48fdc6.show;
                }));
              } else if (_0x174ca4) {
                _0x37f246();
              }
            }
          };
          var _0x54eca9 = function _0x26474d(_0x46d84f) {
            _0x14cec0.timeout(3000);
            _0x14cec0.silent(_0x803443(_0x104028), function (_0x19840e) {
              _0x311365++;
              _0x21ba83 = [];
              _0x326068 = {};
              _0x19840e.online.forEach(function (_0x29763c) {
                var _0x1f24e5 = _0x1e8d9a(_0x29763c);
                _0x326068[_0x1f24e5] = {
                  'url': _0x29763c.url,
                  'name': _0x29763c.name,
                  'show': typeof _0x29763c.show == "undefined" ? true : _0x29763c.show
                };
              });
              _0x21ba83 = Lampa.Arrays.getKeys(_0x326068);
              _0x136c9c.set("sort", _0x21ba83.map(function (_0x58d7d4) {
                return {
                  'title': _0x326068[_0x58d7d4].name,
                  'source': _0x58d7d4,
                  'selected': _0x58d7d4 == _0x25c00d,
                  'ghost': !_0x326068[_0x58d7d4].show
                };
              }));
              _0x136c9c.chosen("sort", [_0x326068[_0x25c00d] ? _0x326068[_0x25c00d].name : _0x25c00d]);
              _0x14535b(_0x19840e);
              var _0x9f67a1 = _0x49be52.getLastChoiceBalanser();
              if (_0x311365 > 15 || _0x19840e.ready) {
                _0x136c9c.render().find(".lampac-balanser-loader").remove();
                _0x14535b(_0x19840e, true);
              } else {
                if (!_0x4deb28 && _0x326068[_0x9f67a1] && _0x326068[_0x9f67a1].show) {
                  _0x14535b(_0x19840e, true);
                  _0x4dfacf = setTimeout(_0x26474d, 1000);
                } else {
                  _0x4dfacf = setTimeout(_0x26474d, 1000);
                }
              }
            }, function () {
              _0x311365++;
              if (_0x311365 > 15) {
                _0x37f246();
              } else {
                _0x4dfacf = setTimeout(_0x26474d, 1000);
              }
            });
          };
          _0x54eca9();
        });
      };
      this.createSource = function () {
        var _0xcd4691 = this;
        return new Promise(function (_0x58c6ba, _0x500432) {
          var _0x59cdcb = _0xcd4691.requestParams(_0x8a191b.localhost + "lite/events?life=true");
          _0x14cec0.timeout(15000);
          _0x14cec0.silent(_0x803443(_0x59cdcb), function (_0x121087) {
            if (_0x121087.accsdb) {
              return _0x500432(_0x121087);
            }
            if (_0x121087.life) {
              _0x136c9c.render().find(".filter--sort").append("<span class=\"lampac-balanser-loader\" style=\"width: 1.2em; height: 1.2em; margin-top: 0; background: url(./img/loader.svg) no-repeat 50% 50%; background-size: contain; margin-left: 0.5em\"></span>");
              _0xcd4691.lifeSource().then(_0xcd4691.startSource).then(_0x58c6ba)["catch"](_0x500432);
            } else {
              _0xcd4691.startSource(_0x121087).then(_0x58c6ba)["catch"](_0x500432);
            }
          }, _0x500432);
        });
      };
      this.create = function () {
        return this.render();
      };
      this.search = function () {
        var _0x488b72 = {
          source: _0x21ba83
        };
        this.filter(_0x488b72, this.getChoice());
        this.find();
      };
      this.find = function () {
        this.request(this.requestParams(_0x4ab1e2));
      };
      this.request = function (_0xd73c4d) {
        _0x84946a++;
        if (_0x84946a < 10) {
          _0x14cec0.native(_0x803443(_0xd73c4d), this.parse.bind(this), this.doesNotAnswer.bind(this), false, {
            'dataType': "text"
          });
          clearTimeout(_0x2bb4dd);
          _0x2bb4dd = setTimeout(function () {
            _0x84946a = 0;
          }, 4000);
        } else {
          this.empty();
        }
      };
      this.parseJsonDate = function (_0x4bd94a, _0x475e) {
        try {
          var _0x6ab060 = $("<div>" + _0x4bd94a + "</div>");
          var _0x2e4a92 = [];
          _0x6ab060.find(_0x475e).each(function () {
            var _0x5ec7a0 = $(this);
            var _0x165fb5 = JSON.parse(_0x5ec7a0.attr("data-json"));
            var _0x13efed = _0x5ec7a0.attr('s');
            var _0x4b1e62 = _0x5ec7a0.attr('e');
            var _0x263174 = _0x5ec7a0.text();
            if (!_0x69e429.movie.name) {
              if (_0x263174.match(/\d+p/i)) {
                if (!_0x165fb5.quality) {
                  _0x165fb5.quality = {};
                  _0x165fb5.quality[_0x263174] = _0x165fb5.url;
                }
                _0x263174 = _0x69e429.movie.title;
              }
              if (_0x263174 == "По умолчанию") {
                _0x263174 = _0x69e429.movie.title;
              }
            }
            if (_0x4b1e62) {
              _0x165fb5.episode = parseInt(_0x4b1e62);
            }
            if (_0x13efed) {
              _0x165fb5.season = parseInt(_0x13efed);
            }
            if (_0x263174) {
              _0x165fb5.text = _0x263174;
            }
            _0x165fb5.active = _0x5ec7a0.hasClass("active");
            _0x2e4a92.push(_0x165fb5);
          });
          return _0x2e4a92;
        } catch (_0xa2e1e4) {
          return [];
        }
      };
      this.getFileUrl = function (_0x493abd, _0x1edf8b) {
        if (_0x493abd.method == "play") {
          _0x1edf8b(_0x493abd, {});
        } else {
          Lampa.Loading.start(function () {
            Lampa.Loading.stop();
            Lampa.Controller.toggle("content");
            _0x14cec0.clear();
          });
          _0x14cec0.native(_0x803443(_0x493abd.url), function (_0xb1b8bf) {
            var _0x254182 = {
              BrmkV: "copy_error"
            };
            _0x254182.pcFET = "copy_secuses";
            Lampa.Loading.stop();
            _0x1edf8b(_0xb1b8bf, _0xb1b8bf);
          }, function () {
            Lampa.Loading.stop();
            _0x1edf8b(false, {});
          });
        }
      };
      this.toPlayElement = function (_0x971196) {
        var _0x8e56c2 = {
          title: _0x971196.title,
          url: _0x971196.url,
          quality: _0x971196.qualitys,
          timeline: _0x971196.timeline,
          subtitles: _0x971196.subtitles,
          callback: _0x971196.mark
        };
        return _0x8e56c2;
      };
      this.appendAPN = function (_0x5dcb3b) {
        if ("lampac".indexOf("pwa") == 0 && _0x8a191b.apn.length && _0x5dcb3b.url && typeof _0x5dcb3b.url == "string" && _0x5dcb3b.url.indexOf(_0x8a191b.apn) == -1) {
          _0x5dcb3b.url_reserve = _0x8a191b.apn + _0x5dcb3b.url;
        }
      };
      this.setDefaultQuality = function (_0x1e6db4) {
        if (Lampa.Arrays.getKeys(_0x1e6db4.quality).length) {
          for (var _0x4b60c8 in _0x1e6db4.quality) {
            if (parseInt(_0x4b60c8) == Lampa.Storage.field("video_quality_default")) {
              _0x1e6db4.url = _0x1e6db4.quality[_0x4b60c8];
              this.appendAPN(_0x1e6db4);
              break;
            }
          }
        }
      };
      this.display = function (_0x43e511) {
        var _0x517ac0 = this;
        this.draw(_0x43e511, {
          'onEnter': function _0x50320a(_0x3edacd, _0x44c1bf) {
            _0x517ac0.getFileUrl(_0x3edacd, function (_0x454983, _0xce94b4) {
              if (_0x454983 && _0x454983.url) {
                var _0x945b25 = [];
                var _0x1e400b = _0x517ac0.toPlayElement(_0x3edacd);
                _0x1e400b.url = _0x454983.url;
                _0x1e400b.quality = _0xce94b4.quality || _0x3edacd.qualitys;
                _0x1e400b.subtitles = _0x454983.subtitles;
                _0x517ac0.appendAPN(_0x1e400b);
                _0x517ac0.setDefaultQuality(_0x1e400b);
                if (_0x3edacd.season) {
                  _0x43e511.forEach(function (_0x15df00) {
                    var _0x5aef17 = _0x517ac0.toPlayElement(_0x15df00);
                    if (_0x15df00 == _0x3edacd) {
                      _0x5aef17.url = _0x454983.url;
                    } else {
                      if (_0x15df00.method == "call") {
                        if (Lampa.Platform.is("android") && Lampa.Storage.field("player") == "android") {
                          _0x5aef17.url = _0x15df00.stream;
                        } else {
                          _0x5aef17.url = function (_0x137239) {
                            _0x517ac0.getFileUrl(_0x15df00, function (_0x481d5a, _0x173648) {
                              if (_0x481d5a.url) {
                                _0x5aef17.url = _0x481d5a.url;
                                _0x5aef17.quality = _0x173648.quality || _0x15df00.qualitys;
                                _0x5aef17.subtitles = _0x481d5a.subtitles;
                                _0x517ac0.appendAPN(_0x5aef17);
                                _0x517ac0.setDefaultQuality(_0x5aef17);
                                _0x15df00.mark();
                              } else {
                                _0x5aef17.url = '';
                                Lampa.Noty.show(Lampa.Lang.translate("lampac_nolink"));
                              }
                              _0x137239();
                            }, function () {
                              _0x5aef17.url = '';
                              _0x137239();
                            });
                          };
                        }
                      } else {
                        _0x5aef17.url = _0x15df00.url;
                      }
                    }
                    _0x517ac0.appendAPN(_0x5aef17);
                    _0x517ac0.setDefaultQuality(_0x5aef17);
                    _0x945b25.push(_0x5aef17);
                  });
                } else {
                  _0x945b25.push(_0x1e400b);
                }
                if (_0x945b25.length > 1) {
                  _0x1e400b.playlist = _0x945b25;
                }
                if (_0x1e400b.url) {
                  Lampa.Player.play(_0x1e400b);
                  Lampa.Player.playlist(_0x945b25);
                  _0x3edacd.mark();
                  _0x517ac0.updateBalanser(_0x25c00d);
                } else {
                  Lampa.Noty.show(Lampa.Lang.translate("lampac_nolink"));
                }
              } else {
                Lampa.Noty.show(Lampa.Lang.translate("lampac_nolink"));
              }
            }, true);
          },
          'onContextMenu': function _0xb08a3e(_0x18fec8, _0x45a4e7, _0x15d459, _0x5dbef5) {
            _0x517ac0.getFileUrl(_0x18fec8, function (_0x1deb39) {
              var _0x227041 = {
                file: _0x1deb39.url,
                quality: _0x18fec8.qualitys
              };
              _0x5dbef5(_0x227041);
            }, true);
          }
        });
        this.filter({
          'season': _0x5ca297.season.map(function (_0x20c978) {
            return _0x20c978.title;
          }),
          'voice': _0x5ca297.voice.map(function (_0x333797) {
            return _0x333797.title;
          })
        }, this.getChoice());
      };
      this.parse = function (_0x3017a6) {
        var _0x23bc22 = Lampa.Arrays.decodeJson(_0x3017a6, {});
        if (Lampa.Arrays.isObject(_0x3017a6) && _0x3017a6.rch) {
          _0x23bc22 = _0x3017a6;
        }
        if (_0x23bc22.rch) {
          return this.rch(_0x23bc22);
        }
        try {
          var _0x50e3ae = this.parseJsonDate(_0x3017a6, ".videos__item");
          var _0x2f5080 = this.parseJsonDate(_0x3017a6, ".videos__button");
          if (_0x50e3ae.length == 1 && _0x50e3ae[0].method == "link" && !_0x50e3ae[0].similar) {
            _0x5ca297.season = _0x50e3ae.map(function (_0xe3f0a7) {
              var _0x39ae50 = {
                ukRPt: "5|6|0|3|4|1|2"
              };
              _0x39ae50.mJSxL = ".online-empty__title";
              _0x39ae50.ocFOR = "title_error";
              _0x39ae50.JkGyf = ".online-empty__time";
              _0x39ae50.HWEIw = "lampac_does_not_answer_text";
              _0x39ae50.apAeV = "{balanser}";
              _0x39ae50.wgwpQ = "lampac_does_not_answer";
              _0x39ae50.cUrMF = ".online-empty__buttons";
              var _0x583422 = {
                title: _0xe3f0a7.text,
                url: _0xe3f0a7.url
              };
              return _0x583422;
            });
            var _0x51196e = {
              season: 0x0
            };
            this.replaceChoice(_0x51196e);
            this.request(_0x50e3ae[0].url);
          } else {
            this.activity.loader(false);
            var _0x2c5eed = _0x50e3ae.filter(function (_0x99f8d6) {
              return _0x99f8d6.method == "play" || _0x99f8d6.method == "call";
            });
            var _0x164e42 = _0x50e3ae.filter(function (_0x11e94d) {
              return _0x11e94d.similar;
            });
            if (_0x2c5eed.length) {
              if (_0x2f5080.length) {
                _0x5ca297.voice = _0x2f5080.map(function (_0x195b0c) {
                  var _0x4fa443 = {
                    title: _0x195b0c.text,
                    url: _0x195b0c.url
                  };
                  return _0x4fa443;
                });
                var _0x2919c5 = this.getChoice(_0x25c00d).voice_url;
                var _0x38c03f = this.getChoice(_0x25c00d).voice_name;
                var _0x1ef3a5 = _0x2f5080.find(function (_0x1c8457) {
                  return _0x1c8457.url == _0x2919c5;
                });
                var _0x427edc = _0x2f5080.find(function (_0x47662f) {
                  return _0x47662f.text == _0x38c03f;
                });
                var _0x38d1ca = _0x2f5080.find(function (_0x19aef7) {
                  return _0x19aef7.active;
                });
                if (_0x1ef3a5 && !_0x1ef3a5.active) {
                  console.log("Lampac", "go to voice", _0x1ef3a5);
                  this.replaceChoice({
                    'voice': _0x2f5080.indexOf(_0x1ef3a5),
                    'voice_name': _0x1ef3a5.text
                  });
                  this.request(_0x1ef3a5.url);
                } else {
                  if (_0x427edc && !_0x427edc.active) {
                    console.log("Lampac", "go to voice", _0x427edc);
                    this.replaceChoice({
                      'voice': _0x2f5080.indexOf(_0x427edc),
                      'voice_name': _0x427edc.text
                    });
                    this.request(_0x427edc.url);
                  } else {
                    if (_0x38d1ca) {
                      this.replaceChoice({
                        'voice': _0x2f5080.indexOf(_0x38d1ca),
                        'voice_name': _0x38d1ca.text
                      });
                    }
                    this.display(_0x2c5eed);
                  }
                }
              } else {
                var _0x4c58ba = {
                  voice: 0x0,
                  voice_url: '',
                  voice_name: ''
                };
                this.replaceChoice(_0x4c58ba);
                this.display(_0x2c5eed);
              }
            } else {
              if (_0x50e3ae.length) {
                if (_0x164e42.length) {
                  this.similars(_0x164e42);
                  this.activity.loader(false);
                } else {
                  _0x5ca297.season = _0x50e3ae.map(function (_0x128c26) {
                    var _0x9b753d = {
                      title: _0x128c26.text,
                      url: _0x128c26.url
                    };
                    return _0x9b753d;
                  });
                  var _0x49e80a = this.getChoice(_0x25c00d).season;
                  var _0x1ae6c7 = _0x5ca297.season[_0x49e80a];
                  if (!_0x1ae6c7) {
                    _0x1ae6c7 = _0x5ca297.season[0];
                  }
                  console.log("Lampac", "go to season", _0x1ae6c7);
                  this.request(_0x1ae6c7.url);
                }
              } else {
                this.doesNotAnswer();
              }
            }
          }
        } catch (_0x4306d2) {
          console.log("Lampac", "error", _0x4306d2.stack);
          this.doesNotAnswer();
        }
      };
      this.similars = function (_0x2e2c38) {
        var _0x37c42f = this;
        _0x2afcab.clear();
        _0x2e2c38.forEach(function (_0x26f97c) {
          _0x26f97c.title = _0x26f97c.text;
          _0x26f97c.info = '';
          var _0xb1c01b = [];
          var _0x2dc406 = ((_0x26f97c.start_date || _0x26f97c.year || _0x69e429.movie.release_date || _0x69e429.movie.first_air_date || '') + '').slice(0, 4);
          if (_0x2dc406) {
            _0xb1c01b.push(_0x2dc406);
          }
          if (_0x26f97c.details) {
            _0xb1c01b.push(_0x26f97c.details);
          }
          var _0x43cbd2 = _0x26f97c.title || _0x26f97c.text;
          _0x26f97c.title = _0x43cbd2;
          _0x26f97c.time = _0x26f97c.time || '';
          _0x26f97c.info = _0xb1c01b.join("<span class=\"online-prestige-split\">●</span>");
          var _0x7e419f = Lampa.Template.get("lampac_prestige_folder", _0x26f97c);
          _0x7e419f.on("hover:enter", function () {
            _0x37c42f.reset();
            _0x37c42f.request(_0x26f97c.url);
          }).on("hover:focus", function (_0xdb9368) {
            _0x1a99ca = _0xdb9368.target;
            _0x2afcab.update($(_0xdb9368.target), true);
          });
          _0x2afcab.append(_0x7e419f);
        });
        this.filter({
          'season': _0x5ca297.season.map(function (_0x1df549) {
            return _0x1df549.title;
          }),
          'voice': _0x5ca297.voice.map(function (_0x4a1a24) {
            return _0x4a1a24.title;
          })
        }, this.getChoice());
        Lampa.Controller.enable("content");
      };
      this.getChoice = function (_0x9f7446) {
        var _0x2b63b1 = Lampa.Storage.cache("online_choice_" + (_0x9f7446 || _0x25c00d), 3000, {});
        var _0x41331d = _0x2b63b1[_0x69e429.movie.id] || {};
        var _0x2b1026 = {
          season: 0x0,
          voice: 0x0,
          voice_name: '',
          voice_id: 0x0,
          episodes_view: {},
          movie_view: ''
        };
        Lampa.Arrays.extend(_0x41331d, _0x2b1026);
        return _0x41331d;
      };
      this.saveChoice = function (_0x11dcaa, _0x29696f) {
        var _0x39a5c8 = Lampa.Storage.cache("online_choice_" + (_0x29696f || _0x25c00d), 3000, {});
        _0x39a5c8[_0x69e429.movie.id] = _0x11dcaa;
        Lampa.Storage.set("online_choice_" + (_0x29696f || _0x25c00d), _0x39a5c8);
        this.updateBalanser(_0x29696f || _0x25c00d);
      };
      this.replaceChoice = function (_0x498dd9, _0x20a1a0) {
        var _0x5bfdee = this.getChoice(_0x20a1a0);
        Lampa.Arrays.extend(_0x5bfdee, _0x498dd9, true);
        this.saveChoice(_0x5bfdee, _0x20a1a0);
      };
      this.clearImages = function () {
        _0x105f72.forEach(function (_0x1ac5c7) {
          _0x1ac5c7.onerror = function () {};
          _0x1ac5c7.onload = function () {};
          _0x1ac5c7.src = '';
        });
        _0x105f72 = [];
      };
      this.reset = function () {
        _0x1a99ca = false;
        clearInterval(_0x2eff50);
        _0x14cec0.clear();
        this.clearImages();
        _0x2afcab.render().find(".empty").remove();
        _0x2afcab.clear();
        _0x2afcab.reset();
        _0x2afcab.body().append(Lampa.Template.get("lampac_content_loading"));
      };
      this.loading = function (_0x2776cc) {
        if (_0x2776cc) {
          this.activity.loader(true);
        } else {
          this.activity.loader(false);
          this.activity.toggle();
        }
      };
      this.filter = function (_0x36dc3f, _0x417353) {
        var _0x1c3205 = this;
        var _0xe5f4ea = [];
        var _0x508f2d = function _0x2dc755(_0x11e934, _0x481235) {
          var _0x257bff = _0x1c3205.getChoice();
          var _0x41d65f = _0x36dc3f[_0x11e934];
          var _0x3ba6fe = [];
          var _0x5edefc = _0x257bff[_0x11e934];
          _0x41d65f.forEach(function (_0x39bcf1, _0x2ed31b) {
            _0x3ba6fe.push({
              'title': _0x39bcf1,
              'selected': _0x5edefc == _0x2ed31b,
              'index': _0x2ed31b
            });
          });
          var _0x1fc8bb = {
            title: _0x481235,
            subtitle: _0x41d65f[_0x5edefc],
            items: _0x3ba6fe,
            stype: _0x11e934
          };
          _0xe5f4ea.push(_0x1fc8bb);
        };
        _0x36dc3f.source = _0x21ba83;
        _0xe5f4ea.push({
          'title': Lampa.Lang.translate("torrent_parser_reset"),
          'reset': true
        });
        this.saveChoice(_0x417353);
        if (_0x36dc3f.voice && _0x36dc3f.voice.length) {
          _0x508f2d("voice", Lampa.Lang.translate("torrent_parser_voice"));
        }
        if (_0x36dc3f.season && _0x36dc3f.season.length) {
          _0x508f2d("season", Lampa.Lang.translate("torrent_serial_season"));
        }
        _0x136c9c.set("filter", _0xe5f4ea);
        _0x136c9c.set("sort", _0x21ba83.map(function (_0x2f2add) {
          return {
            'title': _0x326068[_0x2f2add].name,
            'source': _0x2f2add,
            'selected': _0x2f2add == _0x25c00d,
            'ghost': !_0x326068[_0x2f2add].show
          };
        }));
        this.selected(_0x36dc3f);
      };
      this.selected = function (_0x373d36) {
        var _0x1f584a = this.getChoice();
        var _0x212f4c = [];
        for (var _0x5126d0 in _0x1f584a) {
          if (_0x373d36[_0x5126d0] && _0x373d36[_0x5126d0].length) {
            if (_0x5126d0 == "voice") {
              _0x212f4c.push(_0x3ea3d7[_0x5126d0] + ": " + _0x373d36[_0x5126d0][_0x1f584a[_0x5126d0]]);
            } else {
              if (_0x5126d0 !== "source") {
                if (_0x373d36.season.length >= 1) {
                  _0x212f4c.push(_0x3ea3d7.season + ": " + _0x373d36[_0x5126d0][_0x1f584a[_0x5126d0]]);
                }
              }
            }
          }
        }
        _0x136c9c.chosen("filter", _0x212f4c);
        _0x136c9c.chosen("sort", [_0x326068[_0x25c00d].name]);
      };
      this.getEpisodes = function (_0x57c67d, _0x5d359e) {
        var _0x3e9511 = [];
        if (["cub", "tmdb"].indexOf(_0x69e429.movie.source || "tmdb") == -1) {
          return _0x5d359e(_0x3e9511);
        }
        if (typeof _0x69e429.movie.id == "number" && _0x69e429.movie.name) {
          var _0x1dc6f2 = "tv/" + _0x69e429.movie.id + "/season/" + _0x57c67d + "?api_key=" + Lampa.TMDB.key() + "&language=" + Lampa.Storage.get("language", 'ru');
          var _0x394587 = Lampa.TMDB.api(_0x1dc6f2);
          _0x14cec0.timeout(10000);
          _0x14cec0.native(_0x394587, function (_0x5ba16e) {
            _0x3e9511 = _0x5ba16e.episodes || [];
            _0x5d359e(_0x3e9511);
          }, function (_0x3bbd2d, _0xbb1d33) {
            _0x5d359e(_0x3e9511);
          });
        } else {
          _0x5d359e(_0x3e9511);
        }
      };
      this.watched = function (_0x547c4a) {
        var _0xb91d19 = Lampa.Utils.hash(_0x69e429.movie.number_of_seasons ? _0x69e429.movie.original_name : _0x69e429.movie.original_title);
        var _0x15568f = Lampa.Storage.cache("online_watched_last", 5000, {});
        if (_0x547c4a) {
          if (!_0x15568f[_0xb91d19]) {
            _0x15568f[_0xb91d19] = {};
          }
          Lampa.Arrays.extend(_0x15568f[_0xb91d19], _0x547c4a, true);
          Lampa.Storage.set("online_watched_last", _0x15568f);
          this.updateWatched();
        } else {
          return _0x15568f[_0xb91d19];
        }
      };
      this.updateWatched = function () {
        var _0x11f133 = this.watched();
        var _0x5aee0b = _0x2afcab.body().find(".online-prestige-watched .online-prestige-watched__body").empty();
        if (_0x11f133) {
          var _0x2234a4 = [];
          if (_0x11f133.balanser_name) {
            _0x2234a4.push(_0x11f133.balanser_name);
          }
          if (_0x11f133.voice_name) {
            _0x2234a4.push(_0x11f133.voice_name);
          }
          if (_0x11f133.season) {
            _0x2234a4.push(Lampa.Lang.translate("torrent_serial_season") + " " + _0x11f133.season);
          }
          if (_0x11f133.episode) {
            _0x2234a4.push(Lampa.Lang.translate("torrent_serial_episode") + " " + _0x11f133.episode);
          }
          _0x2234a4.forEach(function (_0x5d2445) {
            _0x5aee0b.append("<span>" + _0x5d2445 + "</span>");
          });
        } else {
          _0x5aee0b.append("<span>" + Lampa.Lang.translate("lampac_no_watch_history") + "</span>");
        }
      };
      this.draw = function (_0x2ae226) {
        var _0x4d82d8 = this;
        var _0x3c326a = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        if (!_0x2ae226.length) {
          return this.empty();
        }
        _0x2afcab.clear();
        _0x2afcab.append(Lampa.Template.get("lampac_prestige_watched", {}));
        this.updateWatched();
        this.getEpisodes(_0x2ae226[0].season, function (_0x465ab8) {
          var _0x1853b8 = Lampa.Storage.cache("online_view", 5000, []);
          var _0x58969a = !!_0x69e429.movie.name;
          var _0x30fe03 = _0x4d82d8.getChoice();
          var _0x5f016a = window.innerWidth > 480;
          var _0x350193 = false;
          var _0x1b0d54 = false;
          _0x2ae226.forEach(function (_0x16e0ba, _0x30eb89) {
            var _0x1dd69c = _0x58969a && _0x465ab8.length && !_0x3c326a.similars ? _0x465ab8.find(function (_0x4ce0d8) {
              return _0x4ce0d8.episode_number == _0x16e0ba.episode;
            }) : false;
            var _0x374a3e = _0x16e0ba.episode || _0x30eb89 + 1;
            var _0x2a7ad6 = _0x30fe03.episodes_view[_0x16e0ba.season];
            var _0x430f69 = _0x30fe03.voice_name || (_0x5ca297.voice[0] ? _0x5ca297.voice[0].title : false) || _0x16e0ba.voice_name || (_0x58969a ? "Неизвестно" : _0x16e0ba.text) || "Неизвестно";
            if (_0x16e0ba.quality) {
              _0x16e0ba.qualitys = _0x16e0ba.quality;
              _0x16e0ba.quality = Lampa.Arrays.getKeys(_0x16e0ba.quality)[0];
            }
            Lampa.Arrays.extend(_0x16e0ba, {
              'voice_name': _0x430f69,
              'info': _0x430f69.length > 60 ? _0x430f69.substr(0, 60) + "..." : _0x430f69,
              'quality': '',
              'time': Lampa.Utils.secondsToTime((_0x1dd69c ? _0x1dd69c.runtime : _0x69e429.movie.runtime) * 60, true)
            });
            var _0x579972 = Lampa.Utils.hash(_0x16e0ba.season ? [_0x16e0ba.season, _0x16e0ba.season > 10 ? ':' : '', _0x16e0ba.episode, _0x69e429.movie.original_title].join('') : _0x69e429.movie.original_title);
            var _0x346c51 = Lampa.Utils.hash(_0x16e0ba.season ? [_0x16e0ba.season, _0x16e0ba.season > 10 ? ':' : '', _0x16e0ba.episode, _0x69e429.movie.original_title, _0x16e0ba.voice_name].join('') : _0x69e429.movie.original_title + _0x16e0ba.voice_name);
            var _0x59bf6a = {
              hash_timeline: _0x579972,
              hash_behold: _0x346c51
            };
            var _0x32938b = [];
            if (_0x16e0ba.season) {
              _0x16e0ba.translate_episode_end = _0x4d82d8.getLastEpisode(_0x2ae226);
              _0x16e0ba.translate_voice = _0x16e0ba.voice_name;
            }
            if (_0x16e0ba.text && !_0x1dd69c) {
              _0x16e0ba.title = _0x16e0ba.text;
            }
            _0x16e0ba.timeline = Lampa.Timeline.view(_0x579972);
            if (_0x1dd69c) {
              _0x16e0ba.title = _0x1dd69c.name;
              if (_0x16e0ba.info.length < 30 && _0x1dd69c.vote_average) {
                _0x32938b.push(Lampa.Template.get("lampac_prestige_rate", {
                  'rate': parseFloat(_0x1dd69c.vote_average + '').toFixed(1)
                }, true));
              }
              if (_0x1dd69c.air_date && _0x5f016a) {
                _0x32938b.push(Lampa.Utils.parseTime(_0x1dd69c.air_date).full);
              }
            } else {
              if (_0x69e429.movie.release_date && _0x5f016a) {
                _0x32938b.push(Lampa.Utils.parseTime(_0x69e429.movie.release_date).full);
              }
            }
            if (!_0x58969a && _0x69e429.movie.tagline && _0x16e0ba.info.length < 30) {
              _0x32938b.push(_0x69e429.movie.tagline);
            }
            if (_0x16e0ba.info) {
              _0x32938b.push(_0x16e0ba.info);
            }
            if (_0x32938b.length) {
              _0x16e0ba.info = _0x32938b.map(function (_0x43903b) {
                return "<span>" + _0x43903b + "</span>";
              }).join("<span class=\"online-prestige-split\">●</span>");
            }
            var _0x3d1d76 = Lampa.Template.get("lampac_prestige_full", _0x16e0ba);
            var _0x3ad0ec = _0x3d1d76.find(".online-prestige__loader");
            var _0x22247b = _0x3d1d76.find(".online-prestige__img");
            if (!_0x58969a) {
              if (_0x30fe03.movie_view == _0x346c51) {
                _0x350193 = _0x3d1d76;
              }
            } else if (typeof _0x2a7ad6 !== "undefined" && _0x2a7ad6 == _0x374a3e) {
              _0x350193 = _0x3d1d76;
            }
            if (_0x58969a && !_0x1dd69c) {
              _0x22247b.append("<div class=\"online-prestige__episode-number\">" + ('0' + (_0x16e0ba.episode || _0x30eb89 + 1)).slice(-2) + "</div>");
              _0x3ad0ec.remove();
            } else {
              if (!_0x58969a && ["cub", "tmdb"].indexOf(_0x69e429.movie.source || "tmdb") == -1) {
                _0x3ad0ec.remove();
              } else {
                var _0xa5f803 = _0x3d1d76.find("img")[0];
                _0xa5f803.onerror = function () {
                  _0xa5f803.src = "./img/img_broken.svg";
                };
                _0xa5f803.onload = function () {
                  _0x22247b.addClass("online-prestige__img--loaded");
                  _0x3ad0ec.remove();
                  if (_0x58969a) {
                    _0x22247b.append("<div class=\"online-prestige__episode-number\">" + ('0' + (_0x16e0ba.episode || _0x30eb89 + 1)).slice(-2) + "</div>");
                  }
                };
                _0xa5f803.src = Lampa.TMDB.image("t/p/w300" + (_0x1dd69c ? _0x1dd69c.still_path : _0x69e429.movie.backdrop_path));
                _0x105f72.push(_0xa5f803);
              }
            }
            _0x3d1d76.find(".online-prestige__timeline").append(Lampa.Timeline.render(_0x16e0ba.timeline));
            if (_0x1853b8.indexOf(_0x346c51) !== -1) {
              _0x1b0d54 = _0x3d1d76;
              _0x3d1d76.find(".online-prestige__img").append("<div class=\"online-prestige__viewed\">" + Lampa.Template.get("icon_viewed", {}, true) + "</div>");
            }
            _0x16e0ba.mark = function () {
              _0x1853b8 = Lampa.Storage.cache("online_view", 5000, []);
              if (_0x1853b8.indexOf(_0x346c51) == -1) {
                _0x1853b8.push(_0x346c51);
                Lampa.Storage.set("online_view", _0x1853b8);
                if (_0x3d1d76.find(".online-prestige__viewed").length == 0) {
                  _0x3d1d76.find(".online-prestige__img").append("<div class=\"online-prestige__viewed\">" + Lampa.Template.get("icon_viewed", {}, true) + "</div>");
                }
              }
              _0x30fe03 = _0x4d82d8.getChoice();
              if (!_0x58969a) {
                _0x30fe03.movie_view = _0x346c51;
              } else {
                _0x30fe03.episodes_view[_0x16e0ba.season] = _0x374a3e;
              }
              _0x4d82d8.saveChoice(_0x30fe03);
              var _0xeac0ef = _0x30fe03.voice_name || _0x16e0ba.voice_name || _0x16e0ba.title;
              if (_0xeac0ef.length > 30) {
                _0xeac0ef = _0xeac0ef.slice(0, 30) + "...";
              }
              _0x4d82d8.watched({
                'balanser': _0x25c00d,
                'balanser_name': Lampa.Utils.capitalizeFirstLetter(_0x326068[_0x25c00d].name.split(" ")[0]),
                'voice_id': _0x30fe03.voice_id,
                'voice_name': _0xeac0ef,
                'episode': _0x16e0ba.episode,
                'season': _0x16e0ba.season
              });
            };
            _0x16e0ba.unmark = function () {
              _0x1853b8 = Lampa.Storage.cache("online_view", 5000, []);
              if (_0x1853b8.indexOf(_0x346c51) !== -1) {
                Lampa.Arrays.remove(_0x1853b8, _0x346c51);
                Lampa.Storage.set("online_view", _0x1853b8);
                Lampa.Storage.remove("online_view", _0x346c51);
                _0x3d1d76.find(".online-prestige__viewed").remove();
              }
            };
            _0x16e0ba.timeclear = function () {
              _0x16e0ba.timeline.percent = 0;
              _0x16e0ba.timeline.time = 0;
              _0x16e0ba.timeline.duration = 0;
              Lampa.Timeline.update(_0x16e0ba.timeline);
            };
            _0x3d1d76.on("hover:enter", function () {
              if (_0x69e429.movie.id) {
                Lampa.Favorite.add("history", _0x69e429.movie, 100);
              }
              if (_0x3c326a.onEnter) {
                _0x3c326a.onEnter(_0x16e0ba, _0x3d1d76, _0x59bf6a);
              }
            }).on("hover:focus", function (_0xf2c642) {
              _0x1a99ca = _0xf2c642.target;
              if (_0x3c326a.onFocus) {
                _0x3c326a.onFocus(_0x16e0ba, _0x3d1d76, _0x59bf6a);
              }
              _0x2afcab.update($(_0xf2c642.target), true);
            });
            if (_0x3c326a.onRender) {
              _0x3c326a.onRender(_0x16e0ba, _0x3d1d76, _0x59bf6a);
            }
            _0x4d82d8.contextMenu({
              'html': _0x3d1d76,
              'element': _0x16e0ba,
              'onFile': function _0x2be781(_0x850c0f) {
                if (_0x3c326a.onContextMenu) {
                  _0x3c326a.onContextMenu(_0x16e0ba, _0x3d1d76, _0x59bf6a, _0x850c0f);
                }
              },
              'onClearAllMark': function _0x309fa1() {
                _0x2ae226.forEach(function (_0x8831de) {
                  _0x8831de.unmark();
                });
              },
              'onClearAllTime': function _0x764bc4() {
                _0x2ae226.forEach(function (_0x3c4a74) {
                  _0x3c4a74.timeclear();
                });
              }
            });
            _0x2afcab.append(_0x3d1d76);
          });
          if (_0x58969a && _0x465ab8.length > _0x2ae226.length && !_0x3c326a.similars) {
            var _0x2b341d = _0x465ab8.slice(_0x2ae226.length);
            _0x2b341d.forEach(function (_0x3cc758) {
              var _0x598d35 = [];
              if (_0x3cc758.vote_average) {
                _0x598d35.push(Lampa.Template.get("lampac_prestige_rate", {
                  'rate': parseFloat(_0x3cc758.vote_average + '').toFixed(1)
                }, true));
              }
              if (_0x3cc758.air_date) {
                _0x598d35.push(Lampa.Utils.parseTime(_0x3cc758.air_date).full);
              }
              var _0x1eb002 = new Date((_0x3cc758.air_date + '').replace(/-/g, '/'));
              var _0x301285 = Date.now();
              var _0x3c1828 = Math.round((_0x1eb002.getTime() - _0x301285) / 86400000);
              var _0x510b6d = Lampa.Lang.translate("full_episode_days_left") + ": " + _0x3c1828;
              var _0x26b009 = Lampa.Template.get("lampac_prestige_full", {
                'time': Lampa.Utils.secondsToTime((_0x3cc758 ? _0x3cc758.runtime : _0x69e429.movie.runtime) * 60, true),
                'info': _0x598d35.length ? _0x598d35.map(function (_0x5c4edd) {
                  return "<span>" + _0x5c4edd + "</span>";
                }).join("<span class=\"online-prestige-split\">●</span>") : '',
                'title': _0x3cc758.name,
                'quality': _0x3c1828 > 0 ? _0x510b6d : ''
              });
              var _0x3d3119 = _0x26b009.find(".online-prestige__loader");
              var _0x1635dc = _0x26b009.find(".online-prestige__img");
              var _0x1e7557 = _0x2ae226[0] ? _0x2ae226[0].season : 1;
              _0x26b009.find(".online-prestige__timeline").append(Lampa.Timeline.render(Lampa.Timeline.view(Lampa.Utils.hash([_0x1e7557, _0x3cc758.episode_number, _0x69e429.movie.original_title].join('')))));
              var _0x5e9252 = _0x26b009.find("img")[0];
              if (_0x3cc758.still_path) {
                _0x5e9252.onerror = function () {
                  _0x5e9252.src = "./img/img_broken.svg";
                };
                _0x5e9252.onload = function () {
                  _0x1635dc.addClass("online-prestige__img--loaded");
                  _0x3d3119.remove();
                  _0x1635dc.append("<div class=\"online-prestige__episode-number\">" + ('0' + _0x3cc758.episode_number).slice(-2) + "</div>");
                };
                _0x5e9252.src = Lampa.TMDB.image("t/p/w300" + _0x3cc758.still_path);
                _0x105f72.push(_0x5e9252);
              } else {
                _0x3d3119.remove();
                _0x1635dc.append("<div class=\"online-prestige__episode-number\">" + ('0' + _0x3cc758.episode_number).slice(-2) + "</div>");
              }
              _0x26b009.on("hover:focus", function (_0x5028ce) {
                _0x1a99ca = _0x5028ce.target;
                _0x2afcab.update($(_0x5028ce.target), true);
              });
              _0x26b009.css("opacity", "0.5");
              _0x2afcab.append(_0x26b009);
            });
          }
          if (_0x350193) {
            _0x1a99ca = _0x350193[0];
          } else if (_0x1b0d54) {
            _0x1a99ca = _0x1b0d54[0];
          }
          Lampa.Controller.enable("content");
        });
      };
      this.contextMenu = function (_0x526487) {
        _0x526487.html.on("hover:long", function () {
          function _0x413ce1(_0x5bf1bd) {
            var _0xda7631 = Lampa.Controller.enabled().name;
            var _0x2191bd = [];
            if (Lampa.Platform.is("webos")) {
              _0x2191bd.push({
                'title': Lampa.Lang.translate("player_lauch") + " - Webos",
                'player': "webos"
              });
            }
            if (Lampa.Platform.is("android")) {
              _0x2191bd.push({
                'title': Lampa.Lang.translate("player_lauch") + " - Android",
                'player': "android"
              });
            }
            _0x2191bd.push({
              'title': Lampa.Lang.translate("player_lauch") + " - Lampa",
              'player': "lampa"
            });
            _0x2191bd.push({
              'title': Lampa.Lang.translate("lampac_video"),
              'separator': true
            });
            _0x2191bd.push({
              'title': Lampa.Lang.translate("torrent_parser_label_title"),
              'mark': true
            });
            _0x2191bd.push({
              'title': Lampa.Lang.translate("torrent_parser_label_cancel_title"),
              'unmark': true
            });
            _0x2191bd.push({
              'title': Lampa.Lang.translate("time_reset"),
              'timeclear': true
            });
            if (_0x5bf1bd) {
              _0x2191bd.push({
                'title': Lampa.Lang.translate("copy_link"),
                'copylink': true
              });
            }
            _0x2191bd.push({
              'title': Lampa.Lang.translate("more"),
              'separator': true
            });
            if (Lampa.Account.logged() && _0x526487.element && typeof _0x526487.element.season !== "undefined" && _0x526487.element.translate_voice) {
              _0x2191bd.push({
                'title': Lampa.Lang.translate("lampac_voice_subscribe"),
                'subscribe': true
              });
            }
            _0x2191bd.push({
              'title': Lampa.Lang.translate("lampac_clear_all_marks"),
              'clearallmark': true
            });
            _0x2191bd.push({
              'title': Lampa.Lang.translate("lampac_clear_all_timecodes"),
              'timeclearall': true
            });
            Lampa.Select.show({
              'title': Lampa.Lang.translate("title_action"),
              'items': _0x2191bd,
              'onBack': function _0x10b503() {
                Lampa.Controller.toggle(_0xda7631);
              },
              'onSelect': function _0x128c8d(_0x160a25) {
                if (_0x160a25.mark) {
                  _0x526487.element.mark();
                }
                if (_0x160a25.unmark) {
                  _0x526487.element.unmark();
                }
                if (_0x160a25.timeclear) {
                  _0x526487.element.timeclear();
                }
                if (_0x160a25.clearallmark) {
                  _0x526487.onClearAllMark();
                }
                if (_0x160a25.timeclearall) {
                  _0x526487.onClearAllTime();
                }
                Lampa.Controller.toggle(_0xda7631);
                if (_0x160a25.player) {
                  Lampa.Player.runas(_0x160a25.player);
                  _0x526487.html.trigger("hover:enter");
                }
                if (_0x160a25.copylink) {
                  if (_0x5bf1bd.quality) {
                    var _0x537b76 = [];
                    for (var _0x28dbfd in _0x5bf1bd.quality) {
                      var _0xc39f88 = {
                        title: _0x28dbfd,
                        file: _0x5bf1bd.quality[_0x28dbfd]
                      };
                      _0x537b76.push(_0xc39f88);
                    }
                    Lampa.Select.show({
                      'title': Lampa.Lang.translate("settings_server_links"),
                      'items': _0x537b76,
                      'onBack': function _0x720bd1() {
                        Lampa.Controller.toggle(_0xda7631);
                      },
                      'onSelect': function _0x5108c7(_0x132f64) {
                        Lampa.Utils.copyTextToClipboard(_0x132f64.file, function () {
                          Lampa.Noty.show(Lampa.Lang.translate("copy_secuses"));
                        }, function () {
                          Lampa.Noty.show(Lampa.Lang.translate("copy_error"));
                        });
                      }
                    });
                  } else {
                    Lampa.Utils.copyTextToClipboard(_0x5bf1bd.file, function () {
                      Lampa.Noty.show(Lampa.Lang.translate("copy_secuses"));
                    }, function () {
                      Lampa.Noty.show(Lampa.Lang.translate("copy_error"));
                    });
                  }
                }
                if (_0x160a25.subscribe) {
                  var _0x3608ee = {
                    card: _0x69e429.movie,
                    season: _0x526487.element.season,
                    episode: _0x526487.element.translate_episode_end,
                    voice: _0x526487.element.translate_voice
                  };
                  Lampa.Account.subscribeToTranslation(_0x3608ee, function () {
                    Lampa.Noty.show(Lampa.Lang.translate("lampac_voice_success"));
                  }, function () {
                    Lampa.Noty.show(Lampa.Lang.translate("lampac_voice_error"));
                  });
                }
              }
            });
          }
          _0x526487.onFile(_0x413ce1);
        }).on("hover:focus", function () {
          if (Lampa.Helper) {
            Lampa.Helper.show("online_file", Lampa.Lang.translate("helper_online_file"), _0x526487.html);
          }
        });
      };
      this.empty = function () {
        var _0x485cc8 = Lampa.Template.get("lampac_does_not_answer", {});
        _0x485cc8.find(".online-empty__buttons").remove();
        _0x485cc8.find(".online-empty__title").text(Lampa.Lang.translate("empty_title_two"));
        _0x485cc8.find(".online-empty__time").text(Lampa.Lang.translate("empty_text"));
        _0x2afcab.clear();
        _0x2afcab.append(_0x485cc8);
        this.loading(false);
      };
      this.noConnectToServer = function (_0x5a57a9) {
        var _0x341567 = Lampa.Template.get("lampac_does_not_answer", {});
        _0x341567.find(".online-empty__buttons").remove();
        _0x341567.find(".online-empty__title").text(Lampa.Lang.translate("title_error"));
        _0x341567.find(".online-empty__time").text(_0x5a57a9 && _0x5a57a9.accsdb ? _0x5a57a9.msg : Lampa.Lang.translate("lampac_does_not_answer_text").replace("{balanser}", _0x25c00d[_0x25c00d].name));
        _0x2afcab.clear();
        _0x2afcab.append(_0x341567);
        this.loading(false);
      };
      this.doesNotAnswer = function () {
        var _0xd7a9ef = this;
        this.reset();
        var _0x48ecd8 = {
          balanser: _0x25c00d
        };
        var _0xb0772 = Lampa.Template.get("lampac_does_not_answer", _0x48ecd8);
        var _0x3db198 = 4;
        _0xb0772.find(".cancel").on("hover:enter", function () {
          clearInterval(_0x2eff50);
        });
        _0xb0772.find(".change").on("hover:enter", function () {
          clearInterval(_0x2eff50);
          _0x136c9c.render().find(".filter--sort").trigger("hover:enter");
        });
        _0x2afcab.clear();
        _0x2afcab.append(_0xb0772);
        this.loading(false);
        _0x2eff50 = setInterval(function () {
          _0x3db198--;
          _0xb0772.find(".timeout").text(_0x3db198);
          if (_0x3db198 == 0) {
            clearInterval(_0x2eff50);
            var _0x491f6d = Lampa.Arrays.getKeys(_0x326068);
            var _0x20fbff = _0x491f6d.indexOf(_0x25c00d);
            var _0x3737b6 = _0x491f6d[_0x20fbff + 1];
            if (!_0x3737b6) {
              _0x3737b6 = _0x491f6d[0];
            }
            _0x25c00d = _0x3737b6;
            if (Lampa.Activity.active().activity == _0xd7a9ef.activity) {
              _0xd7a9ef.changeBalanser(_0x25c00d);
            }
          }
        }, 1000);
      };
      this.getLastEpisode = function (_0xe1abf4) {
        var _0x1798a1 = 0;
        _0xe1abf4.forEach(function (_0x14c2fb) {
          if (typeof _0x14c2fb.episode !== "undefined") {
            _0x1798a1 = Math.max(_0x1798a1, parseInt(_0x14c2fb.episode));
          }
        });
        return _0x1798a1;
      };
      this.start = function () {
        if (Lampa.Activity.active().activity !== this.activity) {
          return;
        }
        if (!_0x2cc8bc) {
          _0x2cc8bc = true;
          this.initialize();
        }
        Lampa.Background.immediately(Lampa.Utils.cardImgBackgroundBlur(_0x69e429.movie));
        Lampa.Controller.add("content", {
          'toggle': function _0x1917de() {
            Lampa.Controller.collectionSet(_0x2afcab.render(), _0x1d5981.render());
            Lampa.Controller.collectionFocus(_0x1a99ca || false, _0x2afcab.render());
          },
          'gone': function _0x57ac8c() {
            clearTimeout(_0x2eff50);
          },
          'up': function _0x11b29b() {
            if (Navigator.canmove('up')) {
              Navigator.move('up');
            } else {
              Lampa.Controller.toggle("head");
            }
          },
          'down': function _0x5d7b86() {
            Navigator.move("down");
          },
          'right': function _0x4961b6() {
            if (Navigator.canmove("right")) {
              Navigator.move("right");
            } else {
              _0x136c9c.show(Lampa.Lang.translate("title_filter"), "filter");
            }
          },
          'left': function _0x5a9d34() {
            if (Navigator.canmove("left")) {
              Navigator.move("left");
            } else {
              Lampa.Controller.toggle("menu");
            }
          },
          'back': this.back.bind(this)
        });
        Lampa.Controller.toggle("content");
      };
      this.render = function () {
        return _0x1d5981.render();
      };
      this.back = function () {
        Lampa.Activity.backward();
      };
      this.pause = function () {};
      this.stop = function () {};
      this.destroy = function () {
        _0x14cec0.clear();
        this.clearImages();
        _0x1d5981.destroy();
        _0x2afcab.destroy();
        clearInterval(_0x2eff50);
        clearTimeout(_0x4dfacf);
        clearTimeout(_0xd59ff1);
        if (_0x4ffccb) {
          _0x4ffccb.stop();
          _0x4ffccb = null;
        }
      };
    }
    function _0x29f363() {
      if (Lampa.Manifest.origin !== "bylampa") {
        Lampa.Noty.show("Ошибка доступа");
        return;
      }
      window.lampac_plugin = true;
      var _0x423b96 = {
        'type': "video",
        'version': "1.2.6",
        'name': "Cinema",
        'description': "Плагин для просмотра онлайн сериалов и фильмов",
        'component': "cinema",
        'onContextMenu': function _0x47288a(_0x3cb080) {
          return {
            'name': Lampa.Lang.translate("lampac_watch"),
            'description': ''
          };
        },
        'onContextLauch': function _0x178ba9(_0x1811a9) {
          _0x10b84c();
          Lampa.Component.add("cinema", _0x2febfc);
          Lampa.Activity.push({
            'url': '',
            'title': Lampa.Lang.translate("title_online"),
            'component': "cinema",
            'search': _0x1811a9.title,
            'search_one': _0x1811a9.title,
            'search_two': _0x1811a9.original_title,
            'movie': _0x1811a9,
            'page': 0x1
          });
        }
      };
      Lampa.Manifest.plugins = _0x423b96;
      var _0x5be6ee = {
        ru: "Смотреть онлайн",
        en: "Watch online",
        uk: "Дивитися онлайн",
        zh: "在线观看"
      };
      var _0x44676c = {
        ru: "Видео",
        en: "Video",
        uk: "Відео",
        zh: '视频'
      };
      var _0x32e96a = {
        ru: "Нет истории просмотра",
        en: "No browsing history",
        ua: "Немає історії перегляду",
        zh: "没有浏览历史"
      };
      var _0x438c23 = {
        ru: "Не удалось извлечь ссылку",
        uk: "Неможливо отримати посилання",
        en: "Failed to fetch link",
        zh: "获取链接失败"
      };
      var _0x58faa1 = {
        ru: "Источник",
        uk: "Джерело",
        en: "Source",
        zh: '来源'
      };
      var _0x414f90 = {
        ru: "Удерживайте клавишу \"ОК\" для вызова контекстного меню",
        uk: "Утримуйте клавішу \"ОК\" для виклику контекстного меню",
        en: "Hold the \"OK\" key to bring up the context menu",
        zh: "按住“确定”键调出上下文菜单"
      };
      var _0xe69fdd = {
        ru: "Онлайн",
        uk: "Онлайн",
        en: "Online",
        zh: "在线的"
      };
      var _0x5efa70 = {
        ru: "Подписаться на перевод",
        uk: "Підписатися на переклад"
      };
      _0x5efa70.en = "Subscribe to translation";
      _0x5efa70.zh = "订阅翻译";
      var _0x3ca2f6 = {
        ru: "Вы успешно подписались",
        uk: "Ви успішно підписалися",
        en: "You have successfully subscribed",
        zh: "您已成功订阅"
      };
      var _0x38d118 = {
        ru: "Возникла ошибка",
        uk: "Виникла помилка",
        en: "An error has occurred",
        zh: "发生了错误"
      };
      var _0x48e515 = {
        ru: "Очистить все метки",
        uk: "Очистити всі мітки",
        en: "Clear all labels",
        zh: "清除所有标签"
      };
      var _0x1f0863 = {
        ru: "Очистить все тайм-коды",
        uk: "Очистити всі тайм-коди",
        en: "Clear all timecodes",
        zh: "清除所有时间代码"
      };
      var _0xcb60f9 = {
        ru: "Изменить балансер",
        uk: "Змінити балансер"
      };
      _0xcb60f9.en = "Change balancer";
      _0xcb60f9.zh = "更改平衡器";
      var _0x37cfde = {
        ru: "Поиск на ({balanser}) не дал результатов",
        uk: "Пошук на ({balanser}) не дав результатів",
        en: "Search on ({balanser}) did not return any results",
        zh: "搜索 ({balanser}) 未返回任何结果"
      };
      var _0x41f6ca = {
        ru: "Источник будет переключен автоматически через <span class=\"timeout\">10</span> секунд.",
        uk: "Джерело буде автоматично переключено через <span class=\"timeout\">10</span> секунд.",
        en: "The source will be switched automatically after <span class=\"timeout\">10</span> seconds.",
        zh: "平衡器将在<span class=\"timeout\">10</span>秒内自动切换。"
      };
      var _0x25eb08 = {
        ru: "Поиск на ({balanser}) не дал результатов",
        uk: "Пошук на ({balanser}) не дав результатів",
        en: "Search on ({balanser}) did not return any results",
        zh: "搜索 ({balanser}) 未返回任何结果"
      };
      var _0x40dc61 = {
        lampac_watch: _0x5be6ee,
        lampac_video: _0x44676c,
        lampac_no_watch_history: _0x32e96a,
        lampac_nolink: _0x438c23,
        lampac_balanser: _0x58faa1,
        helper_online_file: _0x414f90,
        title_online: _0xe69fdd,
        lampac_voice_subscribe: _0x5efa70,
        lampac_voice_success: _0x3ca2f6,
        lampac_voice_error: _0x38d118,
        lampac_clear_all_marks: _0x48e515,
        lampac_clear_all_timecodes: _0x1f0863,
        lampac_change_balanser: _0xcb60f9,
        lampac_balanser_dont_work: _0x37cfde,
        lampac_balanser_timeout: _0x41f6ca,
        lampac_does_not_answer_text: _0x25eb08
      };
      Lampa.Lang.add(_0x40dc61);
      Lampa.Template.add("lampac_css", "\n        <style>\n        @charset 'UTF-8';.online-prestige{position:relative;-webkit-border-radius:.3em;border-radius:.3em;background-color:rgba(0,0,0,0.3);display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.online-prestige__body{padding:1.2em;line-height:1.3;-webkit-box-flex:1;-webkit-flex-grow:1;-moz-box-flex:1;-ms-flex-positive:1;flex-grow:1;position:relative}@media screen and (max-width:480px){.online-prestige__body{padding:.8em 1.2em}}.online-prestige__img{position:relative;width:13em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;min-height:8.2em}.online-prestige__img>img{position:absolute;top:0;left:0;width:100%;height:100%;-o-object-fit:cover;object-fit:cover;-webkit-border-radius:.3em;border-radius:.3em;opacity:0;-webkit-transition:opacity .3s;-o-transition:opacity .3s;-moz-transition:opacity .3s;transition:opacity .3s}.online-prestige__img--loaded>img{opacity:1}@media screen and (max-width:480px){.online-prestige__img{width:7em;min-height:6em}}.online-prestige__folder{padding:1em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.online-prestige__folder>svg{width:4.4em !important;height:4.4em !important}.online-prestige__viewed{position:absolute;top:1em;left:1em;background:rgba(0,0,0,0.45);-webkit-border-radius:100%;border-radius:100%;padding:.25em;font-size:.76em}.online-prestige__viewed>svg{width:1.5em !important;height:1.5em !important}.online-prestige__episode-number{position:absolute;top:0;left:0;right:0;bottom:0;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center;font-size:2em}.online-prestige__loader{position:absolute;top:50%;left:50%;width:2em;height:2em;margin-left:-1em;margin-top:-1em;background:url(./img/loader.svg) no-repeat center center;-webkit-background-size:contain;-o-background-size:contain;background-size:contain}.online-prestige__head,.online-prestige__footer{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.online-prestige__timeline{margin:.8em 0}.online-prestige__timeline>.time-line{display:block !important}.online-prestige__title{font-size:1.7em;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:1;line-clamp:1;-webkit-box-orient:vertical}@media screen and (max-width:480px){.online-prestige__title{font-size:1.4em}}.online-prestige__time{padding-left:2em}.online-prestige__info{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.online-prestige__info>*{overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:1;line-clamp:1;-webkit-box-orient:vertical}.online-prestige__quality{padding-left:1em;white-space:nowrap}.online-prestige__scan-file{position:absolute;bottom:0;left:0;right:0}.online-prestige__scan-file .broadcast__scan{margin:0}.online-prestige .online-prestige-split{font-size:.8em;margin:0 1em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.online-prestige.focus::after{content:'';position:absolute;top:-0.6em;left:-0.6em;right:-0.6em;bottom:-0.6em;-webkit-border-radius:.7em;border-radius:.7em;border:solid .3em #fff;z-index:-1;pointer-events:none}.online-prestige+.online-prestige{margin-top:1.5em}.online-prestige--folder .online-prestige__footer{margin-top:.8em}.online-prestige-watched{padding:1em}.online-prestige-watched__icon>svg{width:1.5em;height:1.5em}.online-prestige-watched__body{padding-left:1em;padding-top:.1em;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}.online-prestige-watched__body>span+span::before{content:' ● ';vertical-align:top;display:inline-block;margin:0 .5em}.online-prestige-rate{display:-webkit-inline-box;display:-webkit-inline-flex;display:-moz-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.online-prestige-rate>svg{width:1.3em !important;height:1.3em !important}.online-prestige-rate>span{font-weight:600;font-size:1.1em;padding-left:.7em}.online-empty{line-height:1.4}.online-empty__title{font-size:1.8em;margin-bottom:.3em}.online-empty__time{font-size:1.2em;font-weight:300;margin-bottom:1.6em}.online-empty__buttons{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.online-empty__buttons>*+*{margin-left:1em}.online-empty__button{background:rgba(0,0,0,0.3);font-size:1.2em;padding:.5em 1.2em;-webkit-border-radius:.2em;border-radius:.2em;margin-bottom:2.4em}.online-empty__button.focus{background:#fff;color:black}.online-empty__templates .online-empty-template:nth-child(2){opacity:.5}.online-empty__templates .online-empty-template:nth-child(3){opacity:.2}.online-empty-template{background-color:rgba(255,255,255,0.3);padding:1em;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;-webkit-border-radius:.3em;border-radius:.3em}.online-empty-template>*{background:rgba(0,0,0,0.3);-webkit-border-radius:.3em;border-radius:.3em}.online-empty-template__ico{width:4em;height:4em;margin-right:2.4em}.online-empty-template__body{height:1.7em;width:70%}.online-empty-template+.online-empty-template{margin-top:1em}\n        </style>\n    ");
      $("body").append(Lampa.Template.get("lampac_css", {}, true));
      function _0x10b84c() {
        var _0x12dc6f = _0x2c3ae7(this, function () {
          return _0x12dc6f.toString().search("(((.+)+)+)+$").toString().constructor(_0x12dc6f).search("(((.+)+)+)+$");
        });
        _0x12dc6f();
        (function () {
          _0x8cf205(this, function () {
            var _0xca8c82 = new RegExp("function *\\( *\\)");
            var _0x5f3899 = new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)", 'i');
            var _0x23bc41 = _0x143cb5("init");
            if (!_0xca8c82.test(_0x23bc41 + "chain") || !_0x5f3899.test(_0x23bc41 + "input")) {
              _0x23bc41('0');
            } else {
              _0x143cb5();
            }
          })();
        })();
        var _0x176293 = _0x3bb54c(this, function () {
          var _0x409f14;
          try {
            var _0x4b8357 = Function("return (function() {}.constructor(\"return this\")( ));");
            _0x409f14 = _0x4b8357();
          } catch (_0x5babf0) {
            _0x409f14 = window;
          }
          var _0x1d530d = _0x409f14.console = _0x409f14.console || {};
          var _0x3104ca = ["log", "warn", "info", "error", "exception", "table", "trace"];
          for (var _0x2e0e17 = 0; _0x2e0e17 < _0x3104ca.length; _0x2e0e17++) {
            var _0x264b7f = _0x3bb54c.constructor.prototype.bind(_0x3bb54c);
            var _0x251f4d = _0x3104ca[_0x2e0e17];
            var _0xdcfdf0 = _0x1d530d[_0x251f4d] || _0x264b7f;
            _0x264b7f.__proto__ = _0x3bb54c.bind(_0x3bb54c);
            _0x264b7f.toString = _0xdcfdf0.toString.bind(_0xdcfdf0);
            _0x1d530d[_0x251f4d] = _0x264b7f;
          }
        });
        _0x176293();
        Lampa.Template.add("lampac_prestige_full", "<div class=\"online-prestige online-prestige--full selector\">\n            <div class=\"online-prestige__img\">\n                <img alt=\"\">\n                <div class=\"online-prestige__loader\"></div>\n            </div>\n            <div class=\"online-prestige__body\">\n                <div class=\"online-prestige__head\">\n                    <div class=\"online-prestige__title\">{title}</div>\n                    <div class=\"online-prestige__time\">{time}</div>\n                </div>\n\n                <div class=\"online-prestige__timeline\"></div>\n\n                <div class=\"online-prestige__footer\">\n                    <div class=\"online-prestige__info\">{info}</div>\n                    <div class=\"online-prestige__quality\">{quality}</div>\n                </div>\n            </div>\n        </div>");
        Lampa.Template.add("lampac_content_loading", "<div class=\"online-empty\">\n            <div class=\"broadcast__scan\"><div></div></div>\n\t\t\t\n            <div class=\"online-empty__templates\">\n                <div class=\"online-empty-template selector\">\n                    <div class=\"online-empty-template__ico\"></div>\n                    <div class=\"online-empty-template__body\"></div>\n                </div>\n                <div class=\"online-empty-template\">\n                    <div class=\"online-empty-template__ico\"></div>\n                    <div class=\"online-empty-template__body\"></div>\n                </div>\n                <div class=\"online-empty-template\">\n                    <div class=\"online-empty-template__ico\"></div>\n                    <div class=\"online-empty-template__body\"></div>\n                </div>\n            </div>\n        </div>");
        Lampa.Template.add("lampac_does_not_answer", "<div class=\"online-empty\">\n            <div class=\"online-empty__title\">\n                #{lampac_balanser_dont_work}\n            </div>\n            <div class=\"online-empty__time\">\n                #{lampac_balanser_timeout}\n            </div>\n            <div class=\"online-empty__buttons\">\n                <div class=\"online-empty__button selector cancel\">#{cancel}</div>\n                <div class=\"online-empty__button selector change\">#{lampac_change_balanser}</div>\n            </div>\n            <div class=\"online-empty__templates\">\n                <div class=\"online-empty-template\">\n                    <div class=\"online-empty-template__ico\"></div>\n                    <div class=\"online-empty-template__body\"></div>\n                </div>\n                <div class=\"online-empty-template\">\n                    <div class=\"online-empty-template__ico\"></div>\n                    <div class=\"online-empty-template__body\"></div>\n                </div>\n                <div class=\"online-empty-template\">\n                    <div class=\"online-empty-template__ico\"></div>\n                    <div class=\"online-empty-template__body\"></div>\n                </div>\n            </div>\n        </div>");
        Lampa.Template.add("lampac_prestige_rate", "<div class=\"online-prestige-rate\">\n            <svg width=\"17\" height=\"16\" viewBox=\"0 0 17 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <path d=\"M8.39409 0.192139L10.99 5.30994L16.7882 6.20387L12.5475 10.4277L13.5819 15.9311L8.39409 13.2425L3.20626 15.9311L4.24065 10.4277L0 6.20387L5.79819 5.30994L8.39409 0.192139Z\" fill=\"#fff\"></path>\n            </svg>\n            <span>{rate}</span>\n        </div>");
        Lampa.Template.add("lampac_prestige_folder", "<div class=\"online-prestige online-prestige--folder selector\">\n            <div class=\"online-prestige__folder\">\n                <svg viewBox=\"0 0 128 112\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect y=\"20\" width=\"128\" height=\"92\" rx=\"13\" fill=\"white\"></rect>\n                    <path d=\"M29.9963 8H98.0037C96.0446 3.3021 91.4079 0 86 0H42C36.5921 0 31.9555 3.3021 29.9963 8Z\" fill=\"white\" fill-opacity=\"0.23\"></path>\n                    <rect x=\"11\" y=\"8\" width=\"106\" height=\"76\" rx=\"13\" fill=\"white\" fill-opacity=\"0.51\"></rect>\n                </svg>\n            </div>\n            <div class=\"online-prestige__body\">\n                <div class=\"online-prestige__head\">\n                    <div class=\"online-prestige__title\">{title}</div>\n                    <div class=\"online-prestige__time\">{time}</div>\n                </div>\n\n                <div class=\"online-prestige__footer\">\n                    <div class=\"online-prestige__info\">{info}</div>\n                </div>\n            </div>\n        </div>");
        Lampa.Template.add("lampac_prestige_watched", "<div class=\"online-prestige online-prestige-watched selector\">\n            <div class=\"online-prestige-watched__icon\">\n                <svg width=\"21\" height=\"21\" viewBox=\"0 0 21 21\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <circle cx=\"10.5\" cy=\"10.5\" r=\"9\" stroke=\"currentColor\" stroke-width=\"3\"/>\n                    <path d=\"M14.8477 10.5628L8.20312 14.399L8.20313 6.72656L14.8477 10.5628Z\" fill=\"currentColor\"/>\n                </svg>\n            </div>\n            <div class=\"online-prestige-watched__body\">\n                \n            </div>\n        </div>");
      }
      var _0x250863 = "<div class=\"full-start__button selector view--online_cinema cinema--button\" data-subtitle=\"".concat("Cinema", " v").concat("1.2.6", "\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 392.697 392.697\" xml:space=\"preserve\">\n            <path d=\"M21.837,83.419l36.496,16.678L227.72,19.886c1.229-0.592,2.002-1.846,1.98-3.209c-0.021-1.365-0.834-2.592-2.082-3.145\n                L197.766,0.3c-0.903-0.4-1.933-0.4-2.837,0L21.873,77.036c-1.259,0.559-2.073,1.803-2.081,3.18\n                C19.784,81.593,20.584,82.847,21.837,83.419z\" fill=\"currentColor\"></path>\n            <path d=\"M185.689,177.261l-64.988-30.01v91.617c0,0.856-0.44,1.655-1.167,2.114c-0.406,0.257-0.869,0.386-1.333,0.386\n                c-0.368,0-0.736-0.082-1.079-0.244l-68.874-32.625c-0.869-0.416-1.421-1.293-1.421-2.256v-92.229L6.804,95.5\n                c-1.083-0.496-2.344-0.406-3.347,0.238c-1.002,0.645-1.608,1.754-1.608,2.944v208.744c0,1.371,0.799,2.615,2.045,3.185\n                l178.886,81.768c0.464,0.211,0.96,0.315,1.455,0.315c0.661,0,1.318-0.188,1.892-0.555c1.002-0.645,1.608-1.754,1.608-2.945\n                V180.445C187.735,179.076,186.936,177.831,185.689,177.261z\" fill=\"currentColor\"></path>\n            <path d=\"M389.24,95.74c-1.002-0.644-2.264-0.732-3.347-0.238l-178.876,81.76c-1.246,0.57-2.045,1.814-2.045,3.185v208.751\n                c0,1.191,0.606,2.302,1.608,2.945c0.572,0.367,1.23,0.555,1.892,0.555c0.495,0,0.991-0.104,1.455-0.315l178.876-81.768\n                c1.246-0.568,2.045-1.813,2.045-3.185V98.685C390.849,97.494,390.242,96.384,389.24,95.74z\" fill=\"currentColor\"></path>\n            <path d=\"M372.915,80.216c-0.009-1.377-0.823-2.621-2.082-3.18l-60.182-26.681c-0.938-0.418-2.013-0.399-2.938,0.045\n                l-173.755,82.992l60.933,29.117c0.462,0.211,0.958,0.316,1.455,0.316s0.993-0.105,1.455-0.316l173.066-79.092\n                C372.122,82.847,372.923,81.593,372.915,80.216z\" fill=\"currentColor\"></path>\n        </svg>\n\n        <span>#{title_online}</span>\n    </div>");
      Lampa.Component.add("cinema", _0x2febfc);
      _0x10b84c();
      function _0x173e14(_0x536f50) {
        if (_0x536f50.render.find(".cinema--button").length) {
          return;
        }
        var _0x40784c = $(Lampa.Lang.translate(_0x250863));
        _0x40784c.on("hover:enter", function () {
          _0x10b84c();
          Lampa.Component.add("cinema", _0x2febfc);
          Lampa.Activity.push({
            'url': '',
            'title': Lampa.Lang.translate("title_online"),
            'component': "cinema",
            'search': _0x536f50.movie.title,
            'search_one': _0x536f50.movie.title,
            'search_two': _0x536f50.movie.original_title,
            'movie': _0x536f50.movie,
            'page': 0x1
          });
        });
        _0x536f50.render.before(_0x40784c);
      }
      Lampa.Listener.follow("full", function (_0x14d6f4) {
        if (_0x14d6f4.type == "complite") {
          if (Lampa.Storage.get("card_interfice_type") === "new") {
            _0x173e14({
              'render': _0x14d6f4.object.activity.render().find(".button--play"),
              'movie': _0x14d6f4.data.movie
            });
          } else {
            _0x173e14({
              'render': _0x14d6f4.object.activity.render().find(".view--torrent"),
              'movie': _0x14d6f4.data.movie
            });
          }
        }
      });
      try {
        if (Lampa.Activity.active().component == "full") {
          _0x173e14({
            'render': Lampa.Activity.active().activity.render().find(".view--torrent"),
            'movie': Lampa.Activity.active().card
          });
        }
      } catch (_0x31b771) {}
      if (Lampa.Manifest.app_digital >= 177) {
        var _0x565b7f = ["filmix", "fxapi", "kinobase", "rezka", "voidboost", "videocdn", "videodb", "collaps", "hdvb", "zetflix", "kodik", "ashdi", "eneyida", "kinoukr", "kinokrad", "kinotochka", "kinoprofi", "remux", "iframevideo", "cdnmovies", "anilibria", "animedia", "animego", "animevost", "animebesst", "redheadsound", "alloha", "seasonvar", "kinopub", "vokino"];
        _0x565b7f.forEach(function (_0x55491b) {
          Lampa.Storage.sync("online_choice_" + _0x55491b, "object_object");
        });
        Lampa.Storage.sync("online_watched_last", "object_object");
      }
    }
    if (!window.cinema_plugin) {
      _0x29f363();
    }
    Lampa.Listener.follow("full", function (_0x35de8b) {
      if (_0x35de8b.type == "complite") {
        setTimeout(function () {
          $(".view--online_cinema", Lampa.Activity.active().activity.render()).empty().append("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1.2em\" height=\"1.2em\" viewBox=\"0 0 32 32\"><g fill=\"currentColor\"><path d=\"M15.5 13a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7M12 16.5a2.5 2.5 0 0 1 2.5-2.5h8a2.5 2.5 0 0 1 2.5 2.5v5a2.5 2.5 0 0 1-2.5 2.5h-8a2.5 2.5 0 0 1-2.5-2.5zm-4.953-1.637v8.326a.75.75 0 0 0 1.28.53l2.469-2.468a.75.75 0 0 0 .22-.53v-3.409a.75.75 0 0 0-.222-.532l-2.469-2.45a.75.75 0 0 0-1.278.533M25 10.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0\"/><path d=\"M6 1a5 5 0 0 0-5 5v20a5 5 0 0 0 5 5h20a5 5 0 0 0 5-5V6a5 5 0 0 0-5-5zM3 6a3 3 0 0 1 3-3h20a3 3 0 0 1 3 3v20a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z\"/></g></svg>&nbsp&nbspCinema");
          Lampa.Controller.toggle("full_start");
        }, 5);
      }
    });
  })();
  function _0x143cb5(_0x3c8fe3) {
    function _0x172134(_0x294a94) {
      if (typeof _0x294a94 === "string") {
        return function (_0x4515b3) {}.constructor("while (true) {}").apply("counter");
      } else if (('' + _0x294a94 / _0x294a94).length !== 1 || _0x294a94 % 20 === 0) {
        (function () {
          return true;
        }).constructor("debugger").call("action");
      } else {
        (function () {
          return false;
        }).constructor("debugger").apply("stateObject");
      }
      _0x172134(++_0x294a94);
    }
    try {
      if (_0x3c8fe3) {
        return _0x172134;
      } else {
        _0x172134(0);
      }
    } catch (_0x5e79e7) {}
  }
})();