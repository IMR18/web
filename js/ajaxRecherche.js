// ************************ AFFICHAGE DU FORMULAIRE ************************************************************* //
function afficheFormulaireRecherche(){
	var req_AJAX = null;// Objet qui sera crée
	if (window.XMLHttpRequest) 	{	// Mozilla, Safari
		req_AJAX= new XMLHttpRequest();
	}
	if (req_AJAX) 	{
		req_AJAX.onreadystatechange = function()	{
			traiteAffichageFormulaire(req_AJAX); // voir remarque
		};

		req_AJAX.open( "POST", "./functions/afficheFormulaireRecherche.php", true);	// on spécifie l'action que l'on demande au serveur
		req_AJAX.setRequestHeader('Content-Type','application/x-www-form-urlencoded');		// l'envoi de la requête par la méthode POST se fait avec ce Content-Type
		req_AJAX.send(); // on envoie la requête
	} 
	else 	{
		alert("EnvoiRequete: pas de XMLHTTP !");
	}
}

function traiteAffichageFormulaireRecherche(requete)	{
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
