<?php
if (!isset($_GET['username']) || empty($_GET['username'])) {
   die("Fehlender Benutzername.");
}
$username = $_GET['username'];
$hashedUsername = hash('sha256', $_GET['username']);

initTable($hashedUsername);
$tuple = loadNotes($hashedUsername);
$note = $tuple[0];
$lastModified = $tuple[1];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
   if (isset($_POST['note'])) {
      try {
         $db = new SQLite3('/Applications/XAMPP/xamppfiles/htdocs/notes/notes.db');

         $stmt = $db->prepare('UPDATE notes SET note = :note, last_modified = :last_modified WHERE username = :username');
         $stmt->bindValue(':username', $hashedUsername, SQLITE3_TEXT);
         $stmt->bindValue(':note', $_POST['note'], SQLITE3_TEXT);
         $stmt->bindValue(':last_modified', date('Y-m-d H:i:s'), SQLITE3_TEXT);
         $stmt->execute();

         $stmt->close();
         $db->close();

         $tuple = loadNotes($hashedUsername);
         $note = $tuple[0];
         $lastModified = $tuple[1];
      } catch (Exception $e) {
         echo 'Connection failed: ' . $e->getMessage();
      }
   }
}

function loadNotes($username): array
{
   $db = new SQLite3('/Applications/XAMPP/xamppfiles/htdocs/notes/notes.db');

   $stmt = $db->prepare('SELECT note, last_modified FROM notes WHERE username = :username');
   $stmt->bindValue(':username', $username, SQLITE3_TEXT);
   $result = $stmt->execute();

   if (isset($result)) {
      $row = $result->fetchArray();
      $res = [];

      $res[0] = $row['note'];
      $res[1] = $row['last_modified'];

      $result->finalize();
      $stmt->close();
      $db->close();

      return $res;
   } else {
      $res = [];
      $res[0] = "";
      $res[1] = "";

      $stmt->close();
      $db->close();

      return $res;
   }

}

function initTable($username)
{
   $db = new SQLite3('/Applications/XAMPP/xamppfiles/htdocs/notes/notes.db');

   $stmt = $db->prepare('CREATE TABLE if not exists notes (id INTEGER PRIMARY KEY, username TEXT unique, note TEXT, last_modified TEXT)');
   $stmt->execute();

   $stmt = $db->prepare('SELECT COUNT(*) as count FROM notes WHERE username = :username');
   $stmt->bindValue(':username', $username, SQLITE3_TEXT);
   $result = $stmt->execute();
   $row = $result->fetchArray();

   if ($row['count'] == 0) {
      $stmt = $db->prepare('INSERT INTO notes (username, note, last_modified) VALUES (:username, "", :last_modified)');
      $stmt->bindValue(':username', $username, SQLITE3_TEXT);
      $stmt->bindValue(':last_modified', date('Y-m-d H:i:s'), SQLITE3_TEXT);
      $stmt->execute();
   }

   $stmt->close();
   $db->close();
}
?>

<!DOCTYPE html>
<html lang="de">

<head>
   <meta charset="UTF-8">
   <title>Online-Notizbuch</title>
   <link rel="stylesheet" href="notes.css">
</head>

<body>
   <div class="note-container">
      <h1>Notizbuch für <?php echo $username; ?></h1>
      <p>Letzte Änderung: <?php echo $lastModified; ?></p>
      <form method="post">
         <textarea name="note" rows="10" cols="30"><?php echo $note; ?></textarea>
         <br>
         <input type="submit" value="Speichern">
      </form>
   </div>
</body>

</html>