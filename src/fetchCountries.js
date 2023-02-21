export default function fetchCountries(URL) {
    return fetch(URL).then(
        (response) => {
          if (!response.ok) {
            throw new Error(response.status);
          }
          return response.json();
        }
      );
} 
