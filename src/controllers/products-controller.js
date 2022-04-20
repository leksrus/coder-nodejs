import Product from '../models/product.js';



 export const getProduct = ((req, res) => {
  const id = Number(req.params.productID)
  const product = products.find(product => product.id === id)

      if (!product) {
      return res.status(404).send('Product not found')
  }
  res.json(product)
});


export const createProduct = ((req, res) => {
  const newProduct = {
      id: products.length + 1,
      name: req.body.name,
      price: req.body.price
  }
  products.push(newProduct)
  res.status(201).json(newProduct)
});

export const updateProduct = ((req, res) => {
  const id = Number(req.params.productID)
  const index = products.findIndex(product => product.id === id)
  const updatedProduct = {
      id: products[index].id,
      name: req.body.name,
      price: req.body.price
  }

  products[index] = updatedProduct
  res.status(200).json('Product updated')
});

export const deleteProduct = ((req, res) => {
  const id = Number(req.params.productID)
  const index = products.findIndex(product => product.id === id)
  products.splice(index,1)
  res.status(200).json('Product deleted')
});

export default { getProduct, createProduct, updateProduct, deleteProduct };
