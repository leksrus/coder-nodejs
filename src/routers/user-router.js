import express from 'express';
import {createUser, getUser} from "../controllers/user-controller.js";


const { Router } = express;
const router = Router();


router.post('/', createUser);
router.post('/login', getUser);



export const userRouter = router;