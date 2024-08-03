import { expect } from 'chai';
import Argent from '../models/possessions/Argent.js';
import { TYPE_ARGENT } from "../constante.js";


describe('Argent', () => {
  const possesseur = 'John Doe';
  const libelle = 'Compte Courant';
  const valeur = 1000;
  const dateDebut = new Date('2024-01-01');
  const dateFin = new Date('2025-01-01');
  const tauxAmortissement = 5;
  const type = 'Courant';

  it('should initialize properly', () => {
    const argent = new Argent(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement, type);
    expect(argent.possesseur).to.equal(possesseur);
    expect(argent.libelle).to.equal(libelle);
    expect(argent.valeur).to.equal(valeur);
    expect(argent.dateDebut).to.eql(dateDebut);
    expect(argent.dateFin).to.eql(dateFin);
    expect(argent.tauxAmortissement).to.equal(tauxAmortissement);
    expect(argent.type).to.equal(type);
  });

  it('should return 0 if date is out of range', () => {
    const argent = new Argent(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement, type);
    const date = new Date('2023-12-31');
    expect(argent.getValeur(date)).to.equal(0);
  });

  it('should return value if date is in range', () => {
    const argent = new Argent(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement, type);
    const date = new Date('2024-06-01');
    expect(argent.getValeur(date)).to.equal(valeur);
  });
});
