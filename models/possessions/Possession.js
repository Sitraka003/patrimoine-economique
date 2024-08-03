class Possession {
  constructor(owner, label, value, startDate, endDate, depreciationRate) {
    this.owner = owner;
    this.label = label;
    this.value = value;
    this.startDate = startDate;
    this.endDate = endDate;
    this.depreciationRate = depreciationRate;
  }

  getValeur(date) {
    const years = (date - this.startDate) / (1000 * 60 * 60 * 24 * 365);
    return this.value * Math.pow((1 - this.depreciationRate / 100), years);
  }
}

export default Possession;
