import { describe } from "mocha";
import { assert } from "chai";
import { Personne } from "../models/Personne.js";

describe("tester la classe Personne", () => {
    it("doit pouvoir être instancié", () => {
        const rakoto = new Personne("Rakoto")
        assert.equal("Rakoto", rakoto.nom)
    })
})