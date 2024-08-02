import BienMateriel from "./models/possessions/BienMateriel.js";
import Possession from "./models/possessions/Possession.js";

const p1 = new BienMateriel("Jackie", "description sur la possession", 200000, new Date(2024, 2, 10), new Date(2024, 6, 29), 50);

console.log(p1.getValeurApresAmortissement(new Date(2024, 6, 10)));