import Product from '../models/product.js';
import FileContainer from "../continers/file-container.js"
import ProductsMongoDao from '../daos/products/products-mongo.dao.js'

// const productContainerService = new FileContainer("products.txt");

export const getProducts = ( async (req, res) => {

    const productDao = new ProductsMongoDao();

    if(req.params.id) {
      const product = await productDao.getProductByID(req.params.id)

      return res.status(200).json(product);
    }

    const products = await productDao.getAllProducts();

    return res.status(200).json(products);
});


export const createProduct = ( async (req, res) => {
  const id = await getId();
  const product = new Product(id + 1, req.body.name, req.body.description, req.body.code, req.body.price, req.body.stock, req.body.thumbnails);
  const productDao = new ProductsMongoDao();
  const savedProduct = await productDao.saveProduct(product);

  res.status(201).json(savedProduct);
});

export const updateProduct = ( async (req, res) => {
  // const products = await productContainerService.getAll() || [];
  const productDao = new ProductsMongoDao();
  const product = products.find(x => x.id === parseInt(req.params.id));

  if(product){
    product.name = req.body.title;
    product.description = req.body.description;
    product.code = req.body.code;
    product.price = req.body.price;
    product.stock = req.body.stock;
    product.thumbnails = req.body.thumbnails;

    const isUpdateOk = await productContainerService.update(product);

    if(!isUpdateOk) return res.status(500).send(`Product update fail`);

    return res.status(200).send("Product updated");
  }

  return res.status(404).send(`Product not found to update`);

});

export const deleteProduct = ( async (req, res) => {
  const products = await productContainerService.getAll() || [];
  const product = products.find(x => x.id === parseInt(req.params.id));

  if(product) {
    await productContainerService.deleteById(product.id);

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
