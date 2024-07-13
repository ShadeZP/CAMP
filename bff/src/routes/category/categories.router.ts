import { getCategories } from './categories.service';
import { CustomCategory } from '../../models/CustomCategory';
import express, { NextFunction, Request, Response, Router } from 'express';

const router: Router = express.Router();

router.get('/', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const data: CustomCategory[] = await getCategories();

    res.send(data);
  } catch (err) {
    next(err);
  }
});

export default router;
