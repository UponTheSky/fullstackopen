import { Request, RequestHandler, ErrorRequestHandler, NextFunction } from 'express';
import morgan from 'morgan';

import { getTokenFromRequest } from './jwt';

// for logging the incoming requests and their handlings
export const handleRouterLoggings = morgan<Request>((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-', 
    tokens['response-time'](req, res), 'ms',
    req.method === 'POST' ? JSON.stringify(req.body) : ''
  ].join(' ');
});

// for handling tokens: not easy in TS so we omit the actual application of this middleware
export const tokenExtractor = (request: Request & { token?: string }, response: Response, next: NextFunction) => {
  const token = getTokenFromRequest(request);
  request.token = token;
  next();
}

// when you try to access an endpoint not enrolled into the controller
// enrolled just before the error handlers middleware
export const handleUnknownEndpoint: RequestHandler = (request, response) => {
  response.status(400).send({
    error: "unknown endpoint"
  });
};

// the last middleware to be enrolled
export const handleErorrRequest: ErrorRequestHandler = (error, request, response, next) => {
  // check if CastError
  if (error.name === 'CastError') {
    response.status(400).send({
      error: "invalid id format for the Mongo DB"
    });
    return;
  }

  // check if ValidationError
  if (error.name === 'ValidationError') {
    response.status(400).send({
      error: error.message
    });
    return;
  }
};
