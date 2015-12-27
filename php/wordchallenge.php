<?php
require('functions_wordchallenge.php');

if(isset($_GET['action']))
	{
	$action=$_GET['action'];
	
	switch($action)
		{
		case 'getWord':
			$word=searchForCurrentWord();
			
			if($word===false) // No current word
				$res=array('error'=>'No word left in database');
			elseif($word===true) // Database failure
				$res=array('error'=>'DB Failure');
			else
				$res=array('word'=>$word); // No sanity check as words are added by administrators.
		break;
		case 'getTop3':
		
		break;
		case 'heDidIt':
		
		break;
		}
	}
else
	{
	$res=array('NO ACTION SET');
	}

echo json_encode($res);