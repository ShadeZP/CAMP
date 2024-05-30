import express, { Request, Response, Router } from 'express';
import {
  Cart,
  AddProductToCartPayload,
  UpdateQuantityPayload,
  RemoveProductFromCartPayload,
} from '../../models/Cart.model';
import {
  addProductToCart,
  createGuestCart,
  getCartById,
  removeProductFromCart,
  updateProductQuantity,
} from './cart.service';

const router: Router = express.Router();

router.post('/', async function (req: Request, res: Response) {
  const data: Cart = await createGuestCart();

  res.send(data);
});

router.get('/:id', async function (req: Request, res: Response) {
  const data: Cart = await getCartById(req.params.id);

  res.send(data);
})

router.put('/:id', async function (req: Request, res: Response) {
  const cartId = req.params.id;
  const payload: AddProductToCartPayload | UpdateQuantityPayload | RemoveProductFromCartPayload = req.body;
  let data = null;
  switch (payload.action) {
    case 'AddLineItem':
      data = await addProductToCart(payload as AddProductToCartPayload, cartId)
      break;
    case 'ChangeLineItemQuantity':
      data = await updateProductQuantity(payload as UpdateQuantityPayload, cartId)
      break;
    case 'RemoveLineItem':
      data = await removeProductFromCart(payload as RemoveProductFromCartPayload, cartId)
  }


  res.send(data);
})

export default router;
