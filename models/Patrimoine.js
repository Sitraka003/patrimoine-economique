class Patrimoine {
  constructor(possesseur, date, possessions) {
    this.possesseur  = possesseur;
    this.date = date;
    this.possessions = possessions; // [Possession, Possession, ...]
  }
  getValeur(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;

    return this.possessions
                          .map((possession) => {
                            let achatDateYear = (new Date(possession.getDateAchat()).getFullYear());
                            let achatDateMonth = (new Date(possession.getDateAchat()).getMonth());
                            let spendYear = year - achatDateYear;
                            let spendMonth = month - achatDateMonth;
                            return possession.getValeur() - (spendMonth * possession.getValeur() / 1200) - (spendYear * possession.getValeur() /365);
                          } )
                          .reduce((total, valeur) => total + valeur, 0);
  }
  addPossession(possession) {
    this.possessions.push(possession);
  }
  removePossession(possession) {
    this.possessions = this.possessions.filter(p => p.libelle !== possession.libelle);
  }
}

export default Patrimoine;