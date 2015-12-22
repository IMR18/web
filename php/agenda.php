<?php
require("functions_agenda.php");

if(isset($_GET["action"]))
	$action=$_GET["action"];
else{
	$res=array("NO ACTION SET");
	echo json_encode($res);
	exit;
}

if(isset($_GET['title'])){
	$title=htmlentities($_GET["title"]);
}

if(isset($_GET['description'])){
	$description=htmlentities($_GET["description"]);
}

if(isset($_GET['deadline'])){
	$deadline=htmlentities($_GET["deadline"]);
}

if(isset($_GET['worklevel'])){
	$worklevel=htmlentities($_GET["worklevel"]);
}
	
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