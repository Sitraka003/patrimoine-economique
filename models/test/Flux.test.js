import Flux from "../models/Flux.js";


const dateDebut = new Date('2024-01-01');
const dateFin = new Date('2024-12-31');
const montant = 400000;
const jour = 1;


const flux = new Flux(null, 'Test Flux', montant, dateDebut, dateFin, null, jour);

test('Vérifie la valeur du flux pour une date donnée', () => {
  
  const dateTest = new Date('2024-06-15');

  const expectedValeurTotal = montant * 5; 

  const valeurTotal = flux.getValeur(dateTest);

  expect(valeurTotal).toBe(expectedValeurTotal);
});
