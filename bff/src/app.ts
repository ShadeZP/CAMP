require('dotenv').config();

const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

import express, { Express, Request, Response, NextFunction } from 'express';
import cartRouter from './routes/cart/cart.router';
import categoryRouter from './routes/category/categories.router';
import productRouter from './routes/product/product.router';
import promoRouter from './routes/promo/promo.router';

const app: Express = express();
const port = 3003;

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/carts', cartRouter);
app.use('/api/v1/promos', promoRouter);

// error handler
app.use(function (err: Error, req: Request, res: Response, next: NextFunction): void {
  // set locals, only providing error in development
  console.log('text', (err as any).response);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status((err as any).status || 500);
  res.status(500).send(err);
});

app.listen(port, () => {
  return console.log(`Express server is listening at http://localhost:${port} 🚀`);
});
