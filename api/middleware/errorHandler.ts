import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, _req, res) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
};

export default errorHandler;
