import { expect } from 'chai';
import { Possession } from '../models/Possession.js';

describe('Possession', () => {
  it('should have a name', () => {
    const possession = new Possession('Maison', 100000);
    expect(possession.nom).to.equal('Maison');
  });

  it('should have a value', () => {
    const possession = new Possession('Voiture', 20000);
    expect(possession.valeur).to.equal(20000);
  });

  it('should display possession information correctly', () => {
    const possession = new Possession('Appartement', 50000);
    expect(possession.toString()).to.equal('Appartement (valeur: 50000)');
  });

  it('should throw an error if the value is negative', () => {
    expect(() => new Possession('Maison', -100000)).to.throw(Error, 'La valeur de la possession doit être positive');
  });
});