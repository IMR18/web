
<div class="jumbotron">
	<div class="container-fluid">
		<h3>Raccourcis</h3>
		<div class="row">
			<div class="col-xs-2 col-md-1">
				<a target="_blank" href="http://www.facebook.com" class="thumbnail">
					<img src="img/facebook.png" alt="">
				</a>
			</div>
			<div class="col-xs-2 col-md-1">
				<a target="_blank" href="http://www.twitter.com" class="thumbnail">
					<img src="img/twitter.png" alt="">
				</a>
			</div>
			<div class="col-xs-2 col-md-1">
				<a target="_blank" href="http://www.instagram.com" class="thumbnail">
					<img src="img/instagram.png" alt="">
				</a>
			</div>
			<div class="col-xs-2 col-md-1">
				<a target="_blank" href="https://drive.google.com" class="thumbnail">
					<img src="img/googledrive.png" alt="">
				</a>
			</div>
			<div class="col-xs-2 col-md-1">
				<a target="_blank" href="https://mail.google.com" class="thumbnail">
					<img src="img/gmail.png" alt="">
				</a>
			</div>
			<div class="col-xs-2 col-md-1">
				<a target="_blank" href="https://translate.google.com" class="thumbnail">
					<img src="img/google-translate.png" alt="">
				</a>
			</div>
			<div class="col-xs-2 col-md-1">
				<a target="_blank" href="https://www.youtube.com" class="thumbnail">
					<img src="img/youtube.png" alt="">
				</a>
			</div>
			<div class="col-xs-2 col-md-1">
				<a target="_blank" href="https://mightytext.net/web8/" class="thumbnail">
					<img src="img/mightytext.png" alt="">
				</a>
			</div>
			<div class="col-xs-2 col-md-1">
				<a target="_blank" href="https://web.whatsapp.com/" class="thumbnail">
					<img src="img/whatsapp.png" alt="">
				</a>
			</div>
			<div class="col-xs-2 col-md-1">
				<a target="_blank" href="https://ent.univ-rennes1.fr/" class="thumbnail">
					<img src="img/univrennes1.png" alt="">
				</a>
			</div>
		</div>
	</div>
</div>

<div class="podium">	
	<span id="deux" class="photo_pod"><img class="img-circle" src="img/zaid.png" alt="..."/></span>
	<span id="trois" class="photo_pod"><img class="img-circle" src="img/fr.png" alt="..."/></span>
	<span class="photo_pod"><img class="img-circle" src="img/moi.png" alt="..."/></span>
	<img id="pod" src="img/podium.png" alt="..."/>
</div>


	
<form>
	<p>Mot à caler</p><input class="bt" type="text" value="
	<?php

	  $tab = array ("test","test2");
	  
	  $i=round(mt_rand(0, count($tab) - 1)); // Entier aléatoire entre 0 et le numéro de la dernière case du tableau (count($tab) - 1).
    //$t = array_rand($tab,2);
	//echo $tab[$t[0]];
	echo $tab[$i];
?>" disabled="disabled">
	<input class="bt" type="submit" value="Vainqueur ?">
</form>
	


