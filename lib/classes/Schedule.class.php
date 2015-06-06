<?php

class SchedItem {
	private $id = 0;
	private $day = 0;
	private $start = 0;
	private $end = 0;
	private $desc = "";
	private $facility = "";
	private $staff = "";

	public function __construct($row) {
		if(is_array($row)) {
			$this->id = (isset($row["id"])) ? $row["id"] : "";
			$this->day = (isset($row["day"])) ? $row["day"] : "";
			$this->start = (isset($row["start"])) ? $row["start"] : 0;
			$this->end = (isset($row["end"])) ? $row["end"] : 0;
			$this->desc = (isset($row["description"])) ? $row["description"] : "";
			$this->facility = (isset($row["facility"])) ? $row["facility"] : "";
			$this->staff = (isset($row["staff"])) ? $row["staff"] : "";
		}
	}

	public function getId() {
		return $this->id;
	}

	public function getDay() {
		return $this->day;
	}

	public function getStart() {
		return $this->start;
	}

	public function getEnd() {
		return $this->end;
	}

	public function getStartStr() {
		$min = $this->start % 3600 / 60;
		return floor($this->start / 60 / 60) . ":" . 
			(($min < 10) ? "0":"") . $min;
	}

	public function getEndStr() {
		$min = $this->end % 3600 / 60;
		return floor($this->end / 60 / 60) . ":" . 
			(($min < 10) ? "0":"") . $min;
			

	}

	public function getDesc() {
		return $this->desc;
	}

	public function getFacility() {
		return $this->facility;
	}

	public function getStaff() {
		return $this->staff;
	}
}
