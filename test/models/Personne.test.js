import { expect } from 'chai';

import { Personne } from '../../models/Personne.js';

describe('Personne tests', () => {
    const johnName = "John Doe"
    const john = new Personne(johnName)

    it("creation d'une personne", () => {
        expect(typeof john !== 'undefined').to.be.true;
    })

    it("integrité des attributs", () => {
        expect(john.nom).to.equal(johnName)
    })
})