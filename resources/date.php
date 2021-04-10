<?php 

$date = "Wed, 17 Jul 2019 04:16:33 GMT";


gtDate($date);

function gtDate($date){
    $array = date_parse_from_format("D, d M Y H:i:s GMT",$date);
    print_r($array);
}



?>