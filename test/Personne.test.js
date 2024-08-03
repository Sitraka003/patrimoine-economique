import { expect } from 'chai';
import Personne from '../models/Personne.js';

describe('Personne', () => {
  const nom = "John Doe";

  it('should initialize properly', () => {
    const personne = new Personne(nom);
    expect(personne.nom).to.equal(nom);
  });
});
