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
	case "getPage":
	if(!empty($_GET['pageName'])){
		$page = htmlentities($_GET['pageName']);
	}
	else $page="home";

	$pages = scandir('../pages');

	if(!empty($page) && in_array($page.'.php', $pages)){
		$result[0]=1;
		ob_start();
		require('../pages/'.$page.".php");
		$result[1]= ob_get_clean();
	}
	break;

}



echo json_encode($result);
?>
