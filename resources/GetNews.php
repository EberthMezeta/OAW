<?php

include("../resources/DBConection.php");

function get_feed_id($con) {
	if(!empty($_GET) && isset($_GET["id"])) {
		return $_GET["id"];
	} else {
		$query = "SELECT * FROM `feedtable`";
		$query_obj = mysqli_query($con,$query);
		$feeds = mysqli_fetch_array($query_obj);
		if($feeds!=null){
			$first_id = $feeds["idRSS"];
			return $first_id;
		} else {
			return -1;
		}
	}
}

function get_news($FirstID, $con){
    $Query = "SELECT fecha,titulo,enlace,descripcion,cat FROM `noticias` WHERE IdRSS='$FirstID' Order By fecha DESC";
    $execute = mysqli_query($con,$Query);
    $data = array();
    while ($row=mysqli_fetch_assoc($execute)){
        $data[]=$row;
    }
    echo json_encode($data,JSON_UNESCAPED_SLASHES);
}     
    
$feed_id = get_feed_id($con);
if($feed_id!=-1){
    get_news($feed_id, $con);
} else {
    echo "Agregue un rss";
} 
?>	
