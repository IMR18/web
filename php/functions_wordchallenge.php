<?php
require_once("functions.php");

$db=PDO();

function searchForCurrentWord()
	{
	global $db;
	
	// TODO : Créer une table contenant deux champs : id INT PRIMARY AUTOINCREMENT, mot TEXT
	$req=$db->prepare('SELECT mot FROM x ORDER BY id LIMIT 1');
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
function generateWord()
	{
	$a=@file_get_contents('wordlist.txt'); // On recupère notre liste de mots
	
	if($a===false||empty($a)) return false;
	
	$ln=strpos($a,"\n"); // Position du premier retour à la ligne
	if($ln===false) $ln=strlen($a); // Pas de retour à la ligne
	
	$word=substr($a,0,$ln); // Recupère le premier mot de la liste
	$rest=substr($a,$ln); // Le reste des mots (sans le premier)
	
	if(@file_put_contents('wordlist.txt',$rest)===false) return false; // Réécrit la liste de mots
	
	return $word;
	}
function addWordToDB($word, $wordGenerationTime)
	{
	global $db;
	
	$req=$db->prepare('INSERT INTO x VALUES(NULL,?)');
	
	if($req->execute(array($word)))
		return true;
	else
		return false;
	}