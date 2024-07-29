import { describe } from "mocha";
import { assert } from "chai";
import { Personne } from "../models/Personne.js";
import { Argent } from "../models/typeOfPossessions/Argent.js";

describe("tester la performance de getValeur dans Argent pour un compte courant", () => {
    it("doit être créditer par le salaire et débiter par le train de vie", () => {
        const rakoto = new Personne("Rakoto");
        const compteCourant = new Argent(rakoto, 'compte_courant', 0, '2024-02-01', 600000, 500000, null, 0);
        assert.equal(compteCourant.getValeur('2024-04-02'), (compteCourant.salaireMensuel - compteCourant.trainDeVieMensuel) * (4 - 2));
    });
    it("ne doit pas être encore débiter par le train de vie si la date donnée est un fin du mois", () => {
        const rakoto = new Personne("Rakoto");
        const compteCourant = new Argent(rakoto, 'compte_courant', 0, '2024-02-01', 600000, 500000, null, 0);
        assert.equal(compteCourant.getValeur('2024-02-29'), (compteCourant.getValeur('2024-02-01')+compteCourant.salaireMensuel)); 
    })
})