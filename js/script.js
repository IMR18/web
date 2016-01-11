// FACTORY
imrApp.factory('Page', function(){
  var title = 'Home';
  return {
    title: function() { return title; },
    setTitle: function(newTitle) { title = newTitle; }
  };
});

function sqltojsDate(isoFormatDateString){
  var dateParts = isoFormatDateString.split("-");
  return new Date(dateParts[2], dateParts[1] - 1 , dateParts[0]);
}

function showPassword() {

    var key_attr = $('#key').attr('type');

    if(key_attr != 'text') {

        $('.checkbox').addClass('show');
        $('#key').attr('type', 'text');

    } else {

        $('.checkbox').removeClass('show');
        $('#key').attr('type', 'password');

    }

}

$(document).ready(function() {
  $("#shortcuts").draggable();

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

  $("body").on('click','.bPopupModal-src',function(){
    target=$(this);
    $('#'+target.attr('modal-target')).bPopup({
      easing: 'easeOutBack', //uses jQuery easing plugin
      speed: 450,
      transition: 'slideDown',
      amsl:target.attr('modal-amsl'),
      modalColor :"#000",
      opacity:0.6,
    });
  });


  $("body").on('click','.closeConfirm',function(){
    target=$(this);
    $("#"+target.attr('target')).bPopup().close();
  });


});

function displayMessage(message) {
  $('#message').html(message).fadeIn();
}
