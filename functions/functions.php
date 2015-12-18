<?php
	
function loadDashBoard(){
?>
    <table class="table">
            <thead>
                <tr class='active'>
                    <th class="col-md-2">Echéance</th>
                    <th class="col-md-2">Date</th>
                    <th class="col-md-3">Titre</th>
                    <th>Description</th>
                </tr>
            </thead>
<?php
	
    	  $con = mysqli_connect("localhost","root","","imr18") or die('erreur');
        $request = mysqli_query($con, "SELECT * FROM tasks ORDER BY deadline") or die('erreur2');

        while ($data = mysqli_fetch_array($request)){
            $id=$data['id'];
            $title=utf8_encode($data['title']);
            $description=utf8_encode($data['description']);
            list($year, $month, $day) = explode('-', $data['deadline']);
            $deadline = $day."-".$month."-".$year;
            $deadlineDate = new DateTime($data['deadline']);
            $now = new DateTime();
            $interval = $now->diff($deadlineDate);

            if ($interval->format('%R%d') >= 0 && $interval->format('%R%m') >= 0) {
              $timeLeft = "";
              if ($interval->format('%R%m') > 0) {
                $timeLeft = $interval->format('%m mois');
                if ($interval->format('%d') != 0) {
                  $timeLeft = $timeLeft." et ";
                }
              }

              if ($interval->format('%d') > 1) {
                $timeLeft = $timeLeft.$interval->format('%d jours');
              }
              else if ($interval->format('%d') == 1) {
                $timeLeft = $timeLeft.$interval->format('%d jour');
              }

              if ($interval->format('%R%d') < 0 || $interval->format('%R%m') < 0) {
                $timeLeft = "Il y a ".$timeLeft;
              }
              //*/
              $worklevel=$data['worklevel'];
              $couleur = couleurNiveau($worklevel);
              echo "<tr class=".$couleur.">";
                  echo "<td>".$timeLeft."</td>";
                  echo "<td>".$deadline."</td>";
                  echo "<td>".$title."</td>";
                  echo "<td>".$description."</td>";
              echo "</tr>";
            }
        }

        mysqli_close($con);
        ?>
    </table>
<?php
}

function couleurNiveau($num){
	if($num==1){
		$retour = "success";
	}
	if($num==2){
		$retour = "warning";
	}
	if($num==3){
		$retour = "danger";
	}

	return $retour;
}

?>
