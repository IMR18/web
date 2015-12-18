
<div class="row">
	Recherche : <input id="ressourceSearch" type="text" list="ressources" placeholder="Ex: 005V, IMR1 RT, ..."/>
</div>
<datalist id="ressources">
	<option value="333"/>
	<option value="222"/>
</datalist>
<!--<select id="selectRessource"></select>-->

<div id="ade"></div>

<script >
	$.ajax({
		url: "functions/ade.php?action=getRessources",
		method: "GET",
		dataType: "json",
		success:function (data){
			options='<option value="Toutes les ressources Dispo">';
			for (var i = 0; i < data.length; i++) {
				options += '<option value="' + data[i].Name + '">';
			}
			$("#ressources").html(options);
		}
	});

	$("#ressourceSearch").keyup(function() {
		var e = $(this);
		var keyword = e.val();
		console.log($("#ressources").options.length);
		/*if ($("#ressources"). == 1) {
			$.ajax({
				url: "functions/ade.php?action=getEvents&ressource="+data[0].number,
				method: "GET",
				dataType: "json",
				success:function (data) {
					$("#ressourcesSuggestions").html("");
					options="";
					for (var i = 0; i < data.length; i++) {
						options += '<span>' + data[i].StartDate +" ------ " + data[i].Title + '</span><br/>';
					}
					$("#ade").html(options);
				}
			});
		}*/
	});

	/*$("#selectRessource").change(function(){
		$select=$(this);
		$select.prop('disabled', true);

		$.ajax({
			url: "functions/ade.php?action=getEvents&ressource="+$select.val(),
			method: "GET",
			dataType: "json",
			success:function (data) {
				options="";
				for (var i = 0; i < data.length; i++) {
					options += '<span>' + data[i].StartDate +" ------ " + data[i].Title + '</span><br/>';
				}
				$("#ade").html(options);
				$select.prop('disabled', false);
			},
		});
	});*/
</script >
