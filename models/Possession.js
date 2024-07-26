class Possession {
  constructor(type, libelle, valeur, dateAcquisition, tauxDepreciation = 0) {
    this.type = type;
    this.libelle = libelle;
    this.valeur = valeur;
    this.dateAcquisition = new Date(dateAcquisition);
    this.tauxDepreciation = tauxDepreciation;
  }

  //Calcul de la valeur actuelle de la posssession 
  getValeurActuelle(date) {
    const diffTime = Math.abs(date - this.dateAcquisition);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffYears = diffDays / 365.25;
    const valeurActuelle = this.valeur * Math.pow((1 - this.tauxDepreciation), diffYears);
    return valeurActuelle;
  }
}
