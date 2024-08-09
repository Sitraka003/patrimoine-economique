// test.js
const { expect } = require('chai');
const Possession = require('./models/possessions/possessions.js');
const Patrimoine = require('./models/patrimoine.js');

describe('This is a test about heritage', function () {
  let possesseur;
  let possession1;
  let possession2;
  let patrimoine;

  beforeEach(function () {
    possesseur = 'John Doe';
    possession1 = new Possession('Car', possesseur, 10000);
    possession2 = new Possession('House', possesseur, 50000);
    patrimoine = new Patrimoine(possesseur, [possession1, possession2]);
  });

  it('should calculate the total value correctly', function () {
    const date = new Date();
    const totalValue = patrimoine.getValeur(date);
    expect(totalValue).to.equal(60000);
  });

  it('should add a possession correctly', function () {
    const newPossession = new Possession('Boat', possesseur, 20000);
    patrimoine.addPossession(newPossession);
    expect(patrimoine.possessions).to.have.lengthOf(3);
  });

  it('should not add a possession with a different possesseur', function () {
    const newPossession = new Possession('Bike', 'Jane Doe', 1000);
    patrimoine.addPossession(newPossession);
    expect(patrimoine.possessions).to.have.lengthOf(2);
  });

  it('should remove a possession correctly', function () {
    patrimoine.removePossession(possession1);
    expect(patrimoine.possessions).to.have.lengthOf(1);
    expect(patrimoine.possessions[0].libelle).to.equal('House');
  });

  it('should transfer a possession correctly', function () {
    patrimoine.transferPossession(possession1, 'Jane Doe');
    expect(patrimoine.possessions).to.have.lengthOf(1);
    expect(possession1.possesseur).to.equal('Jane Doe');
  });
});
