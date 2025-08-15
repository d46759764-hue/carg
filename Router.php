<?php

class Router {
    private array $routes = [];

    public function get(string $path, string $view) {
        $this->routes[$path] = $view;
    }

    public function dispatch() {
        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $view = $this->routes[$path] ?? '404';

        $file = __DIR__ . '/views/' . $view . '.php';
        
        if (file_exists($file)) {
            ob_start();
            require $file;
            echo ob_get_clean();
        } else {
            http_response_code(404);
            echo "Page non trouvée";
        }
    }
}
