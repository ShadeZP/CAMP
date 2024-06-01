import express, { NextFunction, Request, Response, Router } from 'express';
import { getProducts, getProduct } from './product.service';

const router: Router = express.Router();

router.get('/', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const { categoryId, offset, limit } = req.query as { categoryId: string, offset: string, limit: string };

    const data = await getProducts({ categoryId, offset, limit });

    res.send(data);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;

    const data = await getProduct(id);

    res.send(data);
  } catch (err) {
    next(err);
  }
});

export default router;
