import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

import errorHandler from './api/middleware/errorHandler';
import notFoundHandler from './api/middleware/notFoundHandler';
import ordersRoutes from './api/routes/orders';
import productsRoutes from './api/routes/products';
import usersRoutes from './api/routes/users';

const app = express();

//Connect to MongoDB altas
mongoose.connect(
  `mongodb+srv://admin:${process.env.MONGO_PW}@rest-shop-api-ydzam.mongodb.net/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true }
);

//Middlewares
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//Routes which should handle requests
app.use('/orders', ordersRoutes);
app.use('/products', productsRoutes);
app.use('/users', usersRoutes);

//Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
