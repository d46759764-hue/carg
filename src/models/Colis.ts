import { EtatAvancement } from "@/ApiLeaflet";
import { EtatColis } from "@/enumsColis/EtatColis";
import { IColis } from "./Icargaison";

export abstract class Colis implements IColis { 
    private _libelle: string;
    private _poids: number;
    private _codeDeSuivi: string;
    private _lieuDepart: string;
    private _lieuArrivee: string;
    private _etatAvancement: EtatAvancement;
    private _etatColis: EtatColis;
    private _dateDepart: Date;
    private _dateArrivee: Date;

    constructor(
        libelle: string,
        poids: number,
        codeDeSuivi: string,
        lieuDepart: string,
        lieuArrivee: string,
        etatAvancement: EtatAvancement = EtatAvancement.EN_COURS,
        etatColis: EtatColis = EtatColis.ARCHIVE,
        dateDepart: Date = new Date(),
        dateArrivee: Date = new Date()
    ) {
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

    getLibelle(): string { return this._libelle; }
    getPoids(): number { return this._poids; }
    getCodeDeSuivi(): string { return this._codeDeSuivi; }
    getLieuDepart(): string { return this._lieuDepart; }
    getLieuArrivee(): string { return this._lieuArrivee; }
    getEtatAvancement(): EtatAvancement { return this._etatAvancement; }
    getEtatColis(): EtatColis { return this._etatColis; }
    getDateDepart(): Date { return this._dateDepart; }
    getDateArrivee(): Date { return this._dateArrivee; }

    setLibelle(libelle: string): void { this._libelle = libelle; }
    setPoids(poids: number): void { this._poids = poids; }
    setCodeDeSuivi(code: string): void { this._codeDeSuivi = code; }
    setLieuDepart(lieu: string): void { this._lieuDepart = lieu; }
    setLieuArrivee(lieu: string): void { this._lieuArrivee = lieu; }
    setEtatAvancement(etat: EtatAvancement): void { this._etatAvancement = etat; }
    setEtatColis(etat: EtatColis): void { this._etatColis = etat; }
    setDateDepart(date: Date): void { this._dateDepart = date; }
    setDateArrivee(date: Date): void { this._dateArrivee = date; }

    get libelle(): string { return this._libelle; }
    get poids(): number { return this._poids; }
    get codeDeSuivi(): string { return this._codeDeSuivi; }
    get lieuDepart(): string { return this._lieuDepart; }
    get lieuArrivee(): string { return this._lieuArrivee; }
    get etatAvancement(): EtatAvancement { return this._etatAvancement; }
    get etatColis(): EtatColis { return this._etatColis; }
    get dateDepart(): Date { return this._dateDepart; }
    get dateArrivee(): Date { return this._dateArrivee; }

    set libelle(libelle: string) { this._libelle = libelle; }
    set poids(poids: number) { this._poids = poids; }
    set codeDeSuivi(code: string) { this._codeDeSuivi = code; }
    set lieuDepart(lieu: string) { this._lieuDepart = lieu; }
    set lieuArrivee(lieu: string) { this._lieuArrivee = lieu; }
    set etatAvancement(etat: EtatAvancement) { this._etatAvancement = etat; }
    set etatColis(etat: EtatColis) { this._etatColis = etat; }
    set dateDepart(date: Date) { this._dateDepart = date; }
    set dateArrivee(date: Date) { this._dateArrivee = date; }
}