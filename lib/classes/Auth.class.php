<?php

class Auth {

	const TYPE_STUDENT = 1;
	const TYPE_TEACHER = 2;
	const TYPE_ADMIN   = 3;

	private $loggedIn = false;

	private $id = 0;
	private $type = 0;
	private $login = "";
	private $sid = 0;
	private $tid = 0;

	// loggedin returns a boolean which is true if a user is loggedin.
	// checkSession should be called before this function can return true.
	/*public function loggedin() {
		return $this->loggedIn;
	}*/
	
	// login returns a boolean which is true if a the given username and password are valid.
	// And if true, the login session is also created.
	public function login($login, $pass) {
		global $db;

		// Validate login
		$stmt = $db->prepare("SELECT id, password FROM account WHERE login=:login LIMIT 1;");
		$stmt->bindValue(":login", $login);
		//$stmt->bindValue(":pass", $pass);
		$stmt->execute();
		$row = $stmt->fetch();

		if(!isset($row["id"])) {
			return false;
		}

		// Verify the password.
		if($row["password"] != "" && !password_verify($pass, $row["password"])) {
			return false;
		}

		$_SESSION["login_id"] = $row["id"];
		$this->loggedIn = true;
		return true;
	}

	// logout stops the current session.
	public function logout() {
		unset($_SESSION["login_id"]);
	}

	// fetch gets account information from the database.
	// Key van be either 'id' or 'login', value should be the value of the key.
	public function fetch($key, $value) {
		global $db;

		$bindVal;
		$field;

		switch($key) {
		case "id":
			$bindVal = intval($value);
			$field = "id";
		case "login":
			$bindVal = $value;
			$field = "login";
		}

		$stmt = $db->prepare("SELECT id, sid, type, login FROM account WHERE " . $field . "=? LIMIT 1;");
		$stmt->execute(array($bindVal));
		$row = $stmt->fetch();

		if(!$row) {
			return false;
		}

		$this->id = $row["id"];
		$this->sid = $row["sid"];
		$this->type = $row["type"];
		$this->login = $row["login"];


		return true;
	}

	// getUserData returns an array containing information about the loggedin user.
	// id, login
	// No checks are made to determine if a user is logged in.
	/*public function getUserData() {
		return array(
			"id" => $this->id, 
			"login" => $this->login,
			"type" => $this->type
		);
	}*/

	// checkSession returns a boolean which is true if a user is currently logged in.
	// If it has not already been called, and a session exists, user information is queried from the database.
	public function checkSession() {
		global $db;

		// Don't get user data again, if it has already been done.
		if($this->loggedIn) {
			return true;
		}

		if(!isset($_SESSION["login_id"])) {
			return false;
		}

		$id = $_SESSION["login_id"];

		// Get the user data from the database.
		$stmt = $db->prepare("SELECT sid, tid, type, login FROM account WHERE id=:id LIMIT 1;");
		$stmt->bindValue(":id", $id);
		$stmt->execute();
		$row = $stmt->fetch();

		// No user for the session login_id was found.
		if(count($row) == 0) {
			$this->logout();
			return false;
		}

		// Set private variables with information from database.
		$this->id = $id;
		$this->type = $row["type"];
		$this->login = $row["login"];
		$this->sid = $row["sid"];
		$this->tid = $row["tid"];

		$this->loggedIn = true;

		return true;
	}

	// checkPassword takes a string returns a boolean which is true if the string is the users password.
	public function checkPassword($pass) {
		global $db;

		if(!$this->loggedIn) {
			return false;
		}

		$stmt = $db->prepare("SELECT password FROM account WHERE id=? LIMIT 1;");
		$stmt->execute(array($this->id));
		$row = $stmt->fetch();

		if(!isset($row["password"])) {
			var_dump($row);
			echo $this->id;
			return false;
		}
		
		if($row["password"] != "" && !password_verify($pass, $row["password"])) {
			return false;
		}

		return true;
	}

	// changePassword
	public function changePassword($newPass) {
		global $db;

		if($this->id <= 0) {
			return false;
		}

		$opts = [
			"cost" => 10
		];
		$hash = password_hash($newPass, PASSWORD_DEFAULT, $opts);

		try {
			$stmt = $db->prepare("UPDATE account SET password=? WHERE id=? LIMIT 1;");
			$stmt->execute(array($hash, $this->id));
		} catch(PDOException $e) {
			echo $e;
		}

		return true;
	}

	// Getters

	public function getId() {
		return $this->id;
	}

	public function getSid() {
		return $this->sid;
	}

	public function getTid() {
		return $this->tid;
	}

	public function getLogin() {
		return $this->login;
	}

	public function getType() {
		return $this->type;
	}
}
