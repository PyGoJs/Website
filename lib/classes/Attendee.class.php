<?php
require_once("Student.class.php");
require_once("AttItem.class.php");

class Attendee {

	private $id = 0;
	private $attent = false;
	private $items = array();
	private $stu;

	public static function fetch($sqlEnd, $args) {
		global $db;

		try {

			$stmt = $db->prepare("SELECT attendee.id AS aid, attendee.attent, student.id AS sid, student.name, student.rfid FROM student, attendee " . $sqlEnd);
			

			$stmt->execute($args);

			$rows = $stmt->fetchAll();

		} catch(PDOException $e) {
			echo $e->getMessage();
		}
		
		$atts = array();
		foreach($rows as $row) {
			$att = new Attendee();
			$att->id = (isset($row["aid"])) ? $row["aid"] : 0;
			$att->attent = (isset($row["attent"]) && $row["attent"] == 1) ? true : false;
			$att->items = AttItem::fetch($att->id);
			$att->stu = new Student($row);

			$atts[] = $att;
		}

		return $atts;
	}

	public function getId() {
		return $this->id;
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
