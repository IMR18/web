// CONTROLLERS
imrApp.controller('mainController', function($scope, Page) {
  $scope.Page = Page;
})





.controller('homeController', function($scope, Page) {
  Page.setTitle("Home");
})





.controller('timetableController', function($scope, $http, Page) {
  Page.setTitle("Emploi du Temps");

  $http.post('php/ade.php?action=getEventsJson&ressource=1492').success(function(data, status, headers, config){
      $scope.events = data;
      $('#main_container').weekCalendar({
        data: $scope.events,
        date: new Date('2016-01-05T13:15:00.000+10:00'),
        minDate: new Date('2009-05-01T13:15:00.000+10:00'),
        maxDate: new Date('2019-05-20T13:15:00.000+10:00'),
        timeslotsPerHour: 2,
        height: function($calendar) {
          return $(window).height()+200;
        },
        eventRender: function(calEvent, $event) {
          if (calEvent.end.getTime() < new Date().getTime()) {
            $event.css('backgroundColor', '#aaa');
            $event.find('.time').css({
              backgroundColor: '#999',
              border:'1px solid #888'
            });
          }
        },
        eventNew: function(calEvent, $event) {
          displayMessage('<strong>Added event</strong><br/>Start: ' + calEvent.start + '<br/>End: ' + calEvent.end);
          alert('You\'ve added a new event. You would capture this event, add the logic for creating a new event with your own fields, data and whatever backend persistence you require.');
        },
        eventDrop: function(calEvent, $event) {
          displayMessage('<strong>Moved Event</strong><br/>Start: ' + calEvent.start + '<br/>End: ' + calEvent.end);
        },
        eventResize: function(calEvent, $event) {
          displayMessage('<strong>Resized Event</strong><br/>Start: ' + calEvent.start + '<br/>End: ' + calEvent.end);
        },
        eventClick: function(calEvent, $event) {
          displayMessage('<strong>Clicked Event</strong><br/>Start: ' + calEvent.start + '<br/>End: ' + calEvent.end);
        },
        eventMouseover: function(calEvent, $event) {
          displayMessage('<strong>Mouseover Event</strong><br/>Start: ' + calEvent.start + '<br/>End: ' + calEvent.end);
        },
        eventMouseout: function(calEvent, $event) {
          displayMessage('<strong>Mouseout Event</strong><br/>Start: ' + calEvent.start + '<br/>End: ' + calEvent.end);
        },
        noEvents: function() {
          displayMessage('There are no events for this week');
        },
        reachedmindate: function($calendar, date) {
          displayMessage('You reached mindate');
        },
        reachedmaxdate: function($calendar, date) {
          displayMessage('You cannot go further');
        }
      });
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
