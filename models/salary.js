import Possession from "./Possession.js";
import owner from "./Personne.js";

class salary extends Possession{
    get salaryPerMonth() {
        return this.salaryValuePerMonth;
    }
    constructor(owner,salaryValuePerMonth) {
        super(owner,"salary","salary",0,salaryValuePerMonth);
        this.owner = owner;
        this.acquisitionDate = new Date();
        this.salaryValuePerMonth = salaryValuePerMonth;
    }


}