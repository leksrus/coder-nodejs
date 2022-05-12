import Product from '../models/product.js';

const pathMongoDao = '../daos/products/products-mongo.dao.js';
const pathFirebaseDao = '../daos/products/product-firebase.dao.js';
const module = process.env.DAO === 'firebase' ? await import(pathFirebaseDao) :  await import(pathMongoDao);

export const getProducts = ( async (req, res) => {
    const productDao = new module.default();
    if(req.params.id) {
      const product = await productDao.getProductByID(req.params.id)

      return res.status(200).json(product);
    }

    const products = await productDao.getAllProducts();

    return res.status(200).json(products);
});


export const createProduct = ( async (req, res) => {
  const product = new Product(0, req.body.name, req.body.description, req.body.code, req.body.price, req.body.stock, req.body.thumbnails);
  const productDao = new module.default();
  await productDao.saveProduct(product);

  res.status(201).send(`Product saved`);
});

export const updateProduct = ( async (req, res) => {
  const product = new Product(0, req.body.name, req.body.description, req.body.code, req.body.price, req.body.stock, req.body.thumbnails);
  const productDao = new module.default();

  if(req.params.id) {
    await productDao.updateProductById(req.params.id, product);

    return res.status(200).send(`Product updated`);
  }

  return res.status(400).send(`Bad request`);

});

export const deleteProduct = ( async (req, res) => {
    const productDao = new module.default();

  if(req.params.id) {
    await productDao.deleteProductById(req.params.id);

    return res.status(200).send(`Product updated`);
  }

  return res.status(400).send('Bad request');
});

export default { getProducts, createProduct, updateProduct, deleteProduct };
