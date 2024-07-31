import { expect } from 'chai';
import { Possession } from '../../models/Possession.js';
import { Personne } from '../../models/Personne.js';

describe('Possessions tests', () => {
    describe('Possession tests', () => {
        const possesseur = new Personne("Possesseur")

        const _date = "2000-01-01"
        const _dateYear = "2001-01-01"

        const possession1 = new Possession(possesseur, _date, "Possession 1", 50)
        const possession2 = new Possession(possesseur, _date, "Possession 2", 100, 10)

        it("calcul d'ammortissement par jour", () => {
            expect(possession1.getPerDayValeur()).to.equal(0);
            expect(possession2.getPerDayValeur()).to.equal(0.027397260273972605);
        });

        it("calcul d'ammortissement annuel", () => {
            expect(possession1.getInterestValue(_dateYear)).to.equal(0);
            expect(possession2.getInterestValue(_dateYear, true)).to.equal(10);
        })

        it("application d'ammortissement", () => {
            possession1.updateValeur(_dateYear, true);
            possession2.updateValeur(_dateYear, true);

            expect(possession1.valeur).to.equal(50);
            expect(possession2.valeur).to.equal(110);
        });
    })
})