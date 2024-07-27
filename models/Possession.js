class Possession {
  constructor(owner, type, possessionName,decreasingRate  , initialValue ) {
    this.owner = owner;
    this.type = type;
    this.possessionName = possessionName;
    this.decreasingRate = decreasingRate;// taux d'ammortissement négatif (compte épargne) / + (compte courant)
    this.aquisitionDate = new Date();
    this.initialValue = initialValue;
   
    

   this.getActualValue = function getActualValue(){
      return Math.round(initialValue *(/*positionDuMois*/((new Date().getMonth()+1)/12) *(decreasingRate/100)))
    }
    this.getValueAt = function getValueAt(year,month,date){
      return Math.round(initialValue *(/*positionDuMois*/((new Date(year,month,date).getMonth()+1)/12) *(decreasingRate/100)))
    }


  
  }
}
let possess = new Possession("kyle","car","Lamborgini",5,20000000000)
// console.log(possess.getActualValue());
// console.log(new Date().getMonth()+1);
export default Possession;