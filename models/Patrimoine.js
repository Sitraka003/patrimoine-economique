<<<<<<< HEAD
export default class Patrimoine {
  constructor(possesseur, possessions) {
    this.possesseur = possesseur;
    this.possessions = [...possessions]; // [Possession, Possession, ...]
  }
  getValeur(date) {
    let result = 0;
    for (const item of this.possessions) {
      result += item.getValeur(date);
    }
    return result;
  }
  addPossession(possession) {
    if (possession.possesseur != this.possesseur) {
      console.log(
        `${possession.libelle} n'appartient pas à ${this.possesseur}`,
      );
    } else {
      this.possessions.push(possession);
    }
  }
  removePossession(possession) {
    this.possessions = this.possessions.filter(
      (p) => p.libelle !== possession.libelle,
    );
=======

const Possession = require('./Possession');
class Patrimoine {
constructor(possesseur, date) {
this.possesseur = possesseur;
this.date = date;
this.possessions = []; // Liste des possessions
this.cash= 0;
}
addPossession(possession) {
this.possessions.push(possession);
}
removePossession(libelle) {
this.possessions = this.possessions.filter(p => p.libelle !== libelle);
}
getValeur() {
// Calculer la valeur totale des possessions
return this.possessions.reduce((total, possession) => {
// Si la possession a une valeur, l'ajouter au total
return total + possession.valeur;
}, this.cash);
}
// Exemple d'amortissement simple: Calculer la dépréciation
calculateAmortissement() {
const currentYear = new Date().getFullYear();
return this.possessions.map(possession => {
  if (!possession.amortissable){
    return{
      libelle: possession.libelle,
valeurActuelle:possession.valeur,
    }
>>>>>>> e83d06c80ce654bb28c7cac73d44bdfec2c528be
  }
  
if (possession.dateAcquisition) {
const age = currentYear - new Date(possession.dateAcquisition).getFullYear();
// Hypothèse d'une dépréciation de 10% par an
const depreciation = (0.1 * age) * possession.valeur;
return {
libelle: possession.libelle,
valeurActuelle: Math.max(0, possession.valeur - depreciation),
};
}
return {
libelle: possession.libelle,
valeurActuelle: possession.valeur,
};
});
}
<<<<<<< HEAD
=======

accumulateSalary(){
  if(typeof this.possesseur.salaireMensuel === 'number' && !isNaN(this.possesseur.salaireMensuel)){
    this.cash+=this.possesseur.salaireMensuel;
  }else{
    console.log('error');
  }
}
deductDepenses(){
  if(typeof this.possesseur.depenseMensuel === 'number' && !isNaN(this.possesseur.depenseMensuelMensuel)){
    this.cash_-=this.possesseur.depenseMensuel;
  }else{
    console.log('error');
  }
}
simulateMonth(){
  this.accumulateSalary();
  this.deductDepenses();
}
}


module.exports = Patrimoine;
>>>>>>> e83d06c80ce654bb28c7cac73d44bdfec2c528be
