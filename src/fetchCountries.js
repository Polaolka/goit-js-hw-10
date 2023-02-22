const BASE_URL = 'https://restcountries.com/v3.1';
const END_POINTS = ['name', 'capital', 'population', 'flags', 'languages'];



export default function fetchCountries(nameCountry) {
  console.log(`${BASE_URL}/name/${nameCountry}?fields=${END_POINTS.join(',')}`);

    return fetch(`${BASE_URL}/name/${nameCountry}?fields=${END_POINTS.join(',')}`).then(
        (response) => {
          if (!response.ok) {
            throw new Error(response.status);
          }
          return response.json();
        }
      );
} 
