import { TrainDeVie } from './traindevie';
import { Possession } from '../models/TrainDeVie.js';

describe('TrainDeVie', () => {
  it('should have a name', () => {
    const trainDeVie = new TrainDeVie('Train de vie 1');
    expect(trainDeVie.nom).toBe('Train de vie 1');
  });

  it('should display train de vie information correctly', () => {
    const trainDeVie = new TrainDeVie('Train de vie 2');
    expect(trainDeVie.toString()).toBe('Train de vie 2 (coût: 0)');
  });

  it('should add a possession correctly', () => {
    const trainDeVie = new TrainDeVie('Train de vie 3');
    const possession = new Possession('Voiture', 20000);
    trainDeVie.ajouterPossession(possession);
    expect(trainDeVie.possessions).toContain(possession);
  });

  it('should calculate the cost correctly', () => {
    const trainDeVie = new TrainDeVie('Train de vie 4');
    const possession1 = new Possession('Maison', 100000);
    const possession2 = new Possession('Appartement', 50000);
    trainDeVie.ajouterPossession(possession1);
    trainDeVie.ajouterPossession(possession2);
    expect(trainDeVie.cout()).toBe(150000);
  });
});