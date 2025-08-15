import type * as L from "leaflet" // Importe Leaflet


export enum EtatAvancement {
  EN_ATTENTE = "EN_ATTENTE",
  EN_COURS = "EN_COURS",
  ARRIVE = "ARRIVE"
}

export enum EtatGlobal {
  OUVERT = "OUVERT",
  FERME = "FERME"
}


export interface ILieu {
    nom: string;
    latitude: number;
    longitude: number;
    pays: string;
}

// Interface pour représenter un colis (à définir selon vos besoins)
export interface IColis {
    // Définir les propriétés du colis selon votre modèle
    id?: string;
    poids?: number;
    description?: string;
    // Ajoutez d'autres propriétés selon vos besoins
}

export interface ICargaison {
    id?: string;
    numero: string;
    poidsMax: number;
    type: TypeCargaison;
    distance: number; // Changé de distanceKm à distance
    lieuDepart: ILieu; // Changé de string à ILieu
    lieuArrivee: ILieu; // Changé de string à ILieu
    dateDepart: string | Date; // Accepter string ou Date
    dateArrivee: string | Date; // Accepter string ou Date
    etatAvancement: EtatAvancement;
    etatGlobal: EtatGlobal;
    colis: IColis[]; // Ajout du tableau de colis
}




// Déclaration globale pour Leaflet et d'autres variables si nécessaire
// Cela indique à TypeScript que ces objets existent globalement.
declare global {
  interface Window {
    L: typeof L // Importe le type de Leaflet
    currentPage: string // Pour la navigation PHP
  }
}

// --- 1. Définition des Interfaces et Types ---
// Ces interfaces aident TypeScript à comprendre la structure de vos données.

// Type pour les types de cargaison/transport
import { TypeCargaison } from "./enumsCargaison/TypeCargaison";

// Données sur les capacités de transport des pays
interface CountryCapabilitiesData {
  landlocked: string[] // Pays enclavés (sans accès à la mer)
  limitedMaritime: string[] // Pays avec accès maritime limité
  islands: string[] // Pays insulaires
}

// Données d'un pays extraites du géocodage
interface CountryData {
  country: string // Nom du pays
  countryCode: string // Code du pays (ex: FR, US)
  isLandlocked: boolean // Est-ce un pays enclavé ?
  hasLimitedMaritime: boolean // A-t-il un accès maritime limité ?
  isIsland: boolean // Est-ce une île ?
}

// Structure des résultats de l'API Nominatim (OpenStreetMap)
interface NominatimAddress {
  country?: string
  country_code?: string
  [key: string]: any // Permet d'autres propriétés non définies ici
}

interface NominatimResult {
  lat: string // Latitude sous forme de chaîne
  lon: string // Longitude sous forme de chaîne
  display_name: string // Nom complet du lieu
  address: NominatimAddress // Détails de l'adresse
  [key: string]: any // Permet d'autres propriétés
}

// Capacités de transport d'un pays
interface TransportCapabilities {
  name: string // Nom du pays
  isLandlocked: boolean
  hasLimitedMaritime: boolean
  isIsland: boolean
  canMaritime: boolean // Peut faire du transport maritime
  canAerien: boolean // Peut faire du transport aérien
  canRoutier: boolean // Peut faire du transport routier
}

// --- 2. Constantes et Données ---
// Ces données sont utilisées pour la logique de validation des transports.

const countryTransportCapabilities: CountryCapabilitiesData = {
  landlocked: [
    "mali",
    "burkina faso",
    "niger",
    "chad",
    "central african republic",
    "south sudan",
    "switzerland",
    "austria",
    "luxembourg",
    "czech republic",
    "slovakia",
    "hungary",
    "belarus",
    "moldova",
    "kazakhstan",
    "uzbekistan",
    "kyrgyzstan",
    "tajikistan",
    "afghanistan",
    "nepal",
    "bhutan",
    "laos",
    "paraguay",
    "bolivia",
    "zambia",
    "zimbabwe",
    "botswana",
    "lesotho",
    "swaziland",
    "rwanda",
    "burundi",
    "uganda",
    "south sudan",
    "ethiopia",
    "armenia",
    "azerbaijan",
    "mongolia",
    "andorra",
    "vatican",
    "san marino",
    "liechtenstein",
    "macedonia",
    "serbia",
    "kosovo",
    "montenegro",
  ],
  limitedMaritime: [
    "jordan",
    "iraq",
    "lebanon",
    "israel",
    "palestine",
    "kuwait",
    "bahrain",
    "qatar",
    "montenegro",
    "bosnia and herzegovina",
    "slovenia",
    "albania",
    "georgia",
    "ukraine",
    "russia",
  ],
  islands: [
    "madagascar",
    "sri lanka",
    "maldives",
    "seychelles",
    "mauritius",
    "comoros",
    "cape verde",
    "sao tome and principe",
    "malta",
    "cyprus",
    "iceland",
    "ireland",
    "united kingdom",
    "japan",
    "philippines",
    "indonesia",
    "malaysia",
    "singapore",
    "brunei",
    "new zealand",
    "australia",
    "papua new guinea",
    "fiji",
    "tonga",
    "samoa",
    "solomon islands",
    "vanuatu",
    "palau",
    "micronesia",
    "marshall islands",
    "kiribati",
    "tuvalu",
    "nauru",
    "cuba",
    "jamaica",
    "haiti",
    "dominican republic",
    "puerto rico",
    "trinidad and tobago",
    "barbados",
    "bahamas",
    "antigua and barbuda",
    "saint lucia",
    "grenada",
    "saint vincent and the grenadines",
    "dominica",
    "saint kitts and nevis",
  ],
}

// Données des ports et aéroports principaux (simplifié pour l'exemple)
// Utilisé pour la validation de proximité
const transportHubs = {
  ports: [
    { name: "Port de Dakar", coords: [14.6937, -17.4441] },
    { name: "Port de Marseille", coords: [43.3047, 5.3756] },
    { name: "Port de New York", coords: [40.6892, -74.0445] },
    { name: "Port de Shanghai", coords: [31.2304, 121.4737] },
    { name: "Port de Rotterdam", coords: [51.9244, 4.4777] },
    { name: "Port de Singapour", coords: [1.265, 103.82] },
    { name: "Port de Dubaï", coords: [25.06, 55.13] },
    { name: "Port de Tokyo", coords: [35.61, 139.78] },
    { name: "Port de Hambourg", coords: [53.54, 9.96] },
    { name: "Port de Los Angeles", coords: [33.73, -118.26] },
  ],
  airports: [
    { name: "Aéroport Dakar (DSS)", coords: [14.7397, -17.4902] },
    { name: "Paris Charles de Gaulle (CDG)", coords: [49.0097, 2.5479] },
    { name: "Londres Heathrow (LHR)", coords: [51.47, -0.4543] },
    { name: "New York JFK (JFK)", coords: [40.6413, -73.7781] },
    { name: "Dubai International (DXB)", coords: [25.2532, 55.3657] },
    { name: "Tokyo Narita (NRT)", coords: [35.7647, 140.3864] },
    { name: "Francfort (FRA)", coords: [50.0379, 8.5622] },
    { name: "Amsterdam Schiphol (AMS)", coords: [52.3086, 4.7639] },
    { name: "Singapour Changi (SIN)", coords: [1.3592, 103.9892] },
    { name: "Los Angeles (LAX)", coords: [33.9416, -118.4085] },
  ],
}

const PROXIMITY_THRESHOLD_KM = 100 // Seuil de proximité pour les hubs (en km)

// --- 3. Variables Globales pour la Carte ---
// Ces variables stockent l'état actuel de la carte et des points sélectionnés.
let map: L.Map | null = null
let departureMarker: L.Marker | null = null
let arrivalMarker: L.Marker | null = null
let routePolyline: L.Polyline | null = null
let departureCoords: [number, number] | null = null
let arrivalCoords: [number, number] | null = null
let selectionMode: "departure" | "arrival" | null = null // Mode de sélection (départ/arrivée)
let departureCountryData: CountryData | null = null // Données du pays de départ
let arrivalCountryData: CountryData | null = null // Données du pays d'arrivée

// Instance du gestionnaire de toasts

// --- 4. Fonctions Utilitaires pour les Toasts ---
// Ces fonctions simplifient l'affichage des messages d'erreur, d'avertissement et de succès.
function showErrorToast(message: string, details = ""): void {
  const toastContainer = document.getElementById("toast-root") || createToastContainer()
  const toast = document.createElement("div")
  toast.className = "bg-red-600 border-l-4 border-red-800 text-white p-4 rounded-lg shadow-lg max-w-sm animate-slide-in"
  toast.innerHTML = `
        <div class="flex items-start">
            <div class="flex-shrink-0">
                <i class="fas fa-exclamation-triangle text-red-200"></i>
            </div>
            <div class="ml-3">
                <h3 class="text-sm font-bold">Transport Incompatible</h3>
                <p class="text-sm mt-1">${message}</p>${details ? ` <p class="text-xs mt-2 text-red-200">${details}</p>` : ""}
            </div>
            <button onclick="this.parentElement?.parentElement?.remove()"
class="ml-auto text-red-200 hover:text-white">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `
  toastContainer.appendChild(toast)
  setTimeout(() => {
    if (toast.parentElement) {
      toast.remove()
    }
  }, 8000)
}

function showWarningToast(message: string, details = ""): void {
  const toastContainer = document.getElementById("toast-root") || createToastContainer()
  const toast = document.createElement("div")
  toast.className =
    "bg-yellow-600 border-l-4 border-yellow-800 text-white p-4 rounded-lg shadow-lg max-w-sm animate-slide-in"
  toast.innerHTML = `
        <div class="flex items-start">
            <div class="flex-shrink-0">
                <i class="fas fa-exclamation-circle text-yellow-200"></i>
            </div>
            <div class="ml-3">
                <h3 class="text-sm font-bold">Attention</h3>
                <p class="text-sm mt-1">${message}</p>${details ? ` <p class="text-xs mt-2 text-yellow-200">${details}</p>` : ""}
            </div>
            <button onclick="this.parentElement?.parentElement?.remove()"
class="ml-auto text-yellow-200 hover:text-white">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `
  toastContainer.appendChild(toast)
  setTimeout(() => {
    if (toast.parentElement) {
      toast.remove()
    }
  }, 6000)
}

function showSuccessToast(message: string): void {
  const toastContainer = document.getElementById("toast-root") || createToastContainer()
  const toast = document.createElement("div")
  toast.className =
    "bg-green-600 border-l-4 border-green-800 text-white p-4 rounded-lg shadow-lg max-w-sm animate-slide-in"
  toast.innerHTML = `
        <div class="flex items-start">
            <div class="flex-shrink-0">
                <i class="fas fa-check-circle text-green-200"></i>
            </div>
            <div class="ml-3">
                <p class="text-sm font-bold">${message}</p>
            </div>
            <button onclick="this.parentElement?.parentElement?.remove()" class="ml-auto text-green-200 hover:text-white">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `
  toastContainer.appendChild(toast)
  setTimeout(() => {
    if (toast.parentElement) {
      toast.remove()
    }
  }, 5000)
}

function createToastContainer(): HTMLElement {
  let container = document.getElementById("toast-root")
  if (!container) {
    container = document.createElement("div")
    container.id = "toast-root"
    container.className = "fixed top-4 right-4 z-50 space-y-3"
    document.body.appendChild(container)
  }
  return container
}

// --- 5. Fonctions de Traitement des Données Géographiques ---

// Extrait le nom du pays et le code du pays des données de géocodage
function extractCountryFromGeodata(data: NominatimResult): CountryData | null {
  if (!data || !data.address) return null
  return {
    country: data.address.country || "",
    countryCode: data.address.country_code || "",
    isLandlocked: false, // Ces propriétés seront mises à jour par checkTransportCapabilities
    hasLimitedMaritime: false,
    isIsland: false,
  }
}

// Vérifie les capacités de transport d'un pays en fonction de sa géographie
function checkTransportCapabilities(countryName: string): TransportCapabilities | null {
  if (!countryName) return null
  const country = countryName.toLowerCase()
  return {
    name: countryName,
    isLandlocked: countryTransportCapabilities.landlocked.includes(country),
    hasLimitedMaritime: countryTransportCapabilities.limitedMaritime.includes(country),
    isIsland: countryTransportCapabilities.islands.includes(country),
    canMaritime: !countryTransportCapabilities.landlocked.includes(country), // Si pas enclavé, peut faire du maritime
    canAerien: true, // L'aérien est généralement possible partout
    canRoutier: true, // Le routier est généralement possible partout
  }
}

// Calcule la distance directe (Haversine) entre deux points géographiques
function calculateDirectDistance(coords1: [number, number], coords2: [number, number]): number {
  const R = 6371 // Rayon de la Terre en km
  const dLat = ((coords2[0] - coords1[0]) * Math.PI) / 180
  const dLon = ((coords2[1] - coords1[1]) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((coords1[0] * Math.PI) / 180) *
      Math.cos((coords2[0] * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// --- 6. Fonctions de Validation du Transport ---
// Cette fonction est le cœur de la logique de validation.
function validateTransportType(TypeCargaison: string): boolean {
  // Si les données de pays ne sont pas encore disponibles, on ne peut pas valider
  if (!departureCountryData || !arrivalCountryData || !TypeCargaison) {
    return true // Pas assez d'informations pour valider, on autorise pour l'instant
  }

  const departureCapabilities = checkTransportCapabilities(departureCountryData.country)
  const arrivalCapabilities = checkTransportCapabilities(arrivalCountryData.country)

  if (!departureCapabilities || !arrivalCapabilities) {
    return true // Données insuffisantes, on laisse passer
  }

  switch (TypeCargaison) {
    case "MARITIME":
      // Si le pays de départ est enclavé, le transport maritime est impossible
      if (departureCapabilities.isLandlocked) {
        showErrorToast(
          `Transport maritime impossible depuis ${departureCapabilities.name}`,
          `${departureCapabilities.name} est un pays enclavé sans accès à la mer. Utilisez le transport aérien ou routier.`,
        )
        return false
      }
      // Si le pays d'arrivée est enclavé, le transport maritime est impossible
      if (arrivalCapabilities.isLandlocked) {
        showErrorToast(
          `Transport maritime impossible vers ${arrivalCapabilities.name}`,
          `${arrivalCapabilities.name} est un pays enclavé sans accès à la mer. Utilisez le transport aérien ou routier.`,
        )
        return false
      }
      // Avertissement si l'un des pays a un accès maritime limité
      if (departureCapabilities.hasLimitedMaritime || arrivalCapabilities.hasLimitedMaritime) {
        showWarningToast(
          "Transport maritime avec contraintes",
          "L'un des pays a un accès maritime limité. Vérifiez les ports disponibles.",
        )
      }
      return true // Validation réussie pour le maritime
    case "ROUTIER":
      const distanceInput = document.getElementById("distanceKm") as HTMLInputElement | null
      const distance = Number.parseFloat(distanceInput?.value || "0")
      // Avertissement si la distance est très grande pour le routier
      if (distance > 5000) {
        showWarningToast(
          "Distance importante pour transport routier",
          `${distance} km est une distance considérable. Le transport aérien pourrait être plus efficace.`,
        )
      }
      // Impossible de faire du routier entre une île et un continent (sauf pont/tunnel non géré ici)
      if (
        (departureCapabilities.isIsland && !arrivalCapabilities.isIsland) ||
        (!departureCapabilities.isIsland && arrivalCapabilities.isIsland)
      ) {
        showErrorToast(
          "Transport routier impossible",
          "Le transport routier n'est pas possible entre un pays insulaire et continental. Utilisez le transport maritime ou aérien.",
        )
        return false
      }
      return true // Validation réussie pour le routier
    case "AERIEN":
      // Le transport aérien est considéré comme toujours possible entre deux pays
      return true
    default:
      return true // Par défaut, si le type n'est pas reconnu, on valide
  }
}

// --- 7. Fonctions d'Initialisation et de Manipulation de la Carte Leaflet ---

// Initialise la carte Leaflet dans le conteneur 'map'
function initMap(): void {
  // Utilise un setTimeout pour s'assurer que le DOM est prêt et Leaflet chargé
  setTimeout(() => {
    if (!window.L) {
      console.error("La bibliothèque Leaflet n'est pas chargée.")
      return
    }
    // Crée la carte et la centre sur une vue globale
    map = window.L.map("map", {
      scrollWheelZoom: true, // Zoom avec la molette de la souris
      doubleClickZoom: true, // Zoom avec double-clic
      dragging: true, // Déplacement de la carte
      zoomControl: true, // Contrôle de zoom visible
    }).setView([20, 0], 2) // Centre initial et niveau de zoom

    // Ajoute la couche de tuiles OpenStreetMap (carte standard)
    const osmLayer = window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 18,
    })

    // Ajoute une couche de tuiles satellite (vue satellite)
    const satelliteLayer = window.L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution:
          "© Esri, Maxar, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community",
        maxZoom: 18,
      },
    )

    osmLayer.addTo(map) // Ajoute la carte standard par défaut

    // Contrôle des couches (permet de basculer entre carte standard et satellite)
    const baseLayers = {
      "Carte Standard": osmLayer,
      "Vue Satellite": satelliteLayer,
    }
    window.L.control.layers(baseLayers).addTo(map)

    map.zoomControl.setPosition("topright") // Positionne le contrôle de zoom
    map.on("click", onMapClick) // Attache l'événement de clic sur la carte

    // Invalide la taille de la carte pour s'assurer qu'elle s'affiche correctement
    setTimeout(() => {
      map?.invalidateSize()
    }, 100)
    console.log("Carte initialisée avec succès")
  }, 500)
}

// Gère les clics sur la carte pour définir les points de départ/arrivée
function onMapClick(e: L.LeafletMouseEvent): void {
  const lat = e.latlng.lat
  const lng = e.latlng.lng

  if (selectionMode === "departure") {
    setDeparturePoint(lat, lng)
    selectionMode = null // Réinitialise le mode de sélection
    updateModeButtons() // Met à jour l'apparence des boutons
  } else if (selectionMode === "arrival") {
    setArrivalPoint(lat, lng)
    selectionMode = null
    updateModeButtons()
  }
}

// Définit le point de départ sur la carte
async function setDeparturePoint(lat: number, lng: number): Promise<void> {
  departureCoords = [lat, lng] // Stocke les coordonnées

  if (departureMarker) {
    map?.removeLayer(departureMarker) // Supprime l'ancien marqueur si existe
  }

  if (map) {
    // Crée un nouveau marqueur avec une icône personnalisée 'D'
    departureMarker = window.L.marker([lat, lng], {
      icon: window.L.icon({
        iconUrl:
          "data:image/svg+xml;base64," +
          btoa(`
               <svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="0 0 25 41">
                   <path fill="#00bcd4" d="M12.5 0C5.6 0 0 5.6 0 12.5c0 7.5 12.5 28.5 12.5 28.5S25 20 25 12.5C25 5.6 19.4 0 12.5 0z"/>
                   <circle cx="12.5" cy="12.5" r="7" fill="white"/>
                   <text x="12.5" y="17" text-anchor="middle" fill="#00bcd4" font-size="10" font-weight="bold">D</text>
               </svg>
           `),
      }),
    }).addTo(map)
  }

  const departureCoordsEl = document.getElementById("departure-coords")
  if (departureCoordsEl) {
    departureCoordsEl.textContent = `Coordonnées: ${lat.toFixed(6)}, ${lng.toFixed(6)}`
  }

  await reverseGeocode(lat, lng, "lieuDepart") // Géocodage inverse pour obtenir le nom du lieu
  if (arrivalCoords) {
    calculateDistance() // Recalcule la distance si le point d'arrivée est déjà défini
  }
}

// Définit le point d'arrivée sur la carte (similaire à setDeparturePoint)
async function setArrivalPoint(lat: number, lng: number): Promise<void> {
  arrivalCoords = [lat, lng]

  if (arrivalMarker) {
    map?.removeLayer(arrivalMarker)
  }

  if (map) {
    arrivalMarker = window.L.marker([lat, lng], {
      icon: window.L.icon({
        iconUrl:
          "data:image/svg+xml;base64," +
          btoa(`
               <svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="0 0 25 41">
                   <path fill="#4caf50" d="M12.5 0C5.6 0 0 5.6 0 12.5c0 7.5 12.5 28.5 12.5 28.5S25 20 25 12.5C25 5.6 19.4 0 12.5 0z"/>
                   <circle cx="12.5" cy="12.5" r="7" fill="white"/>
                   <text x="12.5" y="17" text-anchor="middle" fill="#4caf50" font-size="10" font-weight="bold">A</text>
               </svg>
           `),
      }),
    }).addTo(map)
  }

  const arrivalCoordsEl = document.getElementById("arrival-coords")
  if (arrivalCoordsEl) {
    arrivalCoordsEl.textContent = `Coordonnées: ${lat.toFixed(6)}, ${lng.toFixed(6)}`
  }

  await reverseGeocode(lat, lng, "lieuArrivee")
  if (departureCoords) {
    calculateDistance()
  }
}

// Met à jour l'apparence des boutons de sélection de mode (Départ/Arrivée)
function updateModeButtons(): void {
  const departureBtn = document.getElementById("select-departure-mode") as HTMLButtonElement | null
  const arrivalBtn = document.getElementById("select-arrival-mode") as HTMLButtonElement | null

  // Réinitialise les classes des boutons
  if (departureBtn) {
    departureBtn.className =
      "w-full px-3 py-1 bg-cyan-600 hover:bg-cyan-700 rounded text-white text-xs transition-colors"
  }
  if (arrivalBtn) {
    arrivalBtn.className =
      "w-full px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-white text-xs transition-colors"
  }

  // Applique les classes spécifiques au mode de sélection actif
  if (selectionMode === "departure") {
    if (departureBtn) {
      departureBtn.className = "w-full px-3 py-1 bg-cyan-400 rounded text-gray-900 text-xs font-bold"
      departureBtn.innerHTML = '<i class="fas fa-crosshairs mr-1"></i> Cliquez sur la carte'
    }
    if (map) {
      map.getContainer().style.cursor = "crosshair" // Change le curseur de la carte
    }
  } else {
    if (departureBtn) {
      departureBtn.innerHTML = '<i class="fas fa-map-marker-alt mr-1"></i> Départ'
    }
  }

  if (selectionMode === "arrival") {
    if (arrivalBtn) {
      arrivalBtn.className = "w-full px-3 py-1 bg-green-400 rounded text-gray-900 text-xs font-bold"
      arrivalBtn.innerHTML = '<i class="fas fa-crosshairs mr-1"></i> Cliquez sur la carte'
    }
    if (map) {
      map.getContainer().style.cursor = "crosshair"
    }
  } else {
    if (arrivalBtn) {
      arrivalBtn.innerHTML = '<i class="fas fa-map-marker-alt mr-1"></i> Arrivée'
    }
  }

  // Réinitialise le curseur si aucun mode de sélection n'est actif
  if (selectionMode === null) {
    if (map) {
      map.getContainer().style.cursor = ""
    }
  }
}

// Géocodage inverse : convertit des coordonnées en adresse et met à jour les données du pays
async function reverseGeocode(lat: number, lng: number, inputId: string): Promise<void> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
    )
    const data: NominatimResult = await response.json()
    const address = data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`
    const inputEl = document.getElementById(inputId) as HTMLInputElement | null
    if (inputEl) {
      inputEl.value = address
    }

    const countryData = extractCountryFromGeodata(data)
    if (countryData) {
      // Met à jour les données du pays de départ ou d'arrivée
      if (inputId === "lieuDepart") {
        departureCountryData = countryData
      } else if (inputId === "lieuArrivee") {
        arrivalCountryData = countryData
      }
    }

    // Re-valide le type de transport après avoir obtenu les données du pays
    const currentTransportTypeEl = document.getElementById("typeTransport") as HTMLSelectElement | null
    const currentTransportType = currentTransportTypeEl?.value || ""
    if (currentTransportType) {
      setTimeout(() => validateTransportType(currentTransportType), 500)
    }
  } catch (error) {
    console.error("Erreur de géocodage inverse:", error)
    const inputEl = document.getElementById(inputId) as HTMLInputElement | null
    if (inputEl) {
      inputEl.value = `${lat.toFixed(6)}, ${lng.toFixed(6)}`
    }
  }
}

// Recherche de lieux : convertit une adresse en coordonnées et met à jour les données du pays
async function searchLocation(
  query: string,
  callback: (results: NominatimResult[]) => void,
  inputId: string,
): Promise<void> {
  if (query.length < 3) return
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1&addressdetails=1`,
    )
    const data: NominatimResult[] = await response.json()
    if (data.length > 0) {
      const result = data[0]
      const countryData = extractCountryFromGeodata(result)
      if (countryData) {
        if (inputId === "lieuDepart") {
          departureCountryData = countryData
        } else if (inputId === "lieuArrivee") {
          arrivalCountryData = countryData
        }
      }
    }
    callback(data)
  } catch (error) {
    console.error("Erreur de recherche:", error)
  }
}

// Calcule la distance, le temps estimé, le coût estimé et met à jour l'UI
function calculateDistance(): void {
  if (!departureCoords || !arrivalCoords) return

  const typeTransportEl = document.getElementById("typeTransport") as HTMLSelectElement | null
  const cargoType = typeTransportEl?.value || ""

  // Validation de la faisabilité du transport avant de calculer
  if (!validateTransportType(cargoType)) {
    clearMapAndDistanceInfo() // Efface les infos si la validation échoue
    return
  }

  const directDistance = calculateDirectDistance(departureCoords, arrivalCoords)
  // Pour l'exemple, la distance réelle est la distance directe.
  // Dans un cas réel, cela pourrait impliquer des APIs de routage.
  const realDistance = directDistance

  // Mise à jour des éléments d'affichage de la distance
  const directDistanceEl = document.getElementById("direct-distance")
  const calculatedDistanceEl = document.getElementById("calculated-distance")
  const distanceKmInput = document.getElementById("distanceKm") as HTMLInputElement | null

  if (directDistanceEl) directDistanceEl.textContent = `${Math.round(directDistance)} km`
  if (calculatedDistanceEl) calculatedDistanceEl.textContent = `${Math.round(realDistance)} km`
  if (distanceKmInput) distanceKmInput.value = `${Math.round(realDistance)}` // Met à jour le champ du formulaire

  let estimatedTime = ""
  let estimatedCost = ""
  let transportIconClass = "" // Classe pour l'icône de transport

  // Calcul du temps estimé et du coût basé sur le type de transport (simplifié)
  switch (cargoType) {
    case "MARITIME":
      estimatedTime = `${Math.ceil(realDistance / 35)} heures` // Ex: 35 km/h
      estimatedCost = `${(realDistance * 0.8).toLocaleString("fr-FR")} F` // Ex: 0.8 F/km
      transportIconClass = "fas fa-ship"
      break
    case "AERIEN":
      estimatedTime = `${Math.ceil(realDistance / 650)} heures` // Ex: 650 km/h
      estimatedCost = `${(realDistance * 2.5).toLocaleString("fr-FR")} F` // Ex: 2.5 F/km
      transportIconClass = "fas fa-plane"
      break
    case "ROUTIER":
      estimatedTime = `${Math.ceil(realDistance / 70)} heures` // Ex: 70 km/h
      estimatedCost = `${(realDistance * 0.3).toLocaleString("fr-FR")} F` // Ex: 0.3 F/km
      transportIconClass = "fas fa-truck"
      break
    default:
      estimatedTime = "--"
      estimatedCost = "--"
      transportIconClass = ""
  }

  const estimatedTimeEl = document.getElementById("estimated-time")
  const estimatedCostEl = document.getElementById("estimated-cost")
  if (estimatedTimeEl) estimatedTimeEl.textContent = estimatedTime
  if (estimatedCostEl) estimatedCostEl.textContent = estimatedCost

  updateTransportIcon(transportIconClass) // Met à jour l'icône dans le champ distance
  updateTransportIndicator(cargoType) // Met à jour l'indicateur sur la carte

  if (cargoType) {
    drawRoute(cargoType) // Trace la route sur la carte
  }
}

// Trace la route sur la carte avec une couleur spécifique au type de cargaison
function drawRoute(cargoType: string): void {
  if (!map) return

  if (routePolyline) {
    map.removeLayer(routePolyline) // Supprime l'ancienne ligne
  }

  let routeColor: string
  switch (cargoType) {
    case "MARITIME":
      routeColor = "#0ea5e9" // Bleu océan
      break
    case "AERIEN":
      routeColor = "#f59e0b" // Orange aviation
      break
    case "ROUTIER":
      routeColor = "#10b981" // Vert route
      break
    default:
      routeColor = "#6b7280" // Gris par défaut
  }

  if (departureCoords && arrivalCoords) {
    routePolyline = window.L.polyline([departureCoords, arrivalCoords], {
      color: routeColor,
      weight: 3,
      opacity: 0.8,
    }).addTo(map)

    const group = window.L.featureGroup([departureMarker, arrivalMarker, routePolyline].filter(Boolean) as L.Layer[])
    map.fitBounds(group.getBounds().pad(0.1))
  }
}

function clearMapAndDistanceInfo(): void {
  if (map && routePolyline) {
    map.removeLayer(routePolyline)
    routePolyline = null
  }
  const distanceKmInput = document.getElementById("distanceKm") as HTMLInputElement | null
  const directDistanceEl = document.getElementById("direct-distance")
  const calculatedDistanceEl = document.getElementById("calculated-distance")
  const estimatedTimeEl = document.getElementById("estimated-time")
  // const estimatedCostEl = document.getElementById("estimated-cost")

  if (distanceKmInput) distanceKmInput.value = ""
  if (directDistanceEl) directDistanceEl.textContent = "-- km"
  if (calculatedDistanceEl) calculatedDistanceEl.textContent = "-- km"
  if (estimatedTimeEl) estimatedTimeEl.textContent = "--"
  // if (estimatedCostEl) estimatedCostEl.textContent = "--"

  updateTransportIcon("") // Efface l'icône
  updateTransportIndicator("") // Efface l'indicateur
}

// Efface tous les marqueurs, la ligne et réinitialise tous les champs liés à la carte
function clearAllMarkers(): void {
  if (map) {
    if (departureMarker) {
      map.removeLayer(departureMarker)
      departureMarker = null
    }
    if (arrivalMarker) {
      map.removeLayer(arrivalMarker)
      arrivalMarker = null
    }
  }
  clearMapAndDistanceInfo() // Utilise la fonction pour nettoyer les infos

  departureCoords = null
  arrivalCoords = null
  departureCountryData = null
  arrivalCountryData = null

  const lieuDepartEl = document.getElementById("lieuDepart") as HTMLInputElement | null
  const lieuArriveeEl = document.getElementById("lieuArrivee") as HTMLInputElement | null
  const departureCoordsEl = document.getElementById("departure-coords")
  const arrivalCoordsEl = document.getElementById("arrival-coords")

  if (lieuDepartEl) lieuDepartEl.value = ""
  if (lieuArriveeEl) lieuArriveeEl.value = ""
  if (departureCoordsEl) departureCoordsEl.textContent = "Coordonnées: Non définies"
  if (arrivalCoordsEl) arrivalCoordsEl.textContent = "Coordonnées: Non définies"

  map?.setView([20, 0], 2) // Réinitialise la vue de la carte
}

// Calcule la durée entre les dates de départ et d'arrivée
function calculateDuration(): void {
  const startDateEl = document.getElementById("dateDepart") as HTMLInputElement | null
  const endDateEl = document.getElementById("dateArrivee") as HTMLInputElement | null
  const durationInfoEl = document.getElementById("duration-info")

  const startDate = startDateEl?.value
  const endDate = endDateEl?.value

  if (startDate && endDate && durationInfoEl) {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    durationInfoEl.innerHTML = `<i class="fas fa-clock mr-2"></i>Durée prévue: ${diffDays} jour${diffDays > 1 ? "s" : ""}`
  } else if (durationInfoEl) {
    durationInfoEl.textContent = "Sélectionnez les dates pour voir la durée du transport"
  }
}

// Met à jour l'icône de transport dans le champ "Distance Calculée"
function updateTransportIcon(iconClass: string): void {
  const transportIconEl = document.getElementById("transport-icon")
  if (transportIconEl) {
    transportIconEl.className = `absolute right-3 top-1/2 transform -translate-y-1/2 text-lg opacity-50 ${iconClass}`
  }
}

// Met à jour l'indicateur de type de transport sur la carte
function updateTransportIndicator(type: string): void {
  const indicatorEl = document.getElementById("transport-indicator")
  const transportModeEl = document.getElementById("transport-mode")
  if (indicatorEl && transportModeEl) {
    if (type) {
      indicatorEl.classList.remove("hidden")
      transportModeEl.textContent = type.toUpperCase()
    } else {
      indicatorEl.classList.add("hidden")
      transportModeEl.textContent = ""
    }
  }
}

/**
 * Génère un numéro de cargaison unique - VERSION CORRIGÉE
 * Utilise la date actuelle + millisecondes pour garantir l'unicité
 * Format: CARG-JJMM-XXXX où JJMM = jour/mois et XXXX = millisecondes
 */
function generateCargoNumber(): string {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  
  // Utilise les millisecondes pour garantir l'unicité
  const timestamp = Date.now().toString().slice(-4);
  
  return `CARG-${day}${month}-${timestamp}`;
}

// --- 8. Initialisation des Événements ---
// Cette section attache les fonctions aux événements DOM.
document.addEventListener("DOMContentLoaded", (): void => {
  initMap() // Initialise la carte au chargement de la page

  // Récupération des éléments DOM
  const selectDepartureModeBtn = document.getElementById("select-departure-mode")
  const selectArrivalModeBtn = document.getElementById("select-arrival-mode")
  const clearMarkersBtn = document.getElementById("clear-markers")
  const setDepartureBtn = document.getElementById("set-departure")
  const setArrivalBtn = document.getElementById("set-arrival")
  const typeTransportSelect = document.getElementById("typeTransport") as HTMLSelectElement | null
  const dateDepartInput = document.getElementById("dateDepart")
  const dateArriveeInput = document.getElementById("dateArrivee")
  const lieuDepartInput = document.getElementById("lieuDepart") as HTMLInputElement | null
  const lieuArriveeInput = document.getElementById("lieuArrivee") as HTMLInputElement | null
  const formCargaison = document.getElementById("form-cargaison") as HTMLFormElement | null
  const clearFormBtn = document.getElementById("clear-form")
  const numeroInput = document.getElementById("numero") as HTMLInputElement

  // Générer le numéro de cargaison au chargement de la page
  numeroInput.value = generateCargoNumber()

  // Événements pour les boutons de sélection de mode sur la carte
  selectDepartureModeBtn?.addEventListener("click", (): void => {
    selectionMode = selectionMode === "departure" ? null : "departure"
    updateModeButtons()
  })

  selectArrivalModeBtn?.addEventListener("click", (): void => {
    selectionMode = selectionMode === "arrival" ? null : "arrival"
    updateModeButtons()
  })

  clearMarkersBtn?.addEventListener("click", (): void => {
    clearAllMarkers()
  })

  // Événements pour les boutons "Définir" à côté des champs de lieu
  setDepartureBtn?.addEventListener("click", (): void => {
    selectionMode = selectionMode === "departure" ? null : "departure"
    updateModeButtons()
  })

  setArrivalBtn?.addEventListener("click", (): void => {
    selectionMode = selectionMode === "arrival" ? null : "arrival"
    updateModeButtons()
  })

  // Événement pour le changement du type de transport
  typeTransportSelect?.addEventListener("change", function (): void {
    const selectedType = this.value
    // Valide immédiatement le type sélectionné
    if (!validateTransportType(selectedType)) {
      this.value = "" // Réinitialise le select si la validation échoue
      clearMapAndDistanceInfo() // Efface les infos si le type n'est pas valide
      return
    }
    // Recalcule la distance et met à jour l'UI si les coordonnées existent
    if (departureCoords && arrivalCoords) {
      calculateDistance()
    } else {
      // Si pas de coordonnées, juste mettre à jour l'icône et l'indicateur
      let transportIconClass = ""
      switch (selectedType) {
        case "MARITIME":
          transportIconClass = "fas fa-ship"
          break
        case "AERIEN":
          transportIconClass = "fas fa-plane"
          break
        case "ROUTIER":
          transportIconClass = "fas fa-truck"
          break
      }
      updateTransportIcon(transportIconClass)
      updateTransportIndicator(selectedType)
    }
  })

  // Événements pour le calcul de la durée entre les dates
  dateDepartInput?.addEventListener("change", calculateDuration)
  dateArriveeInput?.addEventListener("change", calculateDuration)

  // Recherche de lieux en temps réel (avec délai pour éviter trop de requêtes)
  let departureTimeout: number
  lieuDepartInput?.addEventListener("input", function (): void {
    clearTimeout(departureTimeout)
    const query = this.value
    if (query.length >= 3) {
      departureTimeout = window.setTimeout(async () => {
        await searchLocation(
          query,
          (results: NominatimResult[]): void => {
            if (results.length > 0) {
              const result = results[0]
              const lat = Number.parseFloat(result.lat)
              const lng = Number.parseFloat(result.lon)
              setDeparturePoint(lat, lng)
              map?.setView([lat, lng], 10) // Centre la carte sur le lieu trouvé
            }
          },
          "lieuDepart",
        )
      }, 1000) // Délai de 1 seconde
    }
  })

  let arrivalTimeout: number
  lieuArriveeInput?.addEventListener("input", function (): void {
    clearTimeout(arrivalTimeout)
    const query = this.value
    if (query.length >= 3) {
      arrivalTimeout = window.setTimeout(async () => {
        await searchLocation(
          query,
          (results: NominatimResult[]): void => {
            if (results.length > 0) {
              const result = results[0]
              const lat = Number.parseFloat(result.lat)
              const lng = Number.parseFloat(result.lon)
              setArrivalPoint(lat, lng)
              map?.setView([lat, lng], 10)
            }
          },
          "lieuArrivee",
        )
      }, 1000)
    }
  })

  // Gestion de la soumission du formulaire avec validation finale
  formCargaison?.addEventListener("submit", async (e: Event): Promise<void> => {
    e.preventDefault()

    // Vérifications de base avant la validation complexe
    if (!departureCoords || !arrivalCoords) {
      showErrorToast("Points manquants", "Veuillez sélectionner les lieux de départ et d'arrivée.")
      return
    }
    const transportType = (document.getElementById("typeTransport") as HTMLSelectElement)?.value
    if (!transportType) {
      showErrorToast("Type requis", "Veuillez sélectionner un type de transport.")
      return
    }

    // Validation finale du type de transport
    if (!validateTransportType(transportType)) {
      return // Arrête la soumission si la validation échoue
    }

    // Récupération des données du formulaire
    const poidsMaxInput = document.getElementById("poidsMax") as HTMLInputElement
    const distanceKmInput = document.getElementById("distanceKm") as HTMLInputElement
    const lieuDepartInput = document.getElementById("lieuDepart") as HTMLInputElement
    const lieuArriveeInput = document.getElementById("lieuArrivee") as HTMLInputElement
    const dateDepartInput = document.getElementById("dateDepart") as HTMLInputElement
    const dateArriveeInput = document.getElementById("dateArrivee") as HTMLInputElement

    
    const data: Partial<ICargaison> = {
      id: numeroInput.value,
      numero: numeroInput.value,
      poidsMax: Number.parseFloat(poidsMaxInput?.value || "0"),
      type: transportType as TypeCargaison,
      distance: Number.parseFloat(distanceKmInput?.value || "0"),
      lieuDepart: {
        nom: lieuDepartInput?.value || "",
        latitude: departureCoords[0],
        longitude: departureCoords[1],
        pays: departureCountryData?.country || "",
    },
    lieuArrivee: {
        nom: lieuArriveeInput?.value || "",
        latitude: arrivalCoords[0],
        longitude: arrivalCoords[1],
        pays: arrivalCountryData?.country || "",
    },
    dateDepart: dateDepartInput?.value ? new Date(dateDepartInput.value) : undefined,
    dateArrivee: dateArriveeInput?.value ? new Date(dateArriveeInput.value) : new Date(),
    etatAvancement: EtatAvancement.EN_ATTENTE, 
    etatGlobal: EtatGlobal.OUVERT,           
    colis: [],
}


//     const cargaison: Cargaison = {
//       id: numeroInput.value,
//       numero: numeroInput.value,
//       poidsMax: Number.parseFloat(poidsMaxInput?.value || "0"),
//       type: transportType as TypeCargaison,
//       distance: Number.parseFloat(distanceKmInput?.value || "0"),
//       lieuDepart: {
//         nom: lieuDepartInput?.value || "",
//         latitude: departureCoords[0],
//         longitude: departureCoords[1],
//         pays: departureCountryData?.country || "",
//     },
//     lieuArrivee: {
//         nom: lieuArriveeInput?.value || "",
//         latitude: arrivalCoords[0],
//         longitude: arrivalCoords[1],
//         pays: arrivalCountryData?.country || "",
//     },
//     dateDepart: dateDepartInput?.value ? new Date(dateDepartInput.value) : new Date(),
//     dateArrivee: dateArriveeInput?.value ? new Date(dateArriveeInput.value) : new Date(),
//     etatAvancement: EtatAvancement.EN_ATTENTE, 
//     etatGlobal: EtatGlobal.OUVERT,           
//     colis: [],
// }





    console.log("Données de la cargaison validées:", data)

    try {
      const response = await fetch("http://localhost:3000/cargaisons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Erreur HTTP: ${response.status} - ${errorData.message || response.statusText}`)
      }

      const result = await response.json()
      console.log("Cargaison créée avec succès sur le serveur:", result)
      showSuccessToast("Cargaison créée avec succès !")
      formCargaison.reset() // Réinitialise le formulaire
      clearAllMarkers() // Efface les marqueurs et infos de la carte
      numeroInput.value = generateCargoNumber() // Génère un nouveau numéro pour la prochaine cargaison
    } catch (error) {
      console.error("Erreur lors de la création de la cargaison:", error)
      showErrorToast(
        "Échec de la création de la cargaison",
        `Veuillez vérifier le serveur JSON. Détails: ${error instanceof Error ? error.message : String(error)}`,
      )
    }
  })

 
})

window.currentPage = "creation-cargaison"