import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const checkAuth: RequestHandler = ({ headers: { authorization } }, res, next) => {
  try {
    const token = authorization ?? '';

    jwt.verify(token, 'secret');

    next();
  } catch (error) {
    res.status(401).json({ message: 'Sign in or sign up before continuing' });
  }
};

export default checkAuth;
