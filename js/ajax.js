// ************************ AFFICHAGE DU FORMULAIRE ************************************************************* //
function afficheFormulaire(){
	var req_AJAX = null;// Objet qui sera crée
	if (window.XMLHttpRequest) 	{	// Mozilla, Safari
		req_AJAX= new XMLHttpRequest();
	}
	if (req_AJAX) 	{
		req_AJAX.onreadystatechange = function()	{
			traiteAffichageFormulaire(req_AJAX); // voir remarque
		};

		req_AJAX.open( "POST", "./functions/afficheFormulaire.php", true);	// on spécifie l'action que l'on demande au serveur 
		req_AJAX.setRequestHeader('Content-Type','application/x-www-form-urlencoded');		// l'envoi de la requête par la méthode POST se fait avec ce Content-Type
		req_AJAX.send(); // on envoie la requête
	}
	else 	{
		alert("EnvoiRequete: pas de XMLHTTP !");
	}
}

function traiteAffichageFormulaire(requete)	{
	var READY_STATE_UNINITIALIZED=0;var READY_STATE_LOADING=1;var READY_STATE_LOADED=2;var READY_STATE_INTERACTIVE=3;var READY_STATE_COMPLETE=4;
	var ready = requete.readyState; // récupère l'état de la requête
	var zoneaecrire = document.getElementById("formulaire");
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

// ************************ FIN AFFICHAGE DU FORMULAIRE ********************************************************* //

//************************* 2 FONCTIONS POUR AFFICHER LE RESULTAT D'UNE RECHERCHE D'ASSO ************************ //

function listeAssociations()	{
	var listeCat, valeurCat, listeSouscat, valeurSouscat;
	var req_AJAX = null;// Objet qui sera crée
	if (window.XMLHttpRequest) 	{	// Mozilla, Safari
		req_AJAX= new XMLHttpRequest();
	}
	if (req_AJAX) 	{
		req_AJAX.onreadystatechange = function()	{
			traiteListeAssociations(req_AJAX); // voir remarque
		};
		//On récupere les valeurs de listes
		listeCat = document.getElementById("categorie");
		valeurCat = listeCat.options[listeCat.selectedIndex].value;
		listeSouscat = document.getElementById("souscategorie");
		valeurSouscat = listeSouscat.options[listeSouscat.selectedIndex].value;
		listeVille = document.getElementById("ville");
		valeurVille = listeVille.options[listeVille.selectedIndex].value;

		req_AJAX.open( "POST", "./functions/listeAssociations.php", true);	// on spécifie l'action que l'on demande au serveur
		req_AJAX.setRequestHeader('Content-Type','application/x-www-form-urlencoded');		// l'envoi de la requête par la méthode POST se fait avec ce Content-Type
		req_AJAX.send("categorie=" + valeurCat + "&souscategorie=" + valeurSouscat + "&ville=" + valeurVille); // on envoie la requête
	}
	else 	{
		alert("EnvoiRequete: pas de XMLHTTP !");
	}
} // fin fonction listeAssociations()

function traiteListeAssociations(requete)	{
	var READY_STATE_UNINITIALIZED=0;var READY_STATE_LOADING=1;var READY_STATE_LOADED=2;var READY_STATE_INTERACTIVE=3;var READY_STATE_COMPLETE=4;
	var ready = requete.readyState; // récupère l'état de la requête
	var zoneaecrire = document.getElementById("contenu");
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

//************************* FIN 2 FONCTIONS POUR AFFICHER LE RESULTAT D'UNE RECHERCHE D'ASSO ************************ //

//************************* 2 FONCTIONS POUR AFFICHER LES SOUS CATEGORIES D'ASSO ************************ //

function listeSousCategorie(categorie)	{
	var req_AJAX = null;// Objet qui sera crée
	if (window.XMLHttpRequest) 	{	// Mozilla, Safari
		req_AJAX= new XMLHttpRequest();
	}
	if (req_AJAX) 	{
		req_AJAX.onreadystatechange = function()	{
			traiteListeSousCategorie(req_AJAX); // voir remarque
		};
		req_AJAX.open( "POST", "./functions/listeSousCategorie.php", true);	// on spécifie l'action que l'on demande au serveur
		req_AJAX.setRequestHeader('Content-Type','application/x-www-form-urlencoded');	// l'envoi de la requête par la méthode POST se fait avec ce Content-Type
		req_AJAX.send("categorie="+categorie.value); // on envoie la requête
	}
	else 	{
		alert("EnvoiRequete: pas de XMLHTTP !");
	}
}

function traiteListeSousCategorie(requete)	{
	var READY_STATE_UNINITIALIZED=0;var READY_STATE_LOADING=1;var READY_STATE_LOADED=2;var READY_STATE_INTERACTIVE=3;var READY_STATE_COMPLETE=4;
	var ready = requete.readyState; // récupère l'état de la requête
	var zoneaecrire = document.getElementById("souscategorie");

	if (ready==READY_STATE_COMPLETE) {
		var status = requete.status;
		if (status==200) {
			var data = requete.responseText;
			zoneaecrire.innerHTML = "";
			if (data=='KO')	{ // Si le script PHP répond KO
				zoneaecrire.innerHTML = "Erreur"; // On écrit un message d'erreur
				return false;
			}
			else {
				zoneaecrire.innerHTML = data;// insere resultat dans document
				return true;
			}
		}
		else zoneaecrire.innerHTML = "erreur serveur, code "+ status;
	}
}


//************************* FIN 2 FONCTIONS POUR AFFICHER LES SOUS CATEGORIES D'ASSO ************************ //


//************************* 2 FONCTIONS POUR AFFICHER LES CATEGORIES D'ASSO ************************ //
function listeCategorie()	{
	var req_AJAX = null;// Objet qui sera crée
	if (window.XMLHttpRequest) 	{	// Mozilla, Safari
		req_AJAX= new XMLHttpRequest();
	}
	if (req_AJAX) 	{
		req_AJAX.onreadystatechange = function()	{
			traiteListeCategorie(req_AJAX); // voir remarque
		};
		req_AJAX.open( "POST", "./functions/listeCategorie.php", true);	// on spécifie l'action que l'on demande au serveur
		req_AJAX.setRequestHeader('Content-Type','application/x-www-form-urlencoded');	// l'envoi de la requête par la méthode POST se fait avec ce Content-Type
		req_AJAX.send(); // on envoie la requête
	}
	else 	{
		alert("EnvoiRequete: pas de XMLHTTP !");
	}
}

function traiteListeCategorie(requete)	{
	var READY_STATE_UNINITIALIZED=0;var READY_STATE_LOADING=1;var READY_STATE_LOADED=2;var READY_STATE_INTERACTIVE=3;var READY_STATE_COMPLETE=4;
	var ready = requete.readyState; // récupère l'état de la requête
	var zoneaecrire = document.getElementById("categorie");

	if (ready==READY_STATE_COMPLETE) {
		var status = requete.status;
		if (status==200) {
			var data = requete.responseText;
			zoneaecrire.innerHTML = "";
			if (data=='KO')	{ // Si le script PHP répond KO
				zoneaecrire.innerHTML = "Erreur"; // On écrit un message d'erreur
				return false;
			}
			else {
				zoneaecrire.innerHTML = data;// insere resultat dans document
				return true;
			}
		}
		else zoneaecrire.innerHTML = "erreur serveur, code "+ status;
	}
}
//************************* FIN 2 FONCTIONS POUR AFFICHER LES CATEGORIES D'ASSO ************************ //

//************************* 2 FONCTIONS POUR AFFICHER LES VILLES ************************ //
function listeVille()	{
	var req_AJAX = null;// Objet qui sera crée
	if (window.XMLHttpRequest) 	{	// Mozilla, Safari
		req_AJAX= new XMLHttpRequest();
	}
	if (req_AJAX) 	{
		req_AJAX.onreadystatechange = function()	{
			traiteListeVille(req_AJAX); // voir remarque
		};
		req_AJAX.open( "POST", "./functions/listeVille.php", true);	// on spécifie l'action que l'on demande au serveur
		req_AJAX.setRequestHeader('Content-Type','application/x-www-form-urlencoded');	// l'envoi de la requête par la méthode POST se fait avec ce Content-Type
		req_AJAX.send(); // on envoie la requête
	}
	else 	{
		alert("EnvoiRequete: pas de XMLHTTP !");
	}
}

function traiteListeVille(requete)	{
	var READY_STATE_UNINITIALIZED=0;var READY_STATE_LOADING=1;var READY_STATE_LOADED=2;var READY_STATE_INTERACTIVE=3;var READY_STATE_COMPLETE=4;
	var ready = requete.readyState; // récupère l'état de la requête
	var zoneaecrire = document.getElementById("ville");

	if (ready==READY_STATE_COMPLETE) {
		var status = requete.status;
		if (status==200) {
			var data = requete.responseText;
			zoneaecrire.innerHTML = "";
			if (data=='KO')	{ // Si le script PHP répond KO
				zoneaecrire.innerHTML = "Erreur"; // On écrit un message d'erreur
				return false;
			}
			else {
				zoneaecrire.innerHTML = data;// insere resultat dans document
				return true;
			}
		}
		else zoneaecrire.innerHTML = "erreur serveur, code "+ status;
	}
}
//************************* FIN 2 FONCTIONS POUR AFFICHER LES VILLES ************************ //

//************************* 2 FONCTIONS POUR AFFICHER LES VILLES ************************ //
function listeVille2()	{
	var req_AJAX = null;// Objet qui sera crée
	if (window.XMLHttpRequest) 	{	// Mozilla, Safari
		req_AJAX= new XMLHttpRequest();
	}
	if (req_AJAX) 	{
		req_AJAX.onreadystatechange = function()	{
			traiteListeVille2(req_AJAX); // voir remarque
		};
		req_AJAX.open( "POST", "./functions/listeVille.php", true);	// on spécifie l'action que l'on demande au serveur
		req_AJAX.setRequestHeader('Content-Type','application/x-www-form-urlencoded');	// l'envoi de la requête par la méthode POST se fait avec ce Content-Type
		req_AJAX.send(); // on envoie la requête
	}
	else 	{
		alert("EnvoiRequete: pas de XMLHTTP !");
	}
}

function traiteListeVille2(requete)	{
	var READY_STATE_UNINITIALIZED=0;var READY_STATE_LOADING=1;var READY_STATE_LOADED=2;var READY_STATE_INTERACTIVE=3;var READY_STATE_COMPLETE=4;
	var ready = requete.readyState; // récupère l'état de la requête
	var zoneaecrire = document.getElementById("ville2");

	if (ready==READY_STATE_COMPLETE) {
		var status = requete.status;
		if (status==200) {
			var data = requete.responseText;
			zoneaecrire.innerHTML = "";
			if (data=='KO')	{ // Si le script PHP répond KO
				zoneaecrire.innerHTML = "Erreur"; // On écrit un message d'erreur
				return false;
			}
			else {
				zoneaecrire.innerHTML = data;// insere resultat dans document
				return true;
			}
		}
		else zoneaecrire.innerHTML = "erreur serveur, code "+ status;
	}
}
//************************* FIN 2 FONCTIONS POUR AFFICHER LES VILLES ************************ //

//************************* 2 FONCTIONS POUR AFFICHER LES VILLES ************************ //
function listeUtilisateurs()	{
	var req_AJAX = null;// Objet qui sera crée
	if (window.XMLHttpRequest) 	{	// Mozilla, Safari
		req_AJAX= new XMLHttpRequest();
	}
	if (req_AJAX) 	{
		req_AJAX.onreadystatechange = function()	{
			traiteListeUtilisateurs(req_AJAX); // voir remarque
		};
		req_AJAX.open( "POST", "./functions/listeUtilisateurs.php", true);	// on spécifie l'action que l'on demande au serveur
		req_AJAX.setRequestHeader('Content-Type','application/x-www-form-urlencoded');	// l'envoi de la requête par la méthode POST se fait avec ce Content-Type
		req_AJAX.send(); // on envoie la requête
	}
	else 	{
		alert("EnvoiRequete: pas de XMLHTTP !");
	}
}

function traiteListeUtilisateurs(requete)	{
	var READY_STATE_UNINITIALIZED=0;var READY_STATE_LOADING=1;var READY_STATE_LOADED=2;var READY_STATE_INTERACTIVE=3;var READY_STATE_COMPLETE=4;
	var ready = requete.readyState; // récupère l'état de la requête
	var zoneaecrire = document.getElementById("utilisateurs");

	if (ready==READY_STATE_COMPLETE) {
		var status = requete.status;
		if (status==200) {
			var data = requete.responseText;
			zoneaecrire.innerHTML = "";
			if (data=='KO')	{ // Si le script PHP répond KO
				zoneaecrire.innerHTML = "Erreur"; // On écrit un message d'erreur
				return false;
			}
			else {
				zoneaecrire.innerHTML = data;// insere resultat dans document
				return true;
			}
		}
		else zoneaecrire.innerHTML = "erreur serveur, code "+ status;
	}
}
//************************* FIN 2 FONCTIONS POUR AFFICHER LES VILLES ************************ //


//************************* 2 FONCTIONS POUR AFFICHER LES TITRES D'ACTUALITES ************************ //
function listeTitreActualites()	{
	var req_AJAX = null;// Objet qui sera crée
	if (window.XMLHttpRequest) 	{	// Mozilla, Safari
		req_AJAX= new XMLHttpRequest();
	}
	if (req_AJAX) 	{
		req_AJAX.onreadystatechange = function()	{
			traiteListeTitreActualites(req_AJAX); // voir remarque
		};
		req_AJAX.open( "POST", "./functions/listeTitreActualites.php", true);	// on spécifie l'action que l'on demande au serveur
		req_AJAX.setRequestHeader('Content-Type','application/x-www-form-urlencoded');	// l'envoi de la requête par la méthode POST se fait avec ce Content-Type
		req_AJAX.send(); // on envoie la requête
	}
	else 	{
		alert("EnvoiRequete: pas de XMLHTTP !");
	}
}

function traiteListeTitreActualites(requete)	{
	var READY_STATE_UNINITIALIZED=0;var READY_STATE_LOADING=1;var READY_STATE_LOADED=2;var READY_STATE_INTERACTIVE=3;var READY_STATE_COMPLETE=4;
	var ready = requete.readyState; // récupère l'état de la requête
	var zoneaecrire = document.getElementById("titreactualites");

	if (ready==READY_STATE_COMPLETE) {
		var status = requete.status;
		if (status==200) {
			var data = requete.responseText;
			zoneaecrire.innerHTML = "";
			if (data=='KO')	{ // Si le script PHP répond KO
				zoneaecrire.innerHTML = "Erreur"; // On écrit un message d'erreur
				return false;
			}
			else {
				zoneaecrire.innerHTML = data;// insere resultat dans document
				return true;
			}
		}
		else zoneaecrire.innerHTML = "erreur serveur, code "+ status;
	}
}
//************************* FIN 2 FONCTIONS POUR AFFICHER LES TITRES D'ACTUALITES ************************ //
