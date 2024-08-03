import { expect } from 'chai';
import BienMateriel from '../models/possessions/BienMateriel.js';

describe('BienMateriel', () => {
  const possesseur = 'John Doe';
  const libelle = 'Voiture';
  const valeur = 20000;
  const dateDebut = new Date('2024-01-01');
  const dateFin = new Date('2030-01-01');
  const tauxAmortissement = 10;

  it('should initialize properly', () => {
    const bienMateriel = new BienMateriel(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement);
    expect(bienMateriel.possesseur).to.equal(possesseur);
    expect(bienMateriel.libelle).to.equal(libelle);
    expect(bienMateriel.valeur).to.equal(valeur);
    expect(bienMateriel.dateDebut).to.eql(dateDebut);
    expect(bienMateriel.dateFin).to.eql(dateFin);
    expect(bienMateriel.tauxAmortissement).to.equal(tauxAmortissement);
  });

  it('should return value after amortissement', () => {
    const bienMateriel = new BienMateriel(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement);
    const date = new Date('2026-01-01');
    const expectedValue = 16000; // 20000 - (20000 * 2 * 10 / 100)
    expect(bienMateriel.getValeur(date)).to.equal(expectedValue);
  });
});
