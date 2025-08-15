<?php include __DIR__ . '/../templates/navigation.php';?>

<div class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20 mb-8 mt-12">
    <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center space-x-4">
            <select id="type-filter" class="p-3 bg-gray-700/80 border border-gray-600/50 rounded-xl text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 transition-all">
                <option value="">Tous les types</option>
                <option value="MARITIME">Maritime</option>
                <option value="AERIEN">Aérienne</option>
                <option value="ROUTIER">Routière</option>
            </select>
            <select id="etat-filter" class="p-3 bg-gray-700/80 border border-gray-600/50 rounded-xl text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 transition-all">
                <option value="">Tous les états d'avancement</option>
                <option value="EN_ATTENTE">En attente</option>
                <option value="EN_COURS">En cours</option>
                <option value="ARRIVE">Arrivé</option>
            </select>
            <select id="global-filter" class="p-3 bg-gray-700/80 border border-gray-600/50 rounded-xl text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 transition-all">
                <option value="">Tous les états globaux</option>
                <option value="OUVERT">Ouvert</option>
                <option value="FERME">Fermé</option>
            </select>
        </div>
    </div>
</div>

<!-- Statistiques Rapides -->
<div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
    <div class="bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-400/30 rounded-2xl p-6">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-cyan-300 text-sm font-medium">Total Cargaisons</p>
                <p id="total-cargaison" class="text-white text-2xl font-bold">0</p>
            </div>
            <div class="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                <i class="fas fa-boxes text-cyan-400 text-xl"></i>
            </div>
        </div>
    </div>
    
    <div class="bg-gradient-to-br from-gray-600/20 to-gray-700/10 border border-gray-500/30 rounded-2xl p-6">
        <div class="flex items-center justify-between">
            <div>
                <p id="cargaison-en-cours" class="text-gray-300 text-sm font-medium">Ouvertes</p>
                <p id="cargaison-ouverte" class="text-white text-2xl font-bold">0</p>
            </div>
            <div class="w-12 h-12 bg-gray-500/20 rounded-xl flex items-center justify-center">
                <i class="fas fa-unlock text-gray-400 text-xl"></i>
            </div>
        </div>
    </div>
    
    <div class="bg-gradient-to-br from-cyan-400/20 to-cyan-500/10 border border-cyan-400/30 rounded-2xl p-6">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-cyan-300 text-sm font-medium">En Cours</p>
                <p id="cargaison-enCour" class="text-white text-2xl font-bold">0</p>
            </div>
            <div class="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                <i class="fas fa-shipping-fast text-cyan-400 text-xl"></i>
            </div>
        </div>
    </div>
    
    <div class="bg-gradient-to-br from-gray-500/20 to-gray-600/10 border border-gray-400/30 rounded-2xl p-6">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-gray-300 text-sm font-medium">Fermées</p>
                <p id="cargaison-fermee" class="text-white text-2xl font-bold">0</p>
            </div>
            <div class="w-12 h-12 bg-gray-500/20 rounded-xl flex items-center justify-center">
                <i class="fas fa-lock text-gray-400 text-xl"></i>
            </div>
        </div>
    </div>
</div>

<!-- Table des Cargaisons -->
<div class="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-cyan-500/20 overflow-hidden shadow-2xl">
    <div class="p-6 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/80 to-gray-700/50">
        <div class="flex items-center justify-between">
            <div>
                <h3 class="text-xl font-bold text-white">Cargaisons Récentes</h3>
                <p class="text-gray-400 text-sm mt-1">Gestion et suivi des cargaisons</p>
            </div>
            <div class="flex items-center space-x-2">
                <button class="px-4 py-2 bg-cyan-500/20 text-cyan-400 border border-cyan-400/30 rounded-lg hover:bg-cyan-500/30 transition-all">
                    <i class="fas fa-download mr-2"></i>PDF
                </button>
            </div>
        </div>
    </div>
    
    <div class="overflow-x-auto">
        <table class="w-full">
            <thead class="bg-gray-700/50">
                <tr>
                    <th class="text-left p-4 text-cyan-400 font-semibold border-b border-gray-600/30">
                        <div class="flex items-center space-x-2">
                            <span>Numéro</span>
                            <i class="fas fa-sort text-xs opacity-50"></i>
                        </div>
                    </th>
                    <th class="text-left p-4 text-cyan-400 font-semibold border-b border-gray-600/30">
                        <div class="flex items-center space-x-2">
                            <span>Type</span>
                            <i class="fas fa-sort text-xs opacity-50"></i>
                        </div>
                    </th>
                    <th class="text-left p-4 text-cyan-400 font-semibold border-b border-gray-600/30">Trajet</th>
                    <th class="text-left p-4 text-cyan-400 font-semibold border-b border-gray-600/30">Poids</th>
                    <th class="text-left p-4 text-cyan-400 font-semibold border-b border-gray-600/30">État Avancement</th>
                    <th class="text-left p-4 text-cyan-400 font-semibold border-b border-gray-600/30">État Global</th>
                    <th class="text-center p-4 text-cyan-400 font-semibold border-b border-gray-600/30">Ouverture / Fermeture</th>
                </tr>
            </thead> 
            <tbody id="cargo-table-body">
            </tbody>
        </table>
    </div>
    
    <div id="pagination-container" class="border-t border-gray-700/30">
    </div>
</div>

<!-- Modal d'annonce -->
<div id="status-modal" class="fixed inset-0 flex items-center justify-center z-50 opacity-0 pointer-events-none transition-opacity duration-300">
    <div class="bg-gray-800/95 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6 transform scale-95 transition-transform duration-300 flex items-center space-x-4 shadow-xl shadow-cyan-500/10">
        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center">
            <i id="status-icon" class="fas text-2xl text-cyan-400"></i>
        </div>
        <div>
            <h3 id="status-message" class="text-white font-semibold"></h3>
            <p id="status-details" class="text-gray-400 text-sm"></p>
        </div>
    </div>
</div>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<script src="https://cdn.tailwindcss.com"></script> 
<script type="module" src="../dist/CargaisonFetcher.js"></script>

