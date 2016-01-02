<?php
require("functions_agenda.php");

if(isset($_GET["action"])) {
	$action=$_GET["action"];

	$p = json_decode(file_get_contents("php://input"));

	$db=PDO();
	switch($action){
		case "getTasks":
			$group = isset($_GET["group"]) && !empty($_GET["group"]) ? $_GET["group"] : 0;
			$from = isset($_GET["from"]) && !empty($_GET["from"]) ? $_GET["from"] : 0;
			$res=get_tasks($db,$group,$from);
		break;

		case "addTask":
			if(!is_object($p))
				$res=array("addTask NO PARAMETERS");
			else
				$res=array(add_task($db,issetor($p->title),issetor($p->description),issetor($p->deadline),issetor($p->worklevel),issetor($p->group),issetor($p->UID)));
		break;
	}

	echo json_encode($res);
}
else{
	$res=array("NO ACTION SET");
	echo json_encode($res);
}
