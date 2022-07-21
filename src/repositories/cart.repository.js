import CartDaoFactory from "../daos/carts/cart.dao.factory.js";


class CartRepository {
    constructor() {
        this.cartDao = CartDaoFactory.getCartDao('Mongo');
    }

    async add(cart){
        return this.cartDao.createCart(cart);
    }

    async getAll(){
        return this.cartDao.getAllCarts();
    }

    async getById(id) {
        return this.cartDao.getCartByID(id);
    }

    async update(id, cart) {
        return this.cartDao.updateCartById(id, cart);
    }

    async removeById(id) {
        return this.cartDao.deleteCartById(id);
    }
}


export  default CartRepository;