// src/Argent.js
import Possession from './Possession';

export default class Argent extends Possession {
  constructor(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement, type) {
    super(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement);
    this.type = type;
  }
}
