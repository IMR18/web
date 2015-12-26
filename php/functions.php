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

function issetor(&$var, $default = null) {
	return isset($var) ? $var : $default;
}


function WordSum($word)
{
    $cnt = 0;
    $word = strtoupper(trim($word));
    $len = strlen($word);

    for($i = 0; $i < $len; $i++)
    {
        $cnt += ord($word[$i]) - 64;
    }

    return $cnt;
}

//vos fonctions generiques ici

?>
