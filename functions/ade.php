<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if(isset($_GET["action"]))
	$action=$_GET["action"];
else{
	$res=array("NO ACTION SET");
	echo json_encode($res);
	exit;
}

require("functions_ade.php");
$db=PDO("imr18.fr","sqlimr","P42A0;ch-A3_8","imr");
switch($action){
	case "updateALL":
		$res=updateRessources($db,ressources2update($db));
		break;

	case "getEvents":
		$ressources=isset($_GET["ressource"])?$_GET["ressource"]:"1";
		if($ressources=="")
		$ressources=1;
		if($ressources!='1')
		$ressources="'".implode("','",explode(",",$ressources))."'";
		$req=$db->prepare("select * from events where ressource in ($ressources) or 1=?");
		$req->execute(array($ressources));
		$res=$req->fetchAll(PDO::FETCH_ASSOC);
		break;

	case "getRessources":
		$ressources=isset($_GET["ressource"])?$_GET["ressource"]:"1";
		if($ressources=="")
		$ressources=1;
		if($ressources!='1')
		$ressources="'".implode("','",explode(",",$ressources))."'";
		$req=$db->prepare("select * from ressources where number in ($ressources) or 1=?");
		$req->execute(array($ressources));
		$res=$req->fetchAll(PDO::FETCH_ASSOC);
		break;

	default:
		$res=array("ACTION SET NOT FOUND");
		break;
}

echo json_encode($res);
?>
