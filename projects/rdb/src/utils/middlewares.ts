import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  console.error(error.message);
  if (error.name === 'notFoundError') {
    response.status(404).end();
    return;
  }

  if (error.name === 'unAuthorizedError') {
    response.status(401).end();
    return;
  }

  if (error.name === 'ValidationError') {
    response.status(400).json({
      error: "Validation isEmail on username failed"
    })
  }

  response.status(500).end();
  return;
}
