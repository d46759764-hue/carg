interface ICargaison {
    numero: string;
    type: string;
    dateDepart: string;
    lieuDepart: {
        pays: string;
    };
    lieuArrivee: {
        pays: string;
    };
    distance: number;
    poidsMax: number;
    etatAvancement: string;
    etatGlobal: string;
}

class CargaisonFetcher {
    private endpoint = "http://localhost:3000/cargaisons";
    private itemsPerPage = 4; 
    private currentPage = 1;
    private filteredData: ICargaison[] = [];

    private async fetchCargaisons(): Promise<ICargaison[]> {
        try {
            const response = await fetch(this.endpoint);
            return await response.json();
        } catch (error) {
            console.error("Erreur:", error);
            return [];
        }
    }

    async getTotal(): Promise<number> {
        const cargaisons = await this.fetchCargaisons();
        return cargaisons.length;
    }

    async getOuvertes(): Promise<number> {
        const cargaisons = await this.fetchCargaisons();
        return cargaisons.filter(c => c.etatGlobal === "OUVERT").length;
    }

    async getEnCours(): Promise<number> {
        const cargaisons = await this.fetchCargaisons();
        return cargaisons.filter(c => c.etatAvancement === "EN_COURS").length;
    }

    async getFermees(): Promise<number> {
        const cargaisons = await this.fetchCargaisons();
        return cargaisons.filter(c => c.etatGlobal === "FERME").length;
    }

    private getIconClass(type: string): string {
        switch(type) {
            case "MARITIME": return "fa-ship text-cyan-400";
            case "AERIEN": return "fa-plane text-gray-400";
            case "ROUTIER": return "fa-truck text-cyan-400";
            default: return "fa-box text-gray-400";
        }
    }

    async changerEtatCargaison(numero: string, nouvelEtat: string) {
        try {
            const response = await fetch(`${this.endpoint}/${numero}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    etatGlobal: nouvelEtat,
                    validation: true // Ajouter un flag pour indiquer qu'il faut valider
                })
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }
            
            return await response.json();
        } catch (error) {
            throw error;
        }
    }

    private renderTableRows(cargaisons: ICargaison[]): string {
        return cargaisons.map(cargaison => `
            <tr class="border-b border-gray-700/30 hover:bg-gray-700/30 transition-all group">
                <td class="p-4">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-lg flex items-center justify-center">
                            <i class="fas ${this.getIconClass(cargaison.type)}"></i>
                        </div>
                        <div>
                            <span data-numero="${cargaison.numero}" class="text-white font-mono font-semibold">${cargaison.numero}</span>
                            <p class="text-gray-400 text-xs">Créé le ${new Date(cargaison.dateDepart).toLocaleDateString()}</p>
                        </div>
                    </div>
                </td>
                <td class="p-4">
                    <div class="flex items-center space-x-2">
                        <div class="w-3 h-3 bg-cyan-400 rounded-full"></div>
                        <span class="text-cyan-400 font-medium">${cargaison.type}</span>
                    </div>
                </td>
                <td class="p-4">
                    <div class="flex items-center space-x-2">
                        <span class="text-gray-300">${cargaison.lieuDepart.pays}</span>
                        <i class="fas fa-arrow-right text-gray-500 text-xs"></i>
                        <span class="text-gray-300">${cargaison.lieuArrivee.pays}</span>
                    </div>
                    <p class="text-gray-500 text-xs">${Math.round(cargaison.distance)} km</p>
                </td>
                <td class="p-4">
                    <div class="text-gray-300">
                        <span class="font-semibold"></span> ${cargaison.poidsMax} kg
                    </div>
                    <div class="w-full bg-gray-600 rounded-full h-2 mt-1">
                        <div class="bg-gradient-to-r from-cyan-500 to-cyan-600 h-2 rounded-full" style="width: 0%"></div>
                    </div>
                </td>
                <td class="p-4">
                    <span class="inline-flex items-center px-3 py-1 bg-gray-600/20 text-gray-300 border border-gray-500/30 rounded-full text-xs font-semibold">
                        <div class="w-2 h-2 bg-gray-400 rounded-full mr-2 ${cargaison.etatAvancement === 'EN_COURS' ? 'animate-pulse' : ''}"></div>
                        ${cargaison.etatAvancement}
                    </span>
                </td>
                <td class="p-4">
                    <span data-etat="${cargaison.etatGlobal}" class="inline-flex items-center px-3 py-1 ${cargaison.etatGlobal === 'OUVERT' ? 'bg-cyan-500/20 text-cyan-400 border-cyan-400/30' : 'bg-gray-600/20 text-gray-400 border-gray-500/30'} rounded-full text-xs font-semibold border">
                        <div class="w-2 h-2 ${cargaison.etatGlobal === 'OUVERT' ? 'bg-cyan-400' : 'bg-gray-400'} rounded-full mr-2"></div>
                        ${cargaison.etatGlobal}
                    </span>
                </td>
                <td class="p-4">
                    <div class="flex items-center justify-center space-x-2">
                        <button 
                            id="changer-etat" 
                            class="p-2 ${cargaison.etatGlobal === 'FERME' && cargaison.etatAvancement !== 'EN_ATTENTE' 
                                ? 'text-gray-500 cursor-not-allowed' 
                                : 'text-red-400 hover:bg-cyan-500/20'} 
                            rounded-lg transition-all" 
                            title="${cargaison.etatGlobal === 'FERME' && cargaison.etatAvancement !== 'EN_ATTENTE'
                                ? 'Impossible de rouvrir - État avancement: ' + cargaison.etatAvancement
                                : cargaison.etatGlobal === 'OUVERT' ? 'Fermer' : 'Ouvrir'}"
                            ${cargaison.etatGlobal === 'FERME' && cargaison.etatAvancement !== 'EN_ATTENTE' ? 'disabled' : ''}
                        >
                            <i class="fas ${cargaison.etatGlobal === 'OUVERT' ? 'fa-lock-open' : 'fa-lock'}"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    public attacherEcouteurEvenement(): void {
        const recupBouton = document.querySelectorAll("#changer-etat");
        recupBouton.forEach(bouton => {
            bouton.addEventListener("click", async (e: Event) => {
                e.preventDefault();
                
                const btn = e.currentTarget as HTMLElement;
                if (btn.hasAttribute('disabled')) {
                    // Récupérer l'état d'avancement depuis la ligne du tableau
                    const row = btn.closest('tr');
                    const etatAvancementElement = row?.querySelector('td:nth-child(5) span');
                    const etatAvancement = etatAvancementElement?.textContent?.trim() || 'inconnu';
                    
                    this.showStatusModal('', '', 'error', `Impossible de rouvrir une cargaison fermée dont l'état d'avancement n'est pas EN_ATTENTE (actuellement: ${etatAvancement})`);
                    return;
                }
                
                const row = btn.closest('tr');
                if (!row) return;

                const numeroElement = row.querySelector("[data-numero]");
                const etatElement = row.querySelector("[data-etat]");
                const iconElement = btn.querySelector("i");

                const numero = numeroElement?.getAttribute('data-numero');
                const etat = etatElement?.getAttribute('data-etat');

                if (!numero || !etat || !iconElement) return;

                // Vérification supplémentaire avant de changer l'état
                if (etat === "FERME") {
                    const etatAvancementElement = row.querySelector('td:nth-child(5) span');
                    const etatAvancement = etatAvancementElement?.textContent?.trim();
                    
                    if (etatAvancement !== 'EN_ATTENTE') {
                        this.showStatusModal('', '', 'error', `Impossible de rouvrir la cargaison ${numero}. État d'avancement: ${etatAvancement} (doit être EN_ATTENTE)`);
                        return;
                    }
                }

                const nouvelEtat = etat === "OUVERT" ? "FERME" : "OUVERT";
                
                try {
                    const update = await this.changerEtatCargaison(numero, nouvelEtat);
                    
                    // Mettre à jour les données locales filteredData
                    const cargaisonIndex = this.filteredData.findIndex(c => c.numero === numero);
                    if (cargaisonIndex !== -1) {
                        this.filteredData[cargaisonIndex].etatGlobal = update.etatGlobal;
                    }
                    
                    if (etatElement) {
                        etatElement.textContent = update.etatGlobal;
                        etatElement.setAttribute('data-etat', update.etatGlobal);
                        
                        if (update.etatGlobal === "OUVERT") {
                            etatElement.classList.remove('bg-gray-600/20', 'text-gray-400', 'border-gray-500/30');
                            etatElement.classList.add('bg-cyan-500/20', 'text-cyan-400', 'border-cyan-400/30');
                            iconElement.classList.remove('fa-lock');
                            iconElement.classList.add('fa-lock-open');
                            btn.setAttribute('title', 'Fermer');
                            
                        } else {
                            etatElement.classList.add('bg-gray-600/20', 'text-gray-400', 'border-gray-500/30');
                            etatElement.classList.remove('bg-cyan-500/20', 'text-cyan-400', 'border-cyan-400/30');
                            iconElement.classList.remove('fa-lock-open');
                            iconElement.classList.add('fa-lock');
                            btn.setAttribute('title', 'Ouvrir');
                        }
                    }
                    
                    this.showStatusModal(numero, nouvelEtat);
                    
                    await this.updateStats();
                    
                    // Recharger les données depuis le serveur pour synchroniser
                    await this.refreshCurrentData();
                } catch (error) {
                    console.error("Erreur lors du changement d'état:", error);
                }
            });
        });
    }

    private renderPagination(): void {
        const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
        const paginationContainer = document.getElementById("pagination-container");
        
        if (!paginationContainer || totalPages <= 1) {
            if (paginationContainer) paginationContainer.innerHTML = '';
            return;
        }

        paginationContainer.innerHTML = `
            <div class="flex items-center justify-between p-4 bg-gray-700/50">
                <div class="text-gray-400 text-sm">
                    Affichage de ${((this.currentPage - 1) * this.itemsPerPage) + 1} à ${Math.min(this.currentPage * this.itemsPerPage, this.filteredData.length)} sur ${this.filteredData.length} cargaisons
                </div>
                <div class="flex items-center space-x-2">
                    <button id="prev-btn" ${this.currentPage === 1 ? 'disabled' : ''} 
                        class="px-3 py-1 bg-gray-600 text-gray-300 rounded-lg hover:bg-cyan-500/20 hover:text-cyan-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                        Précédent
                    </button>
                    <span class="text-gray-300 text-sm px-3">
                        Page ${this.currentPage} sur ${totalPages}
                    </span>
                    <button id="next-btn" ${this.currentPage === totalPages ? 'disabled' : ''} 
                        class="px-3 py-1 bg-gray-600 text-gray-300 rounded-lg hover:bg-cyan-500/20 hover:text-cyan-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                        Suivant
                    </button>
                </div>
            </div>
        `;

        const prevBtn = document.getElementById("prev-btn");
        const nextBtn = document.getElementById("next-btn");

        prevBtn?.addEventListener("click", () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.displayCurrentPage();
            }
        });

        nextBtn?.addEventListener("click", () => {
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.displayCurrentPage();
            }
        });
    }

    private async refreshCurrentData(): Promise<void> {
        // Recharger les données depuis le serveur et appliquer les filtres actuels
        const cargaisons = await this.fetchCargaisons();

        const typeFilter = document.querySelector<HTMLSelectElement>("#type-filter")?.value;
        const avancementFilter = document.querySelector<HTMLSelectElement>("#etat-filter")?.value;
        const globalFilter = document.querySelector<HTMLSelectElement>("#global-filter")?.value;

        this.filteredData = cargaisons.filter(c => {
            const Type = typeFilter ? c.type === typeFilter : true;
            const Avancement = avancementFilter ? c.etatAvancement === avancementFilter : true;
            const Global = globalFilter ? c.etatGlobal === globalFilter : true;
            return Type && Avancement && Global;
        });

        // Reafficher la page courante avec les données fraîches
        this.displayCurrentPage();
    }

    private displayCurrentPage(): void {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const currentPageData = this.filteredData.slice(startIndex, endIndex);

        const tableBody = document.getElementById("cargo-table-body");
        if (tableBody) {
            tableBody.innerHTML = this.renderTableRows(currentPageData);
            this.attacherEcouteurEvenement(); 
        }

        this.renderPagination();
    }

    async displayCargaisons(): Promise<void> {
        this.filteredData = await this.fetchCargaisons();
        this.currentPage = 1; 
        this.displayCurrentPage();
    }

    async filtrerParStatus(): Promise<void> {
        const cargaisons = await this.fetchCargaisons();

        const typeFilter = document.querySelector<HTMLSelectElement>("#type-filter")?.value;
        const avancementFilter = document.querySelector<HTMLSelectElement>("#etat-filter")?.value;
        const globalFilter = document.querySelector<HTMLSelectElement>("#global-filter")?.value;

        this.filteredData = cargaisons.filter(c => {
            const Type = typeFilter ? c.type === typeFilter : true;
            const Avancement = avancementFilter ? c.etatAvancement === avancementFilter : true;
            const Global = globalFilter ? c.etatGlobal === globalFilter : true;
            return Type && Avancement && Global;
        });

        this.currentPage = 1; 
        this.displayCurrentPage();
        this.updateStats();
    }

    async updateStats(): Promise<void> {
        const total = await this.getTotal();
        const ouvertes = await this.getOuvertes();
        const enCours = await this.getEnCours();
        const fermees = await this.getFermees();

        const elements = {
            total: document.querySelector("#total-cargaison"),
            ouvertes: document.querySelector("#cargaison-ouverte"),
            enCours: document.querySelector("#cargaison-enCour"),
            fermees: document.querySelector("#cargaison-fermee")
        };

        if (elements.total) elements.total.textContent = total.toString();
        if (elements.ouvertes) elements.ouvertes.textContent = ouvertes.toString();
        if (elements.enCours) elements.enCours.textContent = enCours.toString();
        if (elements.fermees) elements.fermees.textContent = fermees.toString();
    }

    private showStatusModal(numero: string, nouvelEtat: string, type: 'success' | 'error' = 'success', message?: string): void {
        const modal = document.getElementById('status-modal');
        const icon = document.getElementById('status-icon');
        const messageEl = document.getElementById('status-message');
        const details = document.getElementById('status-details');
        const modalContent = modal?.querySelector('div');

        if (modal && icon && messageEl && details && modalContent) {
            const colorClasses = type === 'success' 
                ? {
                    bg: nouvelEtat === 'OUVERT' ? 'bg-green-500/20' : 'bg-red-500/20',
                    border: nouvelEtat === 'OUVERT' ? 'border-green-500/30' : 'border-red-500/30',
                    text: nouvelEtat === 'OUVERT' ? 'text-green-400' : 'text-red-400'
                  }
                : {
                    bg: 'bg-yellow-500/20',
                    border: 'border-yellow-500/30',
                    text: 'text-yellow-400'
                  };

            modalContent.className = `bg-gray-800/95 backdrop-blur-sm border ${colorClasses.border} rounded-2xl p-6 transform scale-95 transition-transform duration-300 flex items-center space-x-4 shadow-xl`;
            icon.className = `fas ${type === 'success' 
                ? (nouvelEtat === 'OUVERT' ? 'fa-lock-open' : 'fa-lock')
                : 'fa-exclamation-triangle'} text-2xl ${colorClasses.text}`;
            
            messageEl.className = `text-white font-semibold ${colorClasses.text}`;
            messageEl.textContent = type === 'success' 
                ? `Cargaison ${nouvelEtat.toLowerCase()}e`
                : "Action impossible";
                
            details.textContent = message || `La cargaison ${numero} a été ${nouvelEtat.toLowerCase()}e avec succès`;

            modal.classList.remove('opacity-0', 'pointer-events-none');
            modal.classList.add('opacity-100');
            
            setTimeout(() => {
                modal.classList.add('opacity-0', 'pointer-events-none');
                modal.classList.remove('opacity-100');
            }, 3000);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const fetcher = new CargaisonFetcher();
    fetcher.displayCargaisons();
    fetcher.updateStats();
    
    const filters = ["type-filter", "etat-filter", "global-filter"];
    filters.forEach(id => {
        document.getElementById(id)?.addEventListener("change", () => {
            fetcher.filtrerParStatus();
        });
    });
});