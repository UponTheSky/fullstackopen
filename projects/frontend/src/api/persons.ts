import axios from 'axios';

import { PersonType } from '../types';

const baseURL = 'http://localhost:3001/persons';

const getAll = async () => {
  const response = await axios.get<PersonType[]>(baseURL);
  return response.data;
};

const create = async (newObject: Partial<PersonType>) => {
  const response = await axios.post<PersonType>(baseURL, newObject);
  return response.data;
};

const update = async (id: PersonType['id'], newObject: Partial<PersonType>) => {
  const response = await axios.put<PersonType>(`${baseURL}/${id}`, newObject);
  return response.data;
};

export default { getAll, create, update };
