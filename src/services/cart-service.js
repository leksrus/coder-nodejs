import CartRepository from "../repositories/cart.repository.js";

class CartService {
    constructor() {
        this.cartRepository = new CartRepository();
    }

    async createCart(cart) {
        return this.cartRepository.add(cart);
    }

    async getAllCarts() {
        return this.cartRepository.getAll();
    }

    async getCartById(id) {
        return this.cartRepository.getById(id);
    }

    async modifyCartById(id, cart) {
        return this.cartRepository.update(id, cart);
    }

    async deleteCartById(id){
        return this.cartRepository.removeById(id);
    }
}

export  default  CartService;