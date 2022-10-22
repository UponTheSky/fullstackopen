import React from 'react';

import { CountryType } from '../types';

import { SingleCountry } from './SingleCountry';
import { MultipleCountries } from './MultipleCountries';

interface ResultProps {
  filteredCountries: CountryType[];  
}

export function Result({ filteredCountries }: ResultProps) {
  return (
    <>
      {filteredCountries.length === 1
        ? <SingleCountry country={filteredCountries[0]}/>
        : <MultipleCountries countries={filteredCountries} />
      }
    </>
  );
}
