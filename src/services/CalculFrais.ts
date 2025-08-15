import { TypeCargaison } from "@/enumsCargaison/TypeCargaison";
import { IColis } from "@/models/Icargaison"; 
import { ColisAlimentaire } from "@/models/ColisAlimentaire";
import { ColisChimique } from "@/models/ColisChimique";
import { ColisFragile } from "@/models/ColisFragile";
import { ColisMateriel } from "@/models/ColisMateriel";

export class CalculFrais {
    static calculerFraisTransport(typeCargaison: TypeCargaison, colis: IColis, distance: number): number {
        switch (typeCargaison) {
            case TypeCargaison.MARITIME:
                return this.calculerFraisMaritime(colis, distance);
            case TypeCargaison.AERIEN:
                return this.calculerFraisAerien(colis, distance);
            case TypeCargaison.ROUTIER:
                return this.calculerFraisRoutier(colis, distance);
            default:
                return 0;
        }
    }

    private static calculerFraisMaritime(colis: IColis, distance: number): number {
        const FRAIS_BASE = 5000;
        let frais = 0;

        if (colis instanceof ColisFragile) {
            throw new Error("Les colis fragiles ne peuvent pas être transportés par voie maritime");
        }

        if (colis instanceof ColisAlimentaire) {
            frais = colis.getPoids() * distance * 90;
        } else if (colis instanceof ColisChimique) {
            frais = colis.getPoids() * 500 * (colis as ColisChimique).degreToxicite + 10000;
        } else if (colis instanceof ColisMateriel) {
            frais = colis.getPoids() * distance * 400;
        }

        return Math.max(10000, FRAIS_BASE + frais);
    }

    private static calculerFraisAerien(colis: IColis, distance: number): number {
        let frais = 0;

        if (colis instanceof ColisChimique) {
            throw new Error("Les colis chimiques ne peuvent pas être transportés par voie aérienne");
        }

        if (colis instanceof ColisAlimentaire) {
            frais = colis.getPoids() * distance * 300;
        } else if (colis instanceof ColisMateriel) {
            frais = colis.getPoids() * distance * 1000;
        }

        return Math.max(10000, frais);
    }

    private static calculerFraisRoutier(colis: IColis, distance: number): number {
        let frais = 0;

        if (colis instanceof ColisChimique) {
            throw new Error("Les colis chimiques ne peuvent pas être transportés par voie routière");
        }

        if (colis instanceof ColisAlimentaire) {
            frais = colis.getPoids() * distance * 100;
        } else if (colis instanceof ColisMateriel) {
            frais = colis.getPoids() * distance * 200;
        }

        return Math.max(10000, frais);
    }

    static verifierCompatibilite(typeCargaison: TypeCargaison, colis: IColis): boolean {
        if (typeCargaison === TypeCargaison.MARITIME) {
            return !(colis instanceof ColisFragile);
        }

        if (typeCargaison === TypeCargaison.AERIEN) {
            return !(colis instanceof ColisChimique);
        }

        return true;
    }
}