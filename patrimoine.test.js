import { expect } from 'chai';
import Argent from './Argent.js';
import BienMateriel from './BienMateriel.js';
import TYPES from './Constant.js';
import Flux from './Flux.js';
import Patrimoine from './Patrimoine.js';
import Personne from './Personne.js';
import Possession from './Possession.js';

describe('Patrimoine', () => {
    it('should calculate the total value of possessions', () => {
        const personne = new Personne('John Doe');
        const possession1 = new Possession(personne, 'Car', 10000, new Date('2020-01-01'), new Date('2025-01-01'), 10);
        const possession2 = new Possession(personne, 'Bike', 500, new Date('2020-01-01'), new Date('2025-01-01'), 10);
        const patrimoine = new Patrimoine(personne, [possession1, possession2]);

        const date = new Date('2023-01-01');
        expect(patrimoine.getValeur(date)).to.equal(possession1.getValeur(date) + possession2.getValeur(date));
    });
});

describe('Possession', () => {
    it('should calculate the value after amortissement', () => {
        const possession = new Possession('John Doe', 'Car', 10000, new Date('2020-01-01'), new Date('2025-01-01'), 10);
        const date = new Date('2023-01-01');
        expect(possession.getValeur(date)).to.be.lessThan(10000);
    });
});

describe('Flux', () => {
    it('should calculate the total value of flux', () => {
        const flux = new Flux('John Doe', 'Salary', 1000, new Date('2020-01-01'), new Date('2025-01-01'), 0, 1);
        const date = new Date('2023-01-01');
        expect(flux.getValeur(date)).to.be.above(0);
    });
});

describe('BienMateriel', () => {
    it('should inherit and calculate value correctly', () => {
        const bienMateriel = new BienMateriel('John Doe', 'House', 50000, new Date('2020-01-01'), new Date('2025-01-01'), 5);
        const date = new Date('2023-01-01');
        expect(bienMateriel.getValeur(date)).to.be.lessThan(50000);
    });
});

describe('Argent', () => {
    it('should validate type and calculate value', () => {
        const argent = new Argent('John Doe', 'Savings', 10000, new Date('2020-01-01'), new Date('2025-01-01'), 0, TYPES.Epargne);
        const date = new Date('2023-01-01');
        expect(argent.getValeur(date)).to.equal(10000);
    });

    it('should throw an error for invalid type', () => {
        expect(() => new Argent('John Doe', 'Invalid', 10000, new Date('2020-01-01'), new Date('2025-01-01'), 0, 'InvalidType')).to.throw("Type d'argent invalide");
    });
});
