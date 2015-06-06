<?php

class Teacher {
	private $id = "";
	private $name = "";
	private $schedName = ""; // The (abbreviated) name used in schedules (schedule_item) as staffs.

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

	public static function fetch($sqlEnd, $args) {
		global $db;

		$stmt = $db->prepare("SELECT id, name, schedname FROM teacher " . $sqlEnd . ";");
		$stmt->execute($args);

		$rows = $stmt->fetchAll();

		$teachers = array();
		foreach($rows as $row) {
			$teacher = new Teacher();
			$teacher->id = $row["id"];
			$teacher->name = $row["name"];
			$teacher->schedName = $row["schedname"];
			$teachers[] = $teacher;
		}

		return $teachers;
	}

	public function getName() {
		return $this->name;
	}

	public function getSchedName() {
		return $this->schedName;
	}
}
