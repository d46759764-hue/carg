<?php

include __DIR__ . '/templates/header.php';


require_once __DIR__ . '/Router.php';

$router = new Router();

$router->get('/', 'landing');
$router->get('/login', 'login');
$router->get('/logout', 'logout');
$router->get('/dashboard', 'dashboard');
$router->get('/cargaisons', 'cargaisons');
$router->get('/lister-cargaison', 'lister-cargaison');
$router->get('/creation-cargaison', 'creation-cargaison');
$router->get('/enregistrement-colis', 'enregistrement-colis');
$router->get('/outils-gestionnaire', 'outils-gestionnaire');

$router->dispatch();

// include __DIR__ . '/templates/footer.php';
?>

<script></script>


