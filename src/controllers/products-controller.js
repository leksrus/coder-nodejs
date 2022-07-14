import Product from '../models/product.js';
import ProductService from "../services/product-service.js";

const productService = new ProductService();

export const getProducts = ( async (req, res) => {
    if(req.params.id) {
      const product = await productService.getProductById(req.params.id)

      return res.status(200).json(product);
    }

    const products = await productService.getAllProducts();

    return res.status(200).json(products);
});


export const createProduct = ( async (req, res) => {
  const product = new Product(0, req.body.name, req.body.description, req.body.code, req.body.price, req.body.stock, req.body.thumbnails);
  await productService.createProduct(product);

  res.status(201).send(`Product saved`);
});

export const updateProduct = ( async (req, res) => {
  const product = new Product(0, req.body.name, req.body.description, req.body.code, req.body.price, req.body.stock, req.body.thumbnails);

  if(req.params.id) {
    await productService.modifyProductById(req.params.id, product);

    return res.status(200).send(`Product updated`);
  }

  return res.status(400).send(`Bad request`);

});

export const deleteProduct = ( async (req, res) => {

  if(req.params.id) {
    await productService.deleteProductById(req.params.id);

    return res.status(200).send(`Product updated`);
  }

  return res.status(400).send('Bad request');
});

export default { getProducts, createProduct, updateProduct, deleteProduct };
