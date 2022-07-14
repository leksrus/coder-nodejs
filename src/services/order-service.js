import {OrderMongoDao} from "../daos/orders/order-mongo.dao.js";
import {sendEmail, sendSms} from "../helpers/helper.js";


class OrderService {
    constructor() {
        this.orderMongoDao = new OrderMongoDao();
    }

    async createOrder(order) {
        await this.orderMongoDao.saveOrder(order);

        await sendSms({
            body: 'Dear customer, thanks for buying in techno-market',
            phone: order.user.phone
        });

        await sendEmail({
            subject: 'New order register',
            message: `<b>New order created -> products: ${JSON.stringify(order.cart.products) }</b>`
        })
    }
}


export default OrderService;