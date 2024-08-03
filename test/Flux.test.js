import { expect } from 'chai';
import Flux from '../models/possessions/Flux.js';

describe('Flux', () => {
  const possesseur = 'John Doe';
  const libelle = 'Salaire';
  const valeur = 1000;
  const dateDebut = new Date('2024-01-01');
  const dateFin = new Date('2025-01-01');
  const tauxAmortissement = 5;
  const jour = 1;

  it('should initialize properly', () => {
    const flux = new Flux(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement, jour);
    expect(flux.possesseur).to.equal(possesseur);
    expect(flux.libelle).to.equal(libelle);
    expect(flux.valeur).to.equal(valeur);
    expect(flux.dateDebut).to.eql(dateDebut);
    expect(flux.dateFin).to.eql(dateFin);
    expect(flux.jour).to.equal(jour);
  });

  it('should calculate total value correctly', () => {
    const flux = new Flux(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement, jour);
    const date = new Date('2024-06-01');
    const expectedValue = 5000; // 1000 * 5
    expect(flux.getValeur(date)).to.equal(expectedValue);
  });
});
