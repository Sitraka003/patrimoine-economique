import Possesseur from './Possesseur';
import TrainDeVie from './TrainDeVie';
import Argent from './Argent';

// Création d'un possesseur
const possesseur = new Possesseur();

// Ajout d'argent et de train de vie
const argent = new Argent(possesseur, "argent_disponible", 500);
const trainDeVie = new TrainDeVie(possesseur, "train_de_vie_premium", 50);

possesseur.ajouterPossession(argent);
possesseur.ajouterPossession(trainDeVie);

// Paiement des frais mensuels
if (possesseur.payerFrais(trainDeVie)) {
    console.log("Frais payés avec succès !");
} else {
    console.log("Fonds insuffisants !");
}
