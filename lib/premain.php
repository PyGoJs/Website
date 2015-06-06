<?php
// Connect to the database.
$db;
try {
	$db = new PDO("mysql:host=localhost;dbname=pygojs", "pygojs-website", "temppass");
} catch (PDOException $e) {
	echo "ERROR connecting to database";
	echo $e->getMessage();
	exit;
}
