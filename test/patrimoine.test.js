import { describe } from "mocha";
import { assert } from "chai";
import { Possession } from "../models/Possession.js";
import { Personne } from "../models/Personne.js";
import { Patrimoine } from "../models/Patrimoine.js";
import { Argent } from "../models/typeOfPossessions/Argent.js";
import { BienMateriel } from "../models/typeOfPossessions/BienMateriel.js";
import { TrainDeVie } from "../models/typeOfPossessions/TrainDeVIe.js";

const ilo = new Personne('Ilo');

// Création des possessions
const especes = new Argent(ilo, 'especes', 400_000, 0, null,0 ,0, null, 0);
const compteEpargne = new Argent(ilo, 'compte_epargne', 20000, '2024-01-01', 0, 0, '2023-06-01', 5);
//salaire : 600 000ar
const compteCourant = new Argent(ilo, 'compte_courant', 0, '2024-01-01', 600000, 500000);
const ordinateur = new BienMateriel(ilo, 'ordinateur', 2000000, '2021-10-26', 10);
const effetsVestimentaires = new BienMateriel(ilo, 'effets_vestimentaires', 1000000, '2024-01-01', 20);
const trainDeVie = new TrainDeVie(ilo, 'train_de_vie', 500000);


describe("tester la classe Patrimoine", () => {
    it("doit pouvoir ajouter une possession dans l'attribut possessions de Patrimoine", () => {
        const patrimoine = new Patrimoine(ilo, '2024-05-13', [especes, compteEpargne, compteCourant, ordinateur,trainDeVie]);
        patrimoine.addPossession(effetsVestimentaires);
        assert.deepEqual(patrimoine.possessions, [especes, compteEpargne, compteCourant, ordinateur,trainDeVie, effetsVestimentaires])
    })
    it("doit pouvoir retirer une possession dans l'attribut possessions de Patrimoine", () => {
        const patrimoine = new Patrimoine(ilo, '2024-05-13', [especes, compteEpargne, compteCourant, ordinateur, effetsVestimentaires, trainDeVie]);
        patrimoine.removePossession(effetsVestimentaires)
        assert.deepEqual(patrimoine.possessions,[especes, compteEpargne, compteCourant, ordinateur,trainDeVie])
    })
    it("doit donner la valeur de toutes les possessions dans un patrimoine dans une date donnée", () => {
        const patrimoine = new Patrimoine(ilo, '2022-05-13', [especes, compteEpargne, compteCourant, ordinateur, effetsVestimentaires, trainDeVie]);
        const possessions = patrimoine.possessions;
        const resultatApproximatif = possessions
            .map(p => p = p.getValeur('2024-07-29'))
            .reduce((resultat, p) => resultat+p);

        assert.closeTo(patrimoine.getValeur('2024-07-29'), resultatApproximatif, 0.01)
    })
})