<?php
require_once("functions.php");

function get_tasks($db){
	$req=$db->prepare("SELECT * FROM tasks ORDER BY deadline");
	$req->execute();
	$res=$req->fetchAll(PDO::FETCH_ASSOC);

	foreach ($res as $key=>$task){
		$deadlineDate = new DateTime($task['deadline']);
		$now = new DateTime("today");
		$interval = $now->diff($deadlineDate);

		if (((int) $interval->format('%R%a')) >= 0) {
			list($year, $month, $day) = explode('-', $task['deadline']);
			$deadline = $day."-".$month."-".$year;

			if ($interval->format('%R%d') >= 0 && $interval->format('%R%m') >= 0) {
				$timeLeft = "";
				if ($interval->format('%R%m') > 0) {
					$timeLeft = $interval->format('%m mois');
					if ($interval->format('%d') != 0) {
						$timeLeft = $timeLeft." et ";
					}
				}

				if ($deadlineDate->format('Y-m-d') == $now->format('Y-m-d')) {
					$timeLeft = "Aujourdhui";
				}
				else if ($interval->format('%d') > 1) {
					$timeLeft = $timeLeft.$interval->format('%d jours');
				}
				else if ($interval->format('%d') == 1) {
					$timeLeft = $timeLeft.$interval->format('Demain');
				}

				if ($interval->format('%R%d') < 0 || $interval->format('%R%m') < 0) {
					$timeLeft = "Il y a ".$timeLeft;
				}
			}

			$res[$key]['timeleft']=$timeLeft;
			$res[$key]['deadline']=$deadline;
			$res[$key]['worklevel']=couleurNiveau($res[$key]['worklevel']);
		}
		else {
			unset($res[$key]);
		}
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
