import { Router } from 'express';

import { diagnoses } from '../services/diagnoses';

export const diagnosesRouter = Router();

diagnosesRouter.get('/', (_request, response) => {
  response.json(diagnoses);
});
