import { describe, it } from "mocha";
import { assert } from "chai";
import Personne from "../models/Personne.js";
import Patrimoine from "../models/Patrimoine.js";
//import BienMateriel from "../models/possessions/BienMateriel.js";
import Flux from "../models/possessions/Flux.js";
import Possession from "../models/possessions/Possession.js";

let john = new Personne("John Doe");

describe("this test help to test Personne class",()=>{
    it("should return John Doe",()=>{
        assert.equal(john.getName(), "John Doe")
    })
})

describe("this test help to test Possesion class",()=>{

    const bmwz23 = new Possession(john, "bmw z3", 100000, new Date("2012-03-12"), null, 0.30);

    it("should return the possession's libelle (bmw z3)",()=>{
        assert.equal(bmwz23.libelle, "bmw z3");
    })

    it("should return the possession's possesseur(john)",()=>{
        assert.equal(bmwz23.getPossesseur(), john);
    })

    it("should return the possession's buying date (year-month)",()=>{
        assert.equal(bmwz23.getDateAchat().getFullYear() +"-"+ bmwz23.getDateAchat().getMonth(), "2012-2");
    })

    it("should return the possession's values with armortissement taux ",()=>{
        
        assert.equal(bmwz23.getValeur(new Date("2024-10-21")), 96218);
    })

    it("should return the possession's values with negative armortissement taux ",()=>{
        bmwz23.setAmortissement(-0.2);
        assert.equal(bmwz23.getValeur(new Date("2024-10-21")), 102522);
    })

})

describe("this test help to test Flux class",()=>{

    const salaire = new Flux(john,"maison",500_000,new Date("2020-5-5"),null,null,3);
    const traindevie = new Flux(john,"maison",-500_000,new Date("2020-5-5"),null,null,3)
    it("should return 'maison'",()=>{
        assert.equal(salaire.libelle,"maison");
    })

    it("should return the value of maison after 10 years",()=>{
        assert.equal(salaire.getValeur(new Date("2024-6-15")),24_500_000);
    })

    it("should return the value of maison after 10 years",()=>{
        assert.equal(traindevie.getValeur(new Date("2024-6-15")),-24_500_000);
    })

});

describe("test all about patrimoine class",()=>{
    const john = new Personne("John Doe");
    const bmwz23 = new Possession(john, "bmw z3", 100000, new Date("2012-03-12"), null, 0.30);
    const salaire = new Flux(john,"maison",500_000,new Date("2020-5-5"),null,null,3);
    const traindevie = new Flux(john,"maison",-300_000,new Date("2020-5-5"),null,null,3)
    const possessions = []
    //possessions.push(bmwz23);
    const johnPatrimoine  = new Patrimoine(john,possessions);
    johnPatrimoine.addPossession(bmwz23);
    johnPatrimoine.addPossession(salaire);
    johnPatrimoine.addPossession(traindevie);
    it("should return list of patrimoine",()=>{
        assert.equal(johnPatrimoine.getValeur( new Date("2024-2-2")), 9096433)
    })
})