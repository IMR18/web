<?php
header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/json');
function PDO($host="imr18.fr",$user="sqlimr",$pass="P42A0;ch-A3_8",$db="imr"){
	global $pdo_Database_Set;
	if(isset($pdo_Database_Set)) return $pdo_Database_Set;
	
	try {
		$db = new PDO("mysql:host=$host;dbname=$db",$user,$pass);
		$db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
		$db->exec("SET CHARACTER SET utf8");
		$db->exec("SET NAMES utf8");
	}
	catch (PDOException $e){
		die();
	}
	$pdo_Database_Set=$db;
	return $db;
}



//vos fonctions generiques ici

?>
