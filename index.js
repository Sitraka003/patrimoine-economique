const Patrimoine = require("./models/Patrimoine");
const Personne = require("./models/Personne");
const Possession = require("./models/Possession");

const personne = new Personne("Ilo");

const ilo = new Patrimoine(personne, new Date('2024-05-13'), [
    new Possession(personne.nom, 'especes', 'Espèces', 400000),
    new Possession(personne.nom, 'compte', 'Compte épargne', 200000),
    new Possession(personne.nom, 'compte', 'Compte courant', 600000),
    new Possession(personne.nom, 'compte', 'Compte courant', 500000),
    new Possession(personne.nom, 'depreciant', 'Ordinateur', 2000000, new Date('2021-10-26')),
    new Possession(personne.nom, 'depreciant', 'Effets vestimentaires', 1000000, new Date('2024-01-01'), 0.2),
]);
const date1 = new Date('2024-06-26');
const date2 = new Date('2024-07-14');
console.log(`La total de patrimoine de Ilo: ${ilo.getValueTotal()} Ar`);
console.log(`Patrimoine de Ilo le ${date1.toLocaleDateString()}: ${ilo.getValeur(date1)} Ar`);
console.log(`Patrimoine de Ilo le ${date2.toLocaleDateString()}: ${ilo.getValeur(date2)} Ar`);
console.log(`Argent sur le compte courant le ${date2.toLocaleDateString()}: ${ilo.getCompteCourant()} Ar`)