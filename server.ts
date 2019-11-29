import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

import router from './api/routes/index';

const { PORT, MONGO_PW } = process.env;

// Create the express instance
const app = express();

// Connect to MongoDB altas
const uri = `mongodb+srv://admin:${MONGO_PW}@rest-shop-api-ydzam.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(uri, { useNewUrlParser: true });

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Routes which should handle requests
router(app);

// Listen for requests in the given port
app.listen(PORT);
