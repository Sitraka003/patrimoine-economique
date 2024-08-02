import { expect } from 'chai';
import Salaire from '../models/Salaire.js';
import { TYPE_ARGENT } from './constante.js';

describe('Salaire', () => {
  it('should create a new Salaire instance', () => {
    const salaire = new Salaire(5000, TYPE_ARGENT.Courant);
    expect(salaire.montant).to.equal(5000);
    expect(salaire.typeArgent).to.equal(TYPE_ARGENT.Courant);
  });

  it('should throw an error if montant is not a number', () => {
    expect(() => new Salaire('five thousand', TYPE_ARGENT.Courant)).to.throw(Error);
  });

  it('should throw an error if typeArgent is not a valid TYPE_ARGENT', () => {
    expect(() => new Salaire(5000, 'InvalidType')).to.throw(Error);
  });
});