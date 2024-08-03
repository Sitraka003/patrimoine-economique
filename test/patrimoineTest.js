import { describe, it } from "mocha";
import { assert } from "chai";
import Personne from "../models/Personne.js";
import Patrimoine from "../models/Patrimoine.js";
//import BienMateriel from "../models/possessions/BienMateriel.js";
import Flux from "../models/possessions/Flux.js";
import Possession from "../models/possessions/Possession.js";

let john = new Personne("John Doe");

describe("test all about patrimoine class",()=>{
    const john = new Personne("John Doe");
    const bmwz23 = new Possession(john, "bmw z3", 100000, new Date("2012-03-12"), null, 0.30);
    const salaire = new Flux(john,"maison",500_000,new Date("2020-5-5"),null,null,3);
    const traindevie = new Flux(john,"maison",-300_000,new Date("2020-5-5"),null,null,3)
    const possessions = []
    const datedonnee = new Date("2024-2-2");
    //possessions.push(bmwz23);
    const johnPatrimoine  = new Patrimoine(john,possessions);
    johnPatrimoine.addPossession(bmwz23);
    johnPatrimoine.addPossession(salaire);
    johnPatrimoine.addPossession(traindevie);
    console.log(bmwz23.getValeur(datedonnee), salaire.getValeur(datedonnee), traindevie.getValeur(datedonnee));
    
    it("should return list of patrimoine",()=>{
        assert.equal(johnPatrimoine.getValeur(), 9096433)
    })
})