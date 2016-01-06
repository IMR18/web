<?php
require('functions_wordchallenge.php');

if(isset($_GET['action']))
	{
	$action=$_GET['action'];
	
	switch($action)
		{
		case 'getWord':
			$word=searchForCurrentWord();
			$word[0]=ucfirst($word[0]);
			$word[2]=ucfirst($word[2]);
			$word[4]=ucfirst($word[4]);
			$res=array('word'=>$word[0],'level'=>$word[1],'word1'=>$word[2],'level1'=>$word[3],'word2'=>$word[4],'level2'=>$word[5]); // No sanity check as words are added by administrators.
		break;
		case 'getTopScore':
			$params=searchParamsForTopScore();
			$res=$params;
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