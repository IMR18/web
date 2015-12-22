<?php
require("functions_agenda.php");

if(isset($_GET["action"]))
	$action=$_GET["action"];
else{
	$res=array("NO ACTION SET");
	echo json_encode($res);
	exit;
}
$p = json_decode(file_get_contents("php://input"));


$db=PDO();
switch($action){
	case "getTasks":
		$res=get_tasks($db);
		break;

	case "addTask":
		if(!is_object($p))
	{
		$res=array("addTask NO PARAMETERS");
		echo json_encode($res);
		exit;
	}
		$res=array(add_task($db,issetor($p->title),issetor($p->description),issetor($p->deadline),issetor($p->worklevel),issetor($p->group),issetor($p->UID)));
		break;
}

echo json_encode($res);
