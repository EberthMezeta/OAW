!(function ($) {
  "use strict";

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1500,
      "easeInOutExpo"
    );
    return false;
  });

  // Stick the header at top on scroll
  $("#header").sticky({
    topSpacing: 0,
    zIndex: "50",
  });

  // Intro background carousel
  $("#intro-carousel").owlCarousel({
    autoplay: true,
    dots: false,
    loop: true,
    animateOut: "fadeOut",
    items: 1,
  });

  // Initiate the wowjs animation library
  new WOW().init();

  // Initiate superfish on nav menu
  $(".nav-menu").superfish({
    animation: {
      opacity: "show",
    },
    speed: 400,
  });

  // Mobile Navigation
  if ($("#nav-menu-container").length) {
    var $mobile_nav = $("#nav-menu-container").clone().prop({
      id: "mobile-nav",
    });
    $mobile_nav.find("> ul").attr({
      class: "",
      id: "",
    });
    $("body").append($mobile_nav);
    $("body").prepend(
      '<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>'
    );
    $("body").append('<div id="mobile-body-overly"></div>');
    $("#mobile-nav")
      .find(".menu-has-children")
      .prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on("click", ".menu-has-children i", function (e) {
      $(this).next().toggleClass("menu-item-active");
      $(this).nextAll("ul").eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on("click", "#mobile-nav-toggle", function (e) {
      $("body").toggleClass("mobile-nav-active");
      $("#mobile-nav-toggle i").toggleClass("fa-times fa-bars");
      $("#mobile-body-overly").toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $("#mobile-nav-toggle i").toggleClass("fa-times fa-bars");
          $("#mobile-body-overly").fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $("#header").outerHeight() - 1;
  $(document).on(
    "click",
    ".nav-menu a, #mobile-nav a, .scrollto",
    function (e) {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        if (target.length) {
          e.preventDefault();

          var scrollto = target.offset().top - scrolltoOffset;

          $("html, body").animate(
            {
              scrollTop: scrollto,
            },
            1500,
            "easeInOutExpo"
          );

          if ($(this).parents(".nav-menu").length) {
            $(".nav-menu .menu-active").removeClass("menu-active");
            $(this).closest("li").addClass("menu-active");
          }

          if ($("body").hasClass("mobile-nav-active")) {
            $("body").removeClass("mobile-nav-active");
            $("#mobile-nav-toggle i").toggleClass("fa-times fa-bars");
            $("#mobile-body-overly").fadeOut();
          }
          return false;
        }
      }
    }
  );

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function () {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $("html, body").animate(
          {
            scrollTop: scrollto,
          },
          1500,
          "easeInOutExpo"
        );
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $("section");
  var main_nav = $(".nav-menu, #mobile-nav");

  $(window).on("scroll", function () {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function () {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find("li").removeClass("menu-active");
        }
        main_nav
          .find('a[href="#' + $(this).attr("id") + '"]')
          .parent("li")
          .addClass("menu-active");
      }
      if (cur_pos < 300) {
        $(".nav-menu li:first").addClass("menu-active");
      }
    });
  });
})(jQuery);

function loadContent(url) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      let data = JSON.parse(this.responseText);
      console.log(data);
      CreateNew2(data);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function CreateNews(data) {
  const lista = document.getElementById("show-news-grouped");
  const fragmentYears = document.createDocumentFragment();
  const templateYear = document.querySelector("#OptionYear").content;
  let keysY = Object.keys(data);
  let sizeY = keysY.length;
  for (let i = 0; i < sizeY; i++) {
    let keysM = Object.keys(data[keysY[i]]);
    let sizeM = keysM.length;
    templateYear.querySelector("a").textContent = keysY[i];

    const fragmentMonths = document.createDocumentFragment();
    const templateMonths = document.querySelector("#OptionMonht").content;

    for (let j = 0; j < sizeM; j++) {
      let keysD = Object.keys(data[keysY[i]][keysM[j]]);
      let sizeD = keysD.length;

      templateMonths.querySelector("p").textContent = keysM[j];
      const fragmentDay = document.createDocumentFragment();
      const templateDay = document.querySelector("#OptionDay").content;
      for (let k = 0; k < sizeD; k++) {
        let sizeNews = data[keysY[i]][keysM[j]][keysD[k]].length;

        templateDay.querySelector("p").textContent = keysD[k];

        const fragment = document.createDocumentFragment();
        const template = document.querySelector("#NewsCards").content;
        for (let index = 0; index < sizeNews; index++) {
          let News = data[keysY[i]][keysM[j]][keysD[k]][index];
          //template.querySelector("img").src =News.enlace;
          template.querySelector("h5").textContent = News.titulo;
          template.querySelector("p").textContent = News.descripcion;
          template.querySelector("a").href = News.enlace;
          template.querySelector("a").textContent = News.fecha;
          let url = encodeURI(News.dirimagen);
          template.querySelector("img").src = `assets/img/${url}`;

          const clone = template.cloneNode(true);
          fragment.appendChild(clone);
        }

        fragmentDay.appendChild(fragment);
        const cloneDay = templateDay.cloneNode(true);
        fragmentDay.appendChild(cloneDay);
      }
      fragmentMonths.appendChild(fragmentDay);
      const cloneMonth = templateMonths.cloneNode(true);
      fragmentMonths.appendChild(cloneMonth);
    }
    const cloneYear = templateYear.cloneNode(true);
    fragmentYears.appendChild(cloneYear);
    fragmentYears.appendChild(fragmentMonths);
  }
  lista.appendChild(fragmentYears);
}

function CreateNew2(data) {
  let keysY = Object.keys(data);
  let sizeY = keysY.length;
  const lista = document.getElementById("show-news-grouped");
 
  const f = document.getElementById("pq");


  for (let i = 0; i < sizeY; i++) {
    let a = document.createElement("a");
    let div = document.createElement("div");  
    a.setAttribute("href", "#show-" + keysY[i]);
    a.setAttribute("class", "list-group-item");
    a.setAttribute("data-toogle", "collapse");
    a.setAttribute("aria-expanded","true");
    div.setAttribute("id", "show-" + keysY[i]);
    a.textContent = keysY[i];
    div.setAttribute("class", "list-group collapse");
    
    let keysM = Object.keys(data[keysY[i]]);
    let sizeM = keysM.length;

    for (let j = 0; j < sizeM; j++) {
      let aMes = document.createElement("a");
      let divMes = document.createElement("div");
      aMes.setAttribute("href", "#show-" + keysM[j]);
      aMes.textContent = keysM[j];
      aMes.setAttribute("class", "list-group-item");
      aMes.setAttribute("data-toogle", "collapse");
      aMes.setAttribute("aria-expanded","true");
      divMes.setAttribute("id", "show-" + keysM[j]);
      divMes.setAttribute("class", "list-group collapse");
      let keysD = Object.keys(data[keysY[i]][keysM[j]]);
      let sizeD = keysD.length;
     
      for (let k = 0; k < sizeD; k++) {
        
        let aDia = document.createElement("a");
        let divDia = document.createElement("div");
        aDia.setAttribute("href", "#show-" + keysD[k]);
        aDia.textContent = keysD[k];
        aDia.setAttribute("class", "list-group-item");
        aDia.setAttribute("data-toogle", "collapse");
        aDia.setAttribute("aria-expanded","true");
        divDia.setAttribute("class", "list-group collapse");
        divDia.setAttribute("id", "show-" + keysD[k]);

        let sizeNews = data[keysY[i]][keysM[j]][keysD[k]].length;

        for (let index = 0; index < sizeNews; index++) {
          let News = data[keysY[i]][keysM[j]][keysD[k]][index];
        }
        divMes.appendChild(aDia);
        divMes.appendChild(divDia);
      }
      div.appendChild(aMes);
      div.appendChild(divMes);
    }
    lista.appendChild(a);
    lista.appendChild(div);
  }
}

loadContent("./resources/GetNewsGrouped.php", "Content");
