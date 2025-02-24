<?php

class Fabrik
{

   private int $standort;
   private int $mitarbeiterAnzahl;


   public function __construct(int $standort, int $mitarbeiterAnzahl)
   {
      $this->standort = $standort;
      $this->mitarbeiterAnzahl = $mitarbeiterAnzahl;
   }


   public function produktHerstellen(): void
   {
      echo "Neues Produkt hergestellt!<br>";
   }


   public function mitarbeiterAnzahlAendern(int $neueAnzahl): void
   {
      $this->mitarbeiterAnzahl = $neueAnzahl;
      echo "Die Mitarbeiteranzahl wurde auf $neueAnzahl geändert.<br>";
   }


   public function standortAusgeben(): void
   {
      echo "Der Standort der Fabrik ist $this->standort.<br>";
   }
}


$neueFabrik = new Fabrik(101, 50); 


$neueFabrik->produktHerstellen();
$neueFabrik->mitarbeiterAnzahlAendern(75);
$neueFabrik->standortAusgeben();

