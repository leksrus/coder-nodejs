
class CartDto {
    constructor(id, timestamp, products = []){
        this.id = id;
        this.timestamp = timestamp;
        this.products = products;
    }
}

export function asCartDto(cart) {
    if(Array.isArray(cart)) return cart.map(c => new CartDto(c._id.toString(), new Date(c.timestamp), c.products));
    else return new CartDto(cart._id.toString(), new Date(cart.timestamp), cart.products);
}