import { EtatAvancement } from "@/ApiLeaflet";
import { ColisMateriel } from "./ColisMateriel";
import { EtatColis } from "@/enumsColis/EtatColis";


export class ColisFragile extends ColisMateriel  {
  constructor(libelle: string, poids: number, codeDeSuivi: string, lieuDepart: string, lieuArrivee: string, etatAvancement: EtatAvancement, etatColis: EtatColis, dateDepart: Date, dateArrivee: Date ) {
    super(libelle, poids, codeDeSuivi, lieuDepart, lieuArrivee, etatAvancement, etatColis, dateDepart, dateArrivee);
  }

  
}

