import { Router } from 'express';

import { 
  patients, 
  PatientWitoutSSN, 
  addPatient,
  toNewPatientEntry
} from '../services/patients';

export const patientsRouter = Router();

patientsRouter.get('/', (_request, response) => {
  const patientsWithoutSSN: PatientWitoutSSN[] = patients.map(({ 
    id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));

  response.json(patientsWithoutSSN);
});

patientsRouter.post('/:id', (request, response) => {
  try {
    const newPatient = toNewPatientEntry(request.body);
    const addedNewPatient = addPatient(newPatient);
    response.status(201).json(addedNewPatient);
  } catch(error) {
    if (error instanceof Error) {
      console.log(error.message);
      response.status(400).send(error.message);
    } 
  }
});
