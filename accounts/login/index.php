<?php
// Login page shows the login form and handled the POST request the form creates to handle the login itself.

require_once("../../lib/premain.php");
require_once("../../lib/classes/Auth.class.php");
require_once("../../lib/main.php");

// Check if should log out.
if(isset($_GET["logout"])) {
	// Checked if already logged out ( = not logged in)
	if(!$auth->checkSession()) {
		header("Location: ..?not-logged-in");
		exit;
	}

	$auth->logout();

	addMsg("logout");
	header("Location: ..");

	exit;
}

// Check if already logged in.
if($auth->checkSession()) {
	header("Location: ..?already-logged-in");
	exit;
}

// Check if login is in progress.
$incorrect = false;
if(isset($_POST["login"], $_POST["pass"])) {
	$login = $_POST["login"];
	$pass = $_POST["pass"];

	$success = $auth->login($login, $pass);
	if($success) {
		addMsg("login");
		header("Location: ..");
		exit;
	}

	$incorrect = true;
}
?>
	<form method="post" action="">
		<input type="text" name="login" /><br />
		<input type="password" name="pass" />
		<input type="submit" />
	</form>
<?php
	if($incorrect) {
		echo "Login wachtwoord combinatie niet gevonden";
	}
?>
