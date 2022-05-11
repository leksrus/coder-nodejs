import MongoContainer from "../../continers/mongo-container.js";
import mongoose from "mongoose";


class CartMongoDao extends MongoContainer {
    constructor() {
        super();
        this.model = mongoose.model('cart', this.getCartSchema());
    }

    async saveCart(cart) {
        await this.save({
            timestamp: cart.timestamp,
            products: cart.products.map(x => {
                return {
                    timestamp: x.timestamp,
                    name: x.name,
                    description: x.description,
                    code:  x.code,
                    price: x.price,
                    stock:  x.stock,
                    thumbnails: x.thumbnails
                }
            })
        }, this.model);
    }

    async getAllCarts() {
        return this.getAll(this.model);
    }

    async geCartByID(id) {
        return this.getById(id, this.model);
    }

    async updateCartById(id, cart) {
        return this.update({
            timestamp: cart.timestamp,
            products: cart.products.map(x => {
                return {
                    timestamp: x.timestamp,
                    name: x.name,
                    description: x.description,
                    code:  x.code,
                    price: x.price,
                    stock:  x.stock,
                    thumbnails: x.thumbnails
                }
            })
        }, this.model, id);

    }

    async deleteCartById(id) {
        return this.deleteById(id, this.model);
    }

    getCartSchema() {
        const { Schema } = mongoose;
        return new Schema({
            timestamp: Date,
            products: [{
            timestamp: Date,
            name: String,
            description: String,
            code:  String,
            price: Number,
            stock:  Number,
            thumbnails: String
            }]
        })
    }
}

export default CartMongoDao;