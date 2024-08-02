import { describe, it } from "mocha";
import { expect } from "chai";
import { default as Possession } from "./models/possessions/Possession.js";
import { default as BienMateriel } from "./models/possessions/BienMateriel.js";
import { default as Argent } from './models/possessions/Argent.js';

const possession = new Possession("Ilo", "argent espece", 2_000_000, new Date(2024, 4, 13), new Date(2024, 12, 13), 10);
const bienMateriel = new BienMateriel("Ilo", "Bien Materiel", 500_000, new Date(2024, 4, 13), new Date(2024, 12, 13), 10);
const argent = new Argent("Ilo", "Espece", 400_000, new Date(2024, 4, 13), new Date(2024, 12, 13), 10, "Espece");

describe("Test fonction du patrimoine", () => {
    describe("fonction dans Possesion", () => {
        it(" fonction getValeurApresAmortissement()", () => {
            expect(possession.getValeurApresAmortissement(new Date(2024, 5, 13))).to.be.equal(1983333);
        });
        it(" fonction getValeur()", () => {
            expect(possession.getValeur(new Date(2024, 5, 13))).to.be.equal(1983333);
        });
    });
    describe("fonction dans BienMateriel", () => {
        it(" fonction getValeur()", () => {
            expect(bienMateriel.getValeur(new Date(2024, 5, 13))).to.be.equal(495833);
        });
    });
    describe("fonction dans Argent", () => {
        it(" fonction getValeur()", () => {
            expect(argent.getValeur(new Date(2024, 5, 13))).to.be.equal(400000);
        });
    });
});