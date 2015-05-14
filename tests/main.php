<?php
// Make a new instance of Auth.
$auth = new Auth();

// Make it possible to use sessions.
session_start();

function addMsg($msg) {
	if(!isset($_SESSION["messages"])) {
		$_SESSION["messages"] = $msg;
		return;
	}

	$_SESSION["messages"] += ":" + $msg;
}

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
			}
		}
	}
	unset($_SESSION["messages"]);
}
