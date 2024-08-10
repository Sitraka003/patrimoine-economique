<<<<<<< HEAD
export default class Personne {
  constructor(nom) {
    this.nom = nom;
  }
}
=======
class Personne {
constructor(nom,salaireMensuel,depenseMensuelles) {
this.nom = nom;
this.salaireMensuel= Number(salaireMensuel);
this.depenseMensuelles=Number(depenseMensuelles);
}
}
module.exports = Personne
>>>>>>> e83d06c80ce654bb28c7cac73d44bdfec2c528be
