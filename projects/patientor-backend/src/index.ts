import express from 'express';

import { diagnosesRouter } from './routes/diagnoses';
import { patientsRouter } from './routes/patients';

const app = express();

app.use(express.json());
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`the server running on port ${PORT}`);
});
