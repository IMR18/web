function compZero(nombre) {
  return nombre < 10 ? '0' + nombre : nombre;
}

function date_heure() {
  const infos = new Date();

  //Heure
  document.getElementById('date_heure').innerHTML = compZero(infos.getHours()) + ':' + compZero(infos.getMinutes()) + ':' + compZero(infos.getSeconds());

  //Date
  const mois = new Array('01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12');
  const jours = new Array('dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi');
  document.getElementById('date_heure').innerHTML += '<br>' + ' ' + infos.getDate() + '/' + mois[infos.getMonth()] + '/' + infos.getFullYear();
}

window.onload = function() {
  date_heure();
  setInterval("date_heure()", 1000); //Actualisation de l'heure
};
