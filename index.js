const Personne = require('./models/Personne');
const Possession = require('./models/Possession');
const Patrimoine = require('./models/Patrimoine');
// Création d'une personne
const personne = new Personne('Mr Anonymous',1000000, 650000);
// Création d'un patrimoine pour cette personne
const patrimoine = new Patrimoine(personne, new Date());
// Ajout de possessions
const ordinateur = new Possession(personne, 'matériel', 'Ordinateur Portable', 1800000,
'2022-01-01');
const vêtement = new Possession(personne, 'biens', 'Vêtement', 450000, '2023-01-01',);
const vola = new Possession(personne,'biens','cash',750000,'2023-01-01',false);
const boby = new Possession(personne,'biens','saving',2000000,'2023-01-01',false);
patrimoine.addPossession(ordinateur);
patrimoine.addPossession(vêtement);
patrimoine.addPossession(vola);
patrimoine.addPossession(boby);
// Affichage de la valeur totale actuelle
console.log(`Valeur totale des possessions: ${patrimoine.getValeur()} Ar`);
// Calcul des valeurs après amortissement
const amortissements = patrimoine.calculateAmortissement();
console.log('Valeur des possessions après amortissement :');
amortissements.forEach(p => console.log(`${p.libelle} : ${p.valeurActuelle} Ar`))

for (let i=0; i<6; i++){
    patrimoine.simulateMonth();
    console.log(`Valeur apres ${i+1}mois: ${patrimoine.getValeur()} Ar`)
}