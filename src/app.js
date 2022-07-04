import express from 'express';
import {productRouter} from './routers/products-routes.js';
import {cartRouter} from './routers/cart-router.js';
import { validateAdmin } from './middleware/middleware.js';
import {mongooseCon} from "./config/configurations.js";



await mongooseCon();

const app = express();
const port = 8080;

process.env.DAO = 'firebase';

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(process.env.DAO);
});


app.use(express.json());
app.use(validateAdmin);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);

