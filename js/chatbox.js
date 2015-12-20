$(document).ready(function() {
  var ref = new Firebase("https://imr18.firebaseio.com/chat/");
  var UUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = crypto.getRandomValues(new Uint8Array(1))[0]%16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
});

  var highlightInterval = null;
  isChatboxOpen = false;

  ref.on("value", function(snapshot) {
    var data = snapshot.val();
    var p = $("<p></p>");
    var c = (data.uuid == UUID) ? "self":"other";
    p.addClass(c);
    p.text(data.message);
    $("#chatboxTextarea div").append(p);
    $('#chatboxTextarea div').animate({
        scrollTop: $('#chatboxTextarea div').get(0).scrollHeight},
        1000);

    if (!isChatboxOpen)
      highlightInterval = setInterval(chatboxHighlight, 2000);
  });

  $("#chatboxFooter").hide();
  $("#chatboxTextarea").hide();
  $("#chatbox").css({height: "30px"});

  $("#chatboxHeader").click(function () {
    if (isChatboxOpen) {
      $("#chatboxFooter").fadeOut();
      $("#chatboxTextarea").fadeOut();
      $("#chatbox").animate({height: "30px"});
      isChatboxOpen = false;
    }
    else {
      $("#chatboxFooter").fadeIn();
      $("#chatboxTextarea").fadeIn();
      $("#chatbox").animate({height: "300px"});
      isChatboxOpen = true;
      if (highlightInterval != null) {
        clearInterval(highlightInterval);
        console.log("cleared");
      }
    }
  });

  $("#chatboxFooter").submit(function(e) {
    console.log("Submit");
    e.preventDefault();
    var msg = $("#chatboxInput").val();
    if (msg.length) {
      ref.set({uuid: UUID, message: msg});
    }
    $("#chatboxInput").val("");
  });

  function chatboxHighlight() {
    $("#chatboxHeader").animate({"background-color" : "#555"}, 1000).animate({"background-color" : "#161616"}, 1000);
  }
});
