<?php
require_once("functions.php");

function searchForCurrentWord()
	{
	$db=PDO();
	$tab = array();
	$reponse=$db->query('SELECT word,level FROM wordchallenge WHERE iduser=0 ORDER BY id ASC LIMIT 3');

	while($donnees=$reponse->fetch())
		{
			array_push($tab,ucfirst($donnees['word']));
			array_push($tab,$donnees['level']);
		}
	$reponse->closeCursor();
	return $tab;
	}
 
 function searchParamsForTopScore(){
 		$db=PDO();
 		
 		$new=array();

		$params = $db->query('SELECT COUNT(*) as nb_mots FROM wordchallenge GROUP BY iduser'); // Récup du nombre de mots
		$new=$params->fetchAll(PDO::FETCH_ASSOC);

		$params=$db->query('SELECT iduser,level,level*COUNT(*) FROM wordchallenge GROUP BY iduser,level'); // Récup du ratio et du score
		$res=$params->fetchAll(PDO::FETCH_ASSOC);

		$params=$db->query('SELECT iduser,prenom FROM users,wordchallenge WHERE users.id=wordchallenge.iduser group by iduser'); // Récup le prénom en fonction de l'id user
		$name=$params->fetchAll(PDO::FETCH_ASSOC);

		$j=0;
		for ($i=0; $i < count($new); $i++) {
			$new[$i]['id']=0;
			$new[$i]['score']=0;
			$new[$i]['ratio']=0;

			while($res[$j]['iduser'] == $i){

				$new[$i]['score']+=$res[$j]['level*COUNT(*)'];
				$j++;
				if($j>=count($res))break;
			}
			$new[$i]['id']=$i;
			
			if($new[$i]['nb_mots']!=0)
				$new[$i]['ratio']=round($new[$i]['score']/$new[$i]['nb_mots'],2);			
		}

		unset($new[0]); // On retire le tableau des mots non trouvés
		
		//Triage du tableau en fonction des scores et du ratio
		foreach($new as $k => $v) {
		   $score[$k] = $v['score'];
		   $ratio[$k] = $v['ratio'];
		}
		array_multisort($score,SORT_DESC,$ratio,SORT_DESC,$new);

		for ($i=0; $i < count($new); $i++){
			$new[$i]['rank']=$i+1;
			$new[$i]['prenom']=$name[$new[$i]['id']-1]['prenom'];
		}

		return $new;
 }

 function searchHeads(){
 	$t = searchParamsForTopScore();

 	for ($i=0; $i < 3 ; $i++) {
 		if(isset($t[$i]['prenom'])){
			if(is_file('../img/mac/visages/'.$t[$i]['prenom'].'.png')){$res[$i]=$t[$i]['prenom'];}
		 	else{$res[$i]='no_pic';}
 		}
 		else{
 			$res[$i]='no_pic';
 		}
	}

	return $res;

 }


function addWordToDB($word)
	{
	$db=PDO();
	$req=$db->prepare('INSERT INTO wordchallenge VALUES(NULL,?,NULL,NULL)');
	
	if($req->execute(array($word)))
		return true;
	else
		return false;
	}

