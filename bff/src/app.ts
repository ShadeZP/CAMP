const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

import express, { Express, Request, Response, NextFunction } from "express";
import categoriesRouter from './routes/categories/categories.router'
import productsRouter from './routes/products/products.router'

const app: Express  = express();
const port = 3003;

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v1/products', productsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: Error, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status((err as any).status || 500);
  res.render('error');
});

app.listen(port, () => {
  return console.log(`Express server is listening at http://localhost:${port} 🚀`);
});
