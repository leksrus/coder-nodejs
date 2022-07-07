import {OrderMongoDao} from "../daos/orders/order-mongo.dao.js";
import {sendEmail, sendSms} from "../helpers/helper.js";
import Order from "../models/order.js";


export const createOrder = ( async (req, res) => {
    const orderMongoDao = new OrderMongoDao();

    const newOrder = new Order(req.body.cart, req.body.user);

    await orderMongoDao.saveOrder(newOrder);


        await sendSms({
            body: 'Dear customer, thanks for buying in techno-market',
            phone: newOrder.user.phone
        });

        await sendEmail({
            subject: 'New order register',
            message: `<b>New order created -> products: ${JSON.stringify(newOrder.cart.products) }</b>`
        })


    return res.status(200).json({message: 'Order created'});

});

export default {createOrder}