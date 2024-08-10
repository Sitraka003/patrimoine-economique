// src/Possession.js
export default class Possession {
  constructor(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement) {
    this.possesseur = possesseur;
    this.libelle = libelle;
    this.valeur = valeur;
    this.dateDebut = new Date(dateDebut);
    this.dateFin = dateFin ? new Date(dateFin) : null;
    this.tauxAmortissement = tauxAmortissement || 0;
  }

  getValeur(date) {
    return this.getValeurApresAmortissement(new Date(date));
  }

  getValeurApresAmortissement(dateActuelle) {
    if (dateActuelle < this.dateDebut) {
      return 0;
    }
    
    const differenceDate = {
      year: dateActuelle.getFullYear() - this.dateDebut.getFullYear(),
      month: dateActuelle.getMonth() - this.dateDebut.getMonth(),
      day: dateActuelle.getDate() - this.dateDebut.getDate(),
    };
  
    const tempsEcoule = differenceDate.year + (differenceDate.month / 12) + (differenceDate.day / 365.25);
    const valeurApresAmortissement = this.valeur * (1 - (tempsEcoule * this.tauxAmortissement / 100));

    return Math.max(0, valeurApresAmortissement);
  }
}
