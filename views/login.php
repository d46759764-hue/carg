<?php
session_start();

$username = strtolower(trim($_POST['username'] ?? ''));
$password = trim($_POST['password'] ?? '');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (empty($username) || empty($password)) {
        $error_message = "Veuillez remplir tous les champs.";
    } else {
        // URL du json-server
        $url = "http://localhost:3000/gestionnaire?username=" . urlencode($username);

        // Créer un contexte avec timeout
        $context = stream_context_create([
            'http' => [
                'timeout' => 5, // Timeout de 5 secondes
                'method' => 'GET',
                'header' => [
                    'Content-Type: application/json',
                    'User-Agent: PHP'
                ]
            ]
        ]);

        $response = @file_get_contents($url, false, $context);

        if ($response === false) {
            $error_message = "Impossible de se connecter au serveur de données. Veuillez réessayer.";
        } else {
            $data = json_decode($response, true);

            // Vérifier si l'utilisateur existe et que le mot de passe correspondent
            if (!empty($data) && isset($data[0]) && $data[0]['password'] === $password) {
                $_SESSION['gestionnaire'] = $data[0];
                header("Location: /creation-cargaison");
                exit;
            } else {
                $error_message = "Nom d'utilisateur ou mot de passe incorrect.";
            }
        }
    }
}
?>

<section class="flex items-center justify-center min-h-screen bg-gray-900 py-16">
  <div class="max-w-md w-full bg-gray-800 rounded-3xl p-8 border border-cyan-500/20 shadow-lg shadow-cyan-500/10">
      <div class="text-center mb-8">
          <div class="inline-block p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/30 mb-4">
              <i class="fas fa-user-shield text-3xl text-cyan-400"></i>
          </div>
          <h2 class="text-4xl font-bold mb-2 text-white">Connexion <span class="text-cyan-400">Gestionnaire</span></h2>
          <p class="text-gray-400 text-lg">Accédez à votre tableau de bord</p>
      </div>

      <?php if (isset($error_message)): ?>
      <div class="mb-6 p-4 bg-red-900/30 rounded-lg border border-red-500/30">
          <p class="text-red-400 text-center" id="login-error"><i class="fas fa-exclamation-triangle mr-2"></i><?php echo htmlspecialchars($error_message); ?></p>
      </div>
      <?php endif; ?>

   <form class="space-y-6" action="" method="POST" id="login-form">
    <div>
        <label for="username" class="block text-cyan-400 font-semibold mb-2">Nom d'utilisateur</label>
        <input type="text" id="username" name="username" placeholder="Votre nom d'utilisateur"
               class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
               value="<?php echo htmlspecialchars($_POST['username'] ?? ''); ?>" required>
    </div>

    <div>
        <label for="password" class="block text-cyan-400 font-semibold mb-2">Mot de passe</label>
        <input type="password" id="password" name="password" placeholder="Votre mot de passe"
               class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300" required>
    </div>

    <button type="submit" id="login-btn"
            class="w-full py-4 bg-cyan-500 hover:bg-cyan-600 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
        <span id="btn-text"><i class="fas fa-sign-in-alt mr-2"></i> Se Connecter</span>
        <span id="btn-spinner" style="display: none;">
            <i class="fas fa-spinner fa-spin mr-2"></i> Connexion...
        </span>
    </button>
</form>

      <div class="text-center mt-6">
          <p class="text-gray-500 text-sm">
              <a href="/" class="hover:text-cyan-400 transition-colors duration-300">
                  <i class="fas fa-arrow-left mr-1"></i> Retour à l'accueil
              </a>
          </p>
          <p class="text-gray-500 text-sm mt-2">
              <a href="#" class="hover:text-cyan-400 transition-colors duration-300">Mot de passe oublié?</a>
          </p>
      </div>
  </div>
</section>

<!-- Indicateur de chargement global -->
<div id="loading-overlay" style="display: none;" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-gray-800 rounded-lg p-6 border border-cyan-500/20">
        <div class="flex items-center space-x-3">
            <i class="fas fa-spinner fa-spin text-cyan-400 text-2xl"></i>
            <span class="text-white font-semibold">Connexion en cours patientez...</span>
        </div>
    </div>
</div>

<style>
    /* Animation personnalisée pour le spinner */
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .fa-spin {
        animation: spin 1s linear infinite;
    }
    
    /* Amélioration des effets visuels */
    .focus\:ring-2:focus {
        box-shadow: 0 0 0 2px rgba(34, 211, 238, 0.2);
    }
</style>

<script>
document.getElementById('login-form').addEventListener('submit', function(e) {
    const btnText = document.getElementById('btn-text');
    const btnSpinner = document.getElementById('btn-spinner');
    const loginBtn = document.getElementById('login-btn');
    const loadingOverlay = document.getElementById('loading-overlay');
    
    // Validation côté client
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    if (!username || !password) {
        e.preventDefault();
        alert('Veuillez remplir tous les champs.');
        return;
    }
    
    // Afficher les indicateurs de chargement
    btnText.style.display = 'none';
    btnSpinner.style.display = 'inline-block';
    loginBtn.disabled = true;
    loadingOverlay.style.display = 'flex';
    
    // Timeout côté client (au cas où le serveur ne répond pas)
    const timeoutId = setTimeout(function() {
        // Cacher les indicateurs de chargement après 10 secondes
        btnText.style.display = 'inline-block';
        btnSpinner.style.display = 'none';
        loginBtn.disabled = false;
        loadingOverlay.style.display = 'none';
        
        // Afficher un message d'erreur
        const errorDiv = document.createElement('div');
        errorDiv.className = 'mb-6 p-4 bg-red-900/30 rounded-lg border border-red-500/30';
        errorDiv.innerHTML = '<p class="text-red-400 text-center"><i class="fas fa-exclamation-triangle mr-2"></i>La connexion prend trop de temps. Veuillez vérifier votre connexion internet.</p>';
        
        const form = document.getElementById('login-form');
        form.parentNode.insertBefore(errorDiv, form);
    }, 10000); // 10 secondes
    
    // Nettoyer le timeout si la page se recharge avant
    window.addEventListener('beforeunload', function() {
        clearTimeout(timeoutId);
    });
});

// Masquer les messages d'erreur après 5 secondes
const errorElement = document.getElementById('login-error');
if (errorElement) {
    setTimeout(function() {
        errorElement.parentElement.style.opacity = '0';
        errorElement.parentElement.style.transition = 'opacity 0.5s ease-in-out';
        setTimeout(function() {
            errorElement.parentElement.remove();
        }, 500);
    }, 5000);
}

// Améliorer l'UX avec des effets de focus
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
    
    inputs.forEach(function(input) {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('animate-pulse');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('animate-pulse');
        });
    });
});
</script>