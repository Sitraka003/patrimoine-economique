import Argent from "./models/possessions/Argent.js";
import BienMateriel from "./models/possessions/BienMateriel.js";
import Possession from "./models/possessions/Possession.js";

const possession = new Possession("Ilo", "argent espece", 2_000_000, new Date(2024, 4, 13), new Date(2024, 12, 13), 10);
const bienMateriel = new BienMateriel("Ilo", "Bien Materiel", 500_000, new Date(2024, 4, 13), new Date(2024, 12, 13), 10);
const argent = new Argent("Ilo", "Espece", 400_000, new Date(2024, 4, 13), new Date(2024, 12, 13), 10, "Espece");

console.log(bienMateriel.getValeur(new Date(2024, 5, 13)));
console.log(possession.getValeurApresAmortissement(new Date(2024, 5, 13)));
console.log(argent.getValeur(new Date(2024, 5, 13)));
// console.log(possession);