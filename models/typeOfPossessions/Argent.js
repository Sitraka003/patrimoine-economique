import { Possession } from "../Possession.js";
export class Argent extends Possession {
  constructor(
    possesseur, 
    libelle, 
    montant = 0, 
    dateCreation = null, 
    salaireMensuel = 0, 
    trainDeVieMensuel = 0, 
    dateDepot = null, 
    tauxAnnuel = 0
  ) {
    super(possesseur, "argent", libelle);
    this.montant = montant;
    this.dateCreation = dateCreation ? new Date(dateCreation) : null;
    this.salaireMensuel = salaireMensuel;
    this.trainDeVieMensuel = trainDeVieMensuel;
    this.dateDepot = dateDepot ? new Date(dateDepot) : null;
    this.tauxAnnuel = tauxAnnuel;
  }

  getValeur(date) {
    const dateActuelle = new Date(date);

    switch (this.libelle) {
      case 'especes': {
        return this.montant;
      }
      case 'compte_courant': {
        let jour = dateActuelle.getDay();
        const moisEcoules = (dateActuelle.getFullYear() - this.dateCreation.getFullYear()) * 12 + (dateActuelle.getMonth() - this.dateCreation.getMonth());
        let valeurActuelle = this.montant;

        for (let i = 0; i < moisEcoules; i++) {
          valeurActuelle += (this.salaireMensuel - this.trainDeVieMensuel);
        }

        //chaque fin du mois le compte sera crédité
        const lastDayOfMonth = new Date(dateActuelle.getFullYear(), dateActuelle.getMonth() + 1, 0).getDate();
        //lastDayOfMonth : pour eviter les erreurs où certains mois ne possèdent pas 31 jours
        if (dateActuelle.getDate() === lastDayOfMonth) {
          valeurActuelle += this.salaireMensuel;
        }

        return valeurActuelle;

      }
      case 'compte_epargne': {
        const moisEcoules = (dateActuelle.getFullYear() - this.dateDepot.getFullYear()) * 12 + (dateActuelle.getMonth() - this.dateDepot.getMonth());
        let valeurActuelle = this.montant;
        const tauxInteretMensuel = this.tauxAnnuel / 12 / 100;

        for (let i = 0; i < moisEcoules; i++) {
          valeurActuelle *= (1 + tauxInteretMensuel);
        }

        return valeurActuelle;
      }
      default:
        return 0;
    }
  }
}
// const compteCourant = new Argent('ilo', 'compte_courant', 0, '2024-02-01', 600000, 500000, null, 0);
// console.log(compteCourant.getValeur('2024-04-30'));
// console.log(compteCourant.getValeur('2024-05-01'));
