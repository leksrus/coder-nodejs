import express from "express";
import {createOrder} from "../controllers/order-controller.js";


const { Router } = express;
const router = Router();


router.post('/', createOrder);


export const orderRouter = router;