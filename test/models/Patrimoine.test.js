import {expect} from 'chai';

import { Patrimoine } from '../../models/Patrimoine.js';
import {Personne} from "../../models/Personne.js";
import {Possession} from "../../models/Possession.js";

describe('Patrimoine tests', () => {
    const john = new Personne("John Doe")

    const _date = "2000-01-01"
    const _dateMonth = "2000-02-01"
    const _dateYear = "2001-01-01"

    const possession1 = new Possession(john, _date, "Possession 1", 50)
    const possession2 = new Possession(john, _date, "Possession 2", 100, 10)

    const patrimoine = new Patrimoine(john, _date, john)

    it('ajout de possession', () => {
        patrimoine.addPossession(possession1)
        patrimoine.addPossession(possession2)

        expect(patrimoine.possessions.length).to.not.equal(0);
    })
    it('suppression de possession', () => {
        patrimoine.removePossession(possession2)

        expect(patrimoine.possessions.includes(possession2)).to.equal(false);
    })
})

