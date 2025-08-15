import { EtatAvancement } from "@/ApiLeaflet";
import { EtatColis } from "@/enumsColis/EtatColis";
export class Colis {
    constructor(libelle, poids, codeDeSuivi, lieuDepart, lieuArrivee, etatAvancement = EtatAvancement.EN_COURS, etatColis = EtatColis.ARCHIVE, dateDepart = new Date(), dateArrivee = new Date()) {
        this._libelle = libelle;
        this._poids = poids;
        this._codeDeSuivi = codeDeSuivi;
        this._lieuDepart = lieuDepart;
        this._lieuArrivee = lieuArrivee;
        this._etatAvancement = etatAvancement;
        this._etatColis = etatColis;
        this._dateDepart = dateDepart;
        this._dateArrivee = dateArrivee;
    }
    getLibelle() { return this._libelle; }
    getPoids() { return this._poids; }
    getCodeDeSuivi() { return this._codeDeSuivi; }
    getLieuDepart() { return this._lieuDepart; }
    getLieuArrivee() { return this._lieuArrivee; }
    getEtatAvancement() { return this._etatAvancement; }
    getEtatColis() { return this._etatColis; }
    getDateDepart() { return this._dateDepart; }
    getDateArrivee() { return this._dateArrivee; }
    setLibelle(libelle) { this._libelle = libelle; }
    setPoids(poids) { this._poids = poids; }
    setCodeDeSuivi(code) { this._codeDeSuivi = code; }
    setLieuDepart(lieu) { this._lieuDepart = lieu; }
    setLieuArrivee(lieu) { this._lieuArrivee = lieu; }
    setEtatAvancement(etat) { this._etatAvancement = etat; }
    setEtatColis(etat) { this._etatColis = etat; }
    setDateDepart(date) { this._dateDepart = date; }
    setDateArrivee(date) { this._dateArrivee = date; }
    get libelle() { return this._libelle; }
    get poids() { return this._poids; }
    get codeDeSuivi() { return this._codeDeSuivi; }
    get lieuDepart() { return this._lieuDepart; }
    get lieuArrivee() { return this._lieuArrivee; }
    get etatAvancement() { return this._etatAvancement; }
    get etatColis() { return this._etatColis; }
    get dateDepart() { return this._dateDepart; }
    get dateArrivee() { return this._dateArrivee; }
    set libelle(libelle) { this._libelle = libelle; }
    set poids(poids) { this._poids = poids; }
    set codeDeSuivi(code) { this._codeDeSuivi = code; }
    set lieuDepart(lieu) { this._lieuDepart = lieu; }
    set lieuArrivee(lieu) { this._lieuArrivee = lieu; }
    set etatAvancement(etat) { this._etatAvancement = etat; }
    set etatColis(etat) { this._etatColis = etat; }
    set dateDepart(date) { this._dateDepart = date; }
    set dateArrivee(date) { this._dateArrivee = date; }
}
