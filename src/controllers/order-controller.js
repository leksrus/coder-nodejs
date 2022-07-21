import Order from "../models/order.js";
import OrderService from "../services/order-service.js";

const orderService = new OrderService();

export const createOrder = ( async (req, res) => {
    const order = new Order(req.body.cart, req.body.user);
    await orderService.createOrder(order);

    return res.status(200).json({message: 'Order created'});

});

export default {createOrder}