// CONTROLLERS
imrApp.controller('mainController', function($scope, Page) {
  $scope.Page = Page;
})





.controller('homeController', function($scope, Page) {
  Page.setTitle("Home");
})





.controller('agendaController', function($scope, $http, Page) {
  Page.setTitle("Agenda");

  $http.post('./php/agenda.php?action=getTasks').success(function(data, status, headers, config){
      $scope.tasks = data;
  });
  $scope.addTask = function (task){
$http.post('./php/agenda.php?action=addTask',task).success(function(data, status, headers, config){
      msg="Erreur lors de l'ajout " + task.title;
        if(data[0]){
          msg=task.title+" a été ajouté avec succès";
        }
        alert(msg);
    });
}
})





.controller('croissantController', function($scope, Page) {
  Page.setTitle("Croissant");
})




.controller('wordchallengeController', function($scope, Page) {
  Page.setTitle("Mot-à-caler");
  $scope.mot = "C'est pas un mot mais osef";
});
