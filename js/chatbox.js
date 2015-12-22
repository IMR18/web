$(document).ready(function() {
  var ref = new Firebase("https://imr18.firebaseio.com/chat/messages");
  var UUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = crypto.getRandomValues(new Uint8Array(1))[0]%16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });

  var isChatboxOpen = false;
  var lastTimestamp = 0;
  var unreadMessages = 0;
  var newMessage = false;

  ref.on("child_added", function(snapshot) {
    var data = snapshot.val();

    if (lastTimestamp == null || (data.timestamp - lastTimestamp) > 1000*60*5) {
      var timestamp = $("<p></p>");
      var date = new Date(data.timestamp);
      var month = (date.getMonth() + 1).toString();
      var day = date.getDate().toString();
      var hours = date.getHours().toString();
      var minutes = date.getMinutes().toString();
      month = (month.length > 1) ? month : "0" + month;
      day = (day.length > 1) ? day : "0" + day;
      hours = (hours.length > 1) ? hours : "0" + hours;
      minutes = (minutes.length > 1) ? minutes : "0" + minutes;
      timestamp.text(hours + ":" + minutes + " - " + day + "/" + month + "/" + date.getFullYear());
      timestamp.addClass("timestamp");
      $("#chatboxTextarea div").append(timestamp);
    }

    lastTimestamp = data.timestamp;

    var message = $("<p></p>");
    var c = (data.uuid == UUID) ? "self":"other";
    message.addClass(c);
    message.text(data.message);
    $("#chatboxTextarea div").append(message);
    $('#chatboxTextarea div').animate({
      scrollTop: $('#chatboxTextarea div').get(0).scrollHeight},
      0);

      if (!isChatboxOpen) {

        unreadMessages++;
        $("#unreadMessages").text(unreadMessages);
        if (!newMessage){
          newMessage = true;
          chatboxHighlight();
        }
      }
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

      $('#chatboxTextarea div').animate({
          scrollTop: $('#chatboxTextarea div').get(0).scrollHeight},
          0);

      $("#unreadMessages").text("");
      newMessage = false;
    }
  });

  $("#chatboxFooter").submit(function(e) {
    e.preventDefault();
    var msg = $("#chatboxInput").val();
    if (msg.length) {
      ref.push({uuid: UUID, message: msg, timestamp: Firebase.ServerValue.TIMESTAMP});
    }
    $("#chatboxInput").val("");
  });

  $("#chatboxSubmit").click(function() {
    $("#chatboxFooter").submit();
  });

  function chatboxHighlight() {
    $("#chatboxHeader").animate({"background-color" : "#555"}, 1000).animate({"background-color" : "#161616"}, 1000);

    if (newMessage) {
      setTimeout(chatboxHighlight, 2000);
    }
  }
});
