import Personne from "./Personne.js";

class BankAccount{
  constructor(AccountHolder, AccountNumber, balance = 0){
    this.AccountHolder = AccountHolder;
    this.AccountNumber = AccountNumber;
    this.balance = 0;
  }

  displayBalance() {
    console.log(`Account holder: ${this.AccountHolder}`);
    console.log(`Account number: ${this.AccountNumber}`);
    console.log(`Current balance: $${this.balance.toFixed(2)}`);
  }

  deposit(amount) {
    if (amount > 0) {
      this.balance += amount;
      console.log(`Deposited: $${amount.toFixed(2)}`);
      this.displayBalance();
    } else {
      console.log('Deposit amount must be positive.');
    }
  }

  withdraw(amount) {
    if(amount > 0 && this.balance >= amount) {
      this.balance -= amount;
    } else{
      log("Cannot withdraw the amount.");
    }
  }
}

export default BankAccount;