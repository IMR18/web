<?php
if(isset($_GET["action"]))
	$action=$_GET["action"];
else{
	$res=array("NO ACTION SET");
	echo json_encode($res);
	exit;
}

require("functions_ade.php");
$db=PDO();
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

		case "getEventsJson":
			$ressources=isset($_GET["ressource"])?$_GET["ressource"]:"1";
			if($ressources=="")
			$ressources=1;
			if($ressources!='1')
			$ressources="'".implode("','",explode(",",$ressources))."'";
			$req=$db->prepare("select '0' as id, StartDate as start,EndDate as end, Title as title from events where ressource in ($ressources) or 1=?");
			$req->execute(array($ressources));
			$res=$req->fetchAll(PDO::FETCH_ASSOC);
			for($i=0;$i<sizeof($res);$i++)
				$res[$i]['id']=$i+1;
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

	case "getRessourcesByName":
		$name = isset($_GET["name"]) ? $_GET["name"] : "1";
		if($name == "")
			$name = "1";
		// if($name!="1")
		// 	$name="'".implode("','",explode(",",$name))."'";

		$req=$db->prepare("SELECT * FROM ressources WHERE Name LIKE \"%".$name."%\" ORDER BY Name");
		$req->execute();
		$res=$req->fetchAll(PDO::FETCH_ASSOC);
		break;

	default:
		$res=array("ACTION SET NOT FOUND");
		break;
}

echo json_encode($res);
?>
