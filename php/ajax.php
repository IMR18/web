<?php

if(isset($_GET["action"])) {
	$action=$_GET["action"];
	$result=array(0);
	switch($action){
		case "X":
		//TODO
		break;
	}
}
else {
	$result=array("NO ACTION SET");
}

echo json_encode($result);
?>
