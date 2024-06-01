import { getCategories } from './categories.service';
import { Category } from '../../models/Category';
import express, { NextFunction, Request, Response, Router } from 'express';

const router: Router = express.Router();

router.get('/', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const data: Category[] = await getCategories();

    res.send(data);
  } catch (err) {
    next(err);
  }
});

export default router;
