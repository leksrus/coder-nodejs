import express from 'express';
import 'dotenv/config';
import multer from 'multer';
import {productRouter} from './routers/products-routes.js';
import {cartRouter} from './routers/cart-router.js';
import { validateAdmin } from './middleware/middleware.js';
import {mongooseCon} from "./config/configurations.js";
import {userRouter} from "./routers/user-router.js";
import cluster from 'cluster';
import os from 'os';


const totalCpus = os.cpus().length;

const enableCluster = process.env.ENABLECLUSTER === 'true'

if (cluster.isMaster && enableCluster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < totalCpus; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {

  await mongooseCon();

  const app = express();

  const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  });

  const port = 8080;

  process.env.DAO = 'firebase';

  app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening on port ${port}`);
    console.log(process.env.DAO);
  });


  app.use(multerMid.single('file'))
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(validateAdmin);
  app.use('/api/products', productRouter);
  app.use('/api/cart', cartRouter);
  app.use('/api/users', userRouter);

}