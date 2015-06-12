<?php

class Student {
	private $id = 0;
	private $name = "";
	private $cid = 0;

	public function __construct($row) {
		if(is_array($row)) {
			$this->id = $row["sid"];
			$this->name = $row["name"];
		}
	}

	public function fetch($id) {
		global $db;

		$stmt = $db->prepare("SELECT id, name, cid FROM student WHERE id = ? LIMIT 1;");
		$stmt->execute(array($id));
		$row = $stmt->fetch();

		if(!isset($row["id"])) {
			return false;
		}

		$this->id = $row["id"];
		$this->name = $row["name"];
		$this->cid = $row["cid"];
	}

	public function getCid() {
		return $this->cid;
	}

	public function getName() {
		return $this->name;
	}
}
