<select id="selectRessource"></select>

<div id="ade"></div>

<p>un test</p>

<script >
	$.ajax({
		url: "functions/ade.php?action=getRessources",
		method: "GET",
		dataType: "json",
		success:function (data){
			options="<option value=''>Toutes les ressources Dispo</option>";
			for (var i = 0; i < data.length; i++) {
				options += '<option value="' + data[i].number + '">' + data[i].Name + '</option>';
			}
			$("#selectRessource").html(options);
		},
	});


	$("#selectRessource").change(function(){
		$select=$(this);
		$select.prop('disabled', true);

		$.ajax({
			url: "functions/ade.php?action=getEvents&ressource="+$select.val(),
			method: "GET",
			dataType: "json",
			success:function (data){
				options="";
				for (var i = 0; i < data.length; i++) {
					options += '<span>' + data[i].StartDate +" ------ " + data[i].Title + '</span><br/>';
				}
				$("#ade").html(options);
				$select.prop('disabled', false);
			},
		});
	});
</script >
