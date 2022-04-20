
class Cart {

  constructor(id, timestamp, produts = []){
    this.id = parseInt(id);
    this.timestamp = timestamp;
    this.produts = produts;
  }
}


export default Cart;