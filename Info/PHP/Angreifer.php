<?php

class Angreifer extends Spieler
{
   function jogTraining()
   {
      echo "$this->name: Im Jogging";
   }
   public function __construct($name)
   {
      $this->name = $name;
   }
}