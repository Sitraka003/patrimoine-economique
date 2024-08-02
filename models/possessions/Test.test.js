import { expect } from 'chai';
import Argent from './Argent.js';
import TYPE_ARGENT from '../../constante.js';
import BienMateriel from './BienMateriel.js';
import Flux from './Flux.js';
import Possession from './Possession.js';

//Argent.js -> test
describe('Argent', () => {
    it('devrait créer une instance d\'argent avec des valeurs valides', () => {
        const possesseur = 'Rakotoarsion Kely';
        const libelle = 'Argent liquide';
        const valeur = 10000;
        const dateDebut = new Date('2024-01-01');
        const dateFin = new Date('2024-12-31');
        const tauxAmortissement = 0.2;
        const type = TYPE_ARGENT.Courant;

        const argent = new Argent(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement, type);

        expect(argent.possesseur).to.equal(possesseur);
        expect(argent.libelle).to.equal(libelle);
        expect(argent.valeur).to.equal(valeur);
        expect(argent.dateDebut).to.eql(dateDebut);
        expect(argent.dateFin).to.eql(dateFin);
        expect(argent.tauxAmortissement).to.equal(tauxAmortissement);
        expect(argent.type).to.equal(type);
    });
});

//BienMateriel.js -> test
describe('BienMateriel', () => {
    it('devrait créer une instance de bien materiel avec des valeurs valides', () => {
        const possesseur = 'Fanantenana Ny Aina';
        const libelle = 'Iphone 14';
        const valeur = 15000000;
        const dateDebut = new Date('2024-01-01');
        const dateFin = new Date('2025-12-31');
        const tauxAmortissement = 0.2;

        const bienMateriel = new BienMateriel(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement);

        expect(bienMateriel.possesseur).to.equal(possesseur);
        expect(bienMateriel.libelle).to.equal(libelle);
        expect(bienMateriel.valeur).to.equal(valeur);
        expect(bienMateriel.dateDebut).to.eql(dateDebut);
        expect(bienMateriel.dateFin).to.eql(dateFin);
        expect(bienMateriel.tauxAmortissement).to.equal(tauxAmortissement);
    });
});

//Flux.js -> test
describe('Flux', () => {
  it('devrait créer une instance de flux avec des valeurs valides', () => {
    const possesseur = 'Fana Rax';
    const libelle = 'Bourse scolaire';
    const valeur = 400000;
    const dateDebut = new Date('2024-01-01');
    const dateFin = new Date('2025-12-31');
    const tauxAmortissement = 0.2;
    const jour = 1;

    const flux = new Flux(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement, jour);

    expect(flux.possesseur).to.equal(possesseur);
    expect(flux.libelle).to.equal(libelle);
    expect(flux.valeur).to.equal(valeur);
    expect(flux.dateDebut).to.eql(dateDebut);
    expect(flux.dateFin).to.eql(dateFin);
    expect(flux.tauxAmortissement).to.equal(tauxAmortissement);
    expect(flux.jour).to.equal(jour);
  });
});

//Possesion.js -> test
describe('Possession', () => {
  it('devrait créer une instance de possession avec des valeurs valides', () => {
    const possesseur = 'Fanantenana Ny Aina';
    const libelle = 'PS5';
    const valeur = 20000000;
    const dateDebut = new Date('2024-01-01');
    const dateFin = new Date('2026-12-31');
    const tauxAmortissement = 0.2;

    const possession = new Possession(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement);

    expect(possession.possesseur).to.equal(possesseur);
    expect(possession.libelle).to.equal(libelle);
    expect(possession.valeur).to.equal(valeur);
    expect(possession.dateDebut).to.eql(dateDebut);
    expect(possession.dateFin).to.eql(dateFin);
    expect(possession.tauxAmortissement).to.equal(tauxAmortissement);
  });
});
