<?php
require_once("functions.php");

function get_tasks($db,$group,$from){
	$req=$db->prepare("SELECT * FROM tasks where (groupe =? or 0=?) and ((deadline>? and 0<>?) or deadline>now()) ORDER BY deadline");
	$req->execute(array($group,$group,$from,$from));
	$res=$req->fetchAll(PDO::FETCH_ASSOC);

	foreach ($res as $key=>$task){
		foreach($task as $key2=>$row){
		$res[$key][$key2]=html_entity_decode($row);
		}
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
				if($interval->format('%R%m') == 0){
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
			}

				else {
					$jours="%d jours";
				}
				if($interval->format('%d') == 0)
				$jours="";
					$timeLeft = $timeLeft.$interval->format($jours);

				if ($interval->format('%r') == '-' && $interval->format('%d')!=1) {
					$timeLeft = "Il y a ".$timeLeft;
				}

			$res[$key]['timeleft']=$timeLeft;
			$res[$key]['deadline']=$deadline;
			$res[$key]['worklevel']=couleurNiveau($res[$key]['worklevel']);
			$res[$key]['groupe']=groupe($res[$key]['groupe']);
	}
	return $res;
}

function groupe($num){
	switch ($num) {
		case 3:
			$retour = "grp_RT";
			break;
		case 2:
			$retour = "grp_info";
			break;

		default:
		$retour = "grp_imr";
			break;
	}
	return $num;
}
function couleurNiveau($num){
	/*switch ($num) {
		case 3:
			$retour = "danger";
			break;
		case 2:
			$retour = "warning";
			break;

		default:
		$retour = "success";
			break;
	}

	return $retour;*/
	return $num;
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
function editTask($db,$title,$description,$deadline,$worklevel,$group,$UID,$id){
	$title=htmlentities($title);
	$description=htmlentities($description);
	$deadline=htmlentities($deadline);
	$worklevel=htmlentities($worklevel);
	$group=htmlentities($group);
	$UID=htmlentities($UID);

	$req=$db->prepare("update tasks set title=?,description=?,deadline=?,worklevel=?,groupe=?,ADE_UID=? where id=".$id);

	return $req->execute(array($title,$description,$deadline,$worklevel,$group,$UID));
}

function deleteTask($db,$id){

	$req=$db->prepare("delete from tasks where id = ?");

	return $req->execute(array($id));
}
?>
