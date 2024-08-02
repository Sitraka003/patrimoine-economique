export default class Possession {
  constructor(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement) {
    this.possesseur = possesseur;
    this.libelle = libelle;
    this.valeur = valeur;
    this.dateDebut = dateDebut;
    this.dateFin = dateFin;
    this.tauxAmortissement = tauxAmortissement;
  }

  getValeur(date) {
    return this.getValeurApresAmortissement(date);
  }

  getValeurApresAmortissement(dateActuelle) {
    if (dateActuelle < this.dateDebut || dateActuelle > this.dateFin) {
      return 0;
    }
    const differenceDate = {
      year: dateActuelle.getFullYear() - this.dateDebut.getFullYear(),
      month: dateActuelle.getMonth() - this.dateDebut.getMonth(),
      day: dateActuelle.getDate() - this.dateDebut.getDate(),
    };
  
    const tauxAnnee = differenceDate.year * this.tauxAmortissement;
    const tauxMois = (differenceDate.month * this.tauxAmortissement) / 12;
    const tauxJour = (differenceDate.day * this.tauxAmortissement) / 365;
    const tauxFinal = tauxAnnee + tauxMois + tauxJour;
  
    const valeurFinal = Math.round(this.valeur - (this.valeur * tauxFinal) / 100);
    return valeurFinal;
  }
}
