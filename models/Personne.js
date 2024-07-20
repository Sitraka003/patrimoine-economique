class Personne {
  constructor(nom,prenom,dateDeNaissance) {
    this.nom = nom;
    this.prénom = prenom;
    this.dateDeNaissance = dateDeNaissance;
  }

  showUser(user) {
    console.log("mon nom est " + this.nom + this.prenom + "la date de naisssance est " + this.dateDeNaissance)
  }

  
}

module.exports = Personne;
