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
    include("../resources/DBConection.php");
    $Query = "SELECT idRSS FROM feedtable WHERE RSSLink='$url'";
    $execute = mysqli_query($con, $Query);
    $id = mysqli_fetch_array($execute);
    return $id["idRSS"];
}

function addNews($feedURL)
{
    include("../resources/DBConection.php");
    $url = $feedURL;
    $rss = simplexml_load_file($url);
    $irss = intval(getID($feedURL));

    foreach ($rss->channel->item as $item) {
        $link = $item->link;  //extrae el link
        $title = $item->title;  //extrae el titulo
        $date = new DateTime($item->pubDate); //extrae la fecha
		$date = $date->format(DateTime::ATOM); 
        $categorie = $item->category;  //extrae la categoria
        $description = strip_tags($item->description);  //extrae la descripcion
        if (strlen($description) > 400) { //limita la descripcion a 400 caracteres
            $stringCut = substr($description, 0, 200);
            $description = substr($stringCut, 0, strrpos($stringCut, ' ')) . '...';
        }
		$dir_imagen = "";
		try {
			if($item -> children('media', true) != null && $item->children('media', true)->content != null && $item->children('media', true)->content->attributes() != null && isset($item->children('media', true)->content->attributes()->url) ){
				$imageurl = (string)($item->children('media', true)->content->attributes()->url); 
				$destdir = '../assets/img/news/';
				$dir_imagen = substr($title, 0, 30) ."." .substr( $imageurl, strrpos( $imageurl, '.' )+1 );
				$dir_imagen =  preg_replace('/\s+/', '', $dir_imagen);
				if(!is_file($destdir.$dir_imagen)){
					$result = getSslPage($imageurl);
					file_put_contents($destdir.$dir_imagen, $result);    
				}
			}
		} catch (Exception $e) {
            $dir_imagen= "";
		}
		$stmt = $con->prepare("INSERT INTO noticias (idRSS,fecha,titulo,enlace,descripcion,cat,dirimagen) VALUES (?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE idRSS = idRSS;");
        $stmt->bind_param("issssss", $irss, $date, $title,$link,$description,$categorie,$dir_imagen);
        $stmt->execute() or dir(mysqli_error($con));
    }
}

function getSslPage($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_REFERER, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    $result = curl_exec($ch);
    curl_close($ch);
    return $result;
}

function addRSS($url){
    include("../resources/DBConection.php");
    $title =  getTitle($url);
    $stmt = $con->prepare("INSERT INTO feedtable (RSSLink,RSSTitle)  VALUES (?,?) ON DUPLICATE KEY UPDATE RSSLink = RSSLink;");
    $stmt->bind_param("ss", $url, $title);
    $stmt->execute() or dir(mysqli_error($con));
    $stmt -> close();
}



