
<link rel="stylesheet" href="./../styles/navigation.css">
<script src="./../dist/navigation.js" defer></script>

<!-- Navigation -->
<nav class="fixed top-0 w-full z-50 bg-gray-800/95 backdrop-blur-md border-b border-gray-700">
    <div class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center globe-shadow globe-glow">
                    <i class="fas fa-globe-americas text-xl text-white rotating-globe"></i>
                </div>
                <div>
                    <h1 class="text-2xl font-bold text-cyan-400">GP du Monde</h1>
                    <p class="text-gray-400 text-sm">Gestion des Cargaisons</p>
                </div>
            </div>
            <div class="hidden md:flex items-center space-x-6">
                <a href="/creation-cargaison" 
                   class="nav-link text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium"
                   data-page="creation-cargaison">
                   Créer Cargaison
                </a>
                <a href="/enregistrement-colis" 
                   class="nav-link text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium"
                   data-page="enregistrement-colis">
                   Enregistrer un Colis
                </a>
                <a href="/lister-cargaison" 
                   class="nav-link text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium"
                   data-page="lister-cargaison">
                    Voir details cargaison
                </a>
                <a href="/outils-gestionnaire" 
                   class="nav-link text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium"
                   data-page="outils-gestionnaire">
                   Voir details colis
                </a>
                <a href="/logout" 
                   class="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium bg-red-500 border border-red-600 rounded-lg p-2 inline-flex items-center justify-center hover:bg-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 002 2h4a2 2 0 002-2V7a2 2 0 00-2-2h-4a2 2 0 00-2 2v1" />
                    </svg>
                </a>
            </div>
            <button class="md:hidden text-white p-2 hover:bg-gray-700 rounded-lg transition-colors duration-300">
                <i class="fas fa-bars text-xl"></i>
            </button>
        </div>
    </div>
</nav>

