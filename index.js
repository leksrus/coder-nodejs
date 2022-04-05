import express from 'express';
import Product from './classes/product.js';
import { engine } from 'express-handlebars';

// const Container = require('./container');
// const tempContainer = new Container("products.txt");
// const express = require('express');
// const random = require('random');
const app = express();
const { Router } = express;
const routerProducts = Router();

app.use('/api/products', routerProducts);
app.use(express.static('public'))

routerProducts.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine(
  "hbs",
  engine({
      extname: ".hbs",
      defaultLayout: 'index.hbs',
  })
);

app.set('views', './views');
// app.set('view engine', 'ejs');
// app.set('view engine', 'ejs');
app.set('view engine', 'hbs');

const port = 8080;

let products = [];


//TEMPLATES
app.get('/products', (req, res) => {
  res.render("view", {
    productsView: products,
    productsViewExist: products.length
});
});

app.post('/products', (req, res) => {
  const id = getId();
  console.log(req.body);
  const product = new Product(id + 1, req.body.title, req.body.price, req.body.thumbnails);

  products.push(product);
  res.redirect('/')
});



//API REST
routerProducts.get('/', async (req, res) => {
  if (products.length > 0) return res.json(products);

  res.json({error: "204 no content"});
});

routerProducts.get('/:id', async (req, res) => {
  const product = products.find(x => x.id === parseInt(req.params.id));

  if(product) return res.json(product);

  return res.json({error: "404 product not found"});
});

routerProducts.post('/', async (req, res) => {
  const id = getId();
  const product = new Product(id + 1, req.body.title, req.body.price, req.body.thumbnails);
  products.push(product);

  res.json(product);
});


//put != patch actualizo si esta sino creo nuevo
routerProducts.put('/:id', async (req, res) => {
  const product = products.find(x => x.id === parseInt(req.params.id));

  if(product){
    product.title = req.body.title;
    product.price = req.body.price;
    product.thumbnails = req.body.thumbnails;

    return res.json(product);
  }

  const id = getId();
  const newProduct = new Product(id + 1, req.body.title, req.body.price, req.body.thumbnails);
  products.push(newProduct);

  return res.json(newProduct);
})

routerProducts.delete('/:id', async (req, res) => {
  const product = products.find(x => x.id === parseInt(req.params.id));

  if(product) {
    products = products.filter(x => x.id !== product.id);

    return res.json(product);
  }

  return res.json({error: "404 product not found for delete"});
})

function getId() {
  const ids = products.map((product) => product.id);

  return ids.length > 0 ? Math.max(...ids) : 0;
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})