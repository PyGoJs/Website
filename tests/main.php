<?php
// Make a new instance of Auth.
$auth = new Auth();

// Make it possible to use sessions.
session_start();

// msgs echos messages set in sessions, and clears them from the session.
function msgs(){
	if(isset($_SESSION["messages"])) {
		$msgs = explode(":", $_SESSION["messages"]);
		foreach($msgs as $msg) {
			switch($msg) {
			case "login":
				echo "Login succesfull";
				break;
			case "logout":
				echo "Logout succesfull";
				break;
			case "changedpass":
				echo "Password changed succesfully";
				break;
			case "nopermission":
				echo "You currently have not got permission to the requested";
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
