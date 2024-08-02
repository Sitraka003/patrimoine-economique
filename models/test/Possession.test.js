import Possession from "../models/Possession.js";

const dateDebut = new Date('2024-01-01');
const dateTest = new Date('2024-06-15');
const tauxAmortissement = 5;

const possession = new Possession('Alice', 'Voiture', 100000, dateDebut, dateDebut, tauxAmortissement);

test('Vérifie la valeur après amortissement', () => {
  expect(possession.getValeur(dateTest)).toBe(100000 - (100000 * (5 * 0.5 + 0.5 / 12 + 0.5 / 365) / 100));
});
