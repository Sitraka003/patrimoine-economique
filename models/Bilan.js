import Possesseur from './Possesseur.js';
import Actif from './Actif.js';
import TrainDeVie from './TrainDeVie.js';

const possesseur = new Possesseur();
const argent = new Actif(possesseur, "argent_disponible", 600);
const trainDeVie = new TrainDeVie(possesseur, "train_de_vie_premium", 40);

possesseur.ajouterPossession(argent);
possesseur.ajouterPossession(trainDeVie);

// Paiement des frais mensuels
if (possesseur.payerFrais(trainDeVie)) {
    console.log("Frais payés avec succès !");
} else {
    console.log("Fonds insuffisants !");
}