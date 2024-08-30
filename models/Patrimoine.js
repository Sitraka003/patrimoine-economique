import BienMateriel from './possessions/BienMateriel.js';
import Possession from './possessions/Possession.js';
import Flux from './possessions/Flux.js';

export default class Patrimoine {
  constructor(possesseur, possessions) {
    this.possesseur = possesseur;
    this.possessions = possessions.map(p => {
      if (p.jour) {
        // Créer un flux si p.jour est défini
        return this.createFlux(p);
      } else {
        // Créer un bien matériel si p.jour n'est pas défini
        return this.createBienMateriel(p);
      }
});
}
  createFlux(data){
    return new Flux(
      data.id,
      data.possesseur,
      data.libelle,
      data.valeur,
      new Date(data.dateDebut),
      data.dateFin ? new Date(data.dateFin) : null,
      data.tauxAmortissement,
      data.jour
    )
  }

  createBienMateriel(data) {
    return new BienMateriel(
      data.id,
      data.possesseur,
      data.libelle,
      data.valeur,
      new Date(data.dateDebut),
      data.dateFin ? new Date(data.dateFin) : null,
      data.tauxAmortissement
    );
  }

  getValeur(date) {
    let result = 0;
    for (const item of this.possessions) {
      result += item.getValeur(date);
    }
    return result;
  }

  addPossession(possession) {
    if (!(possession instanceof BienMateriel)) {
      console.error("The possession must be an instance of BienMateriel.");
      return;
    }
    if (possession.possesseur !== this.possesseur) {
      console.log(`${possession.libelle} n'appartient pas à ${this.possesseur}`);
    } else {
      this.possessions.push(possession);
    }
  }

  removePossession(possession) {
    this.possessions = this.possessions.filter(
      (p) => p.libelle !== possession.libelle,
    );
  }
}

