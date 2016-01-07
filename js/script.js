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
      modalColor :"orange",
      opacity:0.6,
    });
  });
});

function displayMessage(message) {
  $('#message').html(message).fadeIn();
}
