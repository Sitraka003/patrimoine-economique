import { Personne } from './personne';
import { TrainDeVie } from '../models/Personne.js'

describe('Personne', () => {
  it('should have a name', () => {
    const personne = new Personne('Jean', 'Pierre');
    expect(personne.prenom).toBe('Jean');
    expect(personne.nom).toBe('Pierre');
  });

  it('should have an age', () => {
    const personne = new Personne('Marie', 'Dupont', 30);
    expect(personne.age).toBe(30);
  });

  it('should have a train de vie', () => {
    const personne = new Personne('Pierre', 'Martin');
    expect(personne.trainDeVie).toBeInstanceOf(TrainDeVie);
  });

  it('should display person information correctly', () => {
    const personne = new Personne('Jeanne', 'Lefebvre', 25);
    expect(personne.toString()).toBe('Jeanne Lefebvre (âge: 25)');
  });

  it('should add a train de vie correctly', () => {
    const personne = new Personne('Marc', 'Dubois');
    const trainDeVie = new TrainDeVie('Train de vie 1');
    personne.ajouterTrainDeVie(trainDeVie);
    expect(personne.trainDeVie).toBe(trainDeVie);
  });
});