<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
   $hashedUsername = hash('sha256', $_POST['username']);
   $username = $_POST['username'];
   $password = hash('sha256', $_POST['password']);
   $isValidUser = false;

   try {
      $db = new SQLite3('/Applications/XAMPP/xamppfiles/htdocs/notes/notes.db');

      $stmt = $db->prepare('SELECT * FROM users WHERE username = :username AND password = :password');
      $stmt->bindValue(':username', $hashedUsername, SQLITE3_TEXT);
      $stmt->bindValue(':password', $password, SQLITE3_TEXT);

      $result = $stmt->execute();
      $isValidUser = $result->fetchArray() !== false;

      $result->finalize();
      $stmt->close();
      $db->close();
   } catch (Exception $e) {
      echo 'Connection failed: ' . $e->getMessage();
   }
}
?>
<!DOCTYPE html>
<html lang="de">

<head>
   <meta charset="UTF-8">
   <title>Benutzer-Anmeldung</title>
   <link rel="stylesheet" href="login.css">
   <script>
      function register() {
         window.location.href = "/notes/register/register.php";
      }
   </script>
</head>

<body>
   <div class="login-container">
      <h2>Benutzer-Anmeldung</h2>
      <?php
      if ($isValidUser && isset($username)) {

         header("Location: /notes/notes.php?username=$username");
         exit();
      } else {
         if (!isset($username)) {
            echo "";
         } else {
            echo '<script>alert("Username or Password incorrect")</script>';
         }
      }
      ?>
      <form method="post" action="">
         <label for="username">Benutzername:</label>
         <input type="text" id="username" name="username" required><br><br>
         <label for="password">Passwort:</label>
         <input type="password" id="password" name="password" required><br><br>
         <input type="submit" value="Anmelden">
         <button onclick="register()">Registrieren</button>
      </form>
   </div>
</body>

</html>