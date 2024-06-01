import express, { NextFunction, Request, Response, Router } from 'express';
import {
  Cart,
  AddProductToCartPayload,
  UpdateQuantityPayload,
  RemoveProductFromCartPayload, SetShippingAddressPayload,
} from '../../models/Cart.model';
import {
  addProductToCart, addShippingAddress,
  createGuestCart, createOrder,
  getCartById,
  removeProductFromCart,
  updateProductQuantity,
} from './cart.service';

const router: Router = express.Router();

router.post('/', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const data: Cart = await createGuestCart();

    res.send(data);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const data: Cart = await getCartById(req.params.id);

    res.send(data);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const cartId = req.params.id;
    const payload: AddProductToCartPayload | UpdateQuantityPayload | RemoveProductFromCartPayload | SetShippingAddressPayload = req.body;
    let data = null;

    switch (payload.action) {
      case 'AddLineItem':
        data = await addProductToCart(payload as AddProductToCartPayload, cartId);
        break;
      case 'ChangeLineItemQuantity':
        data = await updateProductQuantity(payload as UpdateQuantityPayload, cartId);
        break;
      case 'RemoveLineItem':
        data = await removeProductFromCart(payload as RemoveProductFromCartPayload, cartId);
        break;
      case 'SetShippingAddress':
        data = await addShippingAddress(payload as SetShippingAddressPayload, cartId);
        break;
    }

    res.send(data);
  } catch (err) {
    console.log(err)
    next(err);
  }
});

router.post('/:id/order', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const orderId: number = await createOrder(req.params.id);

    res.send({ orderId });
  } catch (err) {
    next(err);
  }
});

export default router;
