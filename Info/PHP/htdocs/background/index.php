<!DOCTYPE html>
<html lang="de">

<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Hintergrundfarbe ändern</title>
   <style>
      body {
         background-color:
            <?php echo isset($_GET['color']) ? $_GET['color'] : 'white'; ?>
         ;
      }

      a {
         margin: 10px;
         padding: 10px;
         text-decoration: none;
         color: white;
      }

      .blue {
         background-color: blue;
      }

      .green {
         background-color: green;
      }

      .red {
         background-color: red;
      }

      .white {
         background-color: white;
         color: black;
      }
   </style>
</head>

<body>
   <h1>Wählen Sie eine Hintergrundfarbe:</h1>
   <a href="?color=blue" class="blue">Blau</a>
   <a href="?color=green" class="green">Grün</a>
   <a href="?color=red" class="red">Rot</a>
   <a href="background.php" class="white">Weiß</a>
</body>

</html>