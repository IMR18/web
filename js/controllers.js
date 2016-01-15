// CONTROLLERS
imrApp.controller('mainController', function($scope, Page) {
  $scope.Page = Page;
  $scope.user={
    connected:false,
    nikeName:"",
    img:'./img/users/mini/francois.png'
  }
  $scope.user.nikeName="Zaza35"
})

.controller('homeController', function($scope, Page) {
  Page.setTitle("Home");
})

.controller('timetableController', function($scope, $http, Page) {
Page.setTitle("Emploi du Temps");
$scope.events=[];
$scope.ressources={};
$scope.ressources.selectedIds=[];
$scope.ressources.selectedNames=[];
$scope.addSelectedId=function(id){
  if(typeof(id)!='undefined'){
       $scope.ressources.selectedIds.push(id.originalObject.number);
       $scope.ressources.selectedNames.push(id.originalObject.Name);
       $scope.$broadcast('angucomplete-alt:clearInput');
       $scope.updateCal();
  };
};

$scope.delSelectedId=function($index){
  $scope.ressources.selectedIds.splice($index,1);
  $scope.ressources.selectedNames.splice($index,1);
  $scope.updateCal();
}


$scope.updateCal=function(){
  ressources=$scope.ressources.selectedIds;
  console.log(ressources);
  if(ressources.length==0)
  {
      ressources="NOTHING";
  }
  $http.post('php/ade.php?action=getEventsJson&ressource='+ressources).success(function(data, status, headers, config){
   $scope.events = data;
   $('#timeTable').weekCalendar("refresh");
});
}
    $('#timeTable').weekCalendar({
      data:function (start, end, callback) {
                    callback( $scope.events);
                  },

      date: new Date(),
      minDate: new Date('2000-05-01T13:15:00.000+10:00'),
      maxDate: new Date('2020-05-20T13:15:00.000+10:00'),
      timeslotsPerHour: 2,
      height: function($calendar) {
        return $(window).height()-185;
      },
      eventRender: function(calEvent, $event) {
        if (calEvent.end.getTime() < new Date().getTime()) {
          $event.css('backgroundColor', '#777');
          $event.find('.wc-time').css({
            backgroundColor: '#999',
            border:'1px solid #888'
          });
        }
      },

  });

})
.controller('agendaController', function($scope, $http, $route, Page,$compile) {
  Page.setTitle("Agenda");


  $scope.task={};
  $scope.filter={};
  $scope.filter.group='0';
  $scope.filter.from='';
  $scope.filter.oldEvents="Afficher les tâches passées";
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
        modalColor :data['status']?"#200":"#220",
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
    modalColor :false?"#000":"#200",
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
        modalColor :data['status']?"#000":"#200",
      });
    });
  };
  $scope.editTask = function(index) {
    $("#addtaskform h3").html("Modifier La tâche <br/><h5>"+$scope.tasks[index].title+"</h5>");
    $("#addtaskform #submitTask").text("Mettre à jour");
    $("#addtaskform").bPopup({
      modalColor :"#000",
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
        modalColor :data['status']?"#220":"#200",
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
