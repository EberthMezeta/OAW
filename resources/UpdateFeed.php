<?php 

    include("../resources/DBConection.php");
    
    $Query = "SELECT * FROM `feedtable`";
    $execute = mysqli_query($con, $Query);

    while($row= mysqli_fetch_array($execute)){
        UpdateNews($row["RSSLink"]);
    }


    function UpdateNews($url){
        include("../resources/DBConection.php");
        $rss = simplexml_load_file($url);
        $irss = intval(getID($url));

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

			$stmt = $con->prepare("INSERT INTO noticias (idRSS,fecha,titulo,enlace,descripcion,cat) VALUES (?,?,?,?,?,?) ON DUPLICATE KEY UPDATE idRSS = idRSS;");
			$stmt->bind_param("isssss", $irss, $date, $title,$link,$description,$categorie);
			$stmt->execute() or dir(mysqli_error($con));
		}
    }

    function getID($url)
    {
    include("../resources/DBConection.php");
    $Query = "SELECT idRSS FROM feedtable WHERE RSSLink='$url'";
    $execute = mysqli_query($con, $Query);
    $id = mysqli_fetch_array($execute);
    return $id["idRSS"];
    }
?>