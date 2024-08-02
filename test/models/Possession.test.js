import { expect } from 'chai';
import {Argent, Possession, Salaire} from '../../models/Possession.js';
import { Personne } from '../../models/Personne.js';
import {describe} from "mocha";

describe('Possessions tests', () => {
    const possesseur = new Personne("Possesseur")

    const _date = "2000-01-01"
    const _dateMonth = "2000-02-01"
    const _dateYear = "2001-01-01"
    const _dateDeceny = "2010-01-01"

    describe('Possession tests', () => {
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

            expect(possession1.valeur).to.equal(possession1.getValeur(_dateYear));
            expect(possession2.valeur).to.equal(110);
        });
    })
    describe('Argent tests', () => {

        it("test d'application de l'inflation", () => {
            const argent = new Argent(possesseur, 500, _date, 1);

            expect(argent.getValeur(_dateYear, true)).to.equal(495);
            expect(argent.getValeur(_dateDeceny, true)).to.equal(450);
        });
    })
    describe('Salaire tests', () => {
        const salaireValue = 1500;
        const salaire = new Salaire(possesseur, salaireValue, _date);

        it("salaire au jour d'embauche", () => {
            expect(salaire.getValeur(_date, true)).to.equal(0)
        });

        it("salaire après un mois", () => {
            expect(salaire.getValeur(_dateMonth, true)).to.equal(1550)
        })
    })
})