<?php

$url = $_REQUEST["url"];

addRSS($url);
addNews($url);

function getTitle($url)
{
    $doc = new DOMDocument();
    libxml_use_internal_errors(true);
    $doc->loadHTMLFile($url);
    $title = $doc->getElementsByTagName('title');
    return  $title->item(0)->nodeValue;
}

function getID($url)
{
    include("DBConection.php");
    $Query = "SELECT idRSS FROM feedtable WHERE RSSLink='$url'";
    $execute = mysqli_query($con, $Query);
    $id = mysqli_fetch_array($execute);
    return $id["idRSS"];
}

function addNews($feedURL)
{
    include("DBConection.php");
    $url = $feedURL;
    $rss = simplexml_load_file($url);
    $irss = intval(getID($feedURL));

    foreach ($rss->channel->item as $item) {
        $link = $item->link;  //extrae el link
        $title = $item->title;  //extrae el titulo
        $date = $item->pubDate;  //extrae la fecha
        $categorie = $item->category;  //extrae la categoria
        $description = strip_tags($item->description);  //extrae la descripcion
        if (strlen($description) > 400) { //limita la descripcion a 400 caracteres
            $stringCut = substr($description, 0, 200);
            $description = substr($stringCut, 0, strrpos($stringCut, ' ')) . '...';
        }

        $stmt = $con->prepare("INSERT INTO noticias (idRSS,fecha,titulo,enlace,descripcion,cat) VALUES (?,?,?,?,?,?)");
        $stmt->bind_param("isssss", $irss, $date, $title,$link,$description,$categorie);
        $stmt->execute() or dir(mysqli_error($con));
    }
}

function addRSS($url){
    include("DBConection.php");
    $title =  getTitle($url);
    $stmt = $con->prepare("INSERT INTO feedtable (RSSLink,RSSTitle)  VALUES (?,?)");
    $stmt->bind_param("ss", $url, $title);
    $stmt->execute() or dir(mysqli_error($con));
    $stmt -> close();
}



