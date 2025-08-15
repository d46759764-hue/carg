import { TypeCargaison } from "../enumsCargaison/TypeCargaison"
import { EtatAvancement } from '../enumsCargaison/EtatAvancement';
import { EtatGlobal } from "../enumsCargaison/EtatGlobal";
import { EtatColis } from "@/enumsColis/EtatColis";

export interface ILieu {
    nom: string;
    latitude: number;
    longitude: number;
    pays: string;
}

export interface IColis {
    getLibelle(): string;
    getPoids(): number;
    getCodeDeSuivi(): string;
    getLieuDepart(): string;
    getLieuArrivee(): string;
    getEtatAvancement(): EtatAvancement;
    getEtatColis(): EtatColis;
    getDateDepart(): Date;
    getDateArrivee(): Date;
}

export interface ICargaison {
    id?: string;
    numero: string;
    poidsMax: number;
    type: TypeCargaison;
    distance: number; 
    lieuDepart: ILieu; 
    lieuArrivee: ILieu;
    dateDepart: string | Date; 
    dateArrivee: string | Date; 
    etatAvancement: EtatAvancement;
    etatGlobal: EtatGlobal;
    colis: IColis[]; 
}