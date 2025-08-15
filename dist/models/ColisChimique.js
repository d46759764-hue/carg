import { Colis } from "@/models/Colis";
import { EtatAvancement } from "@/ApiLeaflet";
import { EtatColis } from "@/enumsColis/EtatColis";
export class ColisChimique extends Colis {
    constructor(libelle, poids, codeDeSuivi, lieuDepart, lieuArrivee, degreToxicite, etatAvancement = EtatAvancement.EN_COURS, etatColis = EtatColis.ARCHIVE, dateDepart = new Date(), dateArrivee = new Date()) {
        super(libelle, poids, codeDeSuivi, lieuDepart, lieuArrivee, etatAvancement, etatColis, dateDepart, dateArrivee);
        this._degreToxicite = degreToxicite;
    }
    // Getter pour le degré de toxicité
    get degreToxicite() {
        return this._degreToxicite;
    }
    // Setter pour le degré de toxicité
    set degreToxicite(degre) {
        this._degreToxicite = degre;
    }
}
