const Patrimoine = require('./Patrimoine');
const Possession = require('./Possession');
const Personne = require('./Personne');
const Salaire = require('./Salaire');
const TrainDeVie = require('./TrainDeVie');

//Le patrimoine de Ilo
const ilo = new Personne('Ilo');
const possessionsIlo = [
    new Possession('argent', 'espèces', 400000, '2024-05-13'),
    new Possession('argent', 'compte épargne', 200000, '2024-05-13'),
    new Possession('argent', 'compte courant', 600000, '2024-05-13'),
    new Possession('bien matériel', 'ordinateur', 2000000, '2021-10-26', 0.10),
    new Possession('bien matériel', 'vêtements', 1000000, '2024-01-01', 0.20),
];

const patrimoineIlo = new Patrimoine(ilo, '2024-05-13', possessionsIlo);

//Simulation des dépenses mensuelles de train de vie
function simulateMonthlyExpenses(patrimoine, date, monthlyExpense) {
    const targetDate = new Date(date);
    const currentDate = patrimoine.date;

    let monthsPassed = (targetDate.getFullYear() - currentDate.getFullYear()) * 12 + (targetDate.getMonth() - currentDate.getMonth());

    for (let i = 0; i < monthsPassed; i++) {
        patrimoine.possessions.forEach(possession => {
            if (possession.libelle === 'compte courant') {
                possession.valeur -= monthlyExpense;
            }
        });
    }
}

// Création du salaire et train de vie pour Ilo
const salaireIlo = new Salaire(1000000, '2024-05-13');
const trainDeVieIlo = new TrainDeVie(500000);

// Calcul de la valeur du patrimoine de Ilo à deux dates spécifiques
const date1 = '2024-06-26';
const date2 = '2024-07-14';
simulateMonthlyExpenses(patrimoineIlo, date1, trainDeVieIlo.getMensuelDepense());
const valeurPatrimoineDate1 = patrimoineIlo.getValeur(date1);
simulateMonthlyExpenses(patrimoineIlo, date2, trainDeVieIlo.getMensuelDepense());
const valeurPatrimoineDate2 = patrimoineIlo.getValeur(date2);

// Calcul de l'argent sur le compte courant à la date2
const compteCourant = patrimoineIlo.possessions.find(p => p.libelle === 'compte courant');
const argentCompteCourantDate2 = compteCourant.getValeurActuelle(date2);

console.log(`Valeur du patrimoine de Ilo le 26 juin 2024 : ${valeurPatrimoineDate1} Ar`);
console.log(`Valeur du patrimoine de Ilo le 14 juillet 2024 : ${valeurPatrimoineDate2} Ar`);
console.log(`Argent sur le compte courant de Ilo le 14 juillet 2024 : ${argentCompteCourantDate2} Ar`);
