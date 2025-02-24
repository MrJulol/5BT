<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
   $username = hash('sha256', $_POST['username']);
   $password = hash('sha256', $_POST['password']);

   $db = new SQLite3('/Applications/XAMPP/xamppfiles/htdocs/notes/notes.db');

   $db->exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");

   $stmt = $db->prepare("INSERT INTO users (username, password) VALUES (:username, :password)");
   $stmt->bindValue(':username', $username, SQLITE3_TEXT);
   $stmt->bindValue(':password', $password, SQLITE3_TEXT);

   if ($stmt->execute()) {
      echo '<script>
         alert("User registered");
         window.location.href = "/notes/login/login.php";
      </script>';
   } else {
      $alert = "Error: " . $db->lastErrorMsg();
      echo "<script>alert($alert)</script>";
   }

   $stmt->close();
   $db->close();
}
?>

<!DOCTYPE html>
<html>

<head>
   <title>Register</title>
   <link rel="stylesheet" href="register.css">
</head>

<body>
   <div class="container">
      <h2>Register</h2>
      <form method="post" action="">
         <label for="username">Username:</label>
         <input type="text" id="username" name="username" required><br><br>
         <label for="password">Password:</label>
         <input type="password" id="password" name="password" required><br><br>
         <input type="submit" value="Register">
      </form>
   </div>
</body>

</html>