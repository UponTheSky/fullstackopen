import { Request, Response, ErrorRequestHandler } from 'express';
import * as logger from './logger';

export const unknownEndpoint = (request: Request, response: Response) => {
  response.status(404).send({error: 'unknown endpoint'});
  return;
}

export const errorHandlingMiddleware: ErrorRequestHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted error '});
    return;
  }

  if (error.name === 'ValidationError') {
    response.status(400).send({ error: error.message });
    return;
  }

  if (error.name === 'JsonWebTokenError') {
    response.status(401).json({
      error: 'invalid token'
    });
    return;
  }

  if (error.name === 'TokenExpiredError') {
    response.status(401).json({
      error: 'token expired'
    });
    return;
  }

  logger.error(error.message);

  next(error);
}

