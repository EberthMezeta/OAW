<?php 

    include("DBConection.php");
    
    $Query = "SELECT * FROM `feedtable`";
    $execute = mysqli_query($con, $Query);

    while($row= mysqli_fetch_array($execute)){
        UpdateNews($row["RSSLink"]);
    }


    function UpdateNews($url){
        include("DBConection.php");
        $rss = simplexml_load_file($url);
        $irss = intval(getID($url));

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

        $stmt = $con->prepare("UPDATE noticias  set fecha=? ,titulo = ?, enlace= ?,descripcion=?,cat=? where idRSS=?");
        $stmt->bind_param("sssssi", $date, $title,$link,$description,$categorie, $irss);
        $stmt->execute() or dir(mysqli_error($con));  
    }
    }

    function getID($url)
    {
    include("DBConection.php");
    $Query = "SELECT idRSS FROM feedtable WHERE RSSLink='$url'";
    $execute = mysqli_query($con, $Query);
    $id = mysqli_fetch_array($execute);
    return $id["idRSS"];
    }
?>