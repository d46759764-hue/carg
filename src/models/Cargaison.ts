import { EtatAvancement } from '../enumsCargaison/EtatAvancement';
import { EtatGlobal } from '../enumsCargaison/EtatGlobal';
import { TypeCargaison } from "../enumsCargaison/TypeCargaison";
import { ICargaison, ILieu, IColis } from "./Icargaison";  
import { CalculFrais } from '../services/CalculFrais';
import { Colis } from './Colis';

export class Cargaison implements ICargaison {
   private _id: string;
   private _numero: string;
   private _poidsMax: number;
   private _distance: number;
   private _lieuDepart: ILieu;
   private _lieuArrivee: ILieu;
   private _type: TypeCargaison;
   private _etatAvancement: EtatAvancement;
   private _etatGlobal: EtatGlobal;
   private _dateDepart: Date;
   private _dateArrivee: Date;
   private _colis: IColis[]; 

   constructor(data: Partial<ICargaison>) {
    this._id = data.id || data.numero || ""
    this._numero = data.numero || ""
    this._poidsMax = data.poidsMax || 0
    this._distance = data.distance || 0
    this._lieuDepart = data.lieuDepart || { nom: "", latitude: 0, longitude: 0, pays: "" }
    this._lieuArrivee = data.lieuArrivee || { nom: "", latitude: 0, longitude: 0, pays: "" }
    this._type = data.type || TypeCargaison.AERIEN
    this._etatAvancement = data.etatAvancement || EtatAvancement.EN_ATTENTE
    this._etatGlobal = data.etatGlobal || EtatGlobal.OUVERT
    this._dateDepart = this.parseDate(data.dateDepart) || new Date()
    this._dateArrivee = this.parseDate(data.dateArrivee) || new Date()
    this._colis = data.colis || []
   }

   private parseDate(date: string | Date | undefined): Date {
    if (!date) return new Date();
    if (date instanceof Date) return date;
    return new Date(date);
   }

   get id(): string {
     return this._id;
   }
   set id(id: string) {
     this._id = id;
   }

   get numero(): string {
     return this._numero;
   }
   set numero(numero: string) {
     this._numero = numero;
   }

   get poidsMax(): number {
     return this._poidsMax;
   }
   set poidsMax(poidsMax: number) {
     this._poidsMax = poidsMax;
   }

   get distance(): number {
     return this._distance;
   }
   set distance(distance: number) {
     this._distance = distance;
   }

   get lieuDepart(): ILieu {
     return this._lieuDepart;
   }
   set lieuDepart(lieuDepart: ILieu) {
     this._lieuDepart = lieuDepart;
   }

   get lieuArrivee(): ILieu {
     return this._lieuArrivee;
   }
   set lieuArrivee(lieuArrivee: ILieu) {
     this._lieuArrivee = lieuArrivee;
   }

   get type(): TypeCargaison {
     return this._type;
   }
   set type(type: TypeCargaison) {
     this._type = type;
   }

   get etatAvancement(): EtatAvancement {
     return this._etatAvancement;
   }
   set etatAvancement(etatAvancement: EtatAvancement) {
     this._etatAvancement = etatAvancement;
   }

   get etatGlobal(): EtatGlobal {
     return this._etatGlobal;
   }
   set etatGlobal(etatGlobal: EtatGlobal) {
     this.changerEtat(etatGlobal);
   }

   get dateDepart(): Date {
     return this._dateDepart;
   }
   set dateDepart(dateDepart: Date | string) {
     this._dateDepart = this.parseDate(dateDepart);
   }

   get dateArrivee(): Date {
     return this._dateArrivee;
   }
   set dateArrivee(dateArrivee: Date | string) {
     this._dateArrivee = this.parseDate(dateArrivee);
   }

   get colis(): IColis[] { 
     return this._colis;
   }
   set colis(colis: IColis[]) { 
     this._colis = colis;
   }

   public fermer(): void {
    this.etatGlobal = EtatGlobal.FERME;
   }

   public rouvrir(): void {
    if (this.etatAvancement === EtatAvancement.EN_ATTENTE) {
        this.etatGlobal = EtatGlobal.OUVERT; 
    } else {
        throw new Error("Impossible d'ouvrir cette cargaison car son état d'avancement n'est pas EN_ATTENTE");
    }
   }

   public ajouterColis(colis: IColis): void { 
    if (this._colis.length >= 10) {
        throw new Error("La cargaison est pleine (maximum 10 colis)");
    }

    if (!CalculFrais.verifierCompatibilite(this._type, colis)) {
        throw new Error(`Ce type de colis n'est pas compatible avec une cargaison ${this._type}`);
    }

    this._colis.push(colis);
    this.calculerFraisTotal();
   }

   private calculerFraisTotal(): number {
        return this._colis.reduce((total, colis) => {
            return total + CalculFrais.calculerFraisTransport(this._type, colis, this._distance);
        }, 0);
   }

   public nbColis(): number {
        return this._colis.length;
   }

   public async sauvegarder(): Promise<void> {
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
    } catch (error) {
        console.error("Erreur lors de la sauvegarde:", error);
        throw error;
    }
   }

   private toJSON(): object {
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

   public static fromFormData(formData: any): Cargaison {
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

   public changerEtat(nouvelEtat: EtatGlobal): void {
        if (nouvelEtat === EtatGlobal.OUVERT) {
            if (this._etatAvancement !== EtatAvancement.EN_ATTENTE) {
                throw new Error("Impossible de rouvrir une cargaison si son état d'avancement n'est pas EN_ATTENTE");
            }
        }
        this._etatGlobal = nouvelEtat;
    }
}