import BankAccount from "./BankAccount.js";

class SavingAccount extends BankAccount{
  constructor(AccountHolder, AccountNumber, balance = 0, ceilingWithdraw, InterestRate){
    super(AccountHolder, AccountNumber, balance);
    this.ceilingWithdraw = ceilingWithdraw;
    this.InterestRate = InterestRate;
  }

  calculeInterest() {
    this.balance *= (1 + this.InterestRate);
  }

  withdraw(amount) {
    if(amount <= this.ceilingWithdraw) {
      super.withdraw(amount);
    } else {
      console.log("Withdraw ceilling exceeded");
    }
  }
}