import { Request, Response, ErrorRequestHandler } from 'express';

export const unknownEndpoint = (request: Request, response: Response) => {
  response.status(404).send({error: 'unknown endpoint'});
  return;
}

export const errorHandlingMiddleware: ErrorRequestHandler = (error, request, response, next) => {
  console.log(error);

  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted error '});
    return;
  }

  if (error.name === 'ValidationError') {
    response.status(400).send({ error: error.message });
    return;
  }
  next(error);
}
