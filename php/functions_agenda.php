<?php
require_once("functions.php");

function get_tasks($db,$group,$from){
	$req=$db->prepare("SELECT * FROM tasks where (groupe =? or 0=?) and ((deadline>? and 0<>?) or deadline>now()) ORDER BY deadline");
	$req->execute(array($group,$group,$from,$from));
	$res=$req->fetchAll(PDO::FETCH_ASSOC);

	foreach ($res as $key=>$task){
		$deadlineDate = new DateTime($task['deadline']);
		$now = new DateTime("today");
		$interval = $now->diff($deadlineDate);

		list($year, $month, $day) = explode('-', $task['deadline']);
		$deadline = $day."-".$month."-".$year;
		$timeLeft = "";

				if ($interval->format('%R%m') > 0) {
					$timeLeft = $interval->format('%m mois');
					if ($interval->format('%d') != 0) {
						$timeLeft = $timeLeft." et ";
					}
				}
			 	switch ($interval->format('%r%d')) {
			 		case '0':
			 			$jours="Aujourd'hui";
			 		break;
			 		case '1':
			 			$jours="Demain";
			 		break;
			 		case '-1':
			 			$jours="Hier";
			 		break;
			 		default:
					$jours="%d jours";
			 		break;
				}
					$timeLeft = $timeLeft.$interval->format($jours);

				if ($interval->format('%r') == '-' && $interval->format('%d')!=1) {
					$timeLeft = "Il y a ".$timeLeft;
				}

			$res[$key]['timeleft']=$timeLeft;
			$res[$key]['deadline']=$deadline;
			$res[$key]['worklevel']=couleurNiveau($res[$key]['worklevel']);
	}
	return $res;
}

function couleurNiveau($num){
	if($num==1){
		$retour = "success";
	}
	if($num==2){
		$retour = "warning";
	}
	if($num==3){
		$retour = "danger";
	}

	return $retour;
}

function add_task($db,$title,$description,$deadline,$worklevel,$group,$UID){
	$title=htmlentities($title);
	$description=htmlentities($description);
	$deadline=htmlentities($deadline);
	$worklevel=htmlentities($worklevel);
	$group=htmlentities($group);
	$UID=htmlentities($UID);

	$req=$db->prepare("INSERT INTO tasks (title,description,deadline,worklevel,groupe,ADE_UID) VALUES (?,?,?,?,?,?)");

	return $req->execute(array($title,$description,$deadline,$worklevel,$group,$UID));
}
?>
