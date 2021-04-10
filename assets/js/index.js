let ArrayOfNews = new Array();
let MapSort = new Map();

MapSort.set("Date", new SortByDate());
MapSort.set("Title", new SortByTitle());
MapSort.set("Url", new SortByURL());
MapSort.set("Description", new SortByDescription());
MapSort.set("Categories", new SortByCategorie());

document.getElementById("NewRSSBTN").addEventListener("click", function () {
  AddNewFeedRSS();
  loadContent("./resources/GetFeed.php");//Aqui deberia actualizar la vista despues de meter una nueva url
  LoadSelect(); //Aqui se deberia actualizar el select porque estamos metiendo una nueva url
});

document.getElementById("UpdateRSS").addEventListener("click", function () {
  let data = document.getElementById("SelectRSS").value;
  UpdateContent("./resources/UpdateFeed.php");
  getNewBySelect("./resources/GetContent.php", data);
});

document.getElementById("SearchBTN").addEventListener("click", function () {
  let DataToFind = document.getElementById("SearchInput").value;
  SearchNew(DataToFind, ArrayOfNews);
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

function loadContent(url) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.responseText);
      console.log(data);
      CreateNews(data);
      ArrayOfNews = data;
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
    }
  };
  xhttp.open("POST", url + "?data=" + data, true);
  xhttp.send();
}

function AddNewFeedRSS() {
  var xhttp = new XMLHttpRequest();
  let data = document.getElementById("NewRSSInput").value;
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.responseText);
      console.log(data);
      CreateNews(data);
      ArrayOfNews = data;
    }
  };
  xhttp.open("POST", "./resources/AddFeedRSS.php? url=" + data, true);
  xhttp.send();
  LoadSelect();
}


function UpdateContent(){
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
      ArrayOfNews = data;
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
    Option += "</div>";
  }
  document.getElementById("Content").innerHTML = Option;
}

function SearchNew(DatatoFind, ArrayNews) {
  let ArrayResult = new Array();

  for (let i = 0; i < ArrayNews.length; i++) {
    if (ArrayNews[i].titulo.includes(DatatoFind)) {
      ArrayResult.push(ArrayNews[i]);
    }
  }
  if (ArrayResult.length > 0) {
    CreateNews(ArrayResult);
  } else {
    document.getElementById("Content").innerHTML =
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
    ArrayOfNews.sort(function (a, b) {
      if (a.fecha.toLowerCase() > b.fecha.toLowerCase()) {
        return 1;
      }
      if (a.fecha.toLowerCase() < b.fecha.toLowerCase()) {
        return -1;
      }
      return 0;
    });
    CreateNews(ArrayOfNews);
  };
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
