import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const checkAuth: RequestHandler = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    const token = authorization ? authorization.split(' ')[1] : '';
    jwt.verify(token, 'secret');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Sign in or sign up before continuing' });
  }
};

export default checkAuth;