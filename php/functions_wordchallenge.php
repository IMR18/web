<?php
require_once("functions.php");

$db=PDO();

function searchForCurrentWord()
	{
	global $db;
	
	// TODO : Créer une table contenant deux champs : id INT PRIMARY AUTOINCREMENT, mot TEXT, trouvePar TEXT
	$req=$db->prepare('SELECT mot FROM x ORDER BY id WHERE trouvePar IS NULL LIMIT 1');
	if($res=$req->execute())
		{
		if($res->num_rows==0)
			{
			$res->close();
			return false; // Nothing found
			}
		else
			{
			$r=$res->fetch_row();
			$res->close();
			return $r[0];
			}
		}
	else
		return true;
	}
function addWordToDB($word)
	{
	global $db;
	
	$req=$db->prepare('INSERT INTO x VALUES(NULL,?,NULL)');
	
	if($req->execute(array($word)))
		return true;
	else
		return false;
	}