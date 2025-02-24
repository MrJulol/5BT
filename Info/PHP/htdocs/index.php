<!DOCTYPE html>
<html lang="en">

<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Übung Links</title>
   <link rel="stylesheet" href="index.css">
</head>

<body>
   <header>
      <img src="https://docs.fallout.school/_data/2425php-programmierung/images/php_elephpant.svg" alt="phpElephant">
      <h1>PHP-Übungen</h1>
   </header>

   <section>
      <?php
      $jsonData = file_get_contents('index.json');
      $links = json_decode($jsonData, true);
      ?>
      <table>
         <thead>
            <tr>
               <th>INDEX</th>
               <th>NAME</th>
               <th>URL</th>
               <th>DONE</th>
            </tr>
         </thead>
         <tbody>
            <?php foreach ($links as $link): ?>
               <tr>
                  <td class="index"><?php echo $link['index']; ?></td>
                  <td><?php echo $link['name']; ?></td>
                  <td><a href="<?php echo $link['url']; ?>"><?php echo $link['url']; ?></a>
                  </td>
                  <td class="done"><input type="checkbox" <?php echo $link['done'] ? 'checked' : ''; ?> disabled></td>
               </tr>
            <?php endforeach; ?>
         </tbody>
      </table>
   </section>
</body>

</html>