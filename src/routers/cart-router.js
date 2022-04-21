import express from 'express';
import { getCartProducts, createCart, createCartProduct, deleteCart, deleteProductFromCart } from '../controllers/cart-controller.js';

const { Router } = express;
const router = Router();


router.get('/:id/products', getCartProducts);

router.post('/', createCart);

router.post('/:id/products', createCartProduct);

router.delete('/:id', deleteCart);

router.delete('/:id/products/:prod_id', deleteProductFromCart);


export const cartRouter = router;