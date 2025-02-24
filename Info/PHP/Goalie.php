<?php

class Goalie extends Spieler
{
   public $körpergroese;

   public function __construct($name, $height)
   {
      $this->name = $name;
      $this->körpergroese = $height;
   }
}