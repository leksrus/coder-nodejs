import express from 'express';
import {productRouter} from './routers/products-routes.js';
import {cartRouter} from './routers/cart-router.js';
import { validateAdmin } from './middleware/middleware.js';




const app = express();
const port = 8080;

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${port}`);
});


app.use(express.json());
app.use(validateAdmin);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);

