import { expect } from 'chai';
import Patrimoine from '../models/Patrimoine.js';
import Possession from '../models/possessions/Possession.js';

describe('Patrimoine', () => {
  const possesseur = 'John Doe';
  const possession1 = new Possession(possesseur, 'Voiture', 20000, new Date('2024-01-01'), new Date('2030-01-01'), 10);
  const possession2 = new Possession(possesseur, 'Maison', 300000, new Date('2024-01-01'), new Date('2040-01-01'), 5);
  const possessions = [possession1, possession2];

  it('should initialize properly', () => {
    const patrimoine = new Patrimoine(possesseur, possessions);
    expect(patrimoine.possesseur).to.equal(possesseur);
    expect(patrimoine.possessions).to.eql(possessions);
  });

  it('should calculate total value correctly', () => {
    const patrimoine = new Patrimoine(possesseur, possessions);
    const date = new Date('2026-01-01');
    const expectedValue = 260000; // 16000 (voiture) + 244000 (maison)
    expect(patrimoine.getValeur(date)).to.equal(expectedValue);
  });

  it('should add possession correctly', () => {
    const patrimoine = new Patrimoine(possesseur, []);
    patrimoine.addPossession(possession1);
    expect(patrimoine.possessions).to.include(possession1);
  });

  it('should remove possession correctly', () => {
    const patrimoine = new Patrimoine(possesseur, possessions);
    patrimoine.removePossession(possession1);
    expect(patrimoine.possessions).to.not.include(possession1);
  });
});
