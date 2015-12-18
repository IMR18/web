
<div class="row">
	Recherche : <input id="ressourceSearch" type="text" list="ressources" placeholder="Ex: 005V, IMR1 RT, ..."/>
</div>
<datalist id="ressources"></datalist>

<div id="ade"></div>

<script >
	var ressources = [];
	$.ajax({
		url: "functions/ade.php?action=getRessources",
		method: "GET",
		dataType: "json",
		success:function (data){
			options='<option value="Toutes les ressources Dispo">';
			for (var i = 0; i < data.length; i++) {
				options += '<option value="' + data[i].Name + '">';
				ressources.push(data[i]);
			}
			$("#ressources").html(options);
		}
	});

	$("#ressourceSearch").keyup(function() {
		var e = $(this);
		var keyword = e.val();

		var number = 0;
		var occurences = 0;
		for (var i = 0; i < ressources.length; i++) {
			if (~ressources[i].Name.indexOf(keyword)) {
				occurences++;
				number = ressources[i].number;
			}
		}
		console.log(occurences);
		if (occurences == 1) {
			$.ajax({
				url: "functions/ade.php?action=getEvents&ressource="+number,
				method: "GET",
				dataType: "json",
				success:function (data) {
					options="";
					for (var i = 0; i < data.length; i++) {
						options += '<span>' + data[i].StartDate +" ------ " + data[i].Title + '</span><br/>';
					}
					$("#ade").html(options);
				}
			});
		}
	});
</script >
