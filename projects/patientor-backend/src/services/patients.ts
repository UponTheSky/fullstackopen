import { v1 as uuid } from 'uuid';
import patientsJSON from '../data/patients.json';

import { Patient } from '../types';
import { 
  parseString,
  parseDate,
  parseGender
} from '../utils';

export type PatientWitoutSSN = Omit<Patient, 'ssn'>;

export const patients = patientsJSON as Patient[];

type NewPatientEntry = Omit<Patient, 'id'>;

export const addPatient = (patient: NewPatientEntry): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
}

interface ExternalPatientDataInput {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown 
}

export const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation
}: ExternalPatientDataInput): NewPatientEntry => ({
  name: parseString(name),
  dateOfBirth: parseDate(dateOfBirth),
  ssn: parseString(ssn),
  gender: parseGender(gender),
  occupation: parseString(occupation)
});
