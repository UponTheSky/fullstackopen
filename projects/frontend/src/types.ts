export interface CountryType {
  name: {
    common: string;
  }
  capital: string;
  area: number;
  languages: {[key: string]: string};
  flags: { 
    png: string;
  }
  capitalInfo: {
    latlng: [number, number];
  }
}

export interface WeatherType {
  current: {
    temp: number,
    wind_speed: number,
    weather: {
      icon: string;
    }
  };
}
