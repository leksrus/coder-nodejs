import MongoContainer from "../../continers/mongo-container.js";
import mongoose from "mongoose";


export class OrderMongoDao extends MongoContainer{
    constructor() {
        super();
        this.model = mongoose.models.order || mongoose.model('order', this.getOrderSchema());
    }


    async saveOrder(order){
        return this.save({
            timestamp: new Date(),
        cart: {
            products: order.cart.products
        },
            user: {
                email: order.user.email,
                firstname: order.user.firstname,
                lastname:  order.user.lastname,
                address: order.user.address,
                age:  order.user.age,
                phone: order.user.phone
            }
        }, this.model);
    }


    getOrderSchema() {
        const { Schema } = mongoose;
        return new Schema({
            timestamp: Date,
            cart: {
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
            },
            user: {
                email: String,
                firstname: String,
                lastname:  String,
                address: String,
                age:  Number,
                phone: String,
                photo: String
            }

        })
    }
}