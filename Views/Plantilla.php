<?php

$rutasPermitidas = [
  "dashboard",
  "users",
  "salir",
  "category",
  "product",
  "supplier",
  "customer",
  "newsale",
  "listsales",
  "generalsetting",
  "vouchersetting",
  "datebuy",
  "clientdatesales",
  "buy",
  "graphics",
  "editsale",
  "editbuy",
  "salesproduct",
  "purchaseproduct",
  "profile",
  "login"
];

$url = isset($_GET["url"]) ? $_GET["url"] : "";

if ($url === "") {
  include "modules/login.php";
} elseif (in_array($url, $rutasPermitidas)) {
  include "modules/{$url}.php";
} else {
  include "modules/404.php";
}
