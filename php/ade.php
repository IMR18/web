<?php
if(isset($_GET["action"]))
	$action=$_GET["action"];
else {
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
		$ressources=isset($_GET["ressource"]) && !empty($_GET["ressource"]) ? $_GET["ressource"] : "1";
		if($ressources!='1')
		$ressources="'".implode("','",explode(",",$ressources))."'";
		$req=$db->prepare("select * from events where ressource in ($ressources) or 1=?");
		$req->execute(array($ressources));
		$res=$req->fetchAll(PDO::FETCH_ASSOC);
		break;

		case "getEventsJson":
			$ressources=isset($_GET["ressource"]) && !empty($_GET["ressource"]) ? $_GET["ressource"] : "1";
			if($ressources!='1')
			$ressources="'".implode("','",explode(",",$ressources))."'";
			$req=$db->prepare("select UID as id, StartDate as start,EndDate as end, Title as title,location from events where ressource in ($ressources) or 1=?");
			$req->execute(array($ressources));
			$res=$req->fetchAll(PDO::FETCH_ASSOC);
			$classes=array('color_DEB887','color_5F9EA0','color_7FFF00','color_D2691E','color_FF7F50','color_FFF8DC','color_00FFFF','color_DC143C','color_00008B','color_008B8B','color_B8860B','color_A9A9A9','color_006400','color_BDB76B','color_8B008B','color_FF8C00');
			for($i=0;$i<sizeof($res);$i++){
				$titles[$i]=$res[$i]['title'];
			}
			$titles=array_values(array_unique($titles));
			for($i=0;$i<sizeof($res);$i++){
				$res[$i]['class']=$classes[(array_search($res[$i]['title'],$titles))];
				$res[$i]['title']=	$res[$i]['title']."<br/>".	$res[$i]['location'];
				unset(	$res[$i]['location']);
			}
			break;

	case "getRessources":
		$ressources=isset($_GET["ressource"]) && !empty($_GET["ressource"]) ? $_GET["ressource"] : "1";
		if($ressources!='1')
		$ressources="'".implode("','",explode(",",$ressources))."'";
		$req=$db->prepare("select * from ressources where number in ($ressources) or 1=?");
		$req->execute(array($ressources));
		$res=$req->fetchAll(PDO::FETCH_ASSOC);
		break;

	case "getRessourcesByName":
		$name = isset($_GET["name"]) && !empty($_GET["name"]) ? $_GET["name"] : "1";

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
