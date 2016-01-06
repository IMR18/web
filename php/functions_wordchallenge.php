<?php
require_once("functions.php");

function searchForCurrentWord()
	{
	$db=PDO();
	$tab = array();
	$reponse=$db->query('SELECT word,level FROM wordchallenge ORDER BY id ASC LIMIT 3');

	while($donnees=$reponse->fetch())
		{
			array_push($tab,$donnees['word']);
			array_push($tab,$donnees['level']);
		}
	$reponse->closeCursor();
	return $tab;
	}
 
 function searchParamsForTopScore(){
 		$db=PDO();
 		$tab = array();

		$reponse=$db->query('SELECT prenom,score,nb_mots FROM users ORDER BY id ASC');
		while($donnees=$reponse->fetch())
		{
			array_push($tab,$donnees['prenom']);
			array_push($tab,$donnees['score']);
			array_push($tab,$donnees['nb_mots']);
		}
		$reponse->closeCursor();
		return $tab;
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

