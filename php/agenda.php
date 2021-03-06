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
			if(!isset($p->title))
				$res=array('status'=>false,'msg'=>"NO PARAMETERS");
			else
				$res=array('status'=> add_task($db,issetor($p->title),issetor($p->description),issetor($p->deadline),issetor($p->worklevel),issetor($p->groupe),issetor($p->UID))
									,'msg'=>"$p->title est ajouté");
		break;
		case "deleteTask":
			if(!isset($p->id))
				$res=array('status'=>false,'msg'=>"NO PARAMETERS");
			else
				$res=array('status'=> deleteTask($db,issetor($p->id))	,'msg'=>"$p->title est supprimée");
		break;

		case "editTask":
			if(!isset($p->id))
				$res=array('status'=>false,'msg'=>"NO PARAMETERS");
			else
				$res=array('status'=> editTask($db,issetor($p->title),issetor($p->description),issetor($p->deadline),issetor($p->worklevel),issetor($p->groupe),issetor($p->UID),$p->id)
										,'msg'=>"$p->title est modifiée");
		break;
		default:
		$res=array("ACTION NOT FOUND");
	}

	echo json_encode($res);
}
else{
	$res=array("NO ACTION SET");
	echo json_encode($res);
}
