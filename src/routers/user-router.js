import express from 'express';
import {createUser, getUser, login, loginPage, logout, registerPage, register} from "../controllers/user-controller.js";


const { Router } = express;
const router = Router();


router.post('/', createUser);
router.post('/signup', getUser);
router.get('/login', loginPage);
router.post('/login', login);
router.get('/logout', logout);
router.post('/register', register);
router.get('/register', registerPage);



export const userRouter = router;