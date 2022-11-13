import diagnosesJSON from '../data/diagnoses.json';

interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export const diagnoses = diagnosesJSON as Diagnose[];
