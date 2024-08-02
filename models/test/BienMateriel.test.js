const { expect } = require('chai');
const BienMateriel = require('../path/to/BienMateriel');

describe('BienMateriel', () => {
  it('should create an instance of BienMateriel with correct properties', () => {
    const bien = new BienMateriel('Jane Doe', 'Voiture', 15000, new Date('2024-01-01'), new Date('2028-01-01'), 10);
    
    expect(bien.possesseur).to.equal('Jane Doe');
    expect(bien.libelle).to.equal('Voiture');
    expect(bien.valeur).to.equal(15000);
  });
});
