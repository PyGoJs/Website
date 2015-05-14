<?php
require_once("premain.php"); // For database
require_once("../lib/classes/Auth.class.php"); // For auth class
require_once("main.php"); // For other stuff

// Check if logged in.
if($auth->checkSession()) {
?>

<h1>Hello <?php echo $auth->getUserData()["login"]; ?></h1>
<?php
switch($auth->getUserData()["type"]) {
case Auth::TYPE_STUDENT:
	echo "You are a student";
	break;
case Auth::TYPE_TEACHER:
	echo "You are a teacher";
	break;
case Auth::TYPE_ADMIN:
	echo "You are an admin";
	break;
}
?>

<br />
<a href="login.php?logout">Log out</a> <br />

<?php
} else {
?>

<h1>Hello</h1>
Please <a href="login.php">login</a> to continue. <br />

<?php
}

// Check if messages should be displayed.
msgs();

?>
