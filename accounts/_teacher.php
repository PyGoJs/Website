<?php
require_once("../lib/classes/Lesson.class.php");
$teachers = Teacher::fetch("WHERE id = ?", array($auth->getTid()));
if(count($teachers) == 0) {
	echo "Error: Teacher not found";
	exit;
}

$teacher = $teachers[0];

$yrWk = $now->format("YW");
if(isset($_GET["yrwk"])) {
	$intYrWk = intval($_GET["yrwk"]);
	if($intYrWk > 0) {
		$yrWk = intval($_GET["yrwk"]);
	}
}

$weeks = [[2015, 25], [2015, 24], [2015, 23], [2015, 22], [2015, 21], [2015, 20]];
$nowWeek = $now->format("YW");
?>
<p>
Je bent een docent
</p>
<p>
<?php
$days = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
$lessons = Lesson::fetch("WHERE s.staff = ? AND l.yearweek = ? AND l.siid = s.id", array($teacher->getSchedName(), $yrWk));
if(count($lessons) > 0) {
	echo "Mijn gegeven lessen deze week: <br />";

	// Fetch the required classes.
	$clssInts = array();
	foreach($lessons as $lesson) {
		$clssInt[] = $lesson->getCid();
	}
	$clss = Clas::fetch("WHERE id IN (" . implode(", ", $clssInt) . ")", array());

	$classes = array();
	foreach($clss as $class) {
		$classes[$class->getId()] = $class;
	}

	echo "<table>";
	foreach($lessons as $lesson) {
		$sched = $lesson->getSched();
		echo "<tr>";
		echo "<td>" . ((array_key_exists($lesson->getCid(), $classes)) ? $classes[$lesson->getCid()]->getName() : "") . "</td>";
		echo "<td>" . $days[$sched->getDay()] . "</td>";
		echo "<td>" . $sched->getStartStr() . " - " . $sched->getEndStr() . "</td>";
		echo "<td>" . $sched->getDesc() . "</td>";
		echo "<td>0 / " . $lesson->getMaxStus() . "</td>";
		echo "<td><a href='lesson?id=" . $lesson->getId() . "'>Bekijk</a></td>";
		echo "</tr>";
	}
	echo "</table>";
} else {
	echo "Geen lessen gegeven deze week";
}
?>
</p>
<?php
?>
<form method="get" action="">
	<select name="yrwk">
		<?php
		foreach($weeks as $week) {
			echo "<option value='" . $week[0] . $week[1] . "'" . (($yrWk == $week[0] . $week[1]) ? " selected" : "") . ">" . $week[0] . '-' . $week[1] . "</option>\n";
		}
		?>
	</select>
	<input type="submit" />
</form>
