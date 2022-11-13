import { Gender } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
}

export const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('invalid as a string input');
  }

  return text;
}

export const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('invalid as a date input');
  }

  return date;
}

export const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('invalid as a gender input');
  }

  return gender;
}
