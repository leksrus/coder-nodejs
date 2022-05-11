import Cart from '../models/cart.js';
import FileContainer from "../continers/file-container.js"
import CartMongoDao from "../daos/carts/cart-mongo.dao.js";

// const cartContainerService = new FileContainer("cart.txt");

export const getCartProducts = ( async (req, res) => {
  const cartMongoDao = new CartMongoDao();
  // const cart = await cartContainerService.getById(parseInt(req.params.id));

  if(req.params.id) {
    const cart = cartMongoDao.geCartByID(req.params.id);

    if(cart) return res.status(200).json(cart);

    return res.status(404).send('Cart not found');
  }

  return res.status(400).send('Bad request');

});


export const createCart = ( async (req, res) => {
  const id = await getId();
  const cart = new Cart(id + 1, []);

  await cartContainerService.save(cart);

  res.status(201).json({ message: 'Cart created', id: cart.id } );
});

export const createCartProduct = ( async (req, res) => {
  const cart = await cartContainerService.getById(parseInt(req.params.id));

  if(cart) {
    cart.products = req.body.products;
    await cartContainerService.update(cart);

    return res.status(201).send('Product added');
  }

  return res.status(404).send('Cart not found'); 
});


export const deleteCart = ( async (req, res) => {
  const carts = await cartContainerService.getAll() || [];
  const cart = carts.find(x => x.id === parseInt(req.params.id));

  if(cart) {
    await cartContainerService.deleteById(cart.id);

    return res.status(200).send('Cart deleted');
  }

  return res.status(404).send('Cart not found for delete'); 
});

export const deleteProductFromCart = ( async (req, res) => {
  const carts = await cartContainerService.getAll() || [];
  const cart = carts.find(x => x.id === parseInt(req.params.id));

  if(cart) {
    cart.products = cart.products.filter(x => x.id !== parseInt(req.params.prod_id));
    await cartContainerService.update(cart);

    return res.status(200).send('Product deleted');
  }

  return res.status(404).send('Product not found for delete'); 
});

async function getId() {
  const carts = await cartContainerService.getAll() || [];
  const ids = carts.map((cart) => cart.id);

  return ids.length > 0 ? Math.max(...ids) : 0;
}


export default { getCartProducts, createCart, createCartProduct, deleteCart, deleteProductFromCart };
