import express from 'express';
import 'dotenv/config';
import multer from 'multer';
import {productRouter} from './routers/products-routes.js';
import {cartRouter} from './routers/cart-router.js';
import { validateAdmin } from './middleware/middleware.js';
import {userRouter} from "./routers/user-router.js";
import cluster from 'cluster';
import os from 'os';
import log4js from 'log4js';
import { engine } from 'express-handlebars';
import passport from "passport";
import session from 'express-session';
import MongoStore from 'connect-mongo';
import {orderRouter} from "./routers/order-router.js";


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

  log4js.configure({
    appenders : {
      console: { type: 'console'},
      fileError: {type: 'file', filename: 'error.log'},
      fileWarning: {type: 'file', filename: 'warn.log'}
    },
    categories: {
      error: { appenders: ['fileError'], level: 'error' },
      warning: { appenders: ['fileWarning'], level: 'warn'},
      default: { appenders: ['console'], level: 'debug'}
    }
  });


 const app = express();

  app.engine(
      "hbs",
      engine({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
      })
  );

  app.set('views', './src/views');
  app.set('view engine', 'hbs');

  app.use(session({
    store: MongoStore.create({ mongoUrl: process.env.MONGOSESSIONURL }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 10
    }
  }));

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
  app.use(passport.initialize());
  app.use(passport.session());
  app.use('/api/products', productRouter);
  app.use('/api/cart', cartRouter);
  app.use('/api/users', userRouter);
  app.use('/api/orders', orderRouter);


  app.use((req, res, next) => {
    const logger = log4js.getLogger('warning');
    logger.warn('Route not found');
    return res.status(404).send({ message: 'Route'+req.url+' Not found.' });
  });

  app.use((err, req, res, next) => {
    const logger = log4js.getLogger('error');
    logger.warn('Errors generic');
    return res.status(500).send({ error: err });
  });
}