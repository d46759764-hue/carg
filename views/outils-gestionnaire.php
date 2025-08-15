<?php include __DIR__ . '/../templates/navigation.php'; ?>

<!-- Section: Outils Gestionnaire -->
<section id="outils-gestionnaire" class="py-16 bg-gray-800/50 pt-32">
<div class="container mx-auto px-6">
    <div class="text-center mb-12">
        <div class="inline-block p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/30 mb-4"><i class="fas fa-tools text-3xl text-cyan-400"></i></div>
        <h2 class="text-4xl font-bold mb-4 text-white">Outils <span class="text-cyan-400">Gestionnaire</span></h2>
        <p class="text-gray-400 text-lg">Recherchez et gérez les colis et cargaisons</p>
    </div>
    <div class="max-w-4xl mx-auto space-y-12">
        <!-- Recherche de Colis par Code -->
        <div class="bg-gray-800 rounded-3xl p-8 border border-cyan-500/20 hover:border-cyan-400 transition-colors duration-300">
            <h3 class="text-xl font-bold text-cyan-400 mb-6"><i class="fas fa-barcode mr-2"></i> Rechercher un Colis par Code</h3>
            <div class="space-y-4">
                <div>
                    <label for="search-package-code" class="block text-gray-300 font-semibold mb-2">Code du Colis</label>
                    <input type="text" id="search-package-code" name="search-package-code" placeholder="Entrez le code du colis" class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none">
                </div>
                <button id="search-package-btn" class="w-full py-3 bg-cyan-500 hover:bg-cyan-600 rounded-xl text-white font-semibold transition-colors duration-300 shadow-lg shadow-cyan-500/25"><i class="fas fa-search mr-2"></i> Rechercher Colis</button>
                <!-- Placeholder pour le résultat de la recherche de colis (normalement géré par JS) -->
                <div class="mt-6 p-4 bg-gray-700 rounded-lg border border-cyan-600/30 hidden" id="package-search-result">
                    <h4 class="text-lg font-bold text-cyan-300 mb-3">Colis trouvé: <span class="text-white" id="package-search-result-code"></span></h4>
                    <p class="text-gray-300"><span class="font-semibold">État:</span> <span class="text-blue-400" id="package-search-result-status"></span></p>
                    <p class="text-gray-300"><span class="font-semibold">Cargaison:</span> <span id="package-search-result-cargo"></span></p>
                    <div class="mt-4 flex flex-wrap gap-3">
                        <button class="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white text-sm font-semibold"><i class="fas fa-check-circle mr-1"></i> Marquer Récupéré</button>
                        <button class="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white text-sm font-semibold"><i class="fas fa-times-circle mr-1"></i> Marquer Perdu</button>
                        <button class="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white text-sm font-semibold"><i class="fas fa-archive mr-1"></i> Archiver Manuellement</button>
                        <select class="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white text-sm font-semibold focus:outline-none">
                            <option value="">Changer État</option>
                            <option value="en-attente">En attente</option>
                            <option value="en-cours">En cours</option>
                            <option value="arrive">Arrivé</option>
                            <option value="recupere">Récupéré</option>
                            <option value="perdu">Perdu</option>
                            <option value="archive">Archivé</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <!-- Recherche de Cargaison -->
       
    </div>
</div>
</section>
