// ROUTE CONFIGURATION
// L'url localhost/#page utilise le template models/page.html avec le controller pageController
imrApp.config(['$routeProvider', function($routeProvider) {
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
  .when('/timetable', {
    templateUrl: 'models/timetable.html',
    controller: 'timetableController'
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
