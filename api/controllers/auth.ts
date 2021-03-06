import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const checkAuth: RequestHandler = ({ headers }, res, next) => {
  try {
    const accessToken = headers.authorization ?? '';

    jwt.verify(accessToken, 'secret');

    next();
  } catch (error) {
    res.status(401).json({ message: 'Sign in or sign up before continuing' });
  }
};

export default {
  checkAuth,
};
