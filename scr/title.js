(function () {
  //BDVBurik 2024
  "use strict";

  async function titleOrigin(card) {
    var orig = card.original_title || card.original_name;
    var params = {
      id: card.id,
      url: "https://worker-patient-dream-26d7.bdvburik.workers.dev:8443/https://api.themoviedb.org/3/movie/",
      urlEnd: "&api_key=4ef0d7355d9ffb5151e987764708ce96",
    };

    if (card.first_air_date) {
      params.url = "https://worker-patient-dream-26d7.bdvburik.workers.dev:8443/https://api.themoviedb.org/3/tv/";
      params.urlEnd = "&api_key=4ef0d7355d9ffb5151e987764708ce96";
    }

    var getOptions = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    async function getEnTitle() {
      var title;
      var ftc = await fetch(
        params.url + params.id + "?language=en-US" + params.urlEnd,
        getOptions
      )
        .then((response) => response.json())
        .then((e) => (title = e.title || e.name));

      return title;
    }
    async function getRuTitle() {
      var title;
      var ftc = await fetch(
        params.url + params.id + "?language=ru-RU" + params.urlEnd,
        getOptions
      )
        .then((response) => response.json())
        .then((e) => (title = e.title || e.name));
      return title;
    }

    var etEnTitle = await getEnTitle();
    var etRuTitle = await getRuTitle();
    _showEnTitle(etEnTitle);

    function _showEnTitle(data) {
      let ru = "";
      if (data) {
        var render = Lampa.Activity.active().activity.render();

        if (Lampa.Storage.get("language") != "ru") {
          ru =
            "<div class='title-line'>Ru:" +
            etRuTitle +
            "</div>";
        } else ru = "";
      }
      $(".original_title", render)
        .find("> div")
        .eq(0)
        .after(
          `<div id='titleen'>
            <div class='title-line'>En: ${data}</div>
            ${ru}
            <div class='title-line'>Orig: ${card.original_title || card.original_name}</div>
          </div>`
        );
    }
  }

  function startPlugin() {
    window.title_plugin = true;
    Lampa.Listener.follow("full", function (e) {
      if (e.type == "complite") {
        var render = e.object.activity.render();
        $(".original_title", render).remove();
        $(".full-start-new__title", render).before(
          '<div class="original_title" style="margin-top:-0.8em; text-align: right;"><div></div></div>'
        );
        titleOrigin(e.data.movie);
        
        // Добавляем стили для title-line
        const style = document.createElement('style');
        style.textContent = `
          .title-line {
            font-size: 1.3em;
            height: auto;
            max-height: 2.6em;
            line-height: 1.3em;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            text-align: right;
          }
          
          @media screen and (max-width: 480px) {
            .title-line {
              font-size: 1em;
            }
          }
        `;
        document.head.appendChild(style);
        $(".full-start-new__rate-line").css("margin-bottom", "0.8em");
        $(".full-start-new__details").css("margin-bottom", "0.8em");
        $(".full-start-new__tagline").css("margin-bottom", "0.4em");
      }
    });
  }
  if (!window.title_plugin) startPlugin();
})();