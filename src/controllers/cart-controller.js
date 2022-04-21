import Cart from '../models/cart.js';
import ContainerService from "../services/container-service.js"

const cartContainerService = new ContainerService("cart.txt");

export const getCartProducts = ( async (req, res) => {

  const cart = await cartContainerService.getById(parseInt(req.params.id));

  if(cart) return res.status(200).json(cart.produts);

  return res.status(404).send('Cart not found'); 

});


export const createCart = ( async (req, res) => {
  const id = await getId();
  const cart = new Cart(id + 1, []);

  await cartContainerService.saveNew(cart);

  res.status(201).json({ message: 'Cart created', id: cart.id } );
});

export const createCartProduct = ( async (req, res) => {
  const cart = await cartContainerService.getById(parseInt(req.params.id));

  if(cart) {
    cart.products = req.body.products;
    await cartContainerService.saveUpdate(cart);

    return res.status(201).send('Product added');
  }

  return res.status(404).send('Cart not found'); 
});


export const deleteCart = ( async (req, res) => {
  const carts = await cartContainerService.getAll() || [];
  const cart = carts.find(x => x.id === parseInt(req.params.id));

  if(cart) {
    await cartContainerService.deletById(cart.id);

    return res.status(200).send('Cart deleted');
  }

  return res.status(404).send('Cart not found for delete'); 
});

export const deleteProductFromCart = ( async (req, res) => {
  const carts = await cartContainerService.getAll() || [];
  const cart = carts.find(x => x.id === parseInt(req.params.id));

  if(cart) {
    cart.products = cart.products.filter(x => x.id !== parseInt(req.params.prod_id));
    await cartContainerService.saveUpdate(cart);

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
