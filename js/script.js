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
});

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
