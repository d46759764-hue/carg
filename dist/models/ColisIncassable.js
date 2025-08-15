import { ColisMateriel } from "./ColisMateriel";
export class ColisIncassable extends ColisMateriel {
    constructor(libelle, poids, codeDeSuivi, lieuDepart, lieuArrivee, etatAvancement, etatColis, dateDepart, dateArrivee) {
        super(libelle, poids, codeDeSuivi, lieuDepart, lieuArrivee, etatAvancement, etatColis, dateDepart, dateArrivee);
    }
}
