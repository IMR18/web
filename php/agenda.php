<?php
if(isset($_GET["action"]))
	$action=$_GET["action"];
else{
	$res=array("NO ACTION SET");
	echo json_encode($res);
	exit;
}

require("functions_agenda.php");
$db=PDO();
switch($action){
	case "getTasks":
		$res=get_tasks($db);
		break;
}

echo json_encode($res);