import { describe } from "mocha";
import { Personne } from "../models/Personne.js";
import { assert } from "chai";
import { Argent } from "../models/typeOfPossessions/Argent.js";
import { BienMateriel } from "../models/typeOfPossessions/BienMateriel.js";

describe("Tester si les amortissements(tauxDepreciationAnnuel, tauxAnnuel) sont bien appliqués aux montants fournies en fonction des dates données dans getValeur", () => {
    describe("tester getValeur dans BienMateriel", () => {
        it("doit diminuer le montant si on fournit une date ultérieur", () => {
            const rakoto = new Personne("Rakoto");
            const ordinateur = new BienMateriel(rakoto, 'ordinateur', 2_000_000, '2021-02-03', 10);
            const calculMathematique = 1_386_097.97;
            assert.closeTo( ordinateur.getValeur('2024-07-28'), calculMathematique, 1000)
        })
    });

    describe("tester getValeur dans Argent", () => {
        it("doit augmenter le montant si on fournit une date ultérieur", () => {
            const rakoto = new Personne("Rakoto");
            const compteEpargne = new Argent(rakoto, 'compte_epargne', 20000, null, 0, 0, '2023-06-01', 5);
            const calculMathematique = 21160;
            assert.closeTo( compteEpargne.getValeur('2024-07-28'), calculMathematique, 100)
        })
    })
})