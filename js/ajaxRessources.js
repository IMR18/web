// ************************ AFFICHAGE DES THEMES POUR LISTE DEROULANTE ************************************************************* //
function afficheThemes(){
	var req_AJAX = null;// Objet qui sera crée
	if (window.XMLHttpRequest) 	{	// Mozilla, Safari
		req_AJAX= new XMLHttpRequest();
	}
	if (req_AJAX) 	{
		req_AJAX.onreadystatechange = function()	{ 
			traiteAffichageTheme(req_AJAX); // voir remarque
		};

		req_AJAX.open( "POST", "./functions/afficheThemes.php", true);	// on spécifie l'action que l'on demande au serveur
		req_AJAX.setRequestHeader('Content-Type','application/x-www-form-urlencoded');		// l'envoi de la requête par la méthode POST se fait avec ce Content-Type
		req_AJAX.send(); // on envoie la requête
	}
	else 	{
		alert("EnvoiRequete: pas de XMLHTTP !");
	}
}

function traiteAffichageTheme(requete)	{
	var READY_STATE_UNINITIALIZED=0;var READY_STATE_LOADING=1;var READY_STATE_LOADED=2;var READY_STATE_INTERACTIVE=3;var READY_STATE_COMPLETE=4;
	var ready = requete.readyState; // récupère l'état de la requête
	var zoneaecrire = document.getElementById("theme");
	if (ready==READY_STATE_COMPLETE) {
		var status = requete.status;
		if (status==200) {
			var data = requete.responseText;
			zoneaecrire.innerHTML = "";
			if (data=='KO')	{
				zoneaecrire.innerHTML = "Erreur";
				return false;
			}
			else {
				zoneaecrire.innerHTML = data;// insere resultat dans document
				return true;
			}
		}
		else {
			zoneaecrire.innerHTML = "erreur serveur, code "+ status;
		}
	}
}

// ************************ FIN AFFICHAGE DES THEMES POUR LISTE DEROULANTE ********************************************************* //

// ************************ AFFICHAGE DES THEMES AVEC COULEURS ************************************************************* //
function listeThemes(){
	var req_AJAX = null;// Objet qui sera crée
	if (window.XMLHttpRequest) 	{	// Mozilla, Safari
		req_AJAX= new XMLHttpRequest();
	}
	if (req_AJAX) 	{
		req_AJAX.onreadystatechange = function()	{
			traiteListeTheme(req_AJAX); // voir remarque
		};

		req_AJAX.open("POST", "./functions/listeThemes.php", true);	// on spécifie l'action que l'on demande au serveur
		req_AJAX.setRequestHeader('Content-Type','application/x-www-form-urlencoded');		// l'envoi de la requête par la méthode POST se fait avec ce Content-Type
		req_AJAX.send(); // on envoie la requête
	}
	else 	{
		alert("EnvoiRequete: pas de XMLHTTP !");
	}
}

function traiteListeTheme(requete)	{
	var READY_STATE_UNINITIALIZED=0;var READY_STATE_LOADING=1;var READY_STATE_LOADED=2;var READY_STATE_INTERACTIVE=3;var READY_STATE_COMPLETE=4;
	var ready = requete.readyState; // récupère l'état de la requête
	var zoneaecrire = document.getElementById("listethemes");
	if (ready==READY_STATE_COMPLETE) {
		var status = requete.status;
		if (status==200) {
			var data = requete.responseText;
			zoneaecrire.innerHTML = "";
			if (data=='KO')	{
				zoneaecrire.innerHTML = "Erreur";
				return false;
			}
			else {
				zoneaecrire.innerHTML = data;// insere resultat dans document
				return true;
			}
		}
		else {
			zoneaecrire.innerHTML = "erreur serveur, code "+ status;
		}
	}
}
// ************************ FIN AFFICHAGE DES THEMES AVEC COULEURS ********************************************************* //

// ************************ AFFICHAGE DES THEMES AVEC COULEURS POUR PAGE MODIFIER & SUPPRIMER ************************************************************* //
function listeThemesModifier(){
	var req_AJAX = null;// Objet qui sera crée
	if (window.XMLHttpRequest) 	{	// Mozilla, Safari
		req_AJAX= new XMLHttpRequest();
	}
	if (req_AJAX) 	{
		req_AJAX.onreadystatechange = function()	{
			traiteListeThemeModifier(req_AJAX); // voir remarque
		};

		req_AJAX.open("POST", "./functions/listeThemesModifier.php", true);	// on spécifie l'action que l'on demande au serveur
		req_AJAX.setRequestHeader('Content-Type','application/x-www-form-urlencoded');		// l'envoi de la requête par la méthode POST se fait avec ce Content-Type
		req_AJAX.send(); // on envoie la requête
	}
	else 	{
		alert("EnvoiRequete: pas de XMLHTTP !");
	}
}

function traiteListeThemeModifier(requete)	{
	var READY_STATE_UNINITIALIZED=0;var READY_STATE_LOADING=1;var READY_STATE_LOADED=2;var READY_STATE_INTERACTIVE=3;var READY_STATE_COMPLETE=4;
	var ready = requete.readyState; // récupère l'état de la requête
	var zoneaecrire = document.getElementById("listethemesmodifier");
	if (ready==READY_STATE_COMPLETE) {
		var status = requete.status;
		if (status==200) {
			var data = requete.responseText;
			zoneaecrire.innerHTML = "";
			if (data=='KO')	{
				zoneaecrire.innerHTML = "Erreur";
				return false;
			}
			else {
				zoneaecrire.innerHTML = data;// insere resultat dans document
				return true;
			}
		}
		else {
			zoneaecrire.innerHTML = "erreur serveur, code "+ status;
		}
	}
}
// ************************ FIN AFFICHAGE DES THEMES AVEC COULEURS POUR PAGE MODIFIER & SUPPRIMER ********************************************************* //

// ************************ AFFICHAGE DES RESSOURCES EN FONCTION D'UN THEME ************************************************************* //
function listeRessources(theme){
	var req_AJAX = null;// Objet qui sera crée
	if (window.XMLHttpRequest) 	{	// Mozilla, Safari
		req_AJAX= new XMLHttpRequest();
	}
	if (req_AJAX) 	{
		req_AJAX.onreadystatechange = function()	{
			traitelisteRessources(req_AJAX); // voir remarque
		};

		req_AJAX.open("POST", "./functions/listeRessourcesTheme.php", true);	// on spécifie l'action que l'on demande au serveur
		req_AJAX.setRequestHeader('Content-Type','application/x-www-form-urlencoded');		// l'envoi de la requête par la méthode POST se fait avec ce Content-Type
		req_AJAX.send("theme="+theme); // on envoie la requête
	}
	else 	{
		alert("EnvoiRequete: pas de XMLHTTP !");
	}
}

function traitelisteRessources(requete)	{
	var READY_STATE_UNINITIALIZED=0;var READY_STATE_LOADING=1;var READY_STATE_LOADED=2;var READY_STATE_INTERACTIVE=3;var READY_STATE_COMPLETE=4;
	var ready = requete.readyState; // récupère l'état de la requête
	var zoneaecrire = document.getElementById("listeressourcestheme");
	if (ready==READY_STATE_COMPLETE) {
		var status = requete.status;
		if (status==200) {
			var data = requete.responseText;
			zoneaecrire.innerHTML = "";
			if (data=='KO')	{
				zoneaecrire.innerHTML = "Erreur";
				return false;
			}
			else {
				zoneaecrire.innerHTML = data;// insere resultat dans document
				return true;
			}
		}
		else {
			zoneaecrire.innerHTML = "erreur serveur, code "+ status;
		}
	}
}
// ************************ AFFICHAGE DES RESSOURCES EN FONCTION D'UN THEME ********************************************************* //


// ************************ AFFICHAGE DES COULEURS RESTANTES ************************************************************* //
function listeCouleursRestantes(){
	var req_AJAX = null;// Objet qui sera crée
	if (window.XMLHttpRequest) 	{	// Mozilla, Safari
		req_AJAX= new XMLHttpRequest();
	}
	if (req_AJAX) 	{
		req_AJAX.onreadystatechange = function()	{
			traiteListeCouleursRestantes(req_AJAX); // voir remarque
		};

		req_AJAX.open("POST", "./functions/listeCouleursRestantes.php", true);	// on spécifie l'action que l'on demande au serveur
		req_AJAX.setRequestHeader('Content-Type','application/x-www-form-urlencoded');		// l'envoi de la requête par la méthode POST se fait avec ce Content-Type
		req_AJAX.send(); // on envoie la requête
	}
	else 	{
		alert("EnvoiRequete: pas de XMLHTTP !");
	}
}

function traiteListeCouleursRestantes(requete)	{
	var READY_STATE_UNINITIALIZED=0;var READY_STATE_LOADING=1;var READY_STATE_LOADED=2;var READY_STATE_INTERACTIVE=3;var READY_STATE_COMPLETE=4;
	var ready = requete.readyState; // récupère l'état de la requête
	var zoneaecrire = document.getElementById("listecouleursrestantes");
	if (ready==READY_STATE_COMPLETE) {
		var status = requete.status;
		if (status==200) {
			var data = requete.responseText;
			zoneaecrire.innerHTML = "";
			if (data=='KO')	{
				zoneaecrire.innerHTML = "Erreur";
				return false;
			}
			else {
				zoneaecrire.innerHTML = data;// insere resultat dans document
				return true;
			}
		}
		else {
			zoneaecrire.innerHTML = "erreur serveur, code "+ status;
		}
	}
}
// ************************ FIN AFFICHAGE DES COULEURS RESTANTES ********************************************************* //
