import React from 'react';

import { CountryType } from '../types';

interface MultipleCountriesProps {
  countries: CountryType[];
}

export function MultipleCountries({ countries }: MultipleCountriesProps) {
  return (
    <div>
      {countries.length > 10 
      ? "Too many matches, specify another filter"
      : countries.map(country => (
        `${country.name.common}\n`
      ))
      }
    </div>
  );
}
