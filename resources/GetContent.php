<?php 
include("DBConection.php");
$ID = $_REQUEST["data"];

$Query = "SELECT * FROM noticias where idRSS= '$ID'";
$execute = mysqli_query($con,$Query);
$data= array();
while ($row=mysqli_fetch_assoc($execute)){
    $data[]=$row;
}
echo json_encode($data,JSON_UNESCAPED_SLASHES);
?>

