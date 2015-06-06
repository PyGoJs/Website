<?php

class Clas {
	private $id = 0;
	private $name = "";

	public static function fetch($sqlEnd, $args) {
		global $db;

		$stmt = $db->prepare("SELECT id, name FROM class " . $sqlEnd . ";");
		$stmt->execute($args);

		$rows = $stmt->fetchAll();

		$classes = array();
		foreach($rows as $row) {
			$class = new Clas();
			$class->id = $row["id"];
			$class->name = $row["name"];
			$classes[] = $class;
		}

		return $classes;
	}

	public function getName() {
		return $this->name;
	}

	public function getId() {
		return $this->id;
	}
}
