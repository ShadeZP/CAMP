import express, { NextFunction, Request, Response, Router } from 'express';
import { getPromoById } from './promo.service';

const router: Router = express.Router();

router.get('/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;

    const data = await getPromoById(id);
    res.send(data);
  } catch (err) {
    console.log('router err', err);
    next(err);
  }
});

export default router;
