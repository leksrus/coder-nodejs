import express from 'express';
import {productRouter} from './routers/products-routes.js';




const app = express();
const port = 8080;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(express.json());
app.use('/api/products', productRouter);
