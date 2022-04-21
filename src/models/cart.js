
class Cart {

  constructor(id, products = []){
    this.id = parseInt(id);
    this.timestamp = Date.now();
    this.products = products;
  }
}


export default Cart;