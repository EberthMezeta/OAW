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

function add_key_if_not_exists($key, &$array) {
    if(!array_key_exists($key, $array)) {
        $array[$key] = array();
    }
}

function get_news($id, $con){
    include("DBConection.php");
    $query = "SELECT fecha,titulo,enlace,descripcion,cat FROM `noticias` WHERE IdRSS='$id' Order By fecha ASC"
    $query_obj = mysqli_query($con,$query);
    $data_grouped_by_date = array();
    while ($row=mysqli_fetch_assoc($query_obj)){
        $timestamp = $row["fecha"];
		$year = mb_substr($timestamp, 0, 4);
		$month = mb_substr($timestamp, 5, 2);
		$day = mb_substr($timestamp, 8, 2);
        add_key_if_not_exists($year, $data_grouped_by_date);
        add_key_if_not_exists($month, $data_grouped_by_date[$year]);
        add_key_if_not_exists($day, $data_grouped_by_date[$year][$month]);
        $data_grouped_by_date[$year][$month][$day][] = $row;
    }
    echo json_encode($data_grouped_by_date, JSON_UNESCAPED_SLASHES);
}     

$feed_id = get_feed_id($con);
if($feed_id!=-1){
    get_news($feed_id, $con);
} else {
    echo "Agregue un rss";
}     
?>	
