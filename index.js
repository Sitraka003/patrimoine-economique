// Importation des classes Personne et GestionPatrimoine à partir des fichiers correspondants
const Personne = require('./models/Personne');
const GestionPatrimoine = require('./models/gestionPatrimoine');

// Définition des dates pour lesquelles nous allons calculer le patrimoine
const dateJune26 = new Date('2024-06-26');
const dateJuly14 = new Date('2024-07-14');

// Création d'une instance de Personne pour Ilo
const ilo = new Personne('Ilo');

// Création d'une instance de GestionPatrimoine avec les possessions, les dépenses mensuelles et les revenus mensuels d'Ilo
const gestionPatrimoineIlo = new GestionPatrimoine(400000, 200000, 600000, 2000000, '2021-10-26', 1000000, '2024-01-01', 500000, 500000);

// Ajouter une nouvelle possession (ex: un vélo)
gestionPatrimoineIlo.addPossession('bike', 300000, 0.15, '2023-03-01');

// Calcul et affichage du patrimoine d'Ilo au 26 juin 2024
console.log(`Patrimoine de Ilo le 26 juin 2024 : ${gestionPatrimoineIlo.calculatePatrimoine(dateJune26).totalAssets.toFixed(2)} Ar`);

// Calcul et affichage du patrimoine d'Ilo au 14 juillet 2024
console.log(`Patrimoine de Ilo le 14 juillet 2024 : ${gestionPatrimoineIlo.calculatePatrimoine(dateJuly14).totalAssets.toFixed(2)} Ar`);

// Calcul et affichage du montant du compte courant d'Ilo au 14 juillet 2024
console.log(`Compte courant de Ilo le 14 juillet 2024 : ${gestionPatrimoineIlo.calculatePatrimoine(dateJuly14).checking.toFixed(2)} Ar`);

// Retirer une possession
gestionPatrimoineIlo.removePossession('bike');

// Calcul et affichage du patrimoine d'Ilo au 14 juillet 2024 après avoir retiré la possession
console.log(`Patrimoine de Ilo le 14 juillet 2024 après retrait de la possession : ${gestionPatrimoineIlo.calculatePatrimoine(dateJuly14).totalAssets.toFixed(2)} Ar`);
