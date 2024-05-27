import { getCategories } from './categories.service';
import { Category } from './models/Category';
import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();

router.get('/', async function (req: Request, res: Response) {
  const data: Category[] = await getCategories();

  res.send(data);
});

export default router;
