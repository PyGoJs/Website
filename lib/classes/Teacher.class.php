<?php

class Teacher {
	private $id = "";
	private $name = "";

	public static function fetchByCid($cid) {
		global $db;

		$stmt = $db->prepare("SELECT t.id, t.name FROM teacher AS t, mentor AS m WHERE m.cid = ? AND m.tid = t.id LIMIT 10;");
		$stmt->execute(array($cid));

		$rows = $stmt->fetchAll();

		$mentors = array();
		foreach($rows as $row) {
			$mentor = new Teacher();
			$mentor->id = $row["id"];
			$mentor->name = $row["name"];
			$mentors[] = $mentor;
		}

		return $mentors;
	}

	public function getName() {
		return $this->name;
	}
}
