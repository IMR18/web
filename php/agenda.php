<?php
require("functions_agenda.php");

if(isset($_GET["action"]))
	$action=$_GET["action"];
else{
	$res=array("NO ACTION SET");
	echo json_encode($res);
	exit;
}


$title=htmlentities($_GET["title"]);
$description=htmlentities($_GET["description"]);
$deadline=htmlentities($_GET["deadline"]);
$worklevel=htmlentities($_GET["worklevel"]);


$db=PDO();
switch($action){
	case "getTasks":
		$res=get_tasks($db);
		break;

	case "addTask":
		$res=add_task($db,$title,$description,$deadline,$worklevel);
		break;
}

echo json_encode($res);