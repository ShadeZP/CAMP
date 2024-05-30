import express, { Request, Response, Router } from 'express';
import { Cart, UpdateProductInCartPayload } from '../../models/Cart.model';
import { addProductToCart, createGuestCart, getCartById } from './cart.service';

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
  const payload: UpdateProductInCartPayload = req.body;

  const data = await addProductToCart(payload, cartId);

  res.send(data);
})

export default router;
