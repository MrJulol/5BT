<?php

$logFile = 'access.log';
$rateLimit = 10;
$timeWindow = 10;
$blockDuration = 10;

$clientIp = $_SERVER['REMOTE_ADDR'];
$currentTimestamp = time();
$userIdentifier = hash('md5', $clientIp . $_SERVER['HTTP_USER_AGENT']);


$logEntry = "$currentTimestamp $clientIp $userIdentifier\n";
file_put_contents($logFile, $logEntry, FILE_APPEND);


$logData = file_exists($logFile) ? file($logFile) : [];

$requestCount = 0;
$isBlocked = false;

foreach ($logData as $logEntry) {
   list($timestamp, $ip, $identifier) = explode(' ', trim($logEntry));
   if ($identifier === $userIdentifier) {
      if ($currentTimestamp - $timestamp < $blockDuration && $requestCount >= $rateLimit) {
         $isBlocked = true;
         break;
      }
      if ($currentTimestamp - $timestamp < $timeWindow) {
         $requestCount++;
      }
   }
}

if ($isBlocked) {
   http_response_code(429);
   echo "Zu viele Anfragen. Bitte versuchen Sie es später erneut.";
   exit;
}

if ($requestCount >= $rateLimit) {
   http_response_code(429);
   echo "Zu viele Anfragen. Bitte versuchen Sie es später erneut.";
   exit;
}

echo "Willkommen auf der Startseite!";

?>