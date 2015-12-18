
$( document ).ready(function() {
	getPage("home");
	$(".innerLink").click(function(){
	getPage($(this).attr("data_target"));
	});
	
});


function getPage($name){
$.ajax({
			url: "functions/ajax.php?action=getPage&pageName="+$name,
			method: "GET",
			dataType: "json",
			success:function (data) {
			if(data[0]){
				$("#main_container").html(data[1]);
				}
			},
		});
}