!(function($) {
  "use strict";

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Stick the header at top on scroll
  $("#header").sticky({
    topSpacing: 0,
    zIndex: '50'
  });

  // Intro background carousel
  $("#intro-carousel").owlCarousel({
    autoplay: true,
    dots: false,
    loop: true,
    animateOut: 'fadeOut',
    items: 1
  });

  // Initiate the wowjs animation library
  new WOW().init();

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function(e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $('#header').outerHeight() - 1;
  $(document).on('click', '.nav-menu a, #mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top - scrolltoOffset;

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, #mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('menu-active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('menu-active');
      }
      if (cur_pos < 300) {
        $(".nav-menu li:first").addClass('menu-active');
      }
    });
  });


})(jQuery);

////////////////////////////////////////////////
let ArrayOfNews = new Array();
let ArrayOfNewsSortedByDate = new Array()
let MapSort = new Map();

const MapMonths = new Map();

MapMonths.set("01","January");
MapMonths.set("02","February");
MapMonths.set("03","March");
MapMonths.set("04","April");
MapMonths.set("05","May");
MapMonths.set("06","June");
MapMonths.set("07","July");
MapMonths.set("08","August");
MapMonths.set("09","September");
MapMonths.set("10","October");
MapMonths.set("11","November");
MapMonths.set("12","December");

MapSort.set("Date", new SortByDate());
MapSort.set("Title", new SortByTitle());
MapSort.set("Url", new SortByURL());
MapSort.set("Description", new SortByDescription());
MapSort.set("Categories", new SortByCategorie());

document.getElementById("NewRSSBTN").addEventListener("click", function () {
  AddNewFeedRSS();
  loadIn();
});

document.getElementById("UpdateRSS").addEventListener("click", function () {
  var content = document.getElementById("Content");
  let data = document.getElementById("SelectRSS").value;
  UpdateContent("./resources/UpdateFeed.php");
  getNewBySelectAllNews("./resources/GetNews.php", data);
  content.style.textAlign = "left";
});

document.getElementById("SearchBTN").addEventListener("click", function () {
  let DataToFind = document.getElementById("SearchInput").value;
  SearchNew(DataToFind, ArrayOfNews);
  document.getElementById("SearchInput").value = "";
});

document.getElementById("SelectRSS").addEventListener("change", function () {
  let data = document.getElementById("SelectRSS").value;
  getNewBySelectAllNews("./resources/GetNews.php", data);
  getNewBySelectGroupedNews("./resources/GetNewsGrouped.php", data);
});

document.getElementById("Selection").addEventListener("change", function () {
  let Key = document.getElementById("Selection").value;
  let Sort = MapSort.get(Key);
  Sort.sort();
});

function loadIn(){
  let loading = document.getElementById("loading");
  loading.style.display = "block";
}

function loadOut(){
  let loading = document.getElementById("loading");
  loading.style.display = "none";
}

function loadContent(url) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      //console.log(this.responseText)
      let data = JSON.parse(this.responseText);
      //console.log(data);
      CreateNews(data);
      ArrayOfNews = data;
      ArrayOfNewsSortedByDate = JSON.parse(this.responseText);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function loadContentGrouped(url) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      //console.log(this.responseText)
      let data = JSON.parse(this.responseText);
      //console.log(data);
      CreateGroupedNews(data);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function getNewBySelectAllNews(url, data) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.responseText);
      //console.log(data);
      CreateNews(data);
      ArrayOfNews = data;
      ArrayOfNewsSortedByDate = JSON.parse(this.responseText);
    }
  };
  xhttp.open("GET", url + "?id=" + data, true);
  xhttp.send();
}

function getNewBySelectGroupedNews(url, data) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.responseText);
      //console.log(data);
      CreateGroupedNews(data);
      
    }
  };
  xhttp.open("GET", url + "?id=" + data, true);
  xhttp.send();
}


function AddNewFeedRSS() {
  var xhttp = new XMLHttpRequest();
  let insert = document.getElementById("insert-url");
  let data = document.getElementById("insert-url").value;
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
		LoadSelect(); //Aqui se deberia actualizar el select porque estamos metiendo una nueva url
		loadContent("./resources/GetNews.php");//Aqui deberia actualizar la vista despues de meter una nueva url
    loadContentGrouped("./resources/GetNewsGrouped.php");
    loadOut();
   }
  };
  xhttp.open("GET", "./resources/AddFeedRSS.php? url=" + data, true);
  xhttp.send();
  insert.value = "";

}

function UpdateContent() {
  var xhttp = new XMLHttpRequest();
/*   xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      alert(this.status);
    }
  }; */
  xhttp.open("GET", "./resources/UpdateFeed.php", true);
  xhttp.send(); 
}


function LoadSelect() {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.responseText);
      //console.log(data);
      CreateOptions(data);
    }
  };
  xhttp.open("GET", "./resources/CreateOption.php", true);
  xhttp.send();
}

function CreateOptions(data) {
  let Option = "";
  for (let i = 0; i < data.length; i++) {
    Option +=
      '<option value= "' +
      data[i].idRSS +
      '">' +
      data[i].RSStitle +
      "</option>";
  }
  document.getElementById("SelectRSS").innerHTML = Option;
}

function CreateNews(data) {
  var content = document.getElementById("Content");
  let Option = "";
  for (let i = 0; i < data.length; i++) {
    let url = encodeURIComponent(data[i].dirimagen);
    Option += '<div class="News">';
    Option += `<div class="img-news"> <img src = assets/img/news/${url} onerror='this.src="assets/img/news/default.png"; this.style.width="13%"; this.style.height="13%"; this.style.marginRight="9.5%";' align="left""> </div> `;
    Option += "<h3>" + data[i].titulo + "</h3>";
    Option += '<h6> <strong>Fecha: </strong> " ' + data[i].fecha + '"</h6>';
    Option +=
      "<p> <strong>Descripción: </strong>" +
      data[i].descripcion +
      '<a href="' +
      data[i].enlace +
      '"> Read More...</a>' +
      "</p>";
    Option += "<h5>" + data[i].cat + "</h5>";
    Option += "<hr>";
    Option += "</div>";
  }
  content.innerHTML = Option;
  content.style.textAlign = "left";
}

function SearchNew(DatatoFind, ArrayNews) {
  let ArrayResult = new Array();
  var content = document.getElementById("Content");
  for (let i = 0; i < ArrayNews.length; i++) {
    if (ArrayNews[i].titulo.includes(DatatoFind)) {
      ArrayResult.push(ArrayNews[i]);
    }
  }
  if (ArrayResult.length > 0) {
    content.style.textAlign = "left";
    CreateNews(ArrayResult);
  } else {
    content.style.fontSize = "25px";
    content.style.textAlign = "center";
    content.style.marginTop = "2rem";
    content.style.marginBottom = "2rem";
    content.innerHTML =
      "No results found";
  }
}


function CreateGroupedNews(DataJSON) {
  const lista = document.getElementById("ContentGroupedNews");
  const YearsArray = Object.keys(DataJSON);
  let TemplateNews = ``;
  YearsArray.forEach((keyYear) => {

    TemplateNews  += getTemplateHeaders(keyYear,"headingTwo",keyYear);
    
    const MonthsArray = Object.keys(DataJSON[keyYear]);
    SortArray(MonthsArray);
    MonthsArray.forEach((keyMonth) => {
      TemplateNews  += getTemplateHeaders(keyYear+MapMonths.get(keyMonth),`heading${keyYear}`,MapMonths.get(keyMonth));
      const DaysArray = Object.keys(DataJSON[keyYear][keyMonth]);
      console.log(DaysArray);
      SortArray(DaysArray);
      DaysArray.forEach((keyDay)=>{
        TemplateNews  += getTemplateHeaders(keyYear+MapMonths.get(keyMonth)+keyDay,`heading${keyYear+MapMonths.get(keyMonth)}`,keyDay);
        const News = Object.keys(DataJSON[keyYear][keyMonth][keyDay]);
        News.forEach((item)=>{
         TemplateNews +=NewsFormat(DataJSON[keyYear][keyMonth][keyDay][item]);
        });
        TemplateNews += `   
        </div>
        </div>
        </div>`;  
      });
      TemplateNews += `   
        </div>
        </div>
        </div>`;  
    });
  
    TemplateNews += `   
        </div>
    </div>
  </div>`;  
  });
  lista.innerHTML = TemplateNews;

}

function NewsFormat(data){
  let url = encodeURIComponent(data.dirimagen);
  let NewsTemplate = `   
  <div class="News">
  <div class="img-news"> <img src = assets/img/news/${url} onerror='this.src="assets/img/news/default.png"; this.style.width="13%"; this.style.height="13%"; this.style.marginRight="9.5%";' align="left""> </div> 
  <h3>${data.titulo}</h3>
  <h6> <strong>Fecha: </strong> ${data.fecha}</h6>
  <p> <strong>Descripción: </strong>${data.descripcion}<a href="${data.enlace}">Read More...</a></p>
  <h5>${data.cat}</h5>
  <hr>
  </div>
  `;
  return NewsTemplate; 
}


function getTemplateHeaders(Content,DataParent,textContent){
  let Template = `<div class="card">
  <div class="card-header" id="heading${Content}">
    <h5 class="mb-0">
      <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${Content}" aria-expanded="true" aria-controls="collapse${Content}"> 
      <i class="fa fa-terminal">&nbsp;</i>
      ${textContent}
      </button>
    </h5>
  </div>

  <div id="collapse${Content}" class="collapse" aria-labelledby="heading${Content}" data-parent="#${DataParent}">
    <div class="card-body">
  `;
  return Template;
}


//Sort Algorithms

function SortByTitle() {
  this.sort = function () {
    ArrayOfNews.sort(function (a, b) {
      if (a.titulo.toLowerCase() > b.titulo.toLowerCase()) {
        return 1;
      }
      if (a.titulo.toLowerCase() < b.titulo.toLowerCase()) {
        return -1;
      }
      return 0;
    });
    CreateNews(ArrayOfNews);
  };
}

function SortByDate() {
  this.sort = function () {
    CreateNews(ArrayOfNewsSortedByDate);
  }
}

function SortByDescription() {
  this.sort = function () {
    ArrayOfNews.sort(function (a, b) {
      if (a.descripcion.toLowerCase() > b.descripcion.toLowerCase()) {
        return 1;
      }
      if (a.descripcion.toLowerCase() < b.descripcion.toLowerCase()) {
        return -1;
      }
      return 0;
    });
    CreateNews(ArrayOfNews);
  };
}

function SortByCategorie() {
  this.sort = function () {
    ArrayOfNews.sort(function (a, b) {
      if (a.cat.toLowerCase() > b.cat.toLowerCase()) {
        return 1;
      }
      if (a.cat.toLowerCase() < b.cat.toLowerCase()) {
        return -1;
      }
      return 0;
    });
    CreateNews(ArrayOfNews);
  };
}

function SortByURL() {
  this.sort = function () {
    ArrayOfNews.sort(function (a, b) {
      if (a.enlace > b.enlace) {
        return 1;
      }
      if (a.enlace < b.enlace) {
        return -1;
      }
      return 0;
    });
    CreateNews(ArrayOfNews);
  };
}

function SortArray(ArrayKeys){
  ArrayKeys.sort(function(a,b){
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  });

}

loadContent("./resources/GetNews.php");
loadContentGrouped("./resources/GetNewsGrouped.php");
LoadSelect();