import React, { useState, useEffect } from 'react';

import { WeatherType } from '../types';

interface WeatherProps {
  weather_: WeatherType
}

export function Weather({ 
  weather_: {
    current: {
      temp, wind_speed, weather: { icon }
    }
  }
}: WeatherProps) {
  return (
    <div>
      temperature {temp} Celcius
      <br />
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
      < br/>
      wind {wind_speed} m/s
    </div>
  );
}
