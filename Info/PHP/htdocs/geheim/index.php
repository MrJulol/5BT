<?php

$geheimcode = [
   'Montag' => 'Baumhaus',
   'Dienstag' => 'Ventilator',
   'Mittwoch' => 'Unterricht',
   'Donnerstag' => 'Behördenwegweiser',
   'Freitag' => 'Fahrradschloss',
   'Samstag' => 'Kettenschaltung',
   'Sonntag' => 'Montag',
   'Wirtschaftsinformatik' => 'Freude',
   'Deutsch' => 'Brezeln',
   'Mathematik' => 'Kaugummi'
];


function entschluesseln($nachricht, $geheimcode): array|string
{
   return str_replace(search: array_values(array: $geheimcode), replace: array_keys(array: $geheimcode), subject: $nachricht);
}


function verschluesseln($nachricht, $geheimcode): array|string
{
   return str_replace(search: array_keys($geheimcode), replace: array_values(array: $geheimcode), subject: $nachricht);
}


$nachricht_entschluesseln = "Letzten Behördenwegweiser hatten wir Kaugummi, das war anstrengend. Zum Glück blieb dann nur noch der Fahrradschloss. Kettenschaltung und Montag konnte ich mich nicht richtig entspannen, denn Baumhaus erwartet uns schon wieder Freude. Naja ... besser als Brezeln.";

$nachricht_verschluesseln = "Am Freitag haben wir Mathematik, am Dienstag ebenfalls. Mein Lieblingsfach ist Deutsch, das wir leider nur am Mittwoch haben. Am meisten freue ich mich immer darauf, wenn ich am Sonntag Wirtschaftsinformatik lernen darf.";


echo "<strong>Originale Nachricht:</strong> " . $nachricht_entschluesseln . "<br><br>";
echo "<strong>Entschlüsselte Nachricht:</strong> " . entschluesseln(nachricht: $nachricht_entschluesseln, geheimcode: $geheimcode) . "<br>";

echo "<br>";
echo "<br>";

echo "<strong>Originale Nachricht:</strong> " . $nachricht_verschluesseln . "<br><br>";
echo "<strong>Verschlüsselte Nachricht:</strong> " . verschluesseln(nachricht: $nachricht_verschluesseln, geheimcode: $geheimcode) . "<br>";