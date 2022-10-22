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
}
