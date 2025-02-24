<?php
session_start();

$languages = ['de', 'it', 'en'];
$requestUri = $_SERVER['REQUEST_URI'];
$requestUri = trim($requestUri, '/');
$uriParts = explode('/', $requestUri);
//ignore the first part of the uri => IS /router
$cookielang = $_COOKIE['language'] ?? $_SESSION['language'];
$language = $uriParts[1] ?? $cookielang;
$page = $uriParts[2] ?? 'home';

if (!in_array($language, $languages)) {
   header("HTTP/1.0 404 Not Found");
   include 'languagenotfound.html';
   exit;
}

$_SESSION['language'] = $language;
setcookie('language', $language, time() + (60 * 60 * 24 * 30), "/");

$fileToInclude = "{$language}/{$page}_{$language}.php";

if (!file_exists($fileToInclude)) {
   header("HTTP/1.0 404 Not Found");
   include 'notfound.html';
   exit;
}

include $fileToInclude;
?>