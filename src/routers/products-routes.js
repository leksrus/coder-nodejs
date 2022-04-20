import express from 'express';
import { getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/products-controller.js';

const { Router } = express;
const router = Router();


router.get('/:id', getProduct);

router.post('/', createProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);


export const productRouter = router;;