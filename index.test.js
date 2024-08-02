import { describe, it } from "mocha";
import { expect } from "chai";
import { default as Possession } from "./models/possessions/Possession.js";
import { default as BienMateriel } from "./models/possessions/BienMateriel.js";
import { default as Argent } from './models/possessions/Argent.js';
import { default as Patrimoine } from './models/Patrimoine.js';
import { default as Flux } from './models/possessions/Flux.js';

const possession = new Possession("Ilo", "argent espece", 2_000_000, new Date(2024, 4, 13), new Date(2024, 12, 13), 10);
const bienMateriel = new BienMateriel("Ilo", "Bien Materiel", 500_000, new Date(2024, 4, 13), new Date(2024, 12, 13), 10);
const argent = new Argent("Ilo", "Espece", 400_000, new Date(2024, 4, 13), new Date(2024, 12, 13), 10, "Espece");
const patrimoine = new Patrimoine("Ilo", [possession, bienMateriel, argent]);
const flux = new Flux("Ilo", "effets vestimentaires", 1_000_000, new Date(2024, 4, 13), new Date(2024, 12, 13), 20, 1);

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
    describe("fonction dans Patrimoine", () => {
        it(" fonction getValeur()", () => {
            expect(patrimoine.getValeur(new Date(2024, 5, 13))).to.be.equal(2879166);
        });
        it(" fonction addPossession()", () => {
            expect(patrimoine.addPossession(possession)).to.be.equal("Possession ajouter");
        });
        it(" fonction removePossession()", () => {
            expect(patrimoine.removePossession(possession)).to.be.equal("Possession retirer");
        });
    });
    describe("fonction dans Flux", () => {
        it(" fonction getValeur()", () => {
            expect(flux.getValeur(new Date(2024, 5, 13))).to.be.equal(1000000);
        });
    });
});