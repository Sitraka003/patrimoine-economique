import PromptSync from "prompt-sync";
const prompt = PromptSync();

function validation(EntrezSalaireBrut) {
    let leSalaire;
    do {
        leSalaire = parseFloat(prompt(EntrezSalaireBrut));
        if (isNaN(leSalaire)) {
            console.log("L'entre doit etre un nombre!");
        }
    } while (isNaN(leSalaire));

    return leSalaire;
}

function sortiSalaireBrut() {
    const salaireBrut = validation("Maintenant entrez votre salaire brut pour savoir votre salaire net : ");
    return salaireBrut;
}

export function salaireNet() {
    let salaireNetAPayer;
    const salaireBrut = sortiSalaireBrut();

    let irsa = salaireBrut * (20/100);
    let ostie = salaireBrut * (1/100);
    let cnaps = salaireBrut * (1/100);

    return salaireNetAPayer = salaireBrut - irsa - ostie - cnaps;
}

//console.log(`le total de votre salaire net à payer est : ${salaireNet()} Ariary`); // [for test]