import Cart from '../models/cart.js';

const pathMongoDao = '../daos/products/products-mongo.dao.js';
const pathFirebaseDao = '../daos/products/product-firebase.dao.js';

export const getCartProducts = ( async (req, res) => {
  const module = process.env.DAO === 'firebase' ? await import(pathFirebaseDao) :  await import(pathMongoDao);
  const cartDao = new module.default();

  if(req.params.id) {
    const cart = cartDao.geCartByID(req.params.id);

    if(cart) return res.status(200).json(cart);

    return res.status(404).send('Cart not found');
  }

  return res.status(400).send('Bad request');

});


export const createCart = ( async (req, res) => {
  const module = process.env.DAO === 'firebase' ? await import(pathFirebaseDao) :  await import(pathMongoDao);
  const cartDao = new module.default();
  const cart = new Cart(0, req.body.products);

  if(req.params.id) {
    await cartDao.updateProductById(req.params.id, cart);

    return res.status(201).json({ message: 'Cart created', id: cart.id } );
  }

  return res.status(400).send(`Bad request`);
});

export const createCartProduct = ( async (req, res) => {
  const module = process.env.DAO === 'firebase' ? await import(pathFirebaseDao) :  await import(pathMongoDao);
  const cartDao = new module.default();
  const cart = new Cart(0, req.body.products);

  if(req.params.id) {
    await cartDao.updateProductById(req.params.id, cart);

    return res.status(201).json({ message: 'Cart created' } );
  }

  return res.status(400).send('Bad request');
});


export const deleteCart = ( async (req, res) => {
  const module = process.env.DAO === 'firebase' ? await import(pathFirebaseDao) :  await import(pathMongoDao);
  const cartDao = new module.default();

  if(req.params.id) {
    await cartDao.deleteProductById(req.params.id);

    return res.status(201).json({ message: 'Cart deleted' } );
  }

  return res.status(400).send(`Bad request`);
});

export const deleteProductFromCart = ( async (req, res) => {
  const module = process.env.DAO === 'firebase' ? await import(pathFirebaseDao) :  await import(pathMongoDao);
  const cartDao = new module.default();
  const cart = new Cart(0, req.body.products);

  if(req.params.id) {
    await cartDao.updateProductById(req.params.id, cart);

    return res.status(201).json({ message: 'Product delete from cart' } );
  }

  return res.status(400).send('Bad request');
});


export default { getCartProducts, createCart, createCartProduct, deleteCart, deleteProductFromCart };
