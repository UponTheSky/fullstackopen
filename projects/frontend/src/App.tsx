import React, { useState, useEffect, ChangeEventHandler } from 'react';
import axios from 'axios';

import { CountryType } from './types';

import { Search } from './components/Search';
import { Result } from './components/Result';

const App = () => {
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [searchWord, setSearchWord] = useState('');

  useEffect(() => {
    const fetchAllCountries = async () => {
      const fetchedData = await axios.get<CountryType[]>('https://restcountries.com/v3.1/all');
      const allCountries = fetchedData.data;      

      setCountries(allCountries);
    };

    fetchAllCountries();
  }, []);

  const handleSearchKeyword: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchWord(event.target.value);
  };

  const filteredCountries = searchWord === '' 
  ? []
  : countries.filter(country => country.name.common.toLowerCase().match(searchWord));

  return (
    <div>
      <Search text="find countries" searchKeyword={searchWord} onChangeHandler={handleSearchKeyword} />
      <Result filteredCountries={filteredCountries} />
    </div>
  );
};

export default App
