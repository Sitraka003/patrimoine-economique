import { expect } from 'chai';
import Patrimoine from '../models/Patrimoine.js';
import Possession from '../models/Possession.js';
import Personne from '../models/Personne.js'
import { TYPE_ARGENT } from './constante.js';

describe('Patrimoine', () => {
  it('devrait créer un patrimoine avec un possesseur et des possessions', () => {
    const personne = new Personne('Jean');
    const possession1 = new Possession(personne, TYPE_ARGENT.Epargne, 'Compte épargne', 1000);
    const possession2 = new Possession(personne, TYPE_ARGENT.Courant, 'Compte courant', 500);
    const patrimoine = new Patrimoine(personne, new Date(), [possession1, possession2]);
    expect(patrimoine.possesseur).to.equal(personne);
    expect(patrimoine.possessions).to.deep.equal([possession1, possession2]);
  });

  it('devrait ajouter une possession au patrimoine', () => {
    const personne = new Personne('Jean');
    const possession1 = new Possession(personne, TYPE_ARGENT.Epargne, 'Compte épargne', 1000);
    const patrimoine = new Patrimoine(personne, new Date(), [possession1]);
    const possession2 = new Possession(personne, TYPE_ARGENT.Courant, 'Compte courant', 500);
    patrimoine.addPossession(possession2);
    expect(patrimoine.possessions).to.deep.equal([possession1, possession2]);
  });

  it('devrait supprimer une possession du patrimoine', () => {
    const personne = new Personne('Jean');
    const possession1 = new Possession(personne, TYPE_ARGENT.Epargne, 'Compte épargne', 1000);
    const possession2 = new Possession(personne, TYPE_ARGENT.Courant, 'Compte courant', 500);
    const patrimoine = new Patrimoine(personne, new Date(), [possession1, possession2]);
    patrimoine.removePossession(possession1);
    expect(patrimoine.possessions).to.deep.equal([possession2]);
  });

  it('devrait calculer l\'amortissement du patrimoine', () => {
    const personne = new Personne('Jean');
    const possession1 = new Possession(personne, TYPE_ARGENT.Epargne, 'Compte épargne', 1000);
    const possession2 = new Possession(personne, TYPE_ARGENT.Courant, 'Compte courant', 500);
    const patrimoine = new Patrimoine(personne, new Date(), [possession1, possession2]);
    const amortissement = patrimoine.calculerAmortissement();
    expect(amortissement).to.equal(150);
  });
});