import mongoose from "mongoose";
import {asCartDto} from "../../dtos/cart.dto.js";


class CartMongoDao {
    constructor() {
        this.cart = mongoose.model('cart', this.getCartSchema());
    }

    init(){
        mongoose.connect('mongodb+srv://test:NMZQbTCltcIhpUa3@cluster0.zxw9v.mongodb.net/techno-market?retryWrites=true&w=majority')
            .then(() => console.log('Mongo connected'))
            .catch(err => console.log(err));
    }

    async createCart(cart) {
        const newCart = await this.cart.create(cart);

        return asCartDto(newCart);
    }

    async getAllCarts() {
        const carts = await this.cart.find({});

        return asCartDto(carts);
    }

    async getCartByID(id) {
        const cart = await this.cart.findOne({_id: id});

        return asCartDto(cart);
    }

    async updateCartById(id, cart) {
        const newCart = await  this.cart.findOneAndUpdate({_id: id}, {$set: cart});

        return asCartDto(newCart);

    }

    async deleteCartById(id) {
        const cart = await this.cart.findOneAndDelete({_id: id});

        return asCartDto(cart);
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