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
		$yrWk = $intYrWk;
	}
}

function echoLessons($lessons, $classes) {
	$days = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];

	echo "<table>";
	foreach($lessons as $lesson) {
		$sched = $lesson->getSched();
		echo "<tr>";
		echo "<td>" . ((array_key_exists($lesson->getCid(), $classes)) ? $classes[$lesson->getCid()]->getName() : "") . "</td>";
		echo "<td>" . $days[$sched->getDay()] . "</td>";
		echo "<td>" . $sched->getStartStr() . " - " . $sched->getEndStr() . "</td>";
		echo "<td>" . $sched->getDesc() . "</td>";
		echo "<td>" . $lesson->getAmntStus() . " / " . $lesson->getMaxStus() . "</td>";
		echo "<td><a href='lesson?id=" . $lesson->getId() . "'>Bekijk</a></td>";
		echo "</tr>";
	}
	echo "</table>";

}

// weeks in select list.
$weeks = [[2015, 25], [2015, 24], [2015, 23], [2015, 22], [2015, 21], [2015, 20]];
$nowWeek = $now->format("YW");
?>
<p>
Je bent een docent
</p>
<?php
$lessons = Lesson::fetch("WHERE s.staff = ? AND l.yearweek = ? AND l.siid = s.id", array($teacher->getSchedName(), $yrWk));

$mLessons = Lesson::fetch("WHERE m.tid = ? AND m.cid = s.cid AND l.yearweek = ? AND l.siid = s.id", array($teacher->getId(), $yrWk), ", mentor AS m");

// Fetch the required classes.
$clssInts = array();

foreach($lessons as $lesson) {
	$clssInt[] = $lesson->getCid();
}

foreach($mLessons as $lesson) {
	$clssInt[] = $lesson->getCid();
}

// clss: Clas[]
$clss = array();
if(count($clssInts) > 0) {
	$clss = Clas::fetch("WHERE id IN (" . implode(", ", $clssInts) . ")", array());
}

// classes: map[classid]Clas
$classes = array();
foreach($clss as $class) {
	$classes[$class->getId()] = $class;
}

echo "<p>";
if(count($lessons) > 0) {
	echo "Mijn gegeven lessen deze week: <br />";
	echoLessons($lessons, $classes);
} else {
	echo "Geen lessen gegeven deze week";
}

echo "</p><p>";

if(count($mLessons) > 0) {
	echo "Lesson gegeven aan mijn mentorklassen deze week: <br />";
	echoLessons($mLessons, $classes);
} else {
	echo "Geen lessen van mentorklassen deze week";
}

echo "</p>";
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
