<?php include __DIR__ . '/../templates/navigation.php'; ?>

<!-- Section: Enregistrement de Colis Client -->
<section id="enregistrement-colis" class="py-32 overflow-hidden">
<div class="container mx-auto px-4 h-screen overflow-hidden">
    <div class="text-center mb-6">
        <div class="inline-block p-3 bg-cyan-400/10 rounded-xl border border-cyan-400/30 mb-4"><i class="fas fa-user-plus text-3xl text-cyan-400"></i></div>
        <h2 class="text-3xl font-bold mb-3 text-white">Enregistrer un <span class="text-cyan-400">Nouveau Colis Client</span></h2>
        <p class="text-gray-400 text-base">Enregistrez les informations du client et de ses colis pour un envoi</p>
    </div>
    <div class="w-full bg-gray-800 rounded-2xl p-6 border border-cyan-400/20 hover:border-cyan-400 transition-colors duration-300 max-h-[calc(100vh-200px)] overflow-hidden">
        <form id="register-package-form" class="space-y-6" method="POST">
            <input type="hidden" name="cargaison-id" value="">
            
            <!-- Informations Client -->
            <div>
                <h3 class="text-lg font-bold text-cyan-400 mb-3"><i class="fas fa-user mr-2"></i> Informations du Client</h3>
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label for="client-nom" class="block text-gray-300 font-semibold mb-1 text-sm">Nom</label>
                        <input type="text" id="client-nom" name="client-nom" placeholder="Nom du client" class="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none text-sm">
                    </div>
                    <div>
                        <label for="client-prenom" class="block text-gray-300 font-semibold mb-1 text-sm">Prénom</label>
                        <input type="text" id="client-prenom" name="client-prenom" placeholder="Prénom du client" class="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none text-sm">
                    </div>
                    
                    <!-- Champ Téléphone Amélioré avec API -->
                    <div>
                        <label for="client-phone" class="block text-gray-300 font-semibold mb-1 text-sm">Téléphone</label>
                        <div class="relative">
                            <!-- Loading indicator -->
                            <div id="countries-loading" class="absolute left-2 top-2 text-cyan-400">
                                <i class="fas fa-spinner fa-spin"></i>
                            </div>
                            
                            <!-- Bouton de sélection du pays -->
                            <button type="button" id="country-selector" class="absolute left-0 top-0 h-full px-3 bg-gray-600 border border-gray-600 rounded-l-lg text-white hover:bg-gray-500 focus:outline-none focus:border-cyan-400 transition-colors duration-300 flex items-center space-x-2 z-10 hidden">
                                <span id="selected-flag" class="text-lg">🏳️</span>
                                <span id="selected-code" class="text-sm font-medium">+000</span>
                                <i class="fas fa-chevron-down text-xs text-gray-400"></i>
                            </button>
                            
                            <!-- Input téléphone -->
                            <input type="tel" id="client-phone" name="client-phone" 
                                   placeholder="Chargement des pays..." 
                                   disabled
                                   class="w-full p-2 pl-28 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none text-sm">
                            
                            <!-- Dropdown des pays -->
                            <div id="country-dropdown" class="absolute top-full left-0 w-80 bg-gray-700 border border-gray-600 rounded-lg mt-1 shadow-lg z-20 hidden max-h-96">
                                <div class="p-3 border-b border-gray-600">
                                    <input type="text" id="country-search" placeholder="Rechercher un pays ou un code..." 
                                           class="w-full p-2 bg-gray-600 border border-gray-500 rounded text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 text-sm">
                                </div>
                                <div id="countries-list" class="phone-dropdown max-h-64 overflow-y-auto">
                                    <!-- Les pays seront chargés ici -->
                                </div>
                                <div class="p-2 text-center text-gray-400 text-xs border-t border-gray-600">
                                    <span id="countries-count">0</span> pays disponibles
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <label for="client-email" class="block text-gray-300 font-semibold mb-1 text-sm">Email destinataire</label>
                        <input type="email" id="client-email" name="destinataire-email" placeholder="moustapha@example.com" class="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none text-sm">
                    </div>
                    <div class="col-span-2 lg:col-span-4">
                        <label for="client-address" class="block text-gray-300 font-semibold mb-1 text-sm">Adresse</label>
                        <input type="text" id="client-address" name="client-address" placeholder="Adresse complète" class="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none text-sm">
                    </div>
                </div>
            </div>
            
            <!-- Informations Colis -->
            <div>
                <h3 class="text-lg font-bold text-cyan-400 mb-3"><i class="fa-solid fa-circle-info"></i> Informations du Colis</h3>
                <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
                    <div>
                        <label for="package-count" class="block text-gray-300 font-semibold mb-1 text-sm">Nombre de Colis</label>
                        <input type="number" id="package-count" name="package-count" placeholder="Ex: 1" min="1" class="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none text-sm">
                    </div>
                    <div>
                        <label for="package-weight" class="block text-gray-300 font-semibold mb-1 text-sm">Poids Total (kg)</label>
                        <input type="number" id="package-weight" name="package-weight" placeholder="Ex: 15" class="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none text-sm">
                    </div>
                    <div>
                        <label for="package-product-type" class="block text-gray-300 font-semibold mb-1 text-sm">Type de Colis</label>
                        <select id="package-product-type" name="package-product-type" required class="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none text-sm">
                            <option value="">Sélectionnez un type</option>
                            <option value="ALIMENTAIRE">Alimentaire</option>
                            <option value="CHIMIQUE">Chimique</option>
                            <option value="MATERIEL_FRAGILE">Matériel Fragile</option>
                            <option value="MATERIEL_INCASSABLE">Matériel Incassable</option>
                        </select>
                    </div>

                    <!-- <div>
                        <label for="package-cargaison-type" class="block text-gray-300 font-semibold mb-1 text-sm">Type de Cargaison</label>
                        <select id="package-cargaison-type" name="package-cargaison-type" class="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none text-sm">
                            <option value="">Sélectionnez un type</option>
                            <option value="maritime">MARITIME</option>
                            <option value="aerienne">AERIENNE</option>
                            <option value="routiere">ROUTIERE</option>
                        </select>
                    </div> -->
                   
                    <div>
                        <label for="libelle-produit" class="block text-gray-300 font-semibold mb-1 text-sm">Libellé</label>
                        <input type="text" id="libelle-produit" name="libelle-produit" placeholder="Entrez le nom du produit" class="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none text-sm">
                    </div>
                </div>
                <div class="mt-4 p-3 bg-cyan-900/30 rounded-lg border border-cyan-400/30">
                    <p class="text-cyan-300 font-semibold text-xs"><i class="fas fa-info-circle mr-2"></i> Le prix minimum pour chaque colis est de 10.000 F. Si le montant calculé est inférieur, il sera arrondi à 10.000 F.</p>
                </div>
            </div>
            
            <button type="submit" class="w-full py-3 bg-cyan-400 hover:bg-cyan-500 rounded-xl text-gray-900 font-semibold transition-colors duration-300 shadow-lg shadow-cyan-400/25"> Enregistrer Colis & Générer Reçu</button>
        </form>
    </div>
</div>
</section>

<!-- Modal de sélection de cargaison -->
<div id="select-cargaison-modal" class="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50 opacity-0 pointer-events-none transition-opacity duration-300">
    <div class="bg-gray-800 rounded-xl p-6 max-w-2xl w-full mx-4">
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-white">Choisir une Cargaison</h3>
            <button type="button" id="close-modal" class="text-gray-400 hover:text-cyan-400">
                <i class="fas fa-times"></i>
            </button>
        </div>

        <div id="cargaisons-list" class="space-y-4 max-h-96 overflow-y-auto">
            <!-- Les cargaisons seront chargées ici -->
        </div>

        <div class="mt-6 flex justify-end space-x-3">
            <button type="button" id="cancel-selection" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500">
                Annuler
            </button>
            <button type="button" id="confirm-selection" class="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 cursor-pointer" disabled>
                Confirmer la sélection
            </button>
        </div>
    </div>
</div>

<!-- Toast container -->
<div id="toast-root" class="fixed top-4 right-4 z-50 space-y-3"></div>

<style>
.phone-dropdown::-webkit-scrollbar {
    width: 6px;
}
.phone-dropdown::-webkit-scrollbar-track {
    background: #374151;
    border-radius: 3px;
}
.phone-dropdown::-webkit-scrollbar-thumb {
    background: #6b7280;
    border-radius: 3px;
}
.phone-dropdown::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
}

.country-item {
    transition: all 0.2s ease;
}

.country-item:hover {
    background: linear-gradient(90deg, #0891b2 0%, #0e7490 100%);
    transform: translateX(2px);
}

.flag-emoji {
    font-family: "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif;
    font-size: 1.2em;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}

.fade-in {
    animation: fadeIn 0.3s ease;
}
</style>

<script>
class InternationalPhoneInput {
    constructor() {
        this.countries = [];
        this.filteredCountries = [];
        this.currentCountry = null;
        this.isLoading = true;
        
        // Elements DOM
        this.elements = {
            loading: document.getElementById('countries-loading'),
            selector: document.getElementById('country-selector'),
            dropdown: document.getElementById('country-dropdown'),
            search: document.getElementById('country-search'),
            phoneInput: document.getElementById('client-phone'),
            selectedFlag: document.getElementById('selected-flag'),
            selectedCode: document.getElementById('selected-code'),
            countriesList: document.getElementById('countries-list'),
            countriesCount: document.getElementById('countries-count')
        };
        
        this.init();
    }
    
    async init() {
        await this.loadCountries();
        this.setupEventListeners();
        this.setDefaultCountry();
        this.hideLoading();
    }
    
    async loadCountries() {
        try {
            // Utilisation de l'API REST Countries v3
            const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,idd,flag');
            const data = await response.json();
            
            this.countries = data
                .filter(country => country.idd && country.idd.root)
                .map(country => ({
                    name: country.name.common,
                    code: country.cca2.toLowerCase(),
                    dialCode: country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] || '' : ''),
                    flag: country.flag || this.getEmojiFlag(country.cca2)
                }))
                .filter(country => country.dialCode && country.dialCode !== '+')
                .sort((a, b) => a.name.localeCompare(b.name));
                
            this.filteredCountries = [...this.countries];
            this.renderCountries();
            
        } catch (error) {
            console.error('Erreur lors du chargement des pays:', error);
            // Fallback avec quelques pays essentiels
            this.countries = [
                { name: 'Sénégal', code: 'sn', dialCode: '+221', flag: '🇸🇳' },
                { name: 'France', code: 'fr', dialCode: '+33', flag: '🇫🇷' },
                { name: 'États-Unis', code: 'us', dialCode: '+1', flag: '🇺🇸' },
                { name: 'Côte d\'Ivoire', code: 'ci', dialCode: '+225', flag: '🇨🇮' }
            ];
            this.filteredCountries = [...this.countries];
            this.renderCountries();
        }
    }
    
    getEmojiFlag(countryCode) {
        const codePoints = countryCode
            .toUpperCase()
            .split('')
            .map(char => 127397 + char.charCodeAt());
        return String.fromCodePoint(...codePoints);
    }
    
    renderCountries() {
        if (!this.elements.countriesList) return;
        
        const html = this.filteredCountries.map(country => `
            <div class="country-item flex items-center px-4 py-3 hover:bg-gray-600 cursor-pointer text-white border-b border-gray-700 last:border-b-0" 
                 data-code="${country.code}" 
                 data-dial-code="${country.dialCode}" 
                 data-flag="${country.flag}" 
                 data-name="${country.name}">
                <span class="flag-emoji text-xl mr-4">${country.flag}</span>
                <div class="flex-1">
                    <div class="font-medium text-sm">${country.name}</div>
                </div>
                <span class="text-sm text-cyan-400 font-mono font-bold">${country.dialCode}</span>
            </div>
        `).join('');
        
        this.elements.countriesList.innerHTML = html;
        this.elements.countriesCount.textContent = this.filteredCountries.length;
        
        // Ajouter les événements de clic
        this.elements.countriesList.querySelectorAll('.country-item').forEach(item => {
            item.addEventListener('click', () => this.selectCountry(item));
        });
    }
    
    selectCountry(element) {
        const country = {
            name: element.dataset.name,
            code: element.dataset.code,
            dialCode: element.dataset.dialCode,
            flag: element.dataset.flag
        };
        
        this.currentCountry = country;
        this.elements.selectedFlag.textContent = country.flag;
        this.elements.selectedCode.textContent = country.dialCode;
        
        // Fermer le dropdown
        this.closeDropdown();
        
        // Focus sur l'input téléphone
        this.elements.phoneInput.focus();
        
        // Déclencher un événement personnalisé
        this.elements.phoneInput.dispatchEvent(new CustomEvent('countryChanged', {
            detail: { country }
        }));
    }
    
    setupEventListeners() {
        // Toggle dropdown
        this.elements.selector.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleDropdown();
        });
        
        // Recherche
        this.elements.search.addEventListener('input', (e) => {
            this.filterCountries(e.target.value);
        });
        
        // Navigation clavier dans la recherche
        this.elements.search.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeDropdown();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                const firstCountry = this.elements.countriesList.querySelector('.country-item');
                if (firstCountry) {
                    this.selectCountry(firstCountry);
                }
            }
        });
        
        // Fermer en cliquant dehors
        document.addEventListener('click', (e) => {
            if (!this.elements.selector.contains(e.target) && 
                !this.elements.dropdown.contains(e.target)) {
                this.closeDropdown();
            }
        });
        
        // Validation du numéro de téléphone
        this.elements.phoneInput.addEventListener('input', (e) => {
            this.formatPhoneNumber(e.target);
        });
    }
    
    filterCountries(searchTerm) {
        const term = searchTerm.toLowerCase();
        this.filteredCountries = this.countries.filter(country => 
            country.name.toLowerCase().includes(term) || 
            country.dialCode.includes(term)
        );
        this.renderCountries();
    }
    
    formatPhoneNumber(input) {
        // Supprimer tout sauf les chiffres et espaces
        let value = input.value.replace(/[^\d\s]/g, '');
        
        // Formater selon le pays sélectionné
        if (this.currentCountry) {
            // Logique de formatage basique (peut être étendue)
            if (this.currentCountry.code === 'sn') {
                // Format sénégalais: XX XXX XX XX
                value = value.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
            } else if (this.currentCountry.code === 'fr') {
                // Format français: X XX XX XX XX
                value = value.replace(/(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
            }
        }
        
        input.value = value;
    }
    
    toggleDropdown() {
        if (this.elements.dropdown.classList.contains('hidden')) {
            this.openDropdown();
        } else {
            this.closeDropdown();
        }
    }
    
    openDropdown() {
        this.elements.dropdown.classList.remove('hidden');
        this.elements.dropdown.classList.add('fade-in');
        this.elements.search.value = '';
        this.filteredCountries = [...this.countries];
        this.renderCountries();
        setTimeout(() => this.elements.search.focus(), 100);
    }
    
    closeDropdown() {
        this.elements.dropdown.classList.add('hidden');
        this.elements.dropdown.classList.remove('fade-in');
    }
    
    setDefaultCountry() {
        // Définir le Sénégal comme pays par défaut
        const defaultCountry = this.countries.find(c => c.code === 'sn') || this.countries[0];
        if (defaultCountry) {
            const mockElement = {
                dataset: {
                    name: defaultCountry.name,
                    code: defaultCountry.code,
                    dialCode: defaultCountry.dialCode,
                    flag: defaultCountry.flag
                }
            };
            this.selectCountry(mockElement);
        }
    }
    
    hideLoading() {
        this.elements.loading.classList.add('hidden');
        this.elements.selector.classList.remove('hidden');
        this.elements.phoneInput.disabled = false;
        this.elements.phoneInput.placeholder = 'Numéro de téléphone';
        this.isLoading = false;
    }
    
    // Méthodes publiques pour l'intégration
    getSelectedCountry() {
        return this.currentCountry;
    }
    
    getFullPhoneNumber() {
        if (!this.currentCountry || !this.elements.phoneInput.value) {
            return null;
        }
        
        return {
            country: this.currentCountry,
            nationalNumber: this.elements.phoneInput.value.replace(/\s/g, ''),
            internationalNumber: this.currentCountry.dialCode + this.elements.phoneInput.value.replace(/\s/g, ''),
            formatted: this.currentCountry.dialCode + ' ' + this.elements.phoneInput.value
        };
    }
}

// Initialiser le composant
document.addEventListener('DOMContentLoaded', () => {
    window.phoneInput = new InternationalPhoneInput();
});

// Intégration avec le formulaire existant
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-package-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            // Valider le téléphone avant soumission
            const phoneData = window.phoneInput?.getFullPhoneNumber();
            if (phoneData) {
                console.log('Données téléphone:', phoneData);
                // Ajouter les données du téléphone au formulaire
                const hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = 'phone-full-data';
                hiddenInput.value = JSON.stringify(phoneData);
                form.appendChild(hiddenInput);
            }
        });
    }
});
</script>

<!-- Avant la fermeture de </body> -->
<!-- D'abord les dépendances -->
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/js/all.min.js"></script>

<!-- Ensuite le script principal -->
<script type="module" src="./../dist/enregistrement-colis.js"></script>

<!-- Enfin le script pour le téléphone -->
<script>
// Votre code InternationalPhoneInput ici...
</script>
</body>
</html>