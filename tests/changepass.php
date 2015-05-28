<?php
require_once("premain.php"); // For database
require_once("../lib/classes/Auth.class.php"); // For auth class
require_once("main.php"); // For other stuff

// Redirect if not logged in
if(!$auth->checkSession()) {
	addMsg("nopermission");
	header("Location: auth.php");
	exit;
}

$other = false;
if(isset($_GET["other"])) {
	$other = true;
}

// Redirect if no permission
if($other && $auth->getType() != Auth::TYPE_ADMIN) {
	addMsg("nopermission");
	header("Location: auth.php");
}

function changePass() {
	global $auth, $other;

	$type = $_POST["type"];
	$current = $_POST["currentpass"];
	$newPass1 = $_POST["newpass1"];
	$newPass2 = $_POST["newpass2"];

	// Stop if not all vars are filled in.
	if($type == "" || $newPass1 == "" || $newPass2 == "" || $current == "") {
		return "Not everything filled in :( ";
	}

	// Stop if the two new passwords don't match.
	if($newPass1 != $newPass2) {
		return "Two new passwords don't match";
	}

	// Stop if current own password is incorrect.
	if(!$auth->checkPassword($current)) {
		return "Incorrect current password";
	}

	// Not other; Change my own password
	if(!$other) {
		$auth->changePassword($newPass1);
	} else { // Change other password
		echo "other";
		if(!isset($_POST["othername"]) || $_POST["othername"] == "") {
			return "No other account name";
		}

		$other = new Auth();
		if(!$other->fetch("login", $_POST["othername"])) {
			return "Incorrect other account name";
		}

		$other->changePassword($newPass1);
	}

	addMsg("changedpass");
	header("Location: auth.php");
	return;
}

// Do changepass if all variables are send.
$msg = "";
if(isset($_POST["type"], $_POST["currentpass"], $_POST["newpass1"], $_POST["newpass2"])) {
	$msg = changePass();
}

?>
<form method="post" action="">
<input type="hidden" name="type" value="<?php echo ($other) ? "other" : "own"; ?>" />
	<?php
	if($other) {
		echo "<input type='text' name='othername' placeholder='Account name' /><br />";
	}
	?>
	<input type="password" name="currentpass" placeholder="My current password" /><br />
	<input type="password" name="newpass1" placeholder="New password" /><br />
	<input type="password" name="newpass2" placeholder="New password again" /><br />
	<input type="submit" />
</form>
<?php
if($msg != "") {
	echo $msg;
}
?>
