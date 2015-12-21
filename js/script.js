//IMR APP
var imrApp = angular.module('imrApp', ['ngRoute']);

// ROUTE CONFIGURATION
// L'url localhost/#page utilise le template models/page.html avec le controller pageController
imrApp.config(['$routeProvider', function($routeProvider) {
  console.log($routeProvider);
  $routeProvider.
      when('/home', {
        templateUrl: 'models/home.html',
        controller: 'homeController'
      })
      .when('/agenda', {
        templateUrl: 'models/agenda.html',
        controller: 'agendaController'
      })
      .when('/formulaire', {
        templateUrl: 'models/formulaire.html',
        controller: 'formulaireController'
      })
      .when('/croissant', {
        templateUrl: 'models/croissant.html',
        controller: 'croissantController'
      })
      .when('/wordchallenge', {
        templateUrl: 'models/wordchallenge.html',
        controller: 'wordchallengeController'
      })
      .otherwise({
        templateUrl: 'models/home.html',
        controller: 'homeController'
      });
}]);

// CONTROLLERS
imrApp.controller('mainController', function($scope, Page) {
  $scope.Page = Page;
});

imrApp.controller('homeController', function($scope, Page) {
  Page.setTitle("Home");
});

imrApp.controller('agendaController', function($scope, $http, Page) {
  Page.setTitle("Agenda");

  $http.post('./php/agenda.php?action=getTasks').success(function(data, status, headers, config){
      $scope.tasks = data;
  });
});

imrApp.controller('croissantController', function($scope, Page) {
  Page.setTitle("Croissant");
});

imrApp.controller('formulaireController', function($scope, Page) {
  Page.setTitle("Formulaire");
  $scope.submit = function() {
    alert("Et là tu submit");
  };
});

imrApp.controller('wordchallengeController', function($scope, Page) {
  Page.setTitle("Mot-à-caler");
  $scope.mot = "C'est pas un mot mais osef";
});

// FACTORY
imrApp.factory('Page', function(){
  var title = 'Home';
  return {
    title: function() { return title; },
    setTitle: function(newTitle) { title = newTitle; }
  };
});

$(document).ready(function() {

  $("#shortcuts").draggable();

    $("body").on('click','.bPopupModal-src',function(){
      target=$(this);
    $('#'+target.attr('modal-target')).bPopup({
      easing: 'easeOutBack', //uses jQuery easing plugin
      speed: 450,
      transition: 'slideDown',
	  amsl:target.attr('modal-amsl'),
    });
  });

});
