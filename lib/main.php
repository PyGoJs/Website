<?php
// Make a new instance of Auth.
$auth = new Auth();

$auth->checkSession();

// Make it possible to use sessions.
session_start();

// msgs echos messages set in sessions, and clears them from the session.
function msgs(){
	if(isset($_SESSION["messages"])) {
		$msgs = explode(":", $_SESSION["messages"]);
		foreach($msgs as $msg) {
			switch($msg) {
			case "login":
				echo "Login gelukt";
				break;
			case "logout":
				echo "Loguit gelukt";
				break;
			case "changedpass":
				echo "Wachtwoord aangepast";
				break;
			case "nopermission":
				echo "Je beschikt niet over de benodigde rechten om het aangevraagde te doen";
				break;
			}
		}
	}
	unset($_SESSION["messages"]);
}

// addMsg puts the given messages in session for msgs().
function addMsg($msg) {
	if(!isset($_SESSION["messages"])) {
		$_SESSION["messages"] = $msg;
		return;
	}

	$_SESSION["messages"] += ":" + $msg;
}

$now = new DateTime();
