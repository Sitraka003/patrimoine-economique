class Patrimony {
  constructor(owner) {
    const creationDate = new Date();
    this.owner  = owner;
   
    this.patrimonyCreationDate = creationDate;
    this.possessions = []; // [Possession, Possession, ...]
  }
  getValue(year,month,date) {
    let possessionsToTheDate = this.possessions.filter((e)=>{
      return e.aquisitionDate < new Date(year,month,date) 
    })
    // console.log(possessionsToTheDate[0].possessionName); 
    return possessionsToTheDate.reduce((acc,currVal)=>acc+currVal.getActualValue(),0) 
  }
  addPossession(possession) {
    this.possessions.push(possession);
  }
  removePossession(possession) {
    this.possessions = this.possessions.filter(p => p.possessionName !== possession.possessionName);
  }
  getPossessions(){
     this.possessions.forEach(element => {
      console.log(element.possessionName)
    });
  }
}

export default Patrimony;