export class Personne {
  constructor(nom) {
    this.nom = nom;
  }
  getTrainDeVie() {
    return this.salaire.calculerTrainDeVie();
  }
}

module.exports = Person;