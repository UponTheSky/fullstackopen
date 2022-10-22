import React, { useState } from 'react';

import { CountryType } from '../types';

import { SingleCountry } from './SingleCountry';

interface MultipleCountriesProps {
  countries: CountryType[];
}

export function MultipleCountries({ countries }: MultipleCountriesProps) {
  const [isShowed, setIsShowed] = useState<{[key: string]: boolean }>(() => (
    countries
    .map(country => country.name.common)
    .reduce((prev, curr) => ({ ...prev, [curr]: false }), {})
  ));

  const handleSetShowCountry = (name: string) => () => {
    setIsShowed(prev => ({ ...prev, [name]: !prev[name]}))
  };

  return (
    <div>
      {countries.length > 10 
      ? "Too many matches, specify another filter"
      : countries.map(country => (
        <div>
          {country.name.common} <button onClick={handleSetShowCountry(country.name.common)}>show</button>
          {isShowed[country.name.common] ? <SingleCountry country={country} />: null}
        </div>
      ))
      }
    </div>
  );
}
