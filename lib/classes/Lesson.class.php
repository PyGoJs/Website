<?php
require_once("Schedule.class.php");

class Lesson {
	private $id = 0;
	private $cid = 0;
	private $maxStus = 0;
	private $amntStus = 0;
	private $yrWk = 0;
	private $sched;

	// private $schedItem;
	
	public function fetch($sqlEnd, $args) {
		global $db;

		$stmt = $db->prepare("SELECT s.id, s.day, s.start, s.end, s.description, s.facility, s.staff, 
			l.id AS lid, l.cid, l.max_students FROM schedule_item AS s, lesson AS l " . $sqlEnd . ";");
		// WHERE l.cid = ? AND l.yearweek = ? AND l.siid = s.id
		$stmt->execute($args);

		$rows = $stmt->fetchAll();
	
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

	public function getId() {
		return $this->id;
	}

	public function getCid() {
		return $this->cid;
	}

	public function getMaxStus() {
		return $this->maxStus;
	}

	public function getSched() {
		return $this->sched;
	}
}
