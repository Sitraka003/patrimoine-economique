const { expect } = require('chai');
const Argent = require('../possessions/Argent');
const { TYPES } = require('../constante');

describe('Argent', () => {
  it('should create an instance with a valid type', () => {
    const validType = TYPES.values()[0]; 
    const argent = new Argent('John Doe', 'Compte Bancaire', 1000, new Date('2024-01-01'), new Date('2024-12-31'), 5, validType);
    
    expect(argent.type).to.equal(validType);
  });
});
