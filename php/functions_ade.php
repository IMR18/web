<?php
require 'libs/ical.php';
ini_set('max_execution_time', 300);
require_once("functions.php");

function purge_events($db,$id){
	$req=$db->prepare('delete from events where ressource = ?');
	return $req->execute(array($id));
	$req=$db->prepare('ALTER TABLE events AUTO_INCREMENT = 1');
	return $req->execute();
}

function date_compare($a, $b)
{
	$t1 = strtotime($a['DTSTART']);
	$t2 = strtotime($b['DTSTART']);
	return $t1 - $t2;
}



function ressources2update($db){
	$res2update=array();
	$req=$db->prepare("select * from ressources");
	$req->execute();
	$res=$req->fetchAll(PDO::FETCH_ASSOC);
	$now=time();

	foreach($res as $val){
		if ($val["sync"]-round(($now-strtotime($val["last_sync"]))/60) < 0 && $val["sync"]!=0){
			array_push($res2update,$val['number']);
		}
	}
	return ($res2update);
}

function arrayInString($str,$arr){
	foreach($arr as $a) {
		if (stripos($str,$a) !== false) return true;
	}
	return false;
}

function desc2json($desc){
	$desc = preg_replace('(\\\n\(.*$)', '', $desc);
	$desc=explode('\n',$desc);
	array_shift($desc);
	$json=array();
	$i=0;
	$arr=array("DIP","IMR","TS","CP","ELEC","OPT","INFO","lsi","ent");
	foreach($desc as $row){
		if(arrayInString($row,$arr))
		$json["group"][$i]=$row;
		else
		$json["prof"][$i]=$row;
		$i++;
	}
	return json_encode($json);
}

function updateRessources($db,$ressources,$startdate=null,$enddate=null,$GMT="+1 hour"){
	if($startdate==null)
		$startdate=date("Y-m-d");
	if($enddate==null)
		$enddate=date("Y-m-d",strtotime("+30 days"));
	$nb=array();
	foreach ($ressources as $ressource){
		$ical   = new ICal('https://planning.univ-rennes1.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?resources='.$ressource.'&projectId=1&calType=ical&firstDate='.$startdate.'&lastDate='.$enddate);
		$events = $ical->events();
		$insertNb=0;
		purge_events($db,$ressource);
		if($events)
			foreach ($events as $event) {
				$export_d=date("Y/m/d H:i:s",strtotime($GMT,$ical->iCalDateToUnixTimestamp($event['DTSTAMP'])));
				$start_d=date("Y-m-d",strtotime($GMT,$ical->iCalDateToUnixTimestamp($event['DTSTART'])));
				$start_t=date("H:i:s",strtotime($GMT,$ical->iCalDateToUnixTimestamp($event['DTSTART'])));
				$end_d=date("Y-m-d",strtotime($GMT,$ical->iCalDateToUnixTimestamp($event['DTEND'])));
				$end_t=date("H:i:s",strtotime($GMT,$ical->iCalDateToUnixTimestamp($event['DTEND'])));
				$description=desc2json($event['DESCRIPTION']);
				$req=$db->prepare('insert into events (UID,ressource, StartDate, StartTime, EndDate, EndTime, Title, Location, Description,Export) VALUES (?,?,?,?,?,?,?,?,?,?)');
				$res=$req->execute(array(issetor($event['UID']),$ressource,$start_d,$start_t,$end_d,$end_t,$event['SUMMARY'],issetor($event['LOCATION']),$description,$export_d));
				$insertNb+=$res;
			}
		$nb[$ressource]=$insertNb;
	}
	$req=$db->prepare("UPDATE ressources r inner join events e on r.number = e.ressource set r.last_sync = e.Export");
	$req->execute();
	return $nb;
}
?>
