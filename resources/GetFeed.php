<?php

include("DBConection.php");

$Query = "SELECT * FROM `feedtable`";
$execute = mysqli_query($con,$Query);

$arrayDatos = mysqli_fetch_array($execute);

    function getNews($FirstID){
        include("DBConection.php");
        $Query = "SELECT fecha,titulo,enlace,descripcion,cat FROM `noticias` WHERE IdRSS='$FirstID' Order By fecha";
        $execute = mysqli_query($con,$Query);
        $data = array();
        while ($row=mysqli_fetch_assoc($execute)){
            $data[]=$row;
        }
        echo json_encode($data,JSON_UNESCAPED_SLASHES);
    }     
    
    if($arrayDatos!=null){
        $FirstID = $arrayDatos["idRSS"];
        getNews($FirstID);
    }else{
        echo "Agregue un rss";
    }    
    
?>	
