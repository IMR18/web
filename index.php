<?php
 include('functions/functions.php');
?>

<!DOCTYPE HTML>

<html lang="fr">

<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="">
	<meta charset="UTF-8">
	<meta name="author" content="ENSSAT IMR promotion 2018">

	<title>Home</title>

	<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
	<link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="css/jquery-ui-1.9.2.css">
	<link rel="stylesheet" type="text/css" href="css/monstyle.css">
	<link href='https://fonts.googleapis.com/css?family=Aladin|Linden+Hill' rel='stylesheet' type='text/css'>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/jquery-ui-1.9.2.min.js"></script>
	<script src="js/jquery.bpopup.min.js"></script>


	  <script type="text/javascript" src="https://www.google.com/jsapi"></script>
	  <script type="text/javascript" src="js/date_heure.js"></script>
	  <script src="js/script.js"></script>
</head>


<body>

<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand innerLink" data-target="main_container" data-src="home" >IMR1</a>
    </div>
    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			<div class="nav navbar-left" style="text-align:center;height:50px;">
        <p id="date_heure">00:00:00<br/>00/00/0000</p>
      </div>
      <form class="navbar-form navbar-left" role="search" method="get" target="_blank" action="http://www.google.com/search">
        <div class="form-group">
          <input type="text" name="q" class="form-control" placeholder="Recherche Google">
        </div>
        <button type="submit" class="btn btn-default"><span class="glyphicon glyphicon-search"></span></button>
      </form>

      <form class="navbar-form navbar-left" role="search" method="get" target="_blank" action="http://www.youtube.com/results">
        <div class="form-group">
          <input type="text" name="q" class="form-control" placeholder="Recherche Youtube">
        </div>
        <button type="submit" class="btn btn-default"><span class="glyphicon glyphicon-search"></span></button>
      </form>
<a id="shortCut" modal-content="pages/shortcuts.php" class="glyphicon glyphicon-menu-hamburger white btn-lg"  style="color:white" ></a>

      <ul class="nav navbar-nav navbar-right">
        <li><a class="innerLink" data-target="main_container" data-src="agenda">Agenda</a></li>
        <li><a class="innerLink" data-target="main_container" data-src="moon">Croissantage</a></li>
        <li><a class="innerLink" data-target="main_container" data-src="timetable">Emploi du temps</a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">Separated link</a></li>
          </ul>
        </li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
<div id="shortcuts" style="width:80%;display:none;">
	<?php include "pages/shortcuts.php"; ?>
</div>
	<div id="main_container" class="container">
    <?php
      //session_start();
/*
      if(!empty($_GET['page'])){
        $page = htmlentities($_GET['page']);
      }
      else $page="home";

      $pages = scandir('pages');

      if(!empty($page) && in_array($page.'.php', $pages)){
        $content = 'pages/'.$page.".php";
      }

      else header('Location: index.php?page=home');

      include($content);
       */ ?>
    </div>
    <div id="chatbox" style="display:table;background-color: rgba(255,255,255,0.9);position:fixed; height:300px; width: 300px; right: 20px;bottom: 5px;">
      <div id="chatboxTextarea" style="display: table;position:absolute;padding: 30px 5px 35px 5px; height: 100%;width: 100%">
      <div style="display:table-cell; vertical-align:bottom;width:300px;">
        <p style="margin:0;word-wrap: break-word">Hello my name is Pierre. How are you?! I'm fine thanks you Pierre !</p>
        <p style="margin:0;word-break: break-all;">Hello !</p>
        <p style="text-align:right;margin:0;word-break: break-all;">Hello !</p>
      </div>
      </div>
      <header id="chatboxHeader" style="cursor: pointer; text-align:center; height: 30px;background-color: grey; position: absolute; top: 0;width: 100%">
        <h5>IMR18</h5>
      </header>
      <form id="chatboxFooter" style="display:inline-block;position:absolute; bottom: 0; height:30px; width: 100%">
        <input type="text" id="chatboxNickname" size="3">
        <input type="text" id="chatboxInput" size="20">
        <input type="submit" value="Envoyer"/>
      </form>
    </div>
</body>

</html>
