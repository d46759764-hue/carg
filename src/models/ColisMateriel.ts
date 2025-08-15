import { EtatAvancement } from "@/ApiLeaflet";
import { Colis } from "./Colis";
import { EtatColis } from "@/enumsColis/EtatColis";

export class ColisMateriel extends Colis {
  constructor(libelle: string, poids: number, codeDeSuivi: string, lieuDepart: string, lieuArrivee: string, etatAvancement: EtatAvancement, etatColis: EtatColis, dateDepart: Date, dateArrivee: Date ) {
    super(libelle, poids, codeDeSuivi, lieuDepart, lieuArrivee, etatAvancement, etatColis, dateDepart, dateArrivee);
  }

  
}
