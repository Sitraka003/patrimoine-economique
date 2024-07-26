class Personne {
constructor(nom,salaireMensuel,depenseMensuelles) {
this.nom = nom;
this.salaireMensuel= Number(salaireMensuel);
this.depenseMensuelles=Number(depenseMensuelles);
}
}
module.exports = Personne