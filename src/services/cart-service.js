import CartMongoDao from "../daos/carts/cart-mongo.dao.js";

class CartService {
    constructor() {
        this.cartMongoDao = new CartMongoDao();
    }

    async createCart(cart) {
        return this.cartMongoDao.saveCart(cart);
    }

    async getAllCarts() {
        return this.cartMongoDao.getAllCarts();
    }

    async getCartById(id) {
        return this.cartMongoDao.getCartByID(id);
    }

    async modifyCartById(id, cart) {
        return this.cartMongoDao.updateCartById(id, cart);
    }

    async deleteCartById(id){
        return this.deleteCartById(id);
    }
}

export  default  CartService;