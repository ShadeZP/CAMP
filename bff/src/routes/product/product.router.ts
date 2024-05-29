import express, { Request, Response, Router } from 'express';
import { getProducts, getProduct } from './product.service';

const router: Router = express.Router();

router.get('/', async function (req: Request, res: Response) {
  const { categoryId, offset, limit } = req.query as { categoryId: string, offset: string, limit: string };

  const data = await getProducts({ categoryId, offset, limit });

  res.send(data);
});

router.get('/:id', async function (req: Request, res: Response) {
  const id = req.params.id;

  const data = await getProduct(id);

  res.send(data);
});

export default router;
