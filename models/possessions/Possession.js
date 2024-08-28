export default class Possession {
  constructor(
    possesseur,
    libelle,
    valeur,
    dateDebut,
    dateFin,
    tauxAmortissement
  ) {
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
    if (dateActuelle < this.dateDebut) {
      return 0;
    }

    // Calcul de la différence entre la date actuelle et la date de début
    const differenceDate = {
      year: dateActuelle.getFullYear() - this.dateDebut.getFullYear(),
      month: dateActuelle.getMonth() - this.dateDebut.getMonth(),
      day: dateActuelle.getDate() - this.dateDebut.getDate(),
    };

    // Conversion de la différence en années
    const raison =
      differenceDate.year +
      differenceDate.month / 12 +
      differenceDate.day / 365;

    // Calcul de la valeur après amortissement
    const result =
      this.valeur - this.valeur * ((raison * this.tauxAmortissement) / 100);

    // Limiter le résultat à deux chiffres après la virgule
    return parseFloat(result.toFixed(2));
  }
}
