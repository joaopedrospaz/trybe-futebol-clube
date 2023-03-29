import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (err, req, res, _next) => {
  console.log(err);
  return res.status(500).json({ error: err.message });
};

export default errorMiddleware;
