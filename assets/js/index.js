let ArrayOfNews = new Array();
let ArrayOfNewsSortedByDate = new Array()
let MapSort = new Map();

MapSort.set("Date", new SortByDate());
MapSort.set("Title", new SortByTitle());
MapSort.set("URL", new SortByURL());
MapSort.set("Description", new SortByDescription());
MapSort.set("Categories", new SortByCategorie());

document.getElementById("NewRSSBTN").addEventListener("click", function () {
  AddNewFeedRSS();
  loadIn();
  setTimeout(function(){ loadOut(); }, 2000);
});

document.getElementById("UpdateRSS").addEventListener("click", function () {
  var content = document.getElementById("Content");
  let data = document.getElementById("SelectRSS").value;
  UpdateContent("./resources/UpdateFeed.php");
  getNewBySelect("./resources/GetContent.php", data);
  content.style.textAlign = "left";
});

document.getElementById("SearchBTN").addEventListener("click", function () {
  let DataToFind = document.getElementById("SearchInput").value;
  SearchNew(DataToFind, ArrayOfNews);
  document.getElementById("SearchInput").value = "";
});

document.getElementById("SelectRSS").addEventListener("change", function () {
  let data = document.getElementById("SelectRSS").value;
  getNewBySelect("./resources/GetContent.php", data);
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
      console.log(this.responseText)
      let data = JSON.parse(this.responseText);
      console.log(data);
      CreateNews(data);
      ArrayOfNews = data;
      ArrayOfNewsSortedByDate = JSON.parse(this.responseText);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function getNewBySelect(url, data) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.responseText);
      console.log(data);
      CreateNews(data);
      ArrayOfNews = data;
      ArrayOfNewsSortedByDate = JSON.parse(this.responseText);
    }
  };
  xhttp.open("POST", url + "?data=" + data, true);
  xhttp.send();
}

function AddNewFeedRSS() {
  var xhttp = new XMLHttpRequest();
  let insert = document.getElementById("insert-url");
  let data = document.getElementById("insert-url").value;
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
		LoadSelect(); //Aqui se deberia actualizar el select porque estamos metiendo una nueva url
		loadContent("./resources/GetFeed.php");//Aqui deberia actualizar la vista despues de meter una nueva url
   }
  };
  xhttp.open("POST", "./resources/AddFeedRSS.php? url=" + data, true);
  xhttp.send();
  insert.value = "";

}

function UpdateContent() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

    }
  };
  xhttp.open("GET", "./resources/UpdateFeed.php", true);
  xhttp.send();
}


function LoadSelect() {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.responseText);
      console.log(data);
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
    Option += '<div class="News">';
    Option += "<h3>" + data[i].titulo + "</h3>";
    Option += '<h6> Fecha: " ' + data[i].fecha + '"</h6>';
    Option +=
      "<p>Descripción: " +
      data[i].descripcion +
      '<a href="' +
      data[i].enlace +
      '">Read More...</a>' +
      "</p>";
    Option += "<h5>" + data[i].cat + "</h5>";
    Option += "<hr>";
    Option += "</div>";
  }
  content.innerHTML = Option;
  content.style.textAlign = "justified";
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
    content.style.marginTop = "5rem";
    content.innerHTML =
      "No se encontraron resultados";
  }
}

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

loadContent("./resources/GetFeed.php", "Content");
LoadSelect();