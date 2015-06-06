<?php
// Home page of account.
// Will redirect to page login if not logged in.
// Includes specific files based on account type (teacher, student, admin).

require_once("../lib/premain.php"); // For database
require_once("../lib/classes/Auth.class.php"); // For auth class
require_once("../lib/classes/Student.class.php");
require_once("../lib/classes/Clas.class.php");
require_once("../lib/classes/Teacher.class.php");
require_once("../lib/classes/Lesson.class.php");
require_once("../lib/main.php"); // For other stuff

// Check if logged in.
if(!$auth->checkSession()) {
	header("Location: login");
	exit;
}
?>

<h1>Ingelogd als <?php echo $auth->getLogin(); ?></h1>
<?php
switch($auth->getType()) {
case Auth::TYPE_STUDENT:

	$stu = new Student();
	$stu->fetch($auth->getSid());

	echo "You are a student: " . $stu->getName() . "<br />Your code is not done yet, and this is temporary<br />";

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

	echo "<br />";
	echo "Lessons st00fs:";
	$lessons = Lesson::fetchAll($class->getId(), 201522);
	break;
case Auth::TYPE_TEACHER:
	include("_teacher.php");
	break;
case Auth::TYPE_ADMIN:
	echo "You are an admin<br />Your code is not done yet";
	echo "<a href='changepass.php?other'>Change someone elses password</a>";
	break;
}
?>

<br />
<a href="login?logout">Log uit</a> -
<a href="changepass.php">Wachtwoord aanpassen</a><br />

<?php

// Display messages set in session.
msgs();

?>
