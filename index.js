const Container = require('./container');
const tempContainer = new Container("products.txt");
const express = require('express');
const random = require('random');
const app = express();
const port = 8080;


app.get('/generate', async (req, res) => {
  const product1 = { title: "soap", proce: 10.33, thumbnails: "/##/##" };
  const product2 = { title: "paper", proce: 58.99, thumbnails: "/##/##" };
  const product3 = { title: "milk", proce: 5.99, thumbnails: "/##/##" };
  const product4 = { title: "pensil", proce: 1.00, thumbnails: "/##/##" };
  const product5 = { title: "bread", proce: 1.50, thumbnails: "/##/##" };
  
  try {
    await tempContainer.save(product1);
    await tempContainer.save(product2);
    await tempContainer.save(product3);
    await tempContainer.save(product4);
    await tempContainer.save(product5);

    res.send('OK');
    
  } catch (error) {
    res.send(error);
  }
})


app.get('/products', async (req, res) => {
  res.send(await tempContainer.getAll());
})

app.get('/random-product', async (req, res) => {
  const number = random.int((min = 1), (max = 5));

  const product = await tempContainer.getById(number);

  res.send(product);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})