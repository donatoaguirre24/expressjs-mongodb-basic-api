import { RequestHandler } from 'express';

const notFoundHandler: RequestHandler = (_req, _res, next) => {
  const error: any = new Error('Not found');
  error.status = 404;

  next(error);
};

export default notFoundHandler;
