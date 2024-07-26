
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