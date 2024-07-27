class  owner  {
  constructor(firstName,lastName,age,sex , Patrimony,salary = 0,costOfLiving = [{
    costName : "",
    costValue : 0
  }]) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.sex = sex;
    this.Patrimony = Patrimony;
    this.salary = salary;
    this.costOfLiving = costOfLiving;
  }
   addCost(name= "",value){
    this.costOfLiving = [...costOfLiving,{costName : name,costValue : value}];
  }
  sumOfCost(){
    return this.costOfLiving.reduce( (sum, cost) => sum + cost.costValue, 0);
  }

}

export default owner;

  let O1 = new owner("owner1","example",20,"f",PT1,2000000,)


