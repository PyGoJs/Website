<?php
require_once("Schedule.class.php");

class Lesson {
	private $id = 0;
	private $cid = 0;
	private $maxStus = 0;
	private $amntStus = -1;
	private $yrWk = 0;
	private $sched;

	// private $schedItem;
	
	public static function fetch($sqlEnd, $args, $extraTable = "") {
		global $db;

		$sql = "SELECT s.id, s.day, s.start, s.end, s.description, s.facility, s.staff, 
				l.id AS lid, l.cid, l.max_students FROM schedule_item AS s, lesson AS l " . $extraTable . " " . $sqlEnd . ";";

		try {
			$stmt = $db->prepare($sql);
			// WHERE l.cid = ? AND l.yearweek = ? AND l.siid = s.id
			$stmt->execute($args);

			$rows = $stmt->fetchAll();
		} catch(Exception $e) {
			echo $e->getMessage();
			return;
		}
	
		$lessons = array();
		foreach($rows as $row) {
			$lesson = new Lesson();

			$lesson->id = $row["lid"];
			$lesson->cid = $row["cid"];
			$lesson->maxStus = $row["max_students"];
			$lesson->sched = new SchedItem($row);

			$lessons[] = $lesson;
		}

		return $lessons;
	}

	private function fetchAmntStus() {
		global $db;

		$sql = "SELECT COUNT(id) AS amnt FROM attendee WHERE lid=?;";

		try {
			$stmt = $db->prepare($sql);
			$stmt->execute(array($this->id));

			$row = $stmt->fetch();

			$this->amntStus = $row["amnt"];
		} catch(PDOException $e) {
			echo $e->getMessage();
		}
	}

	public function getId() {
		return $this->id;
	}

	public function getCid() {
		return $this->cid;
	}

	public function getMaxStus() {
		return $this->maxStus;
	}

	// getAmntStus returns the amount of students ('attendees') that have ever
	// attended this lesson. Attendees that didn't make it to the end of the class (attent=0)
	// are still counted.
	public function getAmntStus() {
		if($this->amntStus < 0) {
			$this->fetchAmntStus();
		}
		return $this->amntStus;
	}

	public function getSched() {
		return $this->sched;
	}

	
}
