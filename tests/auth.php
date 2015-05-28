<?php
require_once("premain.php"); // For database
require_once("../lib/classes/Auth.class.php"); // For auth class
require_once("../lib/classes/Student.class.php");
require_once("../lib/classes/Clas.class.php");
require_once("../lib/classes/Teacher.class.php");
require_once("main.php"); // For other stuff

// Check if logged in.
if($auth->checkSession()) {
?>

<h1>Hello <?php echo $auth->getLogin(); ?></h1>
<?php
switch($auth->getType()) {
case Auth::TYPE_STUDENT:

	$stu = new Student();
	$stu->fetch($auth->getSid());

	echo "You are a student: " . $stu->getName() . "<br />";

	$class = new Clas();
	$class->fetch($stu->getCid());
	
	echo "Your class: " . $class->getName() . "<br />";

	$mentors = Teacher::fetchByCid($stu->getCid());

	if(count($mentors) > 0) {
		echo "Your mentors:";
		foreach($mentors as $mentor) {
			echo " " . $mentor->getName();
		}
	}
	break;
case Auth::TYPE_TEACHER:
	echo "You are a teacher<br />";
	break;
case Auth::TYPE_ADMIN:
	echo "You are an admin<br />";
	echo "<a href='changepass.php?other'>Change someone elses password</a>";
	break;
}
?>

<br />
<a href="login.php?logout">Log out</a> -
<a href="changepass.php">Change my password</a><br />

<?php
} else {
?>

<h1>Hello</h1>
Please <a href="login.php">login</a> to continue. <br />

<?php
}

// Display messages set in session.
msgs();

?>
