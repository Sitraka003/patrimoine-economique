class train_de_vie {
  constructor(loyer, nourriture, transport, vacances) {
    this.loyer = loyer;
    this.nourriture = nourriture;
    this.transport = transport;
    this.vacances = vacances;
  }

  //cout total du train de vie au quotidien
  get_cout_total() {
    return this.loyer + this.nourriture + this.transport + this.vacances;
  }
}

export default train_de_vie;