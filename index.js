import Patrimoine from './models/Patrimoine.js';
import Personne from './models/Personne.js';
import Possession from './models/Possession.js';
import TrainDeVie from './models/TrainDeVie.js';
import Salaire from './models/Salaire.js';

const personne = new Personne('John Doe', '1980-05-1');

const possession = new Possession(personne, "maison", '2018-12-1', 200000);

const trainDeVie = new TrainDeVie(personne, "life", '2021-01-1', 100000);

const salaire = new Salaire(personne, "salaire", '2021-01-01' , 150000);

const patrimoine = new Patrimoine(personne, new Date(), [possession]);

patrimoine.addPossession(new Possession(personne, "voiture", '2015-01-1', 50000));

patrimoine.addPossession(new Possession(personne, "appartement", '2018-05', 100000));

patrimoine.addPossession(trainDeVie);

patrimoine.addPossession(salaire);

console.log(patrimoine.getValeur( new Date())); // 200000