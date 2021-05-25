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
			$dir_imagen = "";
			try {
				if($item -> children('media', true) != null && $item->children('media', true)->content != null && $item->children('media', true)->content->attributes() != null && isset($item->children('media', true)->content->attributes()->url) ){
					$imageurl = (string)($item->children('media', true)->content->attributes()->url); 
					$destdir = '../assets/img/';
					$dir_imagen = substr($title, 0, 30) ."." .substr( $imageurl, strrpos( $imageurl, '.' )+1 );
					$dir_imagen =  preg_replace('/\s+/', '', $dir_imagen);
					if(!is_file($destdir.$dir_imagen)){
						$result = getSslPage($imageurl);
						file_put_contents($destdir.$dir_imagen, $result);    
					}
				}
			} catch (Exception $e) {
			}
				$stmt = $con->prepare("INSERT INTO noticias (idRSS,fecha,titulo,enlace,descripcion,cat, dirimagen) VALUES (?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE idRSS = idRSS;");
				$stmt->bind_param("issssss", $irss, $date, $title,$link,$description,$categorie, $dir_imagen);
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