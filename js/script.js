$( document ).ready(function() {
	getPage("home","main_container");

	$("body").on('click','.innerLink',function(){
		getPage($(this).attr("data-src"),$(this).attr("data-target"));
	});

	$("#shortcuts").draggable();

	$('#shortCut').on('click', function () {
		$('#shortcuts').bPopup({
			easing: 'easeOutBack', //uses jQuery easing plugin
			speed: 450,
			transition: 'slideDown',
			autoClose:false
		});
	});

	$("#chatboxFooter").hide();
	$("#chatboxTextarea").hide();
	$("#chatbox").css({height: "30px"});
	isChatboxOpen = false;

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
		}
	});
	chatboxHighlight();
	setInterval(function() {chatboxHighlight()}, 2000);
});

function chatboxHighlight() {
	$("#chatboxHeader").animate({"background-color" : "#555"}, 1000).animate({"background-color" : "#161616"}, 1000);
}

function getPage($src,$dest){
	$.ajax({
		url: "functions/ajax.php?action=getPage&pageName="+$src,
		method: "GET",
		dataType: "json",
		success:function (data) {
			if(data[0]){
				$("#"+$dest).html(data[1]);
			}
		},
	});
}
