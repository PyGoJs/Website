<?php
require_once("premain.php");
require_once("../lib/classes/Auth.class.php");
require_once("main.php");

$auth->checkSession();

// Check if should log out.
if(isset($_GET["logout"])) {
	// Checked if already logged out ( = not logged in)
	if(!$auth->checkSession()) {
		header("Location: auth.php?not-logged-in");
		exit;
	}

	$auth->logout();

	addMsg("logout");
	header("Location: auth.php");

	exit;
}

// Check if already logged in.
if($auth->checkSession()) {
	header("Location: auth.php?already-logged-in");
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
		header("Location: auth.php");
		exit;
	}

	$incorrect = true;
}
?>
	<form method="post" action="">
		<input type="text" name="login" />
		<input type="password" name="pass" />
		<input type="submit" />
	</form>
<?php
	if($incorrect) {
		echo "Incorrect login or password";
	}
?>
