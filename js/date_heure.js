function compZero(nombre) {
  return nombre < 10 ? '0' + nombre : nombre;
}

function frenchDate(date,type){
  jours = new Array('dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi');
switch (type) {
  case 'time':
    return compZero(date.getHours()) + ':' + compZero(date.getMinutes());
    break;
    case 'date':
    return date.getDate() + '/' + date.getMonth()+1 + '/' + date.getFullYear();
    break;
    case 'dateDay':
    return  jours[date.getDay()]+new Array(8 - jours[date.getDay()].length+2).join(" \u00A0 ") + ' ' +("0" + date.getDate()).slice(-2) +"/"+ date.getMonth()+1;
    break;
    default:
    return compZero(date.getHours()) + ':' + compZero(date.getMinutes()) +'<br/>' + date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();

}

}

function date_heure() {
   infos = new Date();
  //Heure
  document.getElementById('date_heure').innerHTML =frenchDate(infos);
}

window.onload = function() {
  date_heure();
  setInterval("date_heure()", 1000); //Actualisation de l'heure
};
