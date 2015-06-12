<?php
require_once("../../lib/premain.php"); // For database
require_once("../../lib/classes/Auth.class.php"); // For auth class
require_once("../../lib/classes/Attendee.class.php");
require_once("../../lib/classes/Lesson.class.php");
require_once("../../lib/main.php"); // For other stuff


if(!$auth->checkSession()) {
	header("Location: ../login");
	exit;
}

if(!isset($_GET["id"])) {
	header("Location: ../");
	exit;
}

$lid = $_GET["id"];

if(!is_numeric($lid)) {
	header("Location: ../?numeric");
	exit;
}

$lessons = Lesson::fetch("WHERE l.id = ? AND l.siid = s.id", array($lid));

if(count($lessons) == 0) {
	echo "Lesson not found";
	exit;
}


$l = $lessons[0];

// TO DO: Check rights. (Only teacher that gave it, or mentor can see it)

// Show a list of all students that were and were not attending.
$atts = Attendee::fetch("WHERE attendee.lid = ? AND attendee.sid = student.id ORDER BY attendee.id IS NOT NULL, student.name", array($l->getId()));

if(count($atts) > 0) {
	echo "<table>";
	echo "<tr><td>Naam</td><td>Aanwezig</td><td>Info</td></tr>";
	foreach($atts as $att) {
		$stu = $att->getStu();
		echo "<tr>";
		echo "<td>" . $stu->getName() . "</td>";
		echo "<td>" . (($att->getAttent() == 1) ? "Ja" : "Nee") . "</td>";

		echo "<td>";
	   	foreach($att->getItems() as $item) {
				echo ($item->getType() == 0) ? "Check- in" : "Check-uit";
				echo " ";
				echo ($item->getMinsEarly() < 0) ? ($item->getMinsEarly() * -1) . " minuten te laat"  : $item->getMinsEarly() . " minuten op tijd";
				echo "<br />";
		}
		echo "</td>";

		echo "<td><a href='../manualattitem?id=" . $att->getId() . "'>Handmatige " . (($att->getAttent()) ? "check-uit" : "check- in") . "</a></td>";

		echo "</tr>";
	}
	echo "</table>";
}

?>
