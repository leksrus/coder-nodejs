import express from 'express';
import Product from './classes/product.js'

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
routerProducts.use(express.urlencoded({extended: true}));

const port = 8080;

let products = [];

// app.get('/generate', async (req, res) => {
//   const product1 = { title: "soap", proce: 10.33, thumbnails: "/##/##" };
//   const product2 = { title: "paper", proce: 58.99, thumbnails: "/##/##" };
//   const product3 = { title: "milk", proce: 5.99, thumbnails: "/##/##" };
//   const product4 = { title: "pensil", proce: 1.00, thumbnails: "/##/##" };
//   const product5 = { title: "bread", proce: 1.50, thumbnails: "/##/##" };
//
//   try {
//     await tempContainer.save(product1);
//     await tempContainer.save(product2);
//     await tempContainer.save(product3);
//     await tempContainer.save(product4);
//     await tempContainer.save(product5);
//
//     res.send('OK');
//
//   } catch (error) {
//     res.send(error);
//   }
// })
//
//
// app.get('/products', async (req, res) => {
//   res.send(await tempContainer.getAll());
// })
//
// app.get('/random-product', async (req, res) => {
//   const number = random.int((min = 1), (max = 5));
//
//   const product = await tempContainer.getById(number);
//
//   res.send(product);
// })

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