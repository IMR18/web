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
				{
				$word=generateWord();
				
				if($word===false)
					$res=array('error'=>'No word left in database');
				elseif(addWordToDB($word, microtime())===false)
					$res=array('error'=>'DB Failure');
				}
			elseif($word===true) // Database failure
				$res=array('error'=>'DB Failure');
				
			if(!isset($res)) // No errors
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