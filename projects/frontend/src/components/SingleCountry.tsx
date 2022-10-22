import React from 'react';

import { CountryType } from '../types';

interface SingleCountryProps {
  country: CountryType;
}

export function SingleCountry(
  { country: 
    { 
      name, 
      capital, 
      area, 
      languages, 
      flags 
    } 
  }: SingleCountryProps) {
  return (
    <div>
      <h1>{name.common}</h1>
      capital {capital} 
      <br />
      area {area}
      <br />
      <h3>languages:</h3>
      <ul>
        {Object.entries(languages).map(([key, val]) => (
          <li key={key}>
            {val}
          </li>
        ))}
      </ul>
      <img src={flags.png} />
    </div>
  );
}
