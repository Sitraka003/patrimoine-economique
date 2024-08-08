import Personne from "../../../../models/Personne.js";
import Argent from '../../../../models/possessions/Argent.js'
import TYPE_ARGENT from "../../../../constante.js";
import Flux from "../../../../models/possessions/Flux.js";
import Patrimoine from "../../../../models/Patrimoine.js";
import BienMateriel from "../../../../models/possessions/BienMateriel.js";


const ilo = new Personne("Ilo");
const argent1 = new Argent(ilo.nom, "Argent", 400_000, new Date(), null, null, TYPE_ARGENT.Espece);
const argent2 = new Argent(ilo.nom, "Argent", 200_000, new Date(), null, null, TYPE_ARGENT.Epargne);
const argent3 = new Argent(ilo.nom, "Argent", -600_000, new Date(), null, null, TYPE_ARGENT.Courant);
const bienMateriel1 = new BienMateriel(ilo.nom, "Ordinateur", 2_000_000, new Date(), null, 10);
const bienMateriel2 = new BienMateriel(ilo.nom, "Effets vestimentaires", 1_000_000, new Date(), null, 20);
const trainDeVie = new Flux(ilo.nom, "train de vie", -500_000, new Date(), null, null, 14);
const salaire = new Flux(ilo.nom, "salaire", 200_000, new Date(), null, null, 2);

const patrimoine = new Patrimoine(ilo.nom, [argent1, argent2, argent3, bienMateriel1, bienMateriel2, trainDeVie, salaire]);

import React from 'react'

export default function Result({ value }) {
    const result = patrimoine.getValeur(new Date(value)).toFixed(2);
    return (
        <h4 className="py-4" > Patrimoine de {patrimoine.possesseur} le {value || "..."} est : {isNaN(result) ? 0 : result} </h4>
    )
}