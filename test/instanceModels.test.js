import { describe } from "mocha";
import { assert } from "chai";
import { Personne } from "../models/Personne.js";
import { Possession } from "../models/Possession.js";
import { Argent } from "../models/typeOfPossessions/Argent.js";
import { BienMateriel } from "../models/typeOfPossessions/BienMateriel.js";
import { TrainDeVie } from "../models/typeOfPossessions/TrainDeVIe.js";
import { Patrimoine } from "../models/Patrimoine.js";

describe("Tester l'instanciation de toutes les classes", () => {
    it("devrait créer une instance de Personne", () => {
        const rakoto = new Personne("Rakoto");
        assert.equal("Rakoto", rakoto.nom);
    });

    it("devrait créer une instance de Possession", () => {
        const rakoto = new Personne("Rakoto");
        const ordinateur = new Possession(rakoto, 'bien_materiel', 'ordinateur');
        assert.equal("ordinateur", ordinateur.libelle);
    });

    it("devrait créer une instance de Argent", () => {
        const rakoto = new Personne("Rakoto");
        const especes = new Argent(rakoto, 'especes', 400000);
        assert.equal(400000, especes.getValeur('2024-07-06'));
    });

    it("devrait créer une instance de BienMateriel", () => {
        const rakoto = new Personne("Rakoto");
        const ordinateur = new BienMateriel(rakoto, 'ordinateur', 2000000, '2021-10-26', 10);
        assert.equal(2000000, ordinateur.valeurInitiale);
    });

    it("devrait créer une instance de TrainDeVie", () => {
        const rakoto = new Personne("Rakoto");
        const trainDeVie = new TrainDeVie(rakoto, 'train_de_vie', 500000);
        assert.equal(500000, trainDeVie.getValeur('2024-07-06'));
    });

    it("devrait créer une instance de Patrimoine", () => {
        const rakoto = new Personne("Rakoto");
        const trainDeVie = new TrainDeVie(rakoto, 'train_de_vie', 500000);
        const especes = new Argent(rakoto, 'especes', 400000);
        const patrimoine = new Patrimoine(rakoto, '2024-05-13', [especes, trainDeVie]);
        assert.equal('2024-05-13', patrimoine.date);
    });
});