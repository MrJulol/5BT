<?php
include 'Spieler.php';
include 'Goalie.php';
include 'Angreifer.php';
include 'Verteidiger.php';
class Mannschaft
{
   private $Goalie;
   private $Attack = [];
   private $Defense = [];
   public function __construct()
   {
      $this->Goalie = new Goalie("GOALIE", 190);
      for ($player = 0; $player < 16; $player++) {
         $this->Attack[] = new Angreifer("Attacker $player");
      }
      for ($player = 0; $player < 4; $player++) {
         $this->Defense[] = new Verteidiger("Verteidiger $player");
      }
   }

   function present()
   {
      echo "MANNSCHAFT:\n";
      $this->Goalie->showname($this->Goalie->name . "\n");
      foreach ($this->Attack as $player) {
         $player->showname($player->name . "\n");
         $player->jogTraining();
      }
      foreach ($this->Defense as $player) {
         $player->showname($player->name . "\n");
      }
   }

}
$t = new Mannschaft();

$t->present();