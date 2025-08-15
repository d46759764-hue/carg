import { EtatAvancement } from '../enumsCargaison/EtatAvancement';
import { EtatGlobal } from '../enumsCargaison/EtatGlobal';
import { TypeCargaison } from "../enumsCargaison/TypeCargaison";
import { CalculFrais } from '../services/CalculFrais';
export class Cargaison {
    constructor(data) {
        this._id = data.id || data.numero || "";
        this._numero = data.numero || "";
        this._poidsMax = data.poidsMax || 0;
        this._distance = data.distance || 0;
        this._lieuDepart = data.lieuDepart || { nom: "", latitude: 0, longitude: 0, pays: "" };
        this._lieuArrivee = data.lieuArrivee || { nom: "", latitude: 0, longitude: 0, pays: "" };
        this._type = data.type || TypeCargaison.AERIEN;
        this._etatAvancement = data.etatAvancement || EtatAvancement.EN_ATTENTE;
        this._etatGlobal = data.etatGlobal || EtatGlobal.OUVERT;
        this._dateDepart = this.parseDate(data.dateDepart) || new Date();
        this._dateArrivee = this.parseDate(data.dateArrivee) || new Date();
        this._colis = data.colis || [];
    }
    parseDate(date) {
        if (!date)
            return new Date();
        if (date instanceof Date)
            return date;
        return new Date(date);
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get numero() {
        return this._numero;
    }
    set numero(numero) {
        this._numero = numero;
    }
    get poidsMax() {
        return this._poidsMax;
    }
    set poidsMax(poidsMax) {
        this._poidsMax = poidsMax;
    }
    get distance() {
        return this._distance;
    }
    set distance(distance) {
        this._distance = distance;
    }
    get lieuDepart() {
        return this._lieuDepart;
    }
    set lieuDepart(lieuDepart) {
        this._lieuDepart = lieuDepart;
    }
    get lieuArrivee() {
        return this._lieuArrivee;
    }
    set lieuArrivee(lieuArrivee) {
        this._lieuArrivee = lieuArrivee;
    }
    get type() {
        return this._type;
    }
    set type(type) {
        this._type = type;
    }
    get etatAvancement() {
        return this._etatAvancement;
    }
    set etatAvancement(etatAvancement) {
        this._etatAvancement = etatAvancement;
    }
    get etatGlobal() {
        return this._etatGlobal;
    }
    set etatGlobal(etatGlobal) {
        this.changerEtat(etatGlobal);
    }
    get dateDepart() {
        return this._dateDepart;
    }
    set dateDepart(dateDepart) {
        this._dateDepart = this.parseDate(dateDepart);
    }
    get dateArrivee() {
        return this._dateArrivee;
    }
    set dateArrivee(dateArrivee) {
        this._dateArrivee = this.parseDate(dateArrivee);
    }
    get colis() {
        return this._colis;
    }
    set colis(colis) {
        this._colis = colis;
    }
    fermer() {
        this.etatGlobal = EtatGlobal.FERME;
    }
    rouvrir() {
        if (this.etatAvancement === EtatAvancement.EN_ATTENTE) {
            this.etatGlobal = EtatGlobal.OUVERT;
        }
        else {
            throw new Error("Impossible d'ouvrir cette cargaison car son état d'avancement n'est pas EN_ATTENTE");
        }
    }
    ajouterColis(colis) {
        if (this._colis.length >= 10) {
            throw new Error("La cargaison est pleine (maximum 10 colis)");
        }
        if (!CalculFrais.verifierCompatibilite(this._type, colis)) {
            throw new Error(`Ce type de colis n'est pas compatible avec une cargaison ${this._type}`);
        }
        this._colis.push(colis);
        this.calculerFraisTotal();
    }
    calculerFraisTotal() {
        return this._colis.reduce((total, colis) => {
            return total + CalculFrais.calculerFraisTransport(this._type, colis, this._distance);
        }, 0);
    }
    nbColis() {
        return this._colis.length;
    }
    async sauvegarder() {
        try {
            const response = await fetch("http://localhost:3000/cargaisons", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.toJSON())
            });
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            const result = await response.json();
            console.log("Cargaison sauvegardée:", result);
        }
        catch (error) {
            console.error("Erreur lors de la sauvegarde:", error);
            throw error;
        }
    }
    toJSON() {
        return {
            id: this._id,
            numero: this._numero,
            poidsMax: this._poidsMax,
            type: this._type,
            distance: this._distance,
            lieuDepart: this._lieuDepart,
            lieuArrivee: this._lieuArrivee,
            dateDepart: this._dateDepart,
            dateArrivee: this._dateArrivee,
            etatAvancement: this._etatAvancement,
            etatGlobal: this._etatGlobal,
            colis: this._colis
        };
    }
    static fromFormData(formData) {
        return new Cargaison({
            id: formData.id,
            numero: formData.numero,
            poidsMax: formData.poidsMax,
            type: formData.type,
            distance: formData.distance,
            lieuDepart: formData.lieuDepart,
            lieuArrivee: formData.lieuArrivee,
            dateDepart: formData.dateDepart,
            dateArrivee: formData.dateArrivee,
            etatAvancement: formData.etatAvancement,
            etatGlobal: formData.etatGlobal,
            colis: formData.colis || []
        });
    }
    changerEtat(nouvelEtat) {
        if (nouvelEtat === EtatGlobal.OUVERT) {
            if (this._etatAvancement !== EtatAvancement.EN_ATTENTE) {
                throw new Error("Impossible de rouvrir une cargaison si son état d'avancement n'est pas EN_ATTENTE");
            }
        }
        this._etatGlobal = nouvelEtat;
    }
}
