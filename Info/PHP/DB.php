<?php

$db = new mysqli('10.10.30.17', 'stthajul', 'Zalter21@21', 'sakila');
echo $db->server_info;

// $erg = $db->query("SELECT * FROM t_test");
// $datensatz = $erg->fetch_all();
// print_r($datensatz);

// $db->query("INSERT INTO t_test (content) VALUES ('FROM PHP')");

// $db->commit();

// $erg = $db->query("SELECT * FROM t_test");
// $datensatz = $erg->fetch_all();
// print_r($datensatz);

// $erg->free();
$db->close();