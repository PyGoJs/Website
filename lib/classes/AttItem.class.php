<?php

class AttItem {

	private $type = 0;
	private $minsEarly = 0;

	public static function fetch($aid) {
		global $db;

		try {
			$stmt = $db->prepare("SELECT type, mins_early FROM attendee_item WHERE aid=? ORDER BY mins_early DESC;");

			$stmt->execute(array($aid));

			$rows = $stmt->fetchAll();

		} catch(PDOException $e) {
			echo $e->getMessage();
			exit;
		}

		$items = array();
		foreach($rows as $row) {
			$item = new AttItem();

			$item->type = $row["type"];
			$item->minsEarly = $row["mins_early"];

			$items[] = $item;
		}

		return $items;
	}

	public function getType() {
		return $this->type;
	}

	public function getMinsEarly() {
		return $this->minsEarly;
	}
}
