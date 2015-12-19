<?php
$con = mysqli_connect("localhost","root","","imr18") or die('erreur');

if(isset($_POST['addtask'])){
	$title = $_POST['inputTitle'];
	$description = $_POST['inputDescription'];
	$worklevel = $_POST['inputNiveau'];
	$date = $_POST['inputDate'];
	$group = $_POST['inputGroup'];

	die($title." ".$description." ".$worklevel." ".$date." ".$group);

}


mysqli_close($con);
?>
<div class="bPopupModal" id="ajouterUneTache">
  <form class="form-horizontal" method="POST">
  	<h3>Ajouter une tâche</h3>
  <div class="form-group">
    <label for="titre" class="col-sm-3 control-label">Titre</label>
    <div class="col-sm-9">
      <input type="text" class="form-control" name="inputTitle" placeholder="Titre" required>
    </div>
  </div>
  <div class="form-group">
    <label for="description" class="col-sm-3 control-label">Description</label>
    <div class="col-sm-9">
      <input type="text" class="form-control" name="inputDescription" placeholder="Description de la tâche" required>
    </div>
  </div>
  <!--<div class="form-group">
  	<label for="niveau" class="col-sm-3 control-label">Niveau de travail</label>
  	<div class="col-sm-9">
	  <select name="inputNiveau" class="form-control" required>
		  <option value='1'>Faible</option>
		  <option value='2'>Moyen</option>
		  <option value='3'>Important</option>
	  </select>
    </div>
  </div>-->
	<div class="form-group">
		<label for="echeance" class="col-sm-3 control-label">Echéance</label>
		<div class="col-sm-9">
			<input type="date" class="form-control" name="inputDate" required>
		</div>
	</div>
	<div class="form-group">
		<label for="niveau" class="col-sm-3 control-label">Niveau de travail</label>
		<div class="col-sm-9">
			<div class="btn-group" data-toggle="buttons">
				<label class="btn btn-default active">
					<input type="radio" name="inputNiveau" value="1" checked="checked" required/> Faible
				</label>
				<label class="btn btn-default">
					<input type="radio" name="inputNiveau" value="2" /> Moyen
				</label>
				<label class="btn btn-default">
					<input type="radio" name="inputNiveau" value="3" /> Important
				</label>
			</div>
		</div>
	</div>
	<div class="form-group">
		<label for="group" class="col-sm-3 control-label">Groupe(s)</label>
		<div class="col-sm-9">
			<div class="btn-group" data-toggle="buttons">
				<label class="btn btn-default active">
					<input type="radio" name="inputGroup" value="both" checked="checked" required/> Les deux
				</label>
				<label class="btn btn-default">
					<input type="radio" name="inputGroup" value="info" /> Info
				</label>
				<label class="btn btn-default">
					<input type="radio" name="inputGroup" value="rt" /> RT
				</label>
			</div>
		</div>
	</div>
  <!--<div class="form-group">
  	<label for="groupe" class="col-sm-3 control-label">Groupe(s) concerné(s)</label>
  	<div class="col-sm-9">
	  <select name="inputGroup" class="form-control" required>
		  <option value='both'>Les deux</option>
		  <option value='info'>Info</option>
		  <option value='rt'>RT</option>
	  </select>
	</div>
  </div>-->
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button name="addtask" type="submit" class="btn btn-primary">Ajouter</button>
    </div>
  </div>
  </form>

</div>
