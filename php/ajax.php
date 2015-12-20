<?php

if(isset($_GET["action"]))
$action=$_GET["action"];
else{
	$res=array("NO ACTION SET");
	echo json_encode($res);
	exit;
}
$result=array(0);
switch($action){
	case "X":
	//TODO
	break;

}



echo json_encode($result);
?>
