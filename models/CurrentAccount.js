import BankAccount from "./BankAccount.js";

class CurrentAccount extends BankAccount{
  constructor(AccountHolder, AccountNumber, balance = 0, frais, decouvertAllowed){
    super(AccountHolder, AccountNumber, balance);
    this.frais = frais;
    this.decouvertAllowed = decouvertAllowed;
  }

  withdraw(amount) {
    if(amount > 0 && this.balance >= amount) {
      this.balance -= amount;
    } else{
      log("Cannot withdraw the amount.");
    }
  }
}