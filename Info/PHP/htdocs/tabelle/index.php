<!DOCTYPE html>
<html lang="de">

<head>
   <meta charset="UTF-8">
   <title>Zahlen 1 bis 100</title>
   <style>
      .bold-red {
         font-weight: bold;
         color: red;
      }
   </style>
</head>

<body>
   <?php
   echo "<h3>Pure PHP</h3>";
   $json = file_get_contents('personen.json') ? file_get_contents('personen.json') : [];
   $personen = json_decode($json, true);


   echo "<table border='1'>";
   echo "<tr><th>Vorname</th><th>Nachname</th><th>Email</th><th>Telefon</th></tr>";

   foreach ($personen as $key => $person) {
      $rowColor = ($key % 2) ? "#f2f2f2" : "#ffffff";
      echo "<tr style='background-color: $rowColor;'>";
      echo "<td>{$person['name']}</td>";
      echo "<td>{$person['surname']}</td>";
      echo "<td>{$person['email']}</td>";
      echo "<td>{$person['telnr']}</td>";
      echo "</tr>";
   }
   echo "</table>";
   ?>

   <?php
   echo "<br><br><br>";
   echo "<h3>HTML + PHP</h3>";
   ?>
   <table border='1'>
      <tr>
         <th>Vorname</th>
         <th>Nachname</th>
         <th>Email</th>
         <th>Telefon</th>
      </tr>
      <?php
      $json = file_get_contents('personen.json');
      $personen = json_decode($json, true);

      foreach ($personen as $key => $person) {
         $rowColor = ($key % 2) ? "#f2f2f2" : "#ffffff";
         ?>
         <tr style='background-color: <?php echo $rowColor; ?>;'>
            <td><?php echo $person['name']; ?></td>
            <td><?php echo $person['surname']; ?></td>
            <td><?php echo $person['email']; ?></td>
            <td><?php echo $person['telnr']; ?></td>
         </tr>
         <?php
      }
      ?>
   </table>
</body>

</html>

</html>