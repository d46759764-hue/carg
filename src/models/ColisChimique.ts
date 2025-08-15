import { Colis } from "@/models/Colis";
import { EtatAvancement } from "@/ApiLeaflet";
import { EtatColis } from "@/enumsColis/EtatColis";

export class ColisChimique extends Colis {
    private _degreToxicite: number;

    constructor(
        libelle: string,
        poids: number,
        codeDeSuivi: string,
        lieuDepart: string,
        lieuArrivee: string,
        degreToxicite: number,
        etatAvancement: EtatAvancement = EtatAvancement.EN_COURS,
        etatColis: EtatColis = EtatColis.ARCHIVE,
        dateDepart: Date = new Date(),
        dateArrivee: Date = new Date()
    ) {
        super(libelle, poids, codeDeSuivi, lieuDepart, lieuArrivee, etatAvancement, etatColis, dateDepart, dateArrivee);
        this._degreToxicite = degreToxicite;
    }

    // Getter pour le degré de toxicité
    get degreToxicite(): number {
        return this._degreToxicite;
    }

    // Setter pour le degré de toxicité
    set degreToxicite(degre: number) {
        this._degreToxicite = degre;
    }
}