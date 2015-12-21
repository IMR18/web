<?php
require_once("functions.php");

function get_tasks($db){
	$req=$db->prepare("SELECT * FROM tasks ORDER BY deadline");
	$req->execute();
	$res=$req->fetchAll(PDO::FETCH_ASSOC);

	foreach ($res as $key=>$task){

		list($year, $month, $day) = explode('-', $task['deadline']);
        $deadline = $day."-".$month."-".$year;
		$deadlineDate = new DateTime($task['deadline']);
	    $now = new DateTime();
	    $interval = $now->diff($deadlineDate);

	    if ($interval->format('%R%d') >= 0 && $interval->format('%R%m') >= 0) {
	      $timeLeft = "";
	      if ($interval->format('%R%m') > 0) {
	        $timeLeft = $interval->format('%m mois');
	        if ($interval->format('%d') != 0) {
	          $timeLeft = $timeLeft." et ";
	        }
	      }

	      if ($interval->format('%d') > 1) {
	        $timeLeft = $timeLeft.$interval->format('%d jours');
	      }
	      else if ($interval->format('%d') == 1) {
	        $timeLeft = $timeLeft.$interval->format('%d jour');
	      }	

	      if ($interval->format('%R%d') < 0 || $interval->format('%R%m') < 0) {
	        $timeLeft = "Il y a ".$timeLeft;
	      }
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

function add_task($db,$title,$description,$deadline,$worklevel){
	if(isset($db,$title,$description,$deadline,$worklevel)){
		$title=$title;
		$description=$description;
		$deadline=$deadline;
		$worklevel=$worklevel;

		$req=$db->prepare("INSERT INTO tasks VALUES ('', '$title', '$description', '$deadline','$worklevel')");
		$req->execute();
	}
}
?>