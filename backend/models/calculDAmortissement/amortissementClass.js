import PromptSync from "prompt-sync";
const prompt = PromptSync();

class Amortissement {
  constructor() {
    this.valeurInitiale = this.saisirValeur("Valeur actuelle du produit : ");
    this.duree = this.saisirValeur("Durée de vie estimée du produit (en années) : ");
    this.tauxAmortissement = 100 / this.duree;
  }

  saisirValeur(message) {
    let estimation;
    do {
      estimation = parseFloat(prompt(message));
      if (isNaN(estimation)) {
        console.log("L'entrée doit être un nombre !");
      }
    } while (isNaN(estimation));
    return estimation;
  }

  calculerAmortissement() {
    const amortissementAnnuel = this.valeurInitiale * (this.tauxAmortissement / 100);
    return amortissementAnnuel;
  }

  afficherDetails() {
    const amortissementAnnuel = this.calculerAmortissement();
    return `- Valeur initiale du produit : ${this.valeurInitiale}
- Durée de vie estimée du produit : ${this.duree} ans
- Taux d'amortissement : ${this.tauxAmortissement}%
- Montant annuel à amortir : ${amortissementAnnuel}`;
  }
}
