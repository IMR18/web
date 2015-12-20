<?php

function PDO($host="imr18.fr",$user="sqlimr",$pass="P42A0;ch-A3_8",$db="imr"){
	try {
		$db = new PDO("mysql:host=$host;dbname=$db",$user,$pass);
		$db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
		$db->exec("SET CHARACTER SET utf8");
	}
	catch (PDOException $e){
		die();
	}
	return $db;
}



//vos fonctions generiques ici 

?>
