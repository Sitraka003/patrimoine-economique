import Patrimoine from "../models/Patrimoine.js";
import Flux from "../models/Flux.js";

const dateDebut = new Date('2024-01-01');
const dateTest = new Date('2024-06-15');

const flux1 = new Flux('Alice', 'Salaire', 100000, dateDebut, dateDebut, null, 1);
const flux2 = new Flux('Alice', 'Investissement', 200000, dateDebut, dateDebut, null, 1);

const patrimoine = new Patrimoine('Alice', [flux1]);

test('Vérifie la valeur totale', () => {
  expect(patrimoine.getValeur(dateTest)).toBe(flux1.getValeur(dateTest));
});

test('Ajoute une possession', () => {
  patrimoine.addPossession(flux2);
  expect(patrimoine.possessions.length).toBe(2);
});

test('Empêche l\'ajout d\'une possession d\'autre possesseur', () => {
  const fluxAutre = new Flux('Bob', 'Dépense', 50000, dateDebut, dateDebut, null, 1);
  console.log = jest.fn();
  patrimoine.addPossession(fluxAutre);
  expect(console.log).toHaveBeenCalled();
});

test('Supprime une possession', () => {
  patrimoine.removePossession(flux1);
  expect(patrimoine.possessions.length).toBe(1);
});
