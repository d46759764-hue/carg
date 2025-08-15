<?php include __DIR__ . '/../templates/navigation.php'; ?>

<section id="creation-cargaison" class="py-8 bg-gray-800/30 pt-20">
<div class="container mx-auto px-6">
<div class="w-full bg-gray-800 rounded-3xl p-6 border border-cyan-500/20 hover:border-cyan-400 transition-colors duration-300">
<form id="form-cargaison" class="h-[calc(100vh-200px)] overflow-hidden">
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
<div class="space-y-4 overflow-y-auto pr-2">
<div class="bg-gray-700/50 rounded-xl p-4">
<h3 class="text-cyan-400 font-bold mb-3 text-sm">INFORMATIONS PRINCIPALES</h3>
<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
<div>
  <label class="block text-cyan-400 font-semibold mb-1 text-xs">Numéro de Cargaison</label>
  <input 
    type="text" 
    id="numero" 
    name="numero" 
    placeholder="CARG-1008-9452" 
    required 
    disabled
    class="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none text-sm">
</div>

<div>
<label class="block text-cyan-400 font-semibold mb-1 text-xs">Poids Max (kg)</label>
<input type="number" id="poidsMax" name="poidsMax" placeholder="5000" required class="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none text-sm">
</div>
<div>
<label class="block text-cyan-400 font-semibold mb-1 text-xs">Type de Cargaison</label>
<select id="typeTransport" name="typeTransport" required class="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none text-sm">
<option value="">Sélectionnez un type</option>
<option value="MARITIME">Maritime</option>
<option value="AERIEN">Aérienne</option>
<option value="ROUTIER">Routière</option>
</select>
</div>
<div>
<label class="block text-cyan-400 font-semibold mb-1 text-xs">Distance Calculée</label>
<div class="relative">
<input type="text" id="distanceKm" name="distanceKm" placeholder="Sélectionnez le type de transport" readonly class="w-full p-2 bg-gray-600 border border-gray-600 rounded-lg text-gray-300 text-sm cursor-not-allowed pr-12">
<div id="transport-icon" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg opacity-50"></div>
</div>
</div>
</div>
</div>

<div class="bg-gray-700/50 rounded-xl p-4">
<h3 class="text-cyan-400 font-bold mb-3 text-sm">TRAJET</h3>
<div class="space-y-3">
<div>
<label class="block text-cyan-400 font-semibold mb-1 text-xs">Lieu de Départ</label>
<div class="flex gap-2">
<input type="text" id="lieuDepart" name="lieuDepart" placeholder="Ex: Paris, London, New York..." required class="flex-1 p-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none text-sm">
<button type="button" id="set-departure" class="px-3 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white text-xs">
<i class="fas fa-map-marker-alt"></i>
</button>
</div>
<div class="text-xs text-gray-400 mt-1" id="departure-coords">Coordonnées: Non définies</div>
</div>
<div>
<label class="block text-cyan-400 font-semibold mb-1 text-xs">Lieu d'Arrivée</label>
<div class="flex gap-2">
<input type="text" id="lieuArrivee" name="lieuArrivee" placeholder="Ex: Tokyo, Dubai, Los Angeles..." required class="flex-1 p-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none text-sm">
<button type="button" id="set-arrival" class="px-3 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white text-xs">
<i class="fas fa-map-marker-alt"></i>
</button>
</div>
<div class="text-xs text-gray-400 mt-1" id="arrival-coords">Coordonnées: Non définies</div>
</div>
</div>
</div>

<div class="bg-gray-700/50 rounded-xl p-4">
<h3 class="text-cyan-400 font-bold mb-3 text-sm flex items-center"><i class="fas fa-calendar-alt mr-2"></i>PLANIFICATION</h3>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
<div class="relative">
<label class="block text-cyan-400 font-semibold mb-2 text-xs flex items-center"><i class="fas fa-play mr-1 text-green-400"></i>Date de Départ</label>
<div class="relative">
<input type="date" id="dateDepart" name="dateDepart" class="w-full p-3 bg-gradient-to-r from-gray-700 to-gray-600 border-2 border-gray-600 rounded-xl text-white focus:border-green-400 focus:outline-none text-sm transition-all duration-300 hover:border-green-500">
<div class="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent rounded-xl pointer-events-none opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
</div>
</div>
<div class="relative">
<label class="block text-cyan-400 font-semibold mb-2 text-xs flex items-center"><i class="fas fa-flag-checkered mr-1 text-red-400"></i>Date d'Arrivée Prévue</label>
<div class="relative">
<input type="date" id="dateArrivee" name="dateArrivee" class="w-full p-3 bg-gradient-to-r from-gray-700 to-gray-600 border-2 border-gray-600 rounded-xl text-white focus:border-red-400 focus:outline-none text-sm transition-all duration-300 hover:opacity-100">
<div class="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent rounded-xl pointer-events-none opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
</div>
</div>
</div>
<div class="mt-3 p-3 bg-gray-800/50 rounded-lg">
<div class="text-xs text-gray-400 flex items-center justify-center"><i class="fas fa-info-circle mr-2"></i><span id="duration-info">Sélectionnez les dates pour voir la durée du transport</span></div>
</div>
</div>

<div class="flex justify-end space-x-3 pt-4">
<!-- <button type="button" id="clear-form" class="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white text-sm font-semibold transition-colors duration-300">
<i class="fas fa-times mr-2"></i> Annuler
</button> -->
<button type="submit" class="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white text-sm font-semibold transition-colors duration-300 shadow-lg shadow-cyan-500/25">
<i class="fas fa-save mr-2"></i> Créer Cargaison
</button>
</div>
</div>

<div class="bg-gray-700/50 rounded-xl p-4 flex flex-col">
<h3 class="text-cyan-400 font-bold mb-3 text-sm">CARTE INTERACTIVE MONDIALE</h3>
<div class="relative" style="height: 400px;">
<div id="map" class="w-full h-full rounded-lg border-2 border-gray-600 z-10"></div>

<div class="absolute top-4 left-4 z-20 bg-gray-800/95 backdrop-blur-sm rounded-lg p-3 space-y-2 shadow-lg">
<div class="text-xs text-cyan-400 font-bold mb-2">SÉLECTION INTERACTIVE</div>
<button type="button" id="select-departure-mode" class="w-full px-3 py-1 bg-cyan-600 hover:bg-cyan-700 rounded text-white text-xs transition-colors">
<i class="fas fa-map-marker-alt mr-1"></i> Départ
</button>
<button type="button" id="select-arrival-mode" class="w-full px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-white text-xs transition-colors">
<i class="fas fa-map-marker-alt mr-1"></i> Arrivée
</button>
<button type="button" id="clear-markers" class="w-full px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-xs transition-colors">
<i class="fas fa-trash mr-1"></i> Effacer
</button>
</div>
<div id="transport-indicator" class="absolute top-4 right-4 z-20 bg-gray-800/95 backdrop-blur-sm rounded-lg p-3 hidden">
<div class="text-xs text-cyan-400 font-bold mb-1">MODE TRANSPORT</div>
<div id="transport-mode" class="text-white font-bold text-sm"></div>
</div>
</div>

<div class="mt-3 p-3 bg-gray-800 rounded-lg">
<div class="grid grid-cols-2 gap-4 text-xs mb-3">
<div class="text-center">
<div class="text-gray-400">Distance Directe</div>
<div id="direct-distance" class="text-gray-300 font-bold">-- km</div>
</div>
<div class="text-center">
<div class="text-gray-400">Distance Réelle</div>
<div id="calculated-distance" class="text-cyan-400 font-bold">-- km</div>
</div>
</div>
<div class="grid grid-cols-2 gap-4 text-xs">
<div class="text-center">
<div class="text-gray-400">Temps Estimé</div>
<div id="estimated-time" class="text-green-400 font-bold">--</div>
</div>
<div class="text-center">
<div class="text-gray-400">Coût Estimé</div>
<div id="estimated-cost" class="text-yellow-400 font-bold">--</div>
</div>
</div>
</div>
</div>
</div>
</form>
</div>
</div>
</section>

<div id="toast-root" class="fixed top-4 right-4 z-50 space-y-3"></div>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"></script>

<script type="module" src="./../dist/ApiLeaflet.js" defer></script>

<script>
// Définir la page active pour la navigation
window.currentPage = 'creation-cargaison';
</script>

<style>
.active {
 background-color: #0891b2 !important;
}

/* Forcer la taille de la carte */
#map {
 min-height: 400px !important;
 height: 400px !important;
 width: 100% !important;
 z-index: 1;
}

.leaflet-container {
 background: #1e293b !important;
 border-radius: 0.5rem;
}

/* Curseur personnalisé pour la sélection */
.leaflet-container.crosshair-cursor-enabled {
 cursor: crosshair !important;
}

/* Animation des boutons actifs */
.active-selection {
 animation: pulse 2s infinite;
 background-color: #22d3ee !important;
 color: #1f2937 !important;
}

@keyframes pulse {
 0%, 100% {
     opacity: 1;
 }
 50% {
     opacity: 0.7;
 }
}

/* Personnalisation des popups Leaflet */
.leaflet-popup-content-wrapper {
 background: #374151;
 color: white;
 border-radius: 8px;
}

.leaflet-popup-tip {
 background: #374151;
}

/* Scrollbar personnalisée */
.overflow-y-auto::-webkit-scrollbar {
 width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
 background: #374151;
 border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
 background: #06b6d4;
 border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
 background: #0891b2;
}

/* Animation pour les boutons actifs */
.bg-cyan-400, .bg-green-400 {
 animation: pulse 2s infinite;
}

@keyframes pulse {
 0%, 100% {
     opacity: 1;
 }
 50% {
     opacity: 0.8;
 }
}

/* Amélioration des champs de dates */
input[type="date"] {
  position: relative;
  background: linear-gradient(135deg, #374151 0%, #4b5563 100%);
  border: 2px solid #4b5563;
  color: white;
  font-weight: 500;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  background-color: #06b6d4;
  border-radius: 3px;
  cursor: pointer;
  filter: invert(1);
}

input[type="date"]:focus {
  box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
  transform: translateY(-1px);
}

input[type="date"]:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>