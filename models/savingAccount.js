import Possession from "./Possession.js";
import owner from "./Personne.js";
import Patrimony from "./Patrimoine.js";
class savingAccount extends Possession {
    
    constructor(owner){
        let sold = 0;
        
        super(owner,"account","savingAccount",-10,sold);
        this.sold = sold;
        this.getSold = function getSold(){
            return this.sold;
        }
        /**
         * @function credit
         * @param {Int } value 
         * @returns 
         */
        this.credit = function credit(value){
            return this.sold = this.sold+value
        }
        this.debit = function debit(value){
            return this.sold = this.sold-value
        }
        this.getActualValue = this.getActualsold
        this.getOwnerName = function getOwnerName(){
            return owner.firstName
        }
        
    }
}
let myPatrimony = new Patrimony(kyle)
var kyle = new owner("tsanta","kyle",17,"M",myPatrimony);
var kyleAccount = new savingAccount(kyle);
var Lamborgini = new Possession(kyle,"car","Lamborgini",10,20000000000)
var House = new Possession(kyle,"house","Villa",2,12000000000000)
kyleAccount.credit(100000);
console.log(kyleAccount.getSold());
myPatrimony.addPossession(Lamborgini)
myPatrimony.addPossession(House)
myPatrimony.getPossessions()
console.log(myPatrimony.getValeur(2024,6,10))