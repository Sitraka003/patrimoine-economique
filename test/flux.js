import { describe, it } from "mocha";
import { assert } from "chai";
import Personne from "../models/Personne.js";
import Patrimoine from "../models/Patrimoine.js";
//import BienMateriel from "../models/possessions/BienMateriel.js";
import Flux from "../models/possessions/Flux.js";
import Possession from "../models/possessions/Possession.js";

let john = new Personne("John Doe");

describe("this test help to test Flux class",()=>{

    const salaire = new Flux(john,"maison",500_000,new Date("2020-5-5"),null,null,3);
    const traindevie = new Flux(john,"maison",-500_000,new Date("2020-5-5"),null,null,3)
    it("should return 'maison'",()=>{
        assert.equal(salaire.libelle,"maison");
    })

    it("should return the value of maison after 10 years at 3",()=>{
        assert.equal(salaire.getValeur(new Date("2024-6-3")),24_500_000);
    })

    it("should return the value of maison after 10 years at 2",()=>{
        assert.equal(salaire.getValeur(new Date("2024-6-2")),24_500_000);
    })

    it("should return the value of maison after 10 years",()=>{
        assert.equal(traindevie.getValeur(new Date("2024-6-15")),-24_500_000);
    })

});