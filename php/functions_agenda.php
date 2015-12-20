<?php
require_once("functions.php");

function get_tasks($db){
	$req=$db->prepare("SELECT * FROM tasks ORDER BY deadline");
	$req->execute();
	$res=$req->fetchAll(PDO::FETCH_ASSOC);

	return $res;
}
?>