export enum Gender {
  Male = 'male',
  Femail = 'female'
}

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
}
