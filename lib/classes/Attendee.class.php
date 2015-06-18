<?php
require_once("Student.class.php");
require_once("AttItem.class.php");

class Attendee {

	private $id = 0;
	private $lid = 0;
	private $attent = false;
	private $items = array();
	private $stu;

	public static function fetch($sqlEnd, $args) {
		global $db;

		try {
			$stmt = $db->prepare("SELECT attendee.id AS aid, attendee.lid, attendee.attent, student.id AS sid, student.name, student.rfid FROM student, attendee " . $sqlEnd);

			$stmt->execute($args);

			$rows = $stmt->fetchAll();

		} catch(PDOException $e) {
			echo $e->getMessage();
		}
		
		$atts = array();
		foreach($rows as $row) {
			$att = new Attendee();
			$att->id = (isset($row["aid"])) ? $row["aid"] : 0;
			$att->lid = (isset($row["lid"])) ? $row["lid"] : 0;
			$att->attent = (isset($row["attent"]) && $row["attent"] == 1) ? true : false;
			$att->items = AttItem::fetch($att->id);
			$att->stu = new Student($row);

			$atts[] = $att;
		}

		return $atts;
	}

	public function createItem($minute) {
		global $db;

		$minute = $minute * -1;

		$type = ($this->attent == 0) ? true : false;

		try {
			$stmt = $db->prepare("INSERT INTO attendee_item (aid, type, mins_early) VALUES (?, ?, ?);");
			$stmt->execute(array($this->id, $type, $minute));

			$stmt2 = $db->prepare("UPDATE attendee SET attent = ? WHERE id = ?;");
			$stmt2->execute(array($type, $this->id));
		} catch(PDOException $e) {
			echo $e->getMessage();
		}
	}

	public function getId() {
		return $this->id;
	}

	public function getLid() {
		return $this->lid;
	}

	public function getAttent() {
		return $this->attent;
	}

	public function getStu() {
		return $this->stu;
	}
	
	public function getItems() {
		return $this->items;
	}

}
