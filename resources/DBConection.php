<?php

$db_host = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "feedrss";
 
$con = mysqli_connect($db_host, $db_user, $db_pass, $db_name);
 
if(mysqli_connect_errno()){
	echo 'Unable to connect with the database: '.mysqli_connect_error();
}
?>