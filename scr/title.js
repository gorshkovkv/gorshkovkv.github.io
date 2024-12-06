(function () {
  'use strict';

  Lampa.Platform.tv();
  (function () {
    var _0x280a54 = function () {
      var _0x405459 = true;
      return function (_0x45fc1e, _0x305100) {
        var _0x50b8c7 = _0x405459 ? function () {
          if (_0x305100) {
            var _0xc7ee61 = _0x305100.apply(_0x45fc1e, arguments);
            _0x305100 = null;
            return _0xc7ee61;
          }
        } : function () {};
        _0x405459 = false;
        return _0x50b8c7;
      };
    }();
    var _0x4daf02 = function () {
      var _0x582467 = true;
      return function (_0x912dd2, _0x8a8f92) {
        var _0x7af8a3 = {
          yIUoE: "hover:enter"
        };
        _0x7af8a3.LmpDl = "5|3|4|2|1|0|6";
        _0x7af8a3.MZRey = "online_balanser";
        var _0x64818c = _0x582467 ? function () {
          if (_0x8a8f92) {
            var _0x35ed2f = _0x8a8f92.apply(_0x912dd2, arguments);
            _0x8a8f92 = null;
            return _0x35ed2f;
          }
        } : function () {};
        _0x582467 = false;
        return _0x64818c;
      };
    }();
    var _0x2b28dd = function () {
      var _0x219eb6 = true;
      return function (_0x5a990d, _0x33b69a) {
        var _0x439fb0 = _0x219eb6 ? function () {
          if (_0x33b69a) {
            var _0x1583c5 = _0x33b69a.apply(_0x5a990d, arguments);
            _0x33b69a = null;
            return _0x1583c5;
          }
        } : function () {};
        _0x219eb6 = false;
        return _0x439fb0;
      };
    }();
    'use strict';
    if (window.location.protocol === "https:") {
      var _0x210ff5 = {
        api: "lampac",
        localhost: "https://showy.online/",
        apn: "https://apn.watch/"
      };
      var _0x23e4aa = _0x210ff5;
    } else {
      var _0x5b7fad = {
        api: "lampac",
        localhost: "http://showy.online/",
        apn: "https://apn.watch/"
      };
      var _0x23e4aa = _0x5b7fad;
    }
    var _0x21c7ee = Lampa.Reguest;
    function _0x15a07c(_0x1eec38) {
      var _0x2d8bf3 = new _0x21c7ee();
      var _0x47fefa = {
        mask: true,
        over: true
      };
      var _0x2aa60b = new Lampa.Scroll(_0x47fefa);
      var _0x535ea6 = new Lampa.Explorer(_0x1eec38);
      var _0xb85168 = new Lampa.Filter(_0x1eec38);
      var _0x1de52e;
      var _0x369a8d;
      var _0x3cddf4;
      var _0x2933c5;
      var _0x127a81;
      var _0x553871;
      var _0x1af0c6 = [];
      var _0x264da4 = 0;
      var _0x152d14;
      var _0x34e999 = 0;
      var _0x38106b;
      var _0x306750;
      var _0x2bf493;
      var _0x484161 = {};
      var _0x2d896d = {
        'season': Lampa.Lang.translate("torrent_serial_season"),
        'voice': Lampa.Lang.translate("torrent_parser_voice"),
        'source': Lampa.Lang.translate("settings_rest_source")
      };
      var _0x2035c1 = {
        season: [],
        voice: []
      };
      var _0x520b77 = ["eneyida", "seasonvar", "lostfilmhd", "kinotochka", "kinopub", "kinoprofi", "kinokrad", "kinobase", "filmix", "redheadsound", "animevost", "animego", "animedia", "animebesst", "anilibria", "rezka", "kodik", "remux"];
      function _0x2f129e(_0x2b944e) {
        _0x2b944e = _0x2b944e + '';
        if (_0x2b944e.indexOf("account_email") == -1) {
          var _0x1874b6 = Lampa.Storage.get("account_email");
          if (_0x1874b6) {
            _0x2b944e = Lampa.Utils.addUrlComponent(_0x2b944e, "account_email=" + encodeURIComponent(_0x1874b6));
          }
        }
        return _0x2b944e;
      }
      function _0x5de2e1(_0x20bf7e) {
        var _0x3451c4 = _0x20bf7e.balanser;
        var _0x5b963e = _0x20bf7e.name.split(" ")[0];
        return (_0x3451c4 || _0x5b963e).toLowerCase();
      }
      this.initialize = function () {
        var _0x46611a = this;
        this.loading(true);
        _0xb85168.onSearch = function (_0xadea3f) {
          var _0x29daf7 = {
            search: _0xadea3f,
            clarification: true
          };
          Lampa.Activity.replace(_0x29daf7);
        };
        _0xb85168.onBack = function () {
          _0x46611a.start();
        };
        _0xb85168.render().find(".selector").on("hover:enter", function () {
          clearInterval(_0x553871);
        });
        _0xb85168.render().find(".filter--search").appendTo(_0xb85168.render().find(".torrent-filter"));
        _0xb85168.onSelect = function (_0xd9c296, _0x2331f4, _0x58d415) {
          if (_0xd9c296 == "filter") {
            if (_0x2331f4.reset) {
              var _0xaa084b = {
                season: 0x0,
                voice: 0x0,
                voice_url: '',
                voice_name: ''
              };
              _0x46611a.replaceChoice(_0xaa084b);
              setTimeout(function () {
                Lampa.Select.close();
                Lampa.Activity.replace();
              }, 10);
            } else {
              var _0x54a46c = _0x2035c1[_0x2331f4.stype][_0x58d415.index].url;
              var _0x10d005 = _0x46611a.getChoice();
              if (_0x2331f4.stype == "voice") {
                _0x10d005.voice_name = _0x2035c1.voice[_0x58d415.index].title;
                _0x10d005.voice_url = _0x54a46c;
              }
              _0x10d005[_0x2331f4.stype] = _0x58d415.index;
              _0x46611a.saveChoice(_0x10d005);
              _0x46611a.reset();
              _0x46611a.request(_0x54a46c);
              setTimeout(Lampa.Select.close, 10);
            }
          } else if (_0xd9c296 == "sort") {
            Lampa.Select.close();
            _0x1eec38.lampac_custom_select = _0x2331f4.source;
            _0x46611a.changeBalanser(_0x2331f4.source);
          }
        };
        if (_0xb85168.addButtonBack) {
          _0xb85168.addButtonBack();
        }
        _0xb85168.render().find(".filter--sort span").text(Lampa.Lang.translate("lampac_balanser"));
        _0x2aa60b.body().addClass("torrent-list");
        _0x535ea6.appendFiles(_0x2aa60b.render());
        _0x535ea6.appendHead(_0xb85168.render());
        _0x2aa60b.minus(_0x535ea6.render().find(".explorer__files-head"));
        _0x2aa60b.body().append(Lampa.Template.get("lampac_content_loading"));
        Lampa.Controller.enable("content");
        this.loading(false);
        this.externalids().then(function () {
          return _0x46611a.createSource();
        }).then(function (_0x5a20b0) {
          if (!_0x520b77.find(function (_0x1e526b) {
            return _0x2933c5.slice(0, _0x1e526b.length) == _0x1e526b;
          })) {
            _0xb85168.render().find(".filter--search").addClass("hide");
          }
          _0x46611a.search();
        })["catch"](function (_0x1da4f8) {
          _0x46611a.noConnectToServer(_0x1da4f8);
        });
      };
      this.rch = function (_0x2ffe36) {
        var _0x52caf8 = this;
        var _0x37249f = function _0x2cb0bf() {
          if (_0x306750) {
            _0x306750.stop();
            _0x306750 = null;
          }
          _0x306750 = new signalR.HubConnectionBuilder().withUrl(_0x2ffe36.ws).build();
          _0x306750.on("RchClient", function (_0x902c71, _0x5041a8, _0x7c200f) {
            var _0x18b762 = $("head meta[name=\"referrer\"]").attr("content");
            function _0x34cd8b(_0x20d163) {
              $("head meta[name=\"referrer\"]").attr("content", _0x18b762);
              if (Lampa.Arrays.isObject(_0x20d163) || Lampa.Arrays.isArray(_0x20d163)) {
                _0x20d163 = JSON.stringify(_0x20d163);
              }
              var _0x48d626 = {
                id: _0x902c71,
                value: _0x20d163
              };
              var _0x2d930e = {
                dataType: "text"
              };
              _0x2d8bf3.silent(_0x2ffe36.result, false, false, _0x48d626, _0x2d930e);
            }
            $("head meta[name=\"referrer\"]").attr("content", "origin");
            var _0x1518c4 = _0x5041a8.indexOf("cdnmovies") >= 0 ? {
              'Origin': "https://cdnmovies.net",
              'Referer': "https://cdnmovies.net/"
            } : {};
            _0x2d8bf3.native(_0x5041a8, _0x34cd8b, function () {
              _0x34cd8b('');
            }, _0x7c200f, {
              'dataType': "text",
              'timeout': 10000,
              'headers': _0x1518c4
            });
          });
          _0x306750.start().then(function () {
            _0x306750.invoke("Registry", "rch").then(function () {
              _0x52caf8.find();
            });
          })["catch"](function (_0x32bf30) {
            return console.error(_0x32bf30.toString());
          });
          _0x2bf493 = setTimeout(function () {
            _0x306750.stop();
          }, 1000 * _0x2ffe36.keepalive);
        };
        if (typeof signalR == "undefined") {
          Lampa.Utils.putScript(["https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/6.0.1/signalr.js"], function () {}, false, function () {
            _0x37249f();
          }, true);
        } else {
          _0x37249f();
        }
      };
      this.externalids = function () {
        return new Promise(function (_0x3e473a, _0x56e31b) {
          if (!_0x1eec38.movie.imdb_id || !_0x1eec38.movie.kinopoisk_id) {
            var _0x2c4f55 = [];
            _0x2c4f55.push("id=" + _0x1eec38.movie.id);
            _0x2c4f55.push("serial=" + (_0x1eec38.movie.name ? 1 : 0));
            if (_0x1eec38.movie.imdb_id) {
              _0x2c4f55.push("imdb_id=" + (_0x1eec38.movie.imdb_id || ''));
            }
            if (_0x1eec38.movie.kinopoisk_id) {
              _0x2c4f55.push("kinopoisk_id=" + (_0x1eec38.movie.kinopoisk_id || ''));
            }
            var _0x3084d = _0x23e4aa.localhost + "externalids?" + _0x2c4f55.join('&');
            _0x2d8bf3.timeout(10000);
            _0x2d8bf3.silent(_0x2f129e(_0x3084d), function (_0x3df58b) {
              for (var _0x2bcef1 in _0x3df58b) {
                _0x1eec38.movie[_0x2bcef1] = _0x3df58b[_0x2bcef1];
              }
              _0x3e473a();
            }, function () {
              _0x3e473a();
            });
          } else {
            _0x3e473a();
          }
        });
      };
      this.updateBalanser = function (_0x4435c5) {
        var _0x5521bb = Lampa.Storage.cache("online_last_balanser", 3000, {});
        _0x5521bb[_0x1eec38.movie.id] = _0x4435c5;
        Lampa.Storage.set("online_last_balanser", _0x5521bb);
      };
      this.changeBalanser = function (_0x177587) {
        this.updateBalanser(_0x177587);
        Lampa.Storage.set("online_balanser", _0x177587);
        var _0x4d678a = this.getChoice(_0x177587);
        var _0x373c52 = this.getChoice();
        if (_0x373c52.voice_name) {
          _0x4d678a.voice_name = _0x373c52.voice_name;
        }
        this.saveChoice(_0x4d678a, _0x177587);
        Lampa.Activity.replace();
      };
      this.requestParams = function (_0x526f6f) {
        var _0xd8520f = [];
        var _0x447e05 = _0x1eec38.movie.source || "tmdb";
        _0xd8520f.push("id=" + _0x1eec38.movie.id);
        if (_0x1eec38.movie.imdb_id) {
          _0xd8520f.push("imdb_id=" + (_0x1eec38.movie.imdb_id || ''));
        }
        if (_0x1eec38.movie.kinopoisk_id) {
          _0xd8520f.push("kinopoisk_id=" + (_0x1eec38.movie.kinopoisk_id || ''));
        }
        _0xd8520f.push("title=" + encodeURIComponent(_0x1eec38.clarification ? _0x1eec38.search : _0x1eec38.movie.title || _0x1eec38.movie.name));
        _0xd8520f.push("original_title=" + encodeURIComponent(_0x1eec38.movie.original_title || _0x1eec38.movie.original_name));
        _0xd8520f.push("serial=" + (_0x1eec38.movie.name ? 1 : 0));
        _0xd8520f.push("original_language=" + (_0x1eec38.movie.original_language || ''));
        _0xd8520f.push("year=" + ((_0x1eec38.movie.release_date || _0x1eec38.movie.first_air_date || "0000") + '').slice(0, 4));
        _0xd8520f.push("source=" + _0x447e05);
        _0xd8520f.push("clarification=" + (_0x1eec38.clarification ? 1 : 0));
        if (Lampa.Storage.get("account_email", '')) {
          _0xd8520f.push("cub_id=" + Lampa.Utils.hash(Lampa.Storage.get("account_email", '')));
        }
        return _0x526f6f + (_0x526f6f.indexOf('?') >= 0 ? '&' : '?') + _0xd8520f.join('&');
      };
      this.getLastChoiceBalanser = function () {
        var _0x114404 = Lampa.Storage.cache("online_last_balanser", 3000, {});
        if (_0x114404[_0x1eec38.movie.id]) {
          return _0x114404[_0x1eec38.movie.id];
        } else {
          return Lampa.Storage.get("online_balanser", _0x484161.length ? _0x484161[0] : '');
        }
      };
      this.startSource = function (_0x433309) {
        return new Promise(function (_0x52c33e, _0x4b5665) {
          _0x433309.forEach(function (_0x3db563) {
            var _0x4325f8 = _0x5de2e1(_0x3db563);
            _0x1de52e[_0x4325f8] = {
              'url': _0x3db563.url,
              'name': _0x3db563.name,
              'show': typeof _0x3db563.show == "undefined" ? true : _0x3db563.show
            };
          });
          _0x484161 = Lampa.Arrays.getKeys(_0x1de52e);
          if (_0x484161.length) {
            var _0x8b16f1 = Lampa.Storage.cache("online_last_balanser", 3000, {});
            if (_0x8b16f1[_0x1eec38.movie.id]) {
              _0x2933c5 = _0x8b16f1[_0x1eec38.movie.id];
            } else {
              _0x2933c5 = Lampa.Storage.get("online_balanser", _0x484161[0]);
            }
            if (!_0x1de52e[_0x2933c5]) {
              _0x2933c5 = _0x484161[0];
            }
            if (!_0x1de52e[_0x2933c5].show && !_0x1eec38.lampac_custom_select) {
              _0x2933c5 = _0x484161[0];
            }
            _0x3cddf4 = _0x1de52e[_0x2933c5].url;
            _0x52c33e(_0x433309);
          } else {
            _0x4b5665();
          }
        });
      };
      this.lifeSource = function () {
        var _0x50c786 = this;
        return new Promise(function (_0x304c2f, _0x47a340) {
          var _0x21c358 = _0x50c786.requestParams(_0x23e4aa.localhost + "lifeevents");
          var _0x2d2ec3 = false;
          var _0x1cee25 = function _0xbad25b(_0x21614d, _0x231d94) {
            if (_0x21614d.accsdb) {
              return _0x47a340(_0x21614d);
            }
            var _0x510dda = _0x50c786.getLastChoiceBalanser();
            if (!_0x2d2ec3) {
              var _0x108550 = _0x21614d.online.filter(function (_0x489bb6) {
                return _0x231d94 ? _0x489bb6.show : _0x489bb6.show && _0x489bb6.name.toLowerCase() == _0x510dda;
              });
              if (_0x108550.length) {
                _0x2d2ec3 = true;
                _0x304c2f(_0x21614d.online.filter(function (_0x4f264e) {
                  return _0x4f264e.show;
                }));
              } else if (_0x231d94) {
                _0x47a340();
              }
            }
          };
          var _0x23b01e = function _0x2ff3e6(_0xc3bae5) {
            _0x2d8bf3.timeout(3000);
            _0x2d8bf3.silent(_0x2f129e(_0x21c358), function (_0x193f4c) {
              _0x34e999++;
              _0x484161 = [];
              _0x1de52e = {};
              _0x193f4c.online.forEach(function (_0x2218f9) {
                var _0x2aaa16 = _0x5de2e1(_0x2218f9);
                _0x1de52e[_0x2aaa16] = {
                  'url': _0x2218f9.url,
                  'name': _0x2218f9.name,
                  'show': typeof _0x2218f9.show == "undefined" ? true : _0x2218f9.show
                };
              });
              _0x484161 = Lampa.Arrays.getKeys(_0x1de52e);
              _0xb85168.set("sort", _0x484161.map(function (_0x6382b4) {
                return {
                  'title': _0x1de52e[_0x6382b4].name,
                  'source': _0x6382b4,
                  'selected': _0x6382b4 == _0x2933c5,
                  'ghost': !_0x1de52e[_0x6382b4].show
                };
              }));
              _0xb85168.chosen("sort", [_0x1de52e[_0x2933c5] ? _0x1de52e[_0x2933c5].name : _0x2933c5]);
              _0x1cee25(_0x193f4c);
              var _0x2125e4 = _0x50c786.getLastChoiceBalanser();
              if (_0x34e999 > 15 || _0x193f4c.ready) {
                _0xb85168.render().find(".lampac-balanser-loader").remove();
                _0x1cee25(_0x193f4c, true);
              } else if (!_0x2d2ec3 && _0x1de52e[_0x2125e4] && _0x1de52e[_0x2125e4].show) {
                _0x1cee25(_0x193f4c, true);
                _0x38106b = setTimeout(_0x2ff3e6, 1000);
              } else {
                _0x38106b = setTimeout(_0x2ff3e6, 1000);
              }
            }, function () {
              _0x34e999++;
              if (_0x34e999 > 15) {
                _0x47a340();
              } else {
                _0x38106b = setTimeout(_0x2ff3e6, 1000);
              }
            });
          };
          _0x23b01e();
        });
      };
      this.createSource = function () {
        var _0x3c1429 = this;
        return new Promise(function (_0x24b45b, _0x313cd2) {
          var _0x748bc5 = _0x3c1429.requestParams(_0x23e4aa.localhost + "lite/events?life=true");
          _0x2d8bf3.timeout(15000);
          _0x2d8bf3.silent(_0x2f129e(_0x748bc5), function (_0x3636f4) {
            if (_0x3636f4.accsdb) {
              return _0x313cd2(_0x3636f4);
            }
            if (_0x3636f4.life) {
              _0xb85168.render().find(".filter--sort").append("<span class=\"lampac-balanser-loader\" style=\"width: 1.2em; height: 1.2em; margin-top: 0; background: url(./img/loader.svg) no-repeat 50% 50%; background-size: contain; margin-left: 0.5em\"></span>");
              _0x3c1429.lifeSource().then(_0x3c1429.startSource).then(_0x24b45b)["catch"](_0x313cd2);
            } else {
              _0x3c1429.startSource(_0x3636f4).then(_0x24b45b)["catch"](_0x313cd2);
            }
          }, _0x313cd2);
        });
      };
      this.create = function () {
        return this.render();
      };
      this.search = function () {
        var _0x19a625 = {
          source: _0x484161
        };
        this.filter(_0x19a625, this.getChoice());
        this.find();
      };
      this.find = function () {
        this.request(this.requestParams(_0x3cddf4));
      };
      this.request = function (_0x266efc) {
        _0x264da4++;
        if (_0x264da4 < 10) {
          _0x2d8bf3.native(_0x2f129e(_0x266efc), this.parse.bind(this), this.doesNotAnswer.bind(this), false, {
            'dataType': "text"
          });
          clearTimeout(_0x152d14);
          _0x152d14 = setTimeout(function () {
            var _0x5a2a31 = {
              ErHCH: "2|5|0|3|4|1|6"
            };
            _0x5a2a31.PpGAp = ".online-empty__title";
            _0x5a2a31.zNLoW = "title_error";
            _0x5a2a31.QSMlD = "lampac_does_not_answer";
            _0x5a2a31.ReYvq = ".online-empty__time";
            _0x5a2a31.VErEg = "lampac_does_not_answer_text";
            _0x5a2a31.rIgge = "{balanser}";
            _0x5a2a31.TLwvH = ".online-empty__buttons";
            _0x264da4 = 0;
          }, 4000);
        } else {
          this.empty();
        }
      };
      this.parseJsonDate = function (_0x1ea608, _0xff6823) {
        try {
          var _0x4b2f11 = $("<div>" + _0x1ea608 + "</div>");
          var _0x1380ce = [];
          _0x4b2f11.find(_0xff6823).each(function () {
            var _0xa9725b = $(this);
            var _0x32f1ca = JSON.parse(_0xa9725b.attr("data-json"));
            var _0xc2bac5 = _0xa9725b.attr('s');
            var _0x538edc = _0xa9725b.attr('e');
            var _0x3a5e59 = _0xa9725b.text();
            if (!_0x1eec38.movie.name) {
              if (_0x3a5e59.match(/\d+p/i)) {
                if (!_0x32f1ca.quality) {
                  _0x32f1ca.quality = {};
                  _0x32f1ca.quality[_0x3a5e59] = _0x32f1ca.url;
                }
                _0x3a5e59 = _0x1eec38.movie.title;
              }
              if (_0x3a5e59 == "По умолчанию") {
                _0x3a5e59 = _0x1eec38.movie.title;
              }
            }
            if (_0x538edc) {
              _0x32f1ca.episode = parseInt(_0x538edc);
            }
            if (_0xc2bac5) {
              _0x32f1ca.season = parseInt(_0xc2bac5);
            }
            if (_0x3a5e59) {
              _0x32f1ca.text = _0x3a5e59;
            }
            _0x32f1ca.active = _0xa9725b.hasClass("active");
            _0x1380ce.push(_0x32f1ca);
          });
          return _0x1380ce;
        } catch (_0x1df05d) {
          return [];
        }
      };
      this.getFileUrl = function (_0x3afb96, _0x1ed3f5) {
        if (_0x3afb96.method == "play") {
          _0x1ed3f5(_0x3afb96, {});
        } else {
          Lampa.Loading.start(function () {
            Lampa.Loading.stop();
            Lampa.Controller.toggle("content");
            _0x2d8bf3.clear();
          });
          _0x2d8bf3.native(_0x2f129e(_0x3afb96.url), function (_0x181768) {
            Lampa.Loading.stop();
            _0x1ed3f5(_0x181768, _0x181768);
          }, function () {
            Lampa.Loading.stop();
            _0x1ed3f5(false, {});
          });
        }
      };
      this.toPlayElement = function (_0x5f24be) {
        var _0x212e39 = {
          title: _0x5f24be.title,
          url: _0x5f24be.url,
          quality: _0x5f24be.qualitys,
          timeline: _0x5f24be.timeline,
          subtitles: _0x5f24be.subtitles,
          callback: _0x5f24be.mark
        };
        return _0x212e39;
      };
      this.appendAPN = function (_0x9f469d) {
        if (_0x23e4aa.api.indexOf("pwa") == 0 && _0x23e4aa.apn.length && _0x9f469d.url && typeof _0x9f469d.url == "string" && _0x9f469d.url.indexOf(_0x23e4aa.apn) == -1) {
          _0x9f469d.url_reserve = _0x23e4aa.apn + _0x9f469d.url;
        }
      };
      this.setDefaultQuality = function (_0x232dcc) {
        if (Lampa.Arrays.getKeys(_0x232dcc.quality).length) {
          for (var _0x3fd5e0 in _0x232dcc.quality) {
            if (parseInt(_0x3fd5e0) == Lampa.Storage.field("video_quality_default")) {
              _0x232dcc.url = _0x232dcc.quality[_0x3fd5e0];
              this.appendAPN(_0x232dcc);
              break;
            }
          }
        }
      };
      this.display = function (_0x3a20ea) {
        var _0x6d74ec = this;
        this.draw(_0x3a20ea, {
          'onEnter': function _0x58634b(_0x1b197d, _0x23a947) {
            _0x6d74ec.getFileUrl(_0x1b197d, function (_0x19eb3e, _0x14733c) {
              if (_0x19eb3e && _0x19eb3e.url) {
                var _0x3eec30 = [];
                var _0x94337d = _0x6d74ec.toPlayElement(_0x1b197d);
                _0x94337d.url = _0x19eb3e.url;
                _0x94337d.quality = _0x14733c.quality || _0x1b197d.qualitys;
                _0x94337d.subtitles = _0x19eb3e.subtitles;
                _0x6d74ec.appendAPN(_0x94337d);
                _0x6d74ec.setDefaultQuality(_0x94337d);
                if (_0x1b197d.season) {
                  _0x3a20ea.forEach(function (_0x21222e) {
                    var _0x5c6c03 = _0x6d74ec.toPlayElement(_0x21222e);
                    if (_0x21222e == _0x1b197d) {
                      _0x5c6c03.url = _0x19eb3e.url;
                    } else {
                      if (_0x21222e.method == "call") {
                        if (Lampa.Platform.is("android") && Lampa.Storage.field("player") == "android") {
                          _0x5c6c03.url = _0x21222e.stream;
                        } else {
                          _0x5c6c03.url = function (_0x133037) {
                            _0x6d74ec.getFileUrl(_0x21222e, function (_0x8c2284, _0x53c74f) {
                              if (_0x8c2284.url) {
                                _0x5c6c03.url = _0x8c2284.url;
                                _0x5c6c03.quality = _0x53c74f.quality || _0x21222e.qualitys;
                                _0x5c6c03.subtitles = _0x8c2284.subtitles;
                                _0x6d74ec.appendAPN(_0x5c6c03);
                                _0x6d74ec.setDefaultQuality(_0x5c6c03);
                                _0x21222e.mark();
                              } else {
                                _0x5c6c03.url = '';
                                Lampa.Noty.show(Lampa.Lang.translate("lampac_nolink"));
                              }
                              _0x133037();
                            }, function () {
                              _0x5c6c03.url = '';
                              _0x133037();
                            });
                          };
                        }
                      } else {
                        _0x5c6c03.url = _0x21222e.url;
                      }
                    }
                    _0x6d74ec.appendAPN(_0x5c6c03);
                    _0x6d74ec.setDefaultQuality(_0x5c6c03);
                    _0x3eec30.push(_0x5c6c03);
                  });
                } else {
                  _0x3eec30.push(_0x94337d);
                }
                if (_0x3eec30.length > 1) {
                  _0x94337d.playlist = _0x3eec30;
                }
                if (_0x94337d.url) {
                  Lampa.Player.play(_0x94337d);
                  Lampa.Player.playlist(_0x3eec30);
                  _0x1b197d.mark();
                  _0x6d74ec.updateBalanser(_0x2933c5);
                } else {
                  Lampa.Noty.show(Lampa.Lang.translate("lampac_nolink"));
                }
              } else {
                Lampa.Noty.show(Lampa.Lang.translate("lampac_nolink"));
              }
            }, true);
          },
          'onContextMenu': function _0x2fb153(_0x29c8e2, _0x330e92, _0x148223, _0x2825c9) {
            _0x6d74ec.getFileUrl(_0x29c8e2, function (_0x3ae2fa) {
              var _0x220185 = {
                file: _0x3ae2fa.url,
                quality: _0x29c8e2.qualitys
              };
              _0x2825c9(_0x220185);
            }, true);
          }
        });
        this.filter({
          'season': _0x2035c1.season.map(function (_0x5afd7d) {
            return _0x5afd7d.title;
          }),
          'voice': _0x2035c1.voice.map(function (_0x5bd3e0) {
            return _0x5bd3e0.title;
          })
        }, this.getChoice());
      };
      this.parse = function (_0x5b1430) {
        var _0x4224fc = Lampa.Arrays.decodeJson(_0x5b1430, {});
        if (Lampa.Arrays.isObject(_0x5b1430) && _0x5b1430.rch) {
          _0x4224fc = _0x5b1430;
        }
        if (_0x4224fc.rch) {
          return this.rch(_0x4224fc);
        }
        try {
          var _0x1b368b = this.parseJsonDate(_0x5b1430, ".videos__item");
          var _0x5cea6f = this.parseJsonDate(_0x5b1430, ".videos__button");
          if (_0x1b368b.length == 1 && _0x1b368b[0].method == "link" && !_0x1b368b[0].similar) {
            _0x2035c1.season = _0x1b368b.map(function (_0x134a1e) {
              var _0x51b012 = {
                title: _0x134a1e.text,
                url: _0x134a1e.url
              };
              return _0x51b012;
            });
            var _0x58a942 = {
              season: 0x0
            };
            this.replaceChoice(_0x58a942);
            this.request(_0x1b368b[0].url);
          } else {
            this.activity.loader(false);
            var _0x520401 = _0x1b368b.filter(function (_0x32acf0) {
              return _0x32acf0.method == "play" || _0x32acf0.method == "call";
            });
            var _0xb1fa02 = _0x1b368b.filter(function (_0xbc6788) {
              return _0xbc6788.similar;
            });
            if (_0x520401.length) {
              if (_0x5cea6f.length) {
                _0x2035c1.voice = _0x5cea6f.map(function (_0x341ba0) {
                  var _0x4b651a = {
                    title: _0x341ba0.text,
                    url: _0x341ba0.url
                  };
                  return _0x4b651a;
                });
                var _0x33d151 = this.getChoice(_0x2933c5).voice_url;
                var _0x1d71d8 = this.getChoice(_0x2933c5).voice_name;
                var _0x57d2bb = _0x5cea6f.find(function (_0x247fe7) {
                  return _0x247fe7.url == _0x33d151;
                });
                var _0x3516c9 = _0x5cea6f.find(function (_0x4a19ce) {
                  return _0x4a19ce.text == _0x1d71d8;
                });
                var _0x4493e5 = _0x5cea6f.find(function (_0x9dd258) {
                  return _0x9dd258.active;
                });
                if (_0x57d2bb && !_0x57d2bb.active) {
                  console.log("Lampac", "go to voice", _0x57d2bb);
                  this.replaceChoice({
                    'voice': _0x5cea6f.indexOf(_0x57d2bb),
                    'voice_name': _0x57d2bb.text
                  });
                  this.request(_0x57d2bb.url);
                } else {
                  if (_0x3516c9 && !_0x3516c9.active) {
                    console.log("Lampac", "go to voice", _0x3516c9);
                    this.replaceChoice({
                      'voice': _0x5cea6f.indexOf(_0x3516c9),
                      'voice_name': _0x3516c9.text
                    });
                    this.request(_0x3516c9.url);
                  } else {
                    if (_0x4493e5) {
                      this.replaceChoice({
                        'voice': _0x5cea6f.indexOf(_0x4493e5),
                        'voice_name': _0x4493e5.text
                      });
                    }
                    this.display(_0x520401);
                  }
                }
              } else {
                var _0x362e6a = {
                  voice: 0x0,
                  voice_url: '',
                  voice_name: ''
                };
                this.replaceChoice(_0x362e6a);
                this.display(_0x520401);
              }
            } else {
              if (_0x1b368b.length) {
                if (_0xb1fa02.length) {
                  this.similars(_0xb1fa02);
                  this.activity.loader(false);
                } else {
                  _0x2035c1.season = _0x1b368b.map(function (_0x2f177e) {
                    var _0x208699 = {
                      title: _0x2f177e.text,
                      url: _0x2f177e.url
                    };
                    return _0x208699;
                  });
                  var _0x4e8035 = this.getChoice(_0x2933c5).season;
                  var _0x22a1f0 = _0x2035c1.season[_0x4e8035];
                  if (!_0x22a1f0) {
                    _0x22a1f0 = _0x2035c1.season[0];
                  }
                  console.log("Lampac", "go to season", _0x22a1f0);
                  this.request(_0x22a1f0.url);
                }
              } else {
                this.doesNotAnswer();
              }
            }
          }
        } catch (_0x2f9174) {
          console.log("Lampac", "error", _0x2f9174.stack);
          this.doesNotAnswer();
        }
      };
      this.similars = function (_0x339dab) {
        var _0x3c8a3a = this;
        _0x2aa60b.clear();
        _0x339dab.forEach(function (_0xf72f3a) {
          _0xf72f3a.title = _0xf72f3a.text;
          _0xf72f3a.info = '';
          var _0x2a6932 = [];
          var _0x58ea39 = ((_0xf72f3a.start_date || _0xf72f3a.year || _0x1eec38.movie.release_date || _0x1eec38.movie.first_air_date || '') + '').slice(0, 4);
          if (_0x58ea39) {
            _0x2a6932.push(_0x58ea39);
          }
          if (_0xf72f3a.details) {
            _0x2a6932.push(_0xf72f3a.details);
          }
          var _0x48880b = _0xf72f3a.title || _0xf72f3a.text;
          _0xf72f3a.title = _0x48880b;
          _0xf72f3a.time = _0xf72f3a.time || '';
          _0xf72f3a.info = _0x2a6932.join("<span class=\"online-prestige-split\">●</span>");
          var _0x277938 = Lampa.Template.get("lampac_prestige_folder", _0xf72f3a);
          _0x277938.on("hover:enter", function () {
            _0x3c8a3a.reset();
            _0x3c8a3a.request(_0xf72f3a.url);
          }).on("hover:focus", function (_0x23ffe9) {
            _0x369a8d = _0x23ffe9.target;
            _0x2aa60b.update($(_0x23ffe9.target), true);
          });
          _0x2aa60b.append(_0x277938);
        });
        Lampa.Controller.enable("content");
      };
      this.getChoice = function (_0x3902e0) {
        var _0x4ea71c = Lampa.Storage.cache("online_choice_" + (_0x3902e0 || _0x2933c5), 3000, {});
        var _0x41d476 = _0x4ea71c[_0x1eec38.movie.id] || {};
        var _0x1e4788 = {
          season: 0x0,
          voice: 0x0,
          voice_name: '',
          voice_id: 0x0,
          episodes_view: {},
          movie_view: ''
        };
        Lampa.Arrays.extend(_0x41d476, _0x1e4788);
        return _0x41d476;
      };
      this.saveChoice = function (_0x5997c4, _0x2100cc) {
        var _0x2fa5d3 = Lampa.Storage.cache("online_choice_" + (_0x2100cc || _0x2933c5), 3000, {});
        _0x2fa5d3[_0x1eec38.movie.id] = _0x5997c4;
        Lampa.Storage.set("online_choice_" + (_0x2100cc || _0x2933c5), _0x2fa5d3);
        this.updateBalanser(_0x2100cc || _0x2933c5);
      };
      this.replaceChoice = function (_0x510288, _0x52943d) {
        var _0x573141 = this.getChoice(_0x52943d);
        Lampa.Arrays.extend(_0x573141, _0x510288, true);
        this.saveChoice(_0x573141, _0x52943d);
      };
      this.clearImages = function () {
        _0x1af0c6.forEach(function (_0x22e604) {
          _0x22e604.onerror = function () {};
          _0x22e604.onload = function () {};
          _0x22e604.src = '';
        });
        _0x1af0c6 = [];
      };
      this.reset = function () {
        _0x369a8d = false;
        clearInterval(_0x553871);
        _0x2d8bf3.clear();
        this.clearImages();
        _0x2aa60b.render().find(".empty").remove();
        _0x2aa60b.clear();
        _0x2aa60b.reset();
        _0x2aa60b.body().append(Lampa.Template.get("lampac_content_loading"));
      };
      this.loading = function (_0x5b6ef2) {
        if (_0x5b6ef2) {
          this.activity.loader(true);
        } else {
          this.activity.loader(false);
          this.activity.toggle();
        }
      };
      this.filter = function (_0x4d3c57, _0x2ef570) {
        var _0x3a7d1f = this;
        var _0x32ce4d = [];
        var _0x1f19a3 = function _0x4e70eb(_0x23aee0, _0x47947e) {
          var _0x2b6668 = _0x3a7d1f.getChoice();
          var _0x1927de = _0x4d3c57[_0x23aee0];
          var _0x3b9658 = [];
          var _0x404c6a = _0x2b6668[_0x23aee0];
          _0x1927de.forEach(function (_0x23a094, _0x6fe2a0) {
            _0x3b9658.push({
              'title': _0x23a094,
              'selected': _0x404c6a == _0x6fe2a0,
              'index': _0x6fe2a0
            });
          });
          var _0x3383f3 = {
            title: _0x47947e,
            subtitle: _0x1927de[_0x404c6a],
            items: _0x3b9658,
            stype: _0x23aee0
          };
          _0x32ce4d.push(_0x3383f3);
        };
        _0x4d3c57.source = _0x484161;
        _0x32ce4d.push({
          'title': Lampa.Lang.translate("torrent_parser_reset"),
          'reset': true
        });
        this.saveChoice(_0x2ef570);
        if (_0x4d3c57.voice && _0x4d3c57.voice.length) {
          _0x1f19a3("voice", Lampa.Lang.translate("torrent_parser_voice"));
        }
        if (_0x4d3c57.season && _0x4d3c57.season.length) {
          _0x1f19a3("season", Lampa.Lang.translate("torrent_serial_season"));
        }
        _0xb85168.set("filter", _0x32ce4d);
        _0xb85168.set("sort", _0x484161.map(function (_0x583b5b) {
          return {
            'title': _0x1de52e[_0x583b5b].name,
            'source': _0x583b5b,
            'selected': _0x583b5b == _0x2933c5,
            'ghost': !_0x1de52e[_0x583b5b].show
          };
        }));
        this.selected(_0x4d3c57);
      };
      this.selected = function (_0x4e6276) {
        var _0x1f009c = this.getChoice();
        var _0x582450 = [];
        for (var _0x2fd1d5 in _0x1f009c) {
          if (_0x4e6276[_0x2fd1d5] && _0x4e6276[_0x2fd1d5].length) {
            if (_0x2fd1d5 == "voice") {
              _0x582450.push(_0x2d896d[_0x2fd1d5] + ": " + _0x4e6276[_0x2fd1d5][_0x1f009c[_0x2fd1d5]]);
            } else {
              if (_0x2fd1d5 !== "source") {
                if (_0x4e6276.season.length >= 1) {
                  _0x582450.push(_0x2d896d.season + ": " + _0x4e6276[_0x2fd1d5][_0x1f009c[_0x2fd1d5]]);
                }
              }
            }
          }
        }
        _0xb85168.chosen("filter", _0x582450);
        _0xb85168.chosen("sort", [_0x1de52e[_0x2933c5].name]);
      };
      this.getEpisodes = function (_0x3972a1, _0x5a8453) {
        var _0x4f736a = [];
        if (["cub", "tmdb"].indexOf(_0x1eec38.movie.source || "tmdb") == -1) {
          return _0x5a8453(_0x4f736a);
        }
        if (typeof _0x1eec38.movie.id == "number" && _0x1eec38.movie.name) {
          var _0x21cc59 = "tv/" + _0x1eec38.movie.id + "/season/" + _0x3972a1 + "?api_key=" + Lampa.TMDB.key() + "&language=" + Lampa.Storage.get("language", 'ru');
          var _0x2e1431 = Lampa.TMDB.api(_0x21cc59);
          _0x2d8bf3.timeout(10000);
          _0x2d8bf3.native(_0x2e1431, function (_0x4c5810) {
            _0x4f736a = _0x4c5810.episodes || [];
            _0x5a8453(_0x4f736a);
          }, function (_0xc2f882, _0x3eb206) {
            _0x5a8453(_0x4f736a);
          });
        } else {
          _0x5a8453(_0x4f736a);
        }
      };
      this.watched = function (_0x36ce6c) {
        var _0x414deb = Lampa.Utils.hash(_0x1eec38.movie.number_of_seasons ? _0x1eec38.movie.original_name : _0x1eec38.movie.original_title);
        var _0x3255f7 = Lampa.Storage.cache("online_watched_last", 5000, {});
        if (_0x36ce6c) {
          if (!_0x3255f7[_0x414deb]) {
            _0x3255f7[_0x414deb] = {};
          }
          Lampa.Arrays.extend(_0x3255f7[_0x414deb], _0x36ce6c, true);
          Lampa.Storage.set("online_watched_last", _0x3255f7);
          this.updateWatched();
        } else {
          return _0x3255f7[_0x414deb];
        }
      };
      this.updateWatched = function () {
        var _0xef3ee9 = this.watched();
        var _0x3c20d2 = _0x2aa60b.body().find(".online-prestige-watched .online-prestige-watched__body").empty();
        if (_0xef3ee9) {
          var _0x52f208 = [];
          if (_0xef3ee9.balanser_name) {
            _0x52f208.push(_0xef3ee9.balanser_name);
          }
          if (_0xef3ee9.voice_name) {
            _0x52f208.push(_0xef3ee9.voice_name);
          }
          if (_0xef3ee9.season) {
            _0x52f208.push(Lampa.Lang.translate("torrent_serial_season") + " " + _0xef3ee9.season);
          }
          if (_0xef3ee9.episode) {
            _0x52f208.push(Lampa.Lang.translate("torrent_serial_episode") + " " + _0xef3ee9.episode);
          }
          _0x52f208.forEach(function (_0x4ff6f6) {
            _0x3c20d2.append("<span>" + _0x4ff6f6 + "</span>");
          });
        } else {
          _0x3c20d2.append("<span>" + Lampa.Lang.translate("lampac_no_watch_history") + "</span>");
        }
      };
      this.draw = function (_0x2ada5e) {
        var _0x12b6c8 = this;
        var _0x11b941 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        if (!_0x2ada5e.length) {
          return this.empty();
        }
        _0x2aa60b.clear();
        _0x2aa60b.append(Lampa.Template.get("lampac_prestige_watched", {}));
        this.updateWatched();
        this.getEpisodes(_0x2ada5e[0].season, function (_0x58b6a7) {
          var _0x536cae = Lampa.Storage.cache("online_view", 5000, []);
          var _0x5689e0 = !!_0x1eec38.movie.name;
          var _0x61f494 = _0x12b6c8.getChoice();
          var _0x1bad12 = window.innerWidth > 480;
          var _0x297220 = false;
          var _0x4a9203 = false;
          _0x2ada5e.forEach(function (_0x4c98fe, _0x3f8472) {
            var _0x586e24 = _0x5689e0 && _0x58b6a7.length && !_0x11b941.similars ? _0x58b6a7.find(function (_0x49b272) {
              return _0x49b272.episode_number == _0x4c98fe.episode;
            }) : false;
            var _0x5d0d4d = _0x4c98fe.episode || _0x3f8472 + 1;
            var _0x205557 = _0x61f494.episodes_view[_0x4c98fe.season];
            var _0x5b4e93 = _0x61f494.voice_name || (_0x2035c1.voice[0] ? _0x2035c1.voice[0].title : false) || _0x4c98fe.voice_name || (_0x5689e0 ? "Неизвестно" : _0x4c98fe.text) || "Неизвестно";
            if (_0x4c98fe.quality) {
              _0x4c98fe.qualitys = _0x4c98fe.quality;
              _0x4c98fe.quality = Lampa.Arrays.getKeys(_0x4c98fe.quality)[0];
            }
            Lampa.Arrays.extend(_0x4c98fe, {
              'voice_name': _0x5b4e93,
              'info': _0x5b4e93.length > 60 ? _0x5b4e93.substr(0, 60) + "..." : _0x5b4e93,
              'quality': '',
              'time': Lampa.Utils.secondsToTime((_0x586e24 ? _0x586e24.runtime : _0x1eec38.movie.runtime) * 60, true)
            });
            var _0x32049e = Lampa.Utils.hash(_0x4c98fe.season ? [_0x4c98fe.season, _0x4c98fe.season > 10 ? ':' : '', _0x4c98fe.episode, _0x1eec38.movie.original_title].join('') : _0x1eec38.movie.original_title);
            var _0xd71d03 = Lampa.Utils.hash(_0x4c98fe.season ? [_0x4c98fe.season, _0x4c98fe.season > 10 ? ':' : '', _0x4c98fe.episode, _0x1eec38.movie.original_title, _0x4c98fe.voice_name].join('') : _0x1eec38.movie.original_title + _0x4c98fe.voice_name);
            var _0x40fdee = {
              hash_timeline: _0x32049e,
              hash_behold: _0xd71d03
            };
            var _0x389433 = [];
            if (_0x4c98fe.season) {
              _0x4c98fe.translate_episode_end = _0x12b6c8.getLastEpisode(_0x2ada5e);
              _0x4c98fe.translate_voice = _0x4c98fe.voice_name;
            }
            if (_0x4c98fe.text && !_0x586e24) {
              _0x4c98fe.title = _0x4c98fe.text;
            }
            _0x4c98fe.timeline = Lampa.Timeline.view(_0x32049e);
            if (_0x586e24) {
              _0x4c98fe.title = _0x586e24.name;
              if (_0x4c98fe.info.length < 30 && _0x586e24.vote_average) {
                _0x389433.push(Lampa.Template.get("lampac_prestige_rate", {
                  'rate': parseFloat(_0x586e24.vote_average + '').toFixed(1)
                }, true));
              }
              if (_0x586e24.air_date && _0x1bad12) {
                _0x389433.push(Lampa.Utils.parseTime(_0x586e24.air_date).full);
              }
            } else {
              if (_0x1eec38.movie.release_date && _0x1bad12) {
                _0x389433.push(Lampa.Utils.parseTime(_0x1eec38.movie.release_date).full);
              }
            }
            if (!_0x5689e0 && _0x1eec38.movie.tagline && _0x4c98fe.info.length < 30) {
              _0x389433.push(_0x1eec38.movie.tagline);
            }
            if (_0x4c98fe.info) {
              _0x389433.push(_0x4c98fe.info);
            }
            if (_0x389433.length) {
              _0x4c98fe.info = _0x389433.map(function (_0x108bd9) {
                return "<span>" + _0x108bd9 + "</span>";
              }).join("<span class=\"online-prestige-split\">●</span>");
            }
            var _0x6e1679 = Lampa.Template.get("lampac_prestige_full", _0x4c98fe);
            var _0x465ed0 = _0x6e1679.find(".online-prestige__loader");
            var _0x494e90 = _0x6e1679.find(".online-prestige__img");
            if (!_0x5689e0) {
              if (_0x61f494.movie_view == _0xd71d03) {
                _0x297220 = _0x6e1679;
              }
            } else {
              if (typeof _0x205557 !== "undefined" && _0x205557 == _0x5d0d4d) {
                _0x297220 = _0x6e1679;
              }
            }
            if (_0x5689e0 && !_0x586e24) {
              _0x494e90.append("<div class=\"online-prestige__episode-number\">" + ('0' + (_0x4c98fe.episode || _0x3f8472 + 1)).slice(-2) + "</div>");
              _0x465ed0.remove();
            } else {
              if (!_0x5689e0 && ["cub", "tmdb"].indexOf(_0x1eec38.movie.source || "tmdb") == -1) {
                _0x465ed0.remove();
              } else {
                var _0x9713ea = _0x6e1679.find("img")[0];
                _0x9713ea.onerror = function () {
                  _0x9713ea.src = "./img/img_broken.svg";
                };
                _0x9713ea.onload = function () {
                  _0x494e90.addClass("online-prestige__img--loaded");
                  _0x465ed0.remove();
                  if (_0x5689e0) {
                    _0x494e90.append("<div class=\"online-prestige__episode-number\">" + ('0' + (_0x4c98fe.episode || _0x3f8472 + 1)).slice(-2) + "</div>");
                  }
                };
                _0x9713ea.src = Lampa.TMDB.image("t/p/w300" + (_0x586e24 ? _0x586e24.still_path : _0x1eec38.movie.backdrop_path));
                _0x1af0c6.push(_0x9713ea);
              }
            }
            _0x6e1679.find(".online-prestige__timeline").append(Lampa.Timeline.render(_0x4c98fe.timeline));
            if (_0x536cae.indexOf(_0xd71d03) !== -1) {
              _0x4a9203 = _0x6e1679;
              _0x6e1679.find(".online-prestige__img").append("<div class=\"online-prestige__viewed\">" + Lampa.Template.get("icon_viewed", {}, true) + "</div>");
            }
            _0x4c98fe.mark = function () {
              _0x536cae = Lampa.Storage.cache("online_view", 5000, []);
              if (_0x536cae.indexOf(_0xd71d03) == -1) {
                _0x536cae.push(_0xd71d03);
                Lampa.Storage.set("online_view", _0x536cae);
                if (_0x6e1679.find(".online-prestige__viewed").length == 0) {
                  _0x6e1679.find(".online-prestige__img").append("<div class=\"online-prestige__viewed\">" + Lampa.Template.get("icon_viewed", {}, true) + "</div>");
                }
              }
              _0x61f494 = _0x12b6c8.getChoice();
              if (!_0x5689e0) {
                _0x61f494.movie_view = _0xd71d03;
              } else {
                _0x61f494.episodes_view[_0x4c98fe.season] = _0x5d0d4d;
              }
              _0x12b6c8.saveChoice(_0x61f494);
              var _0x50de0e = _0x61f494.voice_name || _0x4c98fe.voice_name || _0x4c98fe.title;
              if (_0x50de0e.length > 30) {
                _0x50de0e = _0x50de0e.slice(0, 30) + "...";
              }
              _0x12b6c8.watched({
                'balanser': _0x2933c5,
                'balanser_name': Lampa.Utils.capitalizeFirstLetter(_0x1de52e[_0x2933c5].name.split(" ")[0]),
                'voice_id': _0x61f494.voice_id,
                'voice_name': _0x50de0e,
                'episode': _0x4c98fe.episode,
                'season': _0x4c98fe.season
              });
            };
            _0x4c98fe.unmark = function () {
              _0x536cae = Lampa.Storage.cache("online_view", 5000, []);
              if (_0x536cae.indexOf(_0xd71d03) !== -1) {
                Lampa.Arrays.remove(_0x536cae, _0xd71d03);
                Lampa.Storage.set("online_view", _0x536cae);
                Lampa.Storage.remove("online_view", _0xd71d03);
                _0x6e1679.find(".online-prestige__viewed").remove();
              }
            };
            _0x4c98fe.timeclear = function () {
              _0x4c98fe.timeline.percent = 0;
              _0x4c98fe.timeline.time = 0;
              _0x4c98fe.timeline.duration = 0;
              Lampa.Timeline.update(_0x4c98fe.timeline);
            };
            _0x6e1679.on("hover:enter", function () {
              if (_0x1eec38.movie.id) {
                Lampa.Favorite.add("history", _0x1eec38.movie, 100);
              }
              if (_0x11b941.onEnter) {
                _0x11b941.onEnter(_0x4c98fe, _0x6e1679, _0x40fdee);
              }
            }).on("hover:focus", function (_0x20d122) {
              _0x369a8d = _0x20d122.target;
              if (_0x11b941.onFocus) {
                _0x11b941.onFocus(_0x4c98fe, _0x6e1679, _0x40fdee);
              }
              _0x2aa60b.update($(_0x20d122.target), true);
            });
            if (_0x11b941.onRender) {
              _0x11b941.onRender(_0x4c98fe, _0x6e1679, _0x40fdee);
            }
            _0x12b6c8.contextMenu({
              'html': _0x6e1679,
              'element': _0x4c98fe,
              'onFile': function _0x22b6c4(_0x3a28a8) {
                if (_0x11b941.onContextMenu) {
                  _0x11b941.onContextMenu(_0x4c98fe, _0x6e1679, _0x40fdee, _0x3a28a8);
                }
              },
              'onClearAllMark': function _0x349fb0() {
                _0x2ada5e.forEach(function (_0x263e44) {
                  _0x263e44.unmark();
                });
              },
              'onClearAllTime': function _0x1d13e6() {
                _0x2ada5e.forEach(function (_0x496ab3) {
                  _0x496ab3.timeclear();
                });
              }
            });
            _0x2aa60b.append(_0x6e1679);
          });
          if (_0x5689e0 && _0x58b6a7.length > _0x2ada5e.length && !_0x11b941.similars) {
            var _0xe6df = _0x58b6a7.slice(_0x2ada5e.length);
            _0xe6df.forEach(function (_0x22993b) {
              var _0x6c92be = [];
              if (_0x22993b.vote_average) {
                _0x6c92be.push(Lampa.Template.get("lampac_prestige_rate", {
                  'rate': parseFloat(_0x22993b.vote_average + '').toFixed(1)
                }, true));
              }
              if (_0x22993b.air_date) {
                _0x6c92be.push(Lampa.Utils.parseTime(_0x22993b.air_date).full);
              }
              var _0x47e602 = new Date((_0x22993b.air_date + '').replace(/-/g, '/'));
              var _0x353874 = Date.now();
              var _0x1286d3 = Math.round((_0x47e602.getTime() - _0x353874) / 86400000);
              var _0x3ec87f = Lampa.Lang.translate("full_episode_days_left") + ": " + _0x1286d3;
              var _0x368f86 = Lampa.Template.get("lampac_prestige_full", {
                'time': Lampa.Utils.secondsToTime((_0x22993b ? _0x22993b.runtime : _0x1eec38.movie.runtime) * 60, true),
                'info': _0x6c92be.length ? _0x6c92be.map(function (_0x1876ff) {
                  return "<span>" + _0x1876ff + "</span>";
                }).join("<span class=\"online-prestige-split\">●</span>") : '',
                'title': _0x22993b.name,
                'quality': _0x1286d3 > 0 ? _0x3ec87f : ''
              });
              var _0x19bd62 = _0x368f86.find(".online-prestige__loader");
              var _0x109e2d = _0x368f86.find(".online-prestige__img");
              var _0x5b3f84 = _0x2ada5e[0] ? _0x2ada5e[0].season : 1;
              _0x368f86.find(".online-prestige__timeline").append(Lampa.Timeline.render(Lampa.Timeline.view(Lampa.Utils.hash([_0x5b3f84, _0x22993b.episode_number, _0x1eec38.movie.original_title].join('')))));
              var _0x502fb7 = _0x368f86.find("img")[0];
              if (_0x22993b.still_path) {
                _0x502fb7.onerror = function () {
                  _0x502fb7.src = "./img/img_broken.svg";
                };
                _0x502fb7.onload = function () {
                  _0x109e2d.addClass("online-prestige__img--loaded");
                  _0x19bd62.remove();
                  _0x109e2d.append("<div class=\"online-prestige__episode-number\">" + ('0' + _0x22993b.episode_number).slice(-2) + "</div>");
                };
                _0x502fb7.src = Lampa.TMDB.image("t/p/w300" + _0x22993b.still_path);
                _0x1af0c6.push(_0x502fb7);
              } else {
                _0x19bd62.remove();
                _0x109e2d.append("<div class=\"online-prestige__episode-number\">" + ('0' + _0x22993b.episode_number).slice(-2) + "</div>");
              }
              _0x368f86.css("opacity", "0.5");
              _0x2aa60b.append(_0x368f86);
            });
          }
          if (_0x297220) {
            _0x369a8d = _0x297220[0];
          } else if (_0x4a9203) {
            _0x369a8d = _0x4a9203[0];
          }
          Lampa.Controller.enable("content");
        });
      };
      this.contextMenu = function (_0x569f7c) {
        _0x569f7c.html.on("hover:long", function () {
          function _0x2342da(_0x2080ee) {
            var _0x27adec = Lampa.Controller.enabled().name;
            var _0x4e9f8b = [];
            if (Lampa.Platform.is("webos")) {
              _0x4e9f8b.push({
                'title': Lampa.Lang.translate("player_lauch") + " - Webos",
                'player': "webos"
              });
            }
            if (Lampa.Platform.is("android")) {
              _0x4e9f8b.push({
                'title': Lampa.Lang.translate("player_lauch") + " - Android",
                'player': "android"
              });
            }
            _0x4e9f8b.push({
              'title': Lampa.Lang.translate("player_lauch") + " - Lampa",
              'player': "lampa"
            });
            _0x4e9f8b.push({
              'title': Lampa.Lang.translate("lampac_video"),
              'separator': true
            });
            _0x4e9f8b.push({
              'title': Lampa.Lang.translate("torrent_parser_label_title"),
              'mark': true
            });
            _0x4e9f8b.push({
              'title': Lampa.Lang.translate("torrent_parser_label_cancel_title"),
              'unmark': true
            });
            _0x4e9f8b.push({
              'title': Lampa.Lang.translate("time_reset"),
              'timeclear': true
            });
            if (_0x2080ee) {
              _0x4e9f8b.push({
                'title': Lampa.Lang.translate("copy_link"),
                'copylink': true
              });
            }
            _0x4e9f8b.push({
              'title': Lampa.Lang.translate("more"),
              'separator': true
            });
            if (Lampa.Account.logged() && _0x569f7c.element && typeof _0x569f7c.element.season !== "undefined" && _0x569f7c.element.translate_voice) {
              _0x4e9f8b.push({
                'title': Lampa.Lang.translate("lampac_voice_subscribe"),
                'subscribe': true
              });
            }
            _0x4e9f8b.push({
              'title': Lampa.Lang.translate("lampac_clear_all_marks"),
              'clearallmark': true
            });
            _0x4e9f8b.push({
              'title': Lampa.Lang.translate("lampac_clear_all_timecodes"),
              'timeclearall': true
            });
            Lampa.Select.show({
              'title': Lampa.Lang.translate("title_action"),
              'items': _0x4e9f8b,
              'onBack': function _0x431475() {
                Lampa.Controller.toggle(_0x27adec);
              },
              'onSelect': function _0x42056e(_0x2ffe4e) {
                if (_0x2ffe4e.mark) {
                  _0x569f7c.element.mark();
                }
                if (_0x2ffe4e.unmark) {
                  _0x569f7c.element.unmark();
                }
                if (_0x2ffe4e.timeclear) {
                  _0x569f7c.element.timeclear();
                }
                if (_0x2ffe4e.clearallmark) {
                  _0x569f7c.onClearAllMark();
                }
                if (_0x2ffe4e.timeclearall) {
                  _0x569f7c.onClearAllTime();
                }
                Lampa.Controller.toggle(_0x27adec);
                if (_0x2ffe4e.player) {
                  Lampa.Player.runas(_0x2ffe4e.player);
                  _0x569f7c.html.trigger("hover:enter");
                }
                if (_0x2ffe4e.copylink) {
                  if (_0x2080ee.quality) {
                    var _0x2a14bc = [];
                    for (var _0x1d9eb9 in _0x2080ee.quality) {
                      var _0x3280ca = {
                        title: _0x1d9eb9,
                        file: _0x2080ee.quality[_0x1d9eb9]
                      };
                      _0x2a14bc.push(_0x3280ca);
                    }
                    Lampa.Select.show({
                      'title': Lampa.Lang.translate("settings_server_links"),
                      'items': _0x2a14bc,
                      'onBack': function _0x430fe3() {
                        Lampa.Controller.toggle(_0x27adec);
                      },
                      'onSelect': function _0x398287(_0xda090f) {
                        Lampa.Utils.copyTextToClipboard(_0xda090f.file, function () {
                          Lampa.Noty.show(Lampa.Lang.translate("copy_secuses"));
                        }, function () {
                          Lampa.Noty.show(Lampa.Lang.translate("copy_error"));
                        });
                      }
                    });
                  } else {
                    Lampa.Utils.copyTextToClipboard(_0x2080ee.file, function () {
                      Lampa.Noty.show(Lampa.Lang.translate("copy_secuses"));
                    }, function () {
                      Lampa.Noty.show(Lampa.Lang.translate("copy_error"));
                    });
                  }
                }
                if (_0x2ffe4e.subscribe) {
                  var _0x11b1ae = {
                    card: _0x1eec38.movie,
                    season: _0x569f7c.element.season,
                    episode: _0x569f7c.element.translate_episode_end,
                    voice: _0x569f7c.element.translate_voice
                  };
                  Lampa.Account.subscribeToTranslation(_0x11b1ae, function () {
                    Lampa.Noty.show(Lampa.Lang.translate("lampac_voice_success"));
                  }, function () {
                    Lampa.Noty.show(Lampa.Lang.translate("lampac_voice_error"));
                  });
                }
              }
            });
          }
          _0x569f7c.onFile(_0x2342da);
        }).on("hover:focus", function () {
          if (Lampa.Helper) {
            Lampa.Helper.show("online_file", Lampa.Lang.translate("helper_online_file"), _0x569f7c.html);
          }
        });
      };
      this.empty = function () {
        var _0x34f667 = Lampa.Template.get("lampac_does_not_answer", {});
        _0x34f667.find(".online-empty__buttons").remove();
        _0x34f667.find(".online-empty__title").text(Lampa.Lang.translate("empty_title_two"));
        _0x34f667.find(".online-empty__time").text(Lampa.Lang.translate("empty_text"));
        _0x2aa60b.clear();
        _0x2aa60b.append(_0x34f667);
        this.loading(false);
      };
      this.noConnectToServer = function (_0x1059f1) {
        var _0x13ad2d = Lampa.Template.get("lampac_does_not_answer", {});
        _0x13ad2d.find(".online-empty__buttons").remove();
        _0x13ad2d.find(".online-empty__title").text(Lampa.Lang.translate("title_error"));
        _0x13ad2d.find(".online-empty__time").text(_0x1059f1 && _0x1059f1.accsdb ? _0x1059f1.msg : Lampa.Lang.translate("lampac_does_not_answer_text").replace("{balanser}", _0x2933c5[_0x2933c5].name));
        _0x2aa60b.clear();
        _0x2aa60b.append(_0x13ad2d);
        this.loading(false);
      };
      this.doesNotAnswer = function () {
        var _0x4db0a3 = this;
        this.reset();
        var _0x563fd5 = {
          balanser: _0x2933c5
        };
        var _0x167a78 = Lampa.Template.get("lampac_does_not_answer", _0x563fd5);
        var _0xbc572b = 4;
        _0x167a78.find(".cancel").on("hover:enter", function () {
          clearInterval(_0x553871);
        });
        _0x167a78.find(".change").on("hover:enter", function () {
          clearInterval(_0x553871);
          _0xb85168.render().find(".filter--sort").trigger("hover:enter");
        });
        _0x2aa60b.clear();
        _0x2aa60b.append(_0x167a78);
        this.loading(false);
        _0x553871 = setInterval(function () {
          _0xbc572b--;
          _0x167a78.find(".timeout").text(_0xbc572b);
          if (_0xbc572b == 0) {
            clearInterval(_0x553871);
            var _0x4ebbf7 = Lampa.Arrays.getKeys(_0x1de52e);
            var _0x15cb99 = _0x4ebbf7.indexOf(_0x2933c5);
            var _0x5a2d3a = _0x4ebbf7[_0x15cb99 + 1];
            if (!_0x5a2d3a) {
              _0x5a2d3a = _0x4ebbf7[0];
            }
            _0x2933c5 = _0x5a2d3a;
            if (Lampa.Activity.active().activity == _0x4db0a3.activity) {
              _0x4db0a3.changeBalanser(_0x2933c5);
            }
          }
        }, 1000);
      };
      this.getLastEpisode = function (_0x365cc2) {
        var _0x24b605 = 0;
        _0x365cc2.forEach(function (_0x873c88) {
          if (typeof _0x873c88.episode !== "undefined") {
            _0x24b605 = Math.max(_0x24b605, parseInt(_0x873c88.episode));
          }
        });
        return _0x24b605;
      };
      this.start = function () {
        if (Lampa.Activity.active().activity !== this.activity) {
          return;
        }
        if (!_0x127a81) {
          _0x127a81 = true;
          this.initialize();
        }
        Lampa.Background.immediately(Lampa.Utils.cardImgBackgroundBlur(_0x1eec38.movie));
        Lampa.Controller.add("content", {
          'toggle': function _0x4f7205() {
            Lampa.Controller.collectionSet(_0x2aa60b.render(), _0x535ea6.render());
            Lampa.Controller.collectionFocus(_0x369a8d || false, _0x2aa60b.render());
          },
          'gone': function _0x53a203() {
            clearTimeout(_0x553871);
          },
          'up': function _0x45c499() {
            if (Navigator.canmove('up')) {
              Navigator.move('up');
            } else {
              Lampa.Controller.toggle("head");
            }
          },
          'down': function _0x5165da() {
            Navigator.move("down");
          },
          'right': function _0x508de4() {
            if (Navigator.canmove("right")) {
              Navigator.move("right");
            } else {
              _0xb85168.show(Lampa.Lang.translate("title_filter"), "filter");
            }
          },
          'left': function _0x21ea01() {
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
        return _0x535ea6.render();
      };
      this.back = function () {
        Lampa.Activity.backward();
      };
      this.pause = function () {};
      this.stop = function () {};
      this.destroy = function () {
        _0x2d8bf3.clear();
        this.clearImages();
        _0x535ea6.destroy();
        _0x2aa60b.destroy();
        clearInterval(_0x553871);
        clearTimeout(_0x38106b);
        clearTimeout(_0x2bf493);
        if (_0x306750) {
          _0x306750.stop();
          _0x306750 = null;
        }
      };
    }
    function _0x13f332() {
      window.showy_plugin = true;
      var _0x1201e0 = {
        'type': "video",
        'version': "1.2.6",
        'name': "Showy",
        'description': "Плагин для просмотра онлайн сериалов и фильмов",
        'component': "showy",
        'onContextMenu': function _0x275664(_0x125c5b) {
          return {
            'name': Lampa.Lang.translate("lampac_watch"),
            'description': "Плагин для просмотра онлайн сериалов и фильмов"
          };
        },
        'onContextLauch': function _0x93b418(_0x1c02b5) {
          _0x312634();
          Lampa.Component.add("showy", _0x15a07c);
          Lampa.Activity.push({
            'url': '',
            'title': Lampa.Lang.translate("title_online"),
            'component': "showy",
            'search': _0x1c02b5.title,
            'search_one': _0x1c02b5.title,
            'search_two': _0x1c02b5.original_title,
            'movie': _0x1c02b5,
            'page': 0x1
          });
        }
      };
      Lampa.Manifest.plugins = _0x1201e0;
      var _0x3548d3 = {
        ru: "Смотреть онлайн",
        en: "Watch online",
        uk: "Дивитися онлайн",
        zh: "在线观看"
      };
      var _0x502d99 = {
        ru: "Видео",
        en: "Video",
        uk: "Відео",
        zh: '视频'
      };
      var _0x8714e8 = {
        ru: "Нет истории просмотра",
        en: "No browsing history",
        ua: "Немає історії перегляду",
        zh: "没有浏览历史"
      };
      var _0x1de759 = {
        ru: "Не удалось извлечь ссылку",
        uk: "Неможливо отримати посилання",
        en: "Failed to fetch link",
        zh: "获取链接失败"
      };
      var _0x3d7223 = {
        ru: "Источник",
        uk: "Джерело",
        en: "Source",
        zh: '来源'
      };
      var _0x421aa7 = {
        ru: "Удерживайте клавишу \"ОК\" для вызова контекстного меню",
        uk: "Утримуйте клавішу \"ОК\" для виклику контекстного меню",
        en: "Hold the \"OK\" key to bring up the context menu",
        zh: "按住“确定”键调出上下文菜单"
      };
      var _0x5aa1ae = {
        ru: "Онлайн",
        uk: "Онлайн",
        en: "Online",
        zh: "在线的"
      };
      var _0x21a9e2 = {
        ru: "Подписаться на перевод",
        uk: "Підписатися на переклад",
        en: "Subscribe to translation",
        zh: "订阅翻译"
      };
      var _0xe4180 = {
        ru: "Вы успешно подписались",
        uk: "Ви успішно підписалися",
        en: "You have successfully subscribed"
      };
      _0xe4180.zh = "您已成功订阅";
      var _0x594d27 = {
        ru: "Возникла ошибка",
        uk: "Виникла помилка",
        en: "An error has occurred",
        zh: "发生了错误"
      };
      var _0x219737 = {
        ru: "Очистить все метки",
        uk: "Очистити всі мітки",
        en: "Clear all labels",
        zh: "清除所有标签"
      };
      var _0x3d0f9b = {
        'ru': "Очистить все тайм-коды"
      };
      _0x3d0f9b.uk = "Очистити всі тайм-коди";
      _0x3d0f9b.en = "Clear all timecodes";
      _0x3d0f9b.zh = "清除所有时间代码";
      var _0xb19df4 = {
        ru: "Изменить балансер",
        uk: "Змінити балансер",
        en: "Change balancer",
        zh: "更改平衡器"
      };
      var _0x564e79 = {
        ru: "Поиск на ({balanser}) не дал результатов",
        uk: "Пошук на ({balanser}) не дав результатів",
        en: "Search on ({balanser}) did not return any results",
        zh: "搜索 ({balanser}) 未返回任何结果"
      };
      var _0x11acd7 = {
        ru: "Источник будет переключен автоматически через <span class=\"timeout\">10</span> секунд.",
        uk: "Джерело буде автоматично переключено через <span class=\"timeout\">10</span> секунд.",
        en: "The source will be switched automatically after <span class=\"timeout\">10</span> seconds.",
        zh: "平衡器将在<span class=\"timeout\">10</span>秒内自动切换。"
      };
      var _0x4c2ece = {
        ru: "Поиск на ({balanser}) не дал результатов",
        uk: "Пошук на ({balanser}) не дав результатів",
        en: "Search on ({balanser}) did not return any results",
        zh: "搜索 ({balanser}) 未返回任何结果"
      };
      var _0x139720 = {
        lampac_watch: _0x3548d3,
        lampac_video: _0x502d99,
        lampac_no_watch_history: _0x8714e8,
        lampac_nolink: _0x1de759,
        lampac_balanser: _0x3d7223,
        helper_online_file: _0x421aa7,
        title_online: _0x5aa1ae,
        lampac_voice_subscribe: _0x21a9e2,
        lampac_voice_success: _0xe4180,
        lampac_voice_error: _0x594d27,
        lampac_clear_all_marks: _0x219737,
        lampac_clear_all_timecodes: _0x3d0f9b,
        lampac_change_balanser: _0xb19df4,
        lampac_balanser_dont_work: _0x564e79,
        lampac_balanser_timeout: _0x11acd7,
        lampac_does_not_answer_text: _0x4c2ece
      };
      Lampa.Lang.add(_0x139720);
      Lampa.Template.add("lampac_css", "\n        <style>\n        @charset 'UTF-8';.online-prestige{position:relative;-webkit-border-radius:.3em;border-radius:.3em;background-color:rgba(0,0,0,0.3);display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.online-prestige__body{padding:1.2em;line-height:1.3;-webkit-box-flex:1;-webkit-flex-grow:1;-moz-box-flex:1;-ms-flex-positive:1;flex-grow:1;position:relative}@media screen and (max-width:480px){.online-prestige__body{padding:.8em 1.2em}}.online-prestige__img{position:relative;width:13em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;min-height:8.2em}.online-prestige__img>img{position:absolute;top:0;left:0;width:100%;height:100%;-o-object-fit:cover;object-fit:cover;-webkit-border-radius:.3em;border-radius:.3em;opacity:0;-webkit-transition:opacity .3s;-o-transition:opacity .3s;-moz-transition:opacity .3s;transition:opacity .3s}.online-prestige__img--loaded>img{opacity:1}@media screen and (max-width:480px){.online-prestige__img{width:7em;min-height:6em}}.online-prestige__folder{padding:1em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.online-prestige__folder>svg{width:4.4em !important;height:4.4em !important}.online-prestige__viewed{position:absolute;top:1em;left:1em;background:rgba(0,0,0,0.45);-webkit-border-radius:100%;border-radius:100%;padding:.25em;font-size:.76em}.online-prestige__viewed>svg{width:1.5em !important;height:1.5em !important}.online-prestige__episode-number{position:absolute;top:0;left:0;right:0;bottom:0;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center;font-size:2em}.online-prestige__loader{position:absolute;top:50%;left:50%;width:2em;height:2em;margin-left:-1em;margin-top:-1em;background:url(./img/loader.svg) no-repeat center center;-webkit-background-size:contain;-o-background-size:contain;background-size:contain}.online-prestige__head,.online-prestige__footer{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.online-prestige__timeline{margin:.8em 0}.online-prestige__timeline>.time-line{display:block !important}.online-prestige__title{font-size:1.7em;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:1;line-clamp:1;-webkit-box-orient:vertical}@media screen and (max-width:480px){.online-prestige__title{font-size:1.4em}}.online-prestige__time{padding-left:2em}.online-prestige__info{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.online-prestige__info>*{overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:1;line-clamp:1;-webkit-box-orient:vertical}.online-prestige__quality{padding-left:1em;white-space:nowrap}.online-prestige__scan-file{position:absolute;bottom:0;left:0;right:0}.online-prestige__scan-file .broadcast__scan{margin:0}.online-prestige .online-prestige-split{font-size:.8em;margin:0 1em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.online-prestige.focus::after{content:'';position:absolute;top:-0.6em;left:-0.6em;right:-0.6em;bottom:-0.6em;-webkit-border-radius:.7em;border-radius:.7em;border:solid .3em #fff;z-index:-1;pointer-events:none}.online-prestige+.online-prestige{margin-top:1.5em}.online-prestige--folder .online-prestige__footer{margin-top:.8em}.online-prestige-watched{padding:1em}.online-prestige-watched__icon>svg{width:1.5em;height:1.5em}.online-prestige-watched__body{padding-left:1em;padding-top:.1em;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}.online-prestige-watched__body>span+span::before{content:' ● ';vertical-align:top;display:inline-block;margin:0 .5em}.online-prestige-rate{display:-webkit-inline-box;display:-webkit-inline-flex;display:-moz-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.online-prestige-rate>svg{width:1.3em !important;height:1.3em !important}.online-prestige-rate>span{font-weight:600;font-size:1.1em;padding-left:.7em}.online-empty{line-height:1.4}.online-empty__title{font-size:1.8em;margin-bottom:.3em}.online-empty__time{font-size:1.2em;font-weight:300;margin-bottom:1.6em}.online-empty__buttons{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.online-empty__buttons>*+*{margin-left:1em}.online-empty__button{background:rgba(0,0,0,0.3);font-size:1.2em;padding:.5em 1.2em;-webkit-border-radius:.2em;border-radius:.2em;margin-bottom:2.4em}.online-empty__button.focus{background:#fff;color:black}.online-empty__templates .online-empty-template:nth-child(2){opacity:.5}.online-empty__templates .online-empty-template:nth-child(3){opacity:.2}.online-empty-template{background-color:rgba(255,255,255,0.3);padding:1em;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;-webkit-border-radius:.3em;border-radius:.3em}.online-empty-template>*{background:rgba(0,0,0,0.3);-webkit-border-radius:.3em;border-radius:.3em}.online-empty-template+.online-empty-template{margin-top:1em}\n        </style>\n    ");
      $("body").append(Lampa.Template.get("lampac_css", {}, true));
      function _0x312634() {
        var _0x2807d3 = _0x280a54(this, function () {
          return _0x2807d3.toString().search("(((.+)+)+)+$").toString().constructor(_0x2807d3).search("(((.+)+)+)+$");
        });
        _0x2807d3();
        (function () {
          _0x4daf02(this, function () {
            var _0x191a5b = new RegExp("function *\\( *\\)");
            var _0x2cdf91 = new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)", 'i');
            var _0x5215dc = _0xdd8b3e("init");
            if (!_0x191a5b.test(_0x5215dc + "chain") || !_0x2cdf91.test(_0x5215dc + "input")) {
              _0x5215dc('0');
            } else {
              _0xdd8b3e();
            }
          })();
        })();
        var _0x50451f = _0x2b28dd(this, function () {
          var _0x536b93 = function () {
            var _0xbf8b31;
            try {
              _0xbf8b31 = Function("return (function() {}.constructor(\"return this\")( ));")();
            } catch (_0x45958e) {
              _0xbf8b31 = window;
            }
            return _0xbf8b31;
          };
          var _0x2404d1 = _0x536b93();
          var _0x12cb0a = _0x2404d1.console = _0x2404d1.console || {};
          var _0x46206e = ["log", "warn", "info", "error", "exception", "table", "trace"];
          for (var _0x5ef2f8 = 0; _0x5ef2f8 < _0x46206e.length; _0x5ef2f8++) {
            var _0xbc3a22 = _0x2b28dd.constructor.prototype.bind(_0x2b28dd);
            var _0x3ed2e8 = _0x46206e[_0x5ef2f8];
            var _0x186e4a = _0x12cb0a[_0x3ed2e8] || _0xbc3a22;
            _0xbc3a22.__proto__ = _0x2b28dd.bind(_0x2b28dd);
            _0xbc3a22.toString = _0x186e4a.toString.bind(_0x186e4a);
            _0x12cb0a[_0x3ed2e8] = _0xbc3a22;
          }
        });
        _0x50451f();
        Lampa.Template.add("lampac_prestige_full", "<div class=\"online-prestige online-prestige--full selector\">\n            <div class=\"online-prestige__img\">\n                <img alt=\"\">\n                <div class=\"online-prestige__loader\"></div>\n            </div>\n            <div class=\"online-prestige__body\">\n                <div class=\"online-prestige__head\">\n                    <div class=\"online-prestige__title\">{title}</div>\n                    <div class=\"online-prestige__time\">{time}</div>\n                </div>\n\n                <div class=\"online-prestige__timeline\"></div>\n\n                <div class=\"online-prestige__footer\">\n                    <div class=\"online-prestige__info\">{info}</div>\n                    <div class=\"online-prestige__quality\">{quality}</div>\n                </div>\n            </div>\n        </div>");
        Lampa.Template.add("lampac_content_loading", "<div class=\"online-empty\">\n            <div class=\"broadcast__scan\"><div></div></div>\n\t\t\t\n            <div class=\"online-empty__templates\">\n                <div class=\"online-empty-template selector\">\n                    <div class=\"online-empty-template__ico\"></div>\n                    <div class=\"online-empty-template__body\"></div>\n                </div>\n                <div class=\"online-empty-template\">\n                    <div class=\"online-empty-template__ico\"></div>\n                    <div class=\"online-empty-template__body\"></div>\n                </div>\n                <div class=\"online-empty-template\">\n                    <div class=\"online-empty-template__ico\"></div>\n                    <div class=\"online-empty-template__body\"></div>\n                </div>\n            </div>\n        </div>");
        Lampa.Template.add("lampac_does_not_answer", "<div class=\"online-empty\">\n            <div class=\"online-empty__title\">\n                #{lampac_balanser_dont_work}\n            </div>\n            <div class=\"online-empty__time\">\n                #{lampac_balanser_timeout}\n            </div>\n            <div class=\"online-empty__buttons\">\n                <div class=\"online-empty__button selector cancel\">#{cancel}</div>\n                <div class=\"online-empty__button selector change\">#{lampac_change_balanser}</div>\n            </div>\n            <div class=\"online-empty__templates\">\n                <div class=\"online-empty-template\">\n                    <div class=\"online-empty-template__ico\"></div>\n                    <div class=\"online-empty-template__body\"></div>\n                </div>\n                <div class=\"online-empty-template\">\n                    <div class=\"online-empty-template__ico\"></div>\n                    <div class=\"online-empty-template__body\"></div>\n                </div>\n                <div class=\"online-empty-template\">\n                    <div class=\"online-empty-template__ico\"></div>\n                    <div class=\"online-empty-template__body\"></div>\n                </div>\n            </div>\n        </div>");
        Lampa.Template.add("lampac_prestige_rate", "<div class=\"online-prestige-rate\">\n            <svg width=\"17\" height=\"16\" viewBox=\"0 0 17 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <path d=\"M8.39409 0.192139L10.99 5.30994L16.7882 6.20387L12.5475 10.4277L13.5819 15.9311L8.39409 13.2425L3.20626 15.9311L4.24065 10.4277L0 6.20387L5.79819 5.30994L8.39409 0.192139Z\" fill=\"#fff\"></path>\n            </svg>\n            <span>{rate}</span>\n        </div>");
        Lampa.Template.add("lampac_prestige_folder", "<div class=\"online-prestige online-prestige--folder selector\">\n            <div class=\"online-prestige__folder\">\n                <svg viewBox=\"0 0 128 112\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect y=\"20\" width=\"128\" height=\"92\" rx=\"13\" fill=\"white\"></rect>\n                    <path d=\"M29.9963 8H98.0037C96.0446 3.3021 91.4079 0 86 0H42C36.5921 0 31.9555 3.3021 29.9963 8Z\" fill=\"white\" fill-opacity=\"0.23\"></path>\n                    <rect x=\"11\" y=\"8\" width=\"106\" height=\"76\" rx=\"13\" fill=\"white\" fill-opacity=\"0.51\"></rect>\n                </svg>\n            </div>\n            <div class=\"online-prestige__body\">\n                <div class=\"online-prestige__head\">\n                    <div class=\"online-prestige__title\">{title}</div>\n                    <div class=\"online-prestige__time\">{time}</div>\n                </div>\n\n                <div class=\"online-prestige__footer\">\n                    <div class=\"online-prestige__info\">{info}</div>\n                </div>\n            </div>\n        </div>");
        Lampa.Template.add("lampac_prestige_watched", "<div class=\"online-prestige online-prestige-watched selector\">\n            <div class=\"online-prestige-watched__icon\">\n                <svg width=\"21\" height=\"21\" viewBox=\"0 0 21 21\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <circle cx=\"10.5\" cy=\"10.5\" r=\"9\" stroke=\"currentColor\" stroke-width=\"3\"/>\n                    <path d=\"M14.8477 10.5628L8.20312 14.399L8.20313 6.72656L14.8477 10.5628Z\" fill=\"currentColor\"/>\n                </svg>\n            </div>\n            <div class=\"online-prestige-watched__body\">\n                \n            </div>\n        </div>");
      }
      var _0x205d98 = "<div class=\"full-start__button selector view--online_showy showy--button\" data-subtitle=\"".concat("Showy", " v").concat("1.2.6", "\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 392.697 392.697\" xml:space=\"preserve\">\n            <path d=\"M21.837,83.419l36.496,16.678L227.72,19.886c1.229-0.592,2.002-1.846,1.98-3.209c-0.021-1.365-0.834-2.592-2.082-3.145\n                L197.766,0.3c-0.903-0.4-1.933-0.4-2.837,0L21.873,77.036c-1.259,0.559-2.073,1.803-2.081,3.18\n                C19.784,81.593,20.584,82.847,21.837,83.419z\" fill=\"currentColor\"></path>\n            <path d=\"M185.689,177.261l-64.988-30.01v91.617c0,0.856-0.44,1.655-1.167,2.114c-0.406,0.257-0.869,0.386-1.333,0.386\n                c-0.368,0-0.736-0.082-1.079-0.244l-68.874-32.625c-0.869-0.416-1.421-1.293-1.421-2.256v-92.229L6.804,95.5\n                c-1.083-0.496-2.344-0.406-3.347,0.238c-1.002,0.645-1.608,1.754-1.608,2.944v208.744c0,1.371,0.799,2.615,2.045,3.185\n                l178.886,81.768c0.464,0.211,0.96,0.315,1.455,0.315c0.661,0,1.318-0.188,1.892-0.555c1.002-0.645,1.608-1.754,1.608-2.945\n                V180.445C187.735,179.076,186.936,177.831,185.689,177.261z\" fill=\"currentColor\"></path>\n            <path d=\"M389.24,95.74c-1.002-0.644-2.264-0.732-3.347-0.238l-178.876,81.76c-1.246,0.57-2.045,1.814-2.045,3.185v208.751\n                c0,1.191,0.606,2.302,1.608,2.945c0.572,0.367,1.23,0.555,1.892,0.555c0.495,0,0.991-0.104,1.455-0.315l178.876-81.768\n                c1.246-0.568,2.045-1.813,2.045-3.185V98.685C390.849,97.494,390.242,96.384,389.24,95.74z\" fill=\"currentColor\"></path>\n            <path d=\"M372.915,80.216c-0.009-1.377-0.823-2.621-2.082-3.18l-60.182-26.681c-0.938-0.418-2.013-0.399-2.938,0.045\n                l-173.755,82.992l60.933,29.117c0.462,0.211,0.958,0.316,1.455,0.316s0.993-0.105,1.455-0.316l173.066-79.092\n                C372.122,82.847,372.923,81.593,372.915,80.216z\" fill=\"currentColor\"></path>\n        </svg>\n\n        <span>#{title_online}</span>\n    </div>");
      Lampa.Component.add("showy", _0x15a07c);
      _0x312634();
      function _0x47900f(_0x3669c1) {
        if (_0x3669c1.render.find(".showy--button").length) {
          return;
        }
        var _0x265794 = $(Lampa.Lang.translate(_0x205d98));
        _0x265794.on("hover:enter", function () {
          _0x312634();
          Lampa.Component.add("showy", _0x15a07c);
          Lampa.Activity.push({
            'url': '',
            'title': Lampa.Lang.translate("title_online"),
            'component': "showy",
            'search': _0x3669c1.movie.title,
            'search_one': _0x3669c1.movie.title,
            'search_two': _0x3669c1.movie.original_title,
            'movie': _0x3669c1.movie,
            'page': 0x1
          });
        });
        _0x3669c1.render.before(_0x265794);
      }
      Lampa.Listener.follow("full", function (_0x4c6528) {
        if (_0x4c6528.type == "complite") {
          if (Lampa.Storage.get("card_interfice_type") === "new") {
            _0x47900f({
              'render': _0x4c6528.object.activity.render().find(".button--play"),
              'movie': _0x4c6528.data.movie
            });
          } else {
            _0x47900f({
              'render': _0x4c6528.object.activity.render().find(".view--torrent"),
              'movie': _0x4c6528.data.movie
            });
          }
        }
      });
      try {
        if (Lampa.Activity.active().component == "full") {
          _0x47900f({
            'render': Lampa.Activity.active().activity.render().find(".view--torrent"),
            'movie': Lampa.Activity.active().card
          });
        }
      } catch (_0x48fa0d) {}
      if (Lampa.Manifest.app_digital >= 177) {
        var _0x26a52c = ["filmix", "fxapi", "kinobase", "rezka", "voidboost", "videocdn", "videodb", "collaps", "hdvb", "zetflix", "kodik", "ashdi", "eneyida", "kinoukr", "kinokrad", "kinotochka", "kinoprofi", "remux", "iframevideo", "cdnmovies", "anilibria", "animedia", "animego", "animevost", "animebesst", "redheadsound", "alloha", "seasonvar", "kinopub", "vokino"];
        _0x26a52c.forEach(function (_0x64ec7f) {
          Lampa.Storage.sync("online_choice_" + _0x64ec7f, "object_object");
        });
        Lampa.Storage.sync("online_watched_last", "object_object");
      }
    }
    Lampa.Listener.follow("full", function (_0xf0838e) {
      if (_0xf0838e.type == "complite") {
        setTimeout(function () {
          $(".view--online_showy", Lampa.Activity.active().activity.render()).empty().append("<svg width=\"512\" height=\"512\" viewBox=\"0 0 512 512\" style=\"color:currentColor\" xmlns=\"http://www.w3.org/2000/svg\" class=\"h-full w-full\"><rect width=\"512\" height=\"512\" x=\"0\" y=\"0\" rx=\"30\" fill=\"transparent\" stroke=\"transparent\" stroke-width=\"0\" stroke-opacity=\"100%\" paint-order=\"stroke\"></rect><svg width=\"512px\" height=\"512px\" viewBox=\"0 0 16 16\" fill=\"currentColor\" x=\"0\" y=\"0\" role=\"img\" style=\"display:inline-block;vertical-align:middle\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"currentColor\"><g fill=\"currentColor\"><path d=\"M3.577 8.9v.03h1.828V5.898h-.062a46.781 46.781 0 0 0-1.766 3.001z\"/><path d=\"M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm2.372 3.715l.435-.714h1.71v3.93h.733v.957h-.733V11H5.405V9.888H2.5v-.971c.574-1.077 1.225-2.142 1.872-3.202zm7.73-.714h1.306l-2.14 2.584L13.5 11h-1.428l-1.679-2.624l-.615.7V11H8.59V5.001h1.187v2.686h.057L12.102 5z\"/></g></g></svg></svg>&nbsp&nbspShowy");
        }, 5);
      }
    });
    if (!window.showy_plugin) {
      _0x13f332();
    }
  })();
})();