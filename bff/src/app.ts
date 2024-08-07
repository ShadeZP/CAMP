require('dotenv').config()

const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

import express, { Express, Request, Response, NextFunction } from 'express';
import cartRouter from './routes/cart/cart.router';
import categoriesRouter from './routes/categories/categories.router';
import productsRouter from './routes/product/product.router';

const app: Express = express();
const port = 3003;

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/carts', cartRouter);

// error handler
app.use(function (err: Error, req: Request, res: Response, next: NextFunction): void {
  // set locals, only providing error in development
  console.log('text', (err as any).response)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status((err as any).status || 500);
  res.status(500).send(err);
});

app.listen(port, () => {
  return console.log(`Express server is listening at http://localhost:${port} 🚀`);
});
