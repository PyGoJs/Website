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

// Form posted
function post($aid, $minute) {
	$aid = intval($aid);
	if($aid < 0) {
		
	}
	$minute = intval($minute);
	if($minute <= 0) {
		return;
	}

	$atts = Attendee::fetch("WHERE attendee.id = ? AND attendee.sid = student.id", array($aid));

	if(count($atts) == 0) {
		echo "Att not found";
		exit;
	}

	$att = $atts[0];

	$att->createItem($minute);

	header("Location: ?id=" . $att->getId());
	exit;
}

if(isset($_POST["submit"], $_POST["aid"], $_POST["minute"])) {
	post($_POST["aid"], $_POST["minute"]);
}

if(!isset($_GET["id"])) {
	header("Location: ../");
	exit;
}

$aid = $_GET["id"];

if(!is_numeric($aid)) {
	header("Location: ../?numeric");
	exit;
}

// TO DO: Check if logged in user has got permission to view this.

$atts = Attendee::fetch("WHERE attendee.id = ? AND attendee.sid = student.id", array($aid));

if(count($atts) == 0) {
	echo "Att not found";
	exit;
}

$att = $atts[0];

echo $att->getStu()->getName();

echo "<p>";

foreach($att->getItems() as $item) {
		echo ($item->getType() == 0) ? "Check- in" : "Check-uit";
		echo " ";
		echo ($item->getMinsEarly() < 0) ? ($item->getMinsEarly() * -1) . " minuten te laat"  : $item->getMinsEarly() . " minuten op tijd";
		echo "<br />";
}

$min = $att->getItems()[count($att->getItems())-1]->getMinsEarly();
if($min > 0) {
	$min = 0;
} else if($min < 0) {
	$min = $min * -1;
}

echo "<p>Check-" . (($att->getAttent()) ? " in" : "out") . " toevoegen na " . $min . " minuten na start les";

?>
<p>
<form method="post" action="">
	<input type="hidden" name="aid" value="<?php echo $aid; ?>" />
	<input type="number" name="minute" value="<?php echo $min; ?>" />
	<input type="submit" name="submit" />
</form>
<a href="../lesson?id=<?php echo $att->getLid(); ?>">Terug</a>
