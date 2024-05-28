import express, { Request, Response, Router } from 'express';
import { getProducts } from './products.service';

const router: Router = express.Router();

router.get('/', async function (req: Request, res: Response) {
  const { categoryId, offset, limit } = req.query as { categoryId: string, offset: string, limit: string };

  const data = await getProducts({ categoryId, offset, limit });

  res.send(data);
});

export default router;
