import { EtatAvancement } from "@/ApiLeaflet";
import { TypeColis } from "@/enums/TypeColis";
import { EtatColis } from "@/enumsColis/EtatColis";

export interface IColis {
  id?: string;
  libelle: string;
  poids: number;
  type: TypeColis;
  codeDeSuivi?: string;
  etatAvancement: EtatAvancement;
  etatColis: EtatColis;
  dateCreation?: Date;
}