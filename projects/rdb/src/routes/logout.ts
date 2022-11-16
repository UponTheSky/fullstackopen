import { Router } from 'express';
import { tokenExtractor } from '../lib/jwt';
import { Session } from '../models';

export const logoutRouter = Router();

logoutRouter.delete('/', async (request, response, next) => {
  try {
    const decodedToken = tokenExtractor(request);

    if (decodedToken) {
      const userId = decodedToken.id;

      const userSession = await Session.findOne({
        where: {
          userId
        }
      });

      if (!userSession) {
        throw new Error(`internal error: session of the current user ${userId} has not been found`);
      }

      await userSession.destroy();
      response.status(204).end();
    }
  } catch(error) {
    next(error);
  }
});
