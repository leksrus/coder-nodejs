import Product from '../models/product.js';
import ContainerService from "../services/container-service.js"

const productContainerService = new ContainerService("products.txt");

export const getProducts = ( async (req, res) => {

  const products = await productContainerService.getAll() || [];

  const product = products.find(x => x.id === parseInt(req.params.id));

  if(product) return res.status(200).json(product);

  return res.status(200).json(products);

});


export const createProduct = ( async (req, res) => {
  const id = await getId();
  const product = new Product(id + 1, req.body.name, req.body.description, req.body.code, req.body.price, req.body.stock, req.body.thumbnails);
  await productContainerService.saveNew(product);

  res.status(201).json(product);
});

export const updateProduct = ( async (req, res) => {
  const products = await productContainerService.getAll() || [];
  const product = products.find(x => x.id === parseInt(req.params.id));

  if(product){
    product.name = req.body.title;
    product.description = req.body.description;
    product.code = req.body.code;
    product.price = req.body.price;
    product.stock = req.body.stock;
    product.thumbnails = req.body.thumbnails;

    const isUpdateOk = await productContainerService.saveUpdate(product);

    if(!isUpdateOk) return res.status(500).send(`Product update fail`);

    return res.status(200).send("Product updated");
  }

  return res.status(404).send(`Product not found to update`);

});

export const deleteProduct = ( async (req, res) => {
  const products = await productContainerService.getAll() || [];
  const product = products.find(x => x.id === parseInt(req.params.id));

  if(product) {
    await productContainerService.deletById(product.id);

    return res.status(200).send('Product deleted');
  }

  return res.status(404).send('Product not found for delete'); 
});

async function getId() {
  const products = await productContainerService.getAll() || [];
  const ids = products.map((product) => product.id);

  return ids.length > 0 ? Math.max(...ids) : 0;
}


export default { getProducts, createProduct, updateProduct, deleteProduct };
