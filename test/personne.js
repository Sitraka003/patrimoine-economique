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