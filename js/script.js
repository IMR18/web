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
      modalColor :"#860",
    });
});


});





function displayMessage(message) {
  $('#message').html(message).fadeIn();
}
