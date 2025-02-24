<?php
$rootDir = realpath(__DIR__);
$dir = isset($_GET['dir']) ? realpath($rootDir . '/' . $_GET['dir']) : $rootDir;
if (strpos($dir, $rootDir) !== 0) {
   $dir = $rootDir;
}

$filterMode = false;

$filter = ($filterMode == true) ? function ($file) {
   return ($file === '.' || $file === '..') ? false : true;
} : function ($file) {
   return true;
};

$files = getFiles($dir, $filter);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['fileToUpload'])) {
   $uploadSuccess = true;
   foreach ($_FILES['fileToUpload']['name'] as $key => $name) {
      $targetFile = $dir . '/' . basename($name);
      if (!move_uploaded_file($_FILES['fileToUpload']['tmp_name'][$key], $targetFile)) {
         $uploadSuccess = false;
         break;
      }
   }
   if ($uploadSuccess) {
      echo '<script>alert("Files Uploaded")</script>';
      $files = getFiles($dir, $filter);
   } else {
      echo '<script>alert("Some Files Failed to Upload")</script>';
   }
}

function formatSize($bytes): string
{
   $sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
   $factor = floor((strlen($bytes) - 1) / 3);
   return sprintf("%.2f", $bytes / pow(1024, $factor)) . " " . $sizes[$factor];
}
function getFiles($dir, $filter): array
{
   return array_filter(scandir($dir), $filter);
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
   <meta charset="UTF-8" <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Document</title>
   <link rel="stylesheet" href="browser.css">
</head>

<body>
   <h1><?php echo $dir; ?></h1>
   <ul>
      <?php
      $index = 1;
      foreach ($files as $file) {
         $filePath = $dir . '/' . $file;
         $relativePath = "/browser" . str_replace($rootDir, '', $filePath);
         $displayName = (strlen($file) > 15) ? substr($file, 0, 12) . '...' : $file;
         $relativePath = str_replace($rootDir, '', $filePath);
         if (is_dir($filePath) && $displayName != '..' && $displayName != '.') {
            echo "<li>$index<a href=\"?dir=" . urlencode($relativePath) . "\">[DIR] " . $displayName . "</a><a>Created: " . date("F d Y H:i:s.", filectime($filePath)) . "</a><a>Modified: " . date("F d Y H:i:s.", filemtime($filePath)) . "</a><span>Directory</span></li>";
         } else if (is_dir($filePath) && $displayName == "..") {
            $url = '<a href="javascript:history.go(-1)">[DIR] ..</a>';
            echo "<li>$index $url" . "<a>Created: " . date("F d Y H:i:s.", filectime($filePath)) . "</a><a>Modified: " . date("F d Y H:i:s.", filemtime($filePath)) . "</a><span>Directory</span></li>";
         } else if (is_dir($filePath) && $displayName == ".") {
            $url = '<a href="window.location.reload()">[DIR] .</a>';
            echo "<li>$index $url" . "<a>Created: " . date("F d Y H:i:s.", filectime($filePath)) . "</a><a>Modified: " . date("F d Y H:i:s.", filemtime($filePath)) . "</a><span>Directory</span></li>";
         } else if (preg_match('/\.(jpg|jpeg|png|gif)$/i', $file)) {
            echo "<li>$index<a href=\"" . $relativePath . "\"><img src=\"" . $relativePath . "\" alt=\"" . $displayName . "\" style=\"width:200px;\"></a><a>Created: " . date("F d Y H:i:s.", filectime($filePath)) . "</a><a>Modified: " . date("F d Y H:i:s.", filemtime($filePath)) . "</a><span>" . formatSize(filesize($filePath)) . "</span></li>";
         } else {
            echo "<li>$index<a href=\"" . $relativePath . "\">" . $displayName . "</a><a>Created: " . date("F d Y H:i:s.", filectime($filePath)) . "</a><a>Modified: " . date("F d Y H:i:s.", filemtime($filePath)) . "</a><span>" . formatSize(filesize($filePath)) . "</span></li>";
         }
         $index++;
      }
      ?>
   </ul>
   <form action="" method="POST" enctype="multipart/form-data">
      <label for="fileToUpload" id="fileLabel">Choose files to upload:</label>
      <input type="file" name="fileToUpload[]" id="fileToUpload" multiple>
      <input type="submit" value="Upload Files" name="submit">
   </form>
</body>

</html>