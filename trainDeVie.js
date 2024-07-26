import PromptSync from "prompt-sync";
import { salaireNet } from "./salaire.js";
const prompt = PromptSync();

function vosDepenses() {
    let depenses = [];
    let toujourInserer = true;

    console.log("=========================");
    console.log("  Inserez vos depenses : ");
    console.log("=========================");
    while (toujourInserer) {
        let description = prompt("Entrez la description de la dépense : ");
        let montant = parseFloat(prompt("Entrez le montant de la dépense : "));

        if (isNaN(montant)) {
            console.log("Le montant doit être un nombre. Veuillez réessayer.");
            continue;
        }

        depenses.push({ description, montant });

        let reponse = prompt("Voulez-vous ajouter une autre dépense ? (oui/non) : ").toLowerCase();
        if (reponse !== 'oui') {
            toujourInserer = false;
        }
    }

    return depenses;
}

function totalDesDepenses() {
    const lesDepensesCite = vosDepenses();
    let lesSommesDepenses = 0;

    for (let depense of lesDepensesCite) {
        lesSommesDepenses += depense.montant;
    }

    return lesSommesDepenses;
}

function autreRevenus() { //autre revenu à par le salaire
    let revenus = [];
    let toujourInserer = true;

    console.log("======================================================");
    console.log("  Inserez les autres revenus recus à part le salaire : ");
    console.log("======================================================");

    while (toujourInserer) {
        let description = prompt("Entrez la description du revenu autre : ");
        let montant = parseFloat(prompt("Entrez le montant du revenu : "));

        if (isNaN(montant)) {
            console.log("Le montant doit être un nombre. Veuillez réessayer.");
            continue;
        }

        revenus.push({ description, montant });

        let reponse = prompt("Voulez-vous ajouter un autre revenu ? (oui/non) : ").toLowerCase();
        if (reponse !== 'oui') {
            toujourInserer = false;
        }
    }

    return revenus;
}

function totalAutreRevenus () {
    const autreRevenuCite = autreRevenus();
    let lesSommesAutreRevenus = 0;

    for (let autreRev of autreRevenuCite) {
        lesSommesAutreRevenus += autreRev.montant;
    }

    return lesSommesAutreRevenus;
}

function totalDesRevenus() {
    const autreRevenus = totalAutreRevenus();
    const leSalaire = salaireNet();

    return autreRevenus + leSalaire;
}

function trainDeVie() {
    const lesRevenus = totalDesRevenus();
    const lesDepense = totalDesDepenses();
    const calcTrainDeVie = lesRevenus - lesDepense;

    if (calcTrainDeVie <= 0) {
        return `votre train de vie : \n
                revenus total = ${lesRevenus} \n
                depense total = ${lesDepense} \n 
                evaluation = ${calcTrainDeVie} \n
                => "DEFICIT"`;
    }

    else {
        return `votre train de vie : \n
        revenus total = ${lesRevenus} \n
        depense total = ${lesDepense} \n 
        evaluation = ${calcTrainDeVie} \n
        => "EXCEDENT"`;
    }
}

console.log(trainDeVie());