function delConfirm(id) {
  if (window.confirm('Etes-vous sûr de vouloir supprimer cette actualité ?')){
    alert('Actualité supprimée')
    //REDIRECT
    window.location.href = 'index.php?page=deleteactu&id=' + id;
  }
  else{
    return false;
  }
};

function delAsso(id) {
  if (window.confirm('Etes-vous sûr de vouloir supprimer cette association ?')){
    alert('Association supprimée')
    //REDIRECT
    window.location.href = 'index.php?page=deleteasso&id=' + id;
  }
  else{
    return false;
  }
};

function delRessource(id) {
  if (window.confirm('Etes-vous sûr de vouloir supprimer cette ressource ?')){
    alert('Ressource supprimée')
    //REDIRECT
    window.location.href = 'index.php?page=deleteressource&id=' + id;
  }
  else{
    return false;
  }
};

function accountConfirm(id) {
  if (window.confirm('Etes-vous sûr de vouloir supprimer cet utilisateur ?')){
    alert('Utilisateur supprimé')
    //REDIRECT
    window.location.href = 'index.php?page=accountdelete&id=' + id;
  }
  else{
    return false;
  }
};
