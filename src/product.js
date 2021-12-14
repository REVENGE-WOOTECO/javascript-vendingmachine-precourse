export class product {
  constructor(name, price, quantity) {
    this.id = name;
    this.name = name;
    this.price = Number(price);
    this.quantity = Number(quantity);
  }
  purchase() {
    if (this.quantity === 0) {
      return false;
    }
    this.quantity = this.quantity - 1;
    return true;
  }
  add(newProduct) {
    const [name, price, quantity] = newProduct.getStateList();
    console.log(name, price, quantity);
    if (price >= 100 && price % 10 === 0) {
      this.price = price;
      this.quantity = quantity;
    }
  }
  getStateList() {
    return [this.name, this.price, this.quantity];
  }
  getId() {
    return this.id;
  }
}
