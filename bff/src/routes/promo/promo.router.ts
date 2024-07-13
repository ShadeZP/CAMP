import express, { NextFunction, Request, Response, Router } from 'express';
import { getPromoById } from './promo.service';

const router: Router = express.Router();

router.get('/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;

    const data = await getPromoById(id);
    const data2 = {
      sku: 'WJ01-S-Blue',
      promos: [{
        order: 2,
        text: `
                                <div class="p-4 my-2 flex h-[300px] shadow rounded-xl">
                                    <div class="flex-grow">
                                        <h2 class="text-2xl font-serif">A mocked promo with order: 2</h2>
                                    </div>
                                    <div>
                                        <img src="/assets/images/mountain-promo-example-2.webp" alt="promo-2" 
                                            class="h-[100%] rounded-xl"
                                        />
                                    </div>
                                </div>
                            `,
      }, {
        order: 1,
        text: `
                                <div class="p-4 my-2 flex h-[300px] shadow-lg rounded-xl">
                                    <div class="flex-grow">
                                        <h2 class="text-2xl font-serif">A mocked promo with order: 1</h2>
                                        <p>Promo text</p>
                                    </div>
                                    <div>
                                        <img src="/assets/images/city-promo-example-1.webp" alt="promo-1" 
                                            class="h-[100%] rounded-xl"
                                        />
                                    </div>
                                </div>
                            `,
      }].sort((a, b) => a.order - b.order),
    };
    res.send(data);
  } catch (err) {
    console.log('router err', err);
    next(err);
  }
});

export default router;
