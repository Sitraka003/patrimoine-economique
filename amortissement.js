import PromptSync from "prompt-sync";
const prompt = PromptSync();

function validation(valeur) {
    let estimation;
    do {
        estimation = parseFloat(prompt(valeur));
        if (isNaN(estimation)) {
            console.log("L'entre doit etre un nombre!");
        }
    } while (isNaN(estimation));

    return estimation;
}

function valInitiale() {
    const init = validation("Valeur actuel du produit : ");
    return init;
}

function anneeDUtilisation() {
    const utilisation = validation("Durée de vie estimé du produit [en année] : ") // => validation(5) [5ans]
    return utilisation;
}

function amortissement() {
    const initiale = valInitiale();
    const annUtil = anneeDUtilisation();
    const tauxDAm = 100/annUtil; // taux d'amortissement
    const amorti = initiale * (tauxDAm/100);

    return `- valeur initiale du produit : ${initiale} \n- année d'utilisation : ${annUtil} \n- taux d'amortissement : ${tauxDAm}%\n- montant à amortir : ${amorti}`
}

console.log(amortissement());
