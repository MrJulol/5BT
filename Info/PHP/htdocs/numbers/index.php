<!DOCTYPE html>
<html lang="en">

<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Numbers</title>
   <style>
      .bold-red {
         font-weight: bold;
         color: red;
      }
   </style>
</head>

<body>
   <?php
   for ($i = 1; $i <= 100; $i++) {
      if ($i % 10 == 0) {
         echo "<span class='bold-red'>$i</span><br>";
      } elseif ($i < 10) {
         echo "<span>$i </span>";
      } else {
         echo "<span>$i </span>";
      }
   }
   ?>
</body>

</html>