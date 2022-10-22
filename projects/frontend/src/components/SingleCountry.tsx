import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { CountryType, WeatherType } from '../types';

import { Weather } from './Weather';

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
      flags,
      capitalInfo: {
        latlng
      }
    } 
  }: SingleCountryProps) {
  const [weather, setWeather] = useState<WeatherType|null>(null);

  useEffect(() => {
    const fetchWeatherInfo = async () => {
      const fetchedData = await axios.get<WeatherType>(`
      https://api.openweathermap.org/data/3.0/onecall?lat=${latlng[0]}&lon=${latlng[1]}&exclude=minutely,hourly,daily,alerts&appid=${process.env.REACT_APP_API_KEY}
      `)
      setWeather(fetchedData.data);
    };

    fetchWeatherInfo();
  }, []);

 
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
      {weather ? <Weather weather_={weather} /> : null}
    </div>
  );
}
