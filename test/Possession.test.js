import { expect } from 'chai';
import Possession from '../models/possessions/Possession.js';

describe('Possession', () => {
  const possesseur = 'John Doe';
  const libelle = 'Voiture';
  const valeur = 20000;
  const dateDebut = new Date('2024-01-01');
  const dateFin = new Date('2030-01-01');
  const tauxAmortissement = 10;

  it('should initialize properly', () => {
    const possession = new Possession(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement);
    expect(possession.possesseur).to.equal(possesseur);
    expect(possession.libelle).to.equal(libelle);
    expect(possession.valeur).to.equal(valeur);
    expect(possession.dateDebut).to.eql(dateDebut);
    expect(possession.dateFin).to.eql(dateFin);
    expect(possession.tauxAmortissement).to.equal(tauxAmortissement);
  });

  it('should return value after amortissement', () => {
    const possession = new Possession(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement);
    const date = new Date('2026-01-01');
    const expectedValue = 16000; // 20000 - (20000 * 2 * 10 / 100)
    expect(possession.getValeur(date)).to.equal(expectedValue);
  });
});
