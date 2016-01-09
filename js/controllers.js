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
    $('#timeTable').weekCalendar({
      data: $scope.events,
      date: new Date('2016-01-05T13:15:00.000+10:00'),
      minDate: new Date('2009-05-01T13:15:00.000+10:00'),
      maxDate: new Date('2019-05-20T13:15:00.000+10:00'),
      timeslotsPerHour: 2,
      height: function($calendar) {
        return $(window).height();
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

})
.controller('agendaController', function($scope, $http, $route, Page,$compile) {
  Page.setTitle("Agenda");
  $scope.task={};
  $scope.filter={};
  $scope.filter.group='0';
  $scope.filter.from='';
  $scope.filter.oldEvents="Afficher Tâches passées";
$scope.getTasks=function(){
  $http.post('./php/agenda.php?action=getTasks&group='+$scope.filter.group+"&from="+$scope.filter.from).success(function(data, status, headers, config) {
    $scope.tasks = data;
  });
}


$scope.oldEvents=function(){
  $scope.filter.oldEvents=$scope.filter.oldEvents=="Afficher Tâches passées"?"Masquer les Tâches passées":"Afficher Tâches passées";
  d=$scope.filter.from=='1970-1-1'?new Date():new Date('January 1, 1970 11:13:00');
  $scope.filter.from=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
  $scope.getTasks();
}


    $scope.formatIt = function(data) {
      for (i = 0; i < data.length; i++) {
        d = new Date(data[i].StartDate + " " + data[i].StartTime)
        data[i].name=data[i].Title;
        data[i].Title = frenchDate(d, "dateDay") + " à " + frenchDate(d, 'time') + " " + data[i].Title;
      }
      return data;
    };

  $scope.coursSelected = function(task) {
    if(task){
      task=task.originalObject;
      $scope.task.title=task.name+" - ";
      $scope.task.deadline=new Date(task.StartDate+'T13:15:00.000+10:00');
      $scope.task.deadlinePicker=$scope.task.deadline.getFullYear()+"-"+("0" + ($scope.task.deadline.getMonth() + 1)).slice(-2)+"-"+("0" + $scope.task.deadline.getDate()).slice(-2);

      $scope.task.groupe=task.groupe;
      $scope.task.UID=task.UID;

    }

  };

    $("body").on('click','#datepicker',function(){
      $('#datepicker').datepicker({
          format: "yyyy-mm-dd",
          todayBtn: "linked",
          autoclose: true,
          language: "fr",
          daysOfWeekDisabled: "0,6",
          calendarWeeks: true,
          todayHighlight: true
      });
      $('#datepicker').datepicker('show');
    });

    $("body").on('change','#datepicker',function(){
      $scope.$apply(function () {
          $scope.task.deadline=$('#datepicker').val();
      });
    });


  $scope.addTask = function(task) {
    local_task=task;
  if(typeof(local_task.deadline)!='undefined'){
   if(local_task.deadline.length!=10){
     var d = local_task.deadline;
     local_task.deadline= d.getFullYear() + "-" + (d.getMonth() +1) + "-" + d.getDate();
    }
    }
    $action="addTask";
    if($scope.editMode){
      $action="editTask";
    }
    $http.post('./php/agenda.php?action='+$action, local_task).success(function(data, status, headers, config) {
      if (data['status']) {
        $scope.task={};
        $("#addtaskform").bPopup().close();
        $scope.getTasks();
      }
      $("#infoPopUp").html("<span class='popover-title'>" + data["msg"] + "</span>");
      $("#infoPopUp").bPopup({
        autoClose: 2000,
        modalColor :data['status']?"orange":"red",
      });
    });
  };
  $scope.deleteTest=function (){
    console.log("test");
  }
$scope.deleteTask = function(index) {
 $("#infoPopUp").html(
                    $compile(
                        "<div class='popUp text-center' style='color:white'><span >Supprimer la tâche ?</span>"+
                        "<h3>"+$scope.tasks[index].title+"</h1>"+
                        "<i  target='infoPopUp' class=\" closeConfirm btn btn-success-outline\" style=\"margin:15px 0;\">Non</i>"+
                        "	<i  ng-click=\"deleteTaskConfirmed("+index+")\"  class=\"  deleteTaskConfirmed btn btn-danger-outline \">Oui</i></div>"
                      )($scope));
  $("#infoPopUp").bPopup({
    modalClose:false,
    escClose:false,
    modalColor :false?"orange":"red",
  });}

  $scope.deleteTaskConfirmed = function(index) {
    $http.post('./php/agenda.php?action=deleteTask', $scope.tasks[index]).success(function(data, status, headers, config) {
      if (data['status']) {
        $scope.task={};
        $scope.getTasks();
      }
      $("#infoPopUp").bPopup().close();
      $("#infoPopUp").html("<div class='popUp text-center' style='color:white'><p>" + data["msg"] + "</p></div>")
      $("#infoPopUp").bPopup({
        autoClose: 2000,
        modalColor :data['status']?"orange":"red",
      });
    });
  };
  $scope.editTask = function(index) {
    $("#addtaskform h3").html("Modifier La tâche <br/><h5>"+$scope.tasks[index].title+"</h5>");
    $("#addtaskform #submitTask").text("Mettre à jour");
    $("#addtaskform").bPopup({
      modalColor :"blue",
      onOpen: function(){
            $scope.editMode=true;
            $scope.task=angular.copy($scope.tasks[index]);
            $scope.task.groupe=parseInt($scope.tasks[index].groupe);
            $scope.task.worklevel=parseInt($scope.task.worklevel);
            $scope.task.deadline=sqltojsDate($scope.task.deadline);
            $scope.task.deadlinePicker=$scope.task.deadline.getFullYear()+"-"+("0" + ($scope.task.deadline.getMonth() + 1)).slice(-2)+"-"+("0" + $scope.task.deadline.getDate()).slice(-2);
      },
      onClose: function(){
        $("#addtaskform h3").html("Ajouter une tâche");
          $scope.$apply(function () {
            $scope.task={};
            $("#addtaskform #submitTask").text("Ajouter");
            $scope.editMode=false;
      });
      }
    });

    return;
    $http.post('./php/agenda.php?action=addTask', local_task).success(function(data, status, headers, config) {
      if (data['status']) {
        $scope.task={};
        $("#addtaskform").bPopup().close();
        $scope.getTasks();
      }
      $("#infoPopUp").html("<span class='popover-title'>" + data["msg"] + "</span>")
      $("#infoPopUp").bPopup({
        autoClose: 2000,
        modalColor :data['status']?"orange":"red",
      });
    });
  };
  $scope.getTasks();
})

.controller('croissantController', function($scope, Page) {
  Page.setTitle("Croissant");
})

.controller('wordchallengeController', function($scope, $http, Page) {
  Page.setTitle("Mot-à-caler");
  $http.post('./php/wordchallenge.php?action=getWord').success(function(data, status, headers, config){
    $scope.mot=data[0];
    $scope.level=data[1];
    $scope.mot1=data[2];
    $scope.level1=data[3];
    $scope.mot2=data[4];
    $scope.level2=data[5];
  });

  $http.post('./php/wordchallenge.php?action=getTopScore').success(function(data, status, headers, config){
    $scope.topscore=data; 
  });
 $http.post('./php/wordchallenge.php?action=getTop3').success(function(data, status, headers, config){
    $scope.top1=data[0];
    $scope.top2=data[1];
    $scope.top3=data[2];
 });
 
});
