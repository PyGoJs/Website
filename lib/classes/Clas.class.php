<?php

class Clas {
	private $id = 0;
	private $name = "";

	public function fetch($id) {
		global $db;

		$stmt = $db->prepare("SELECT id, name FROM class WHERE id = ? LIMIT 1;");
		$stmt->execute(array($id));

		$row = $stmt->fetch();

		if(!isset($row["name"])) {
			return false;
		}

		$this->id = $row["id"];
		$this->name = $row["name"];

		return true;
	}

	public function getName() {
		return $this->name;
	}
}
