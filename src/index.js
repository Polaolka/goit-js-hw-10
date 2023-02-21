import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 1000;
const URL = `https://restcountries.com/v3.1/name/`;
const settingsSearchArr = [
  '?fields=',
  'name',
  'capital',
  'population',
  'flags',
  'languages',
];

const fetchCountriesInput = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

fetchCountriesInput.addEventListener(
  'input',
  debounce(handleInputEvent, DEBOUNCE_DELAY)
);

function handleInputEvent(e) {
  if (document.querySelector('.country-item')) removeCountriesList();
  if (document.querySelector('.name-country')) removeCountryInfo();
  let searchQuery = e.target.value.trim();
  if (searchQuery.length === 0) return;
  fetchCountries(URL + searchQuery + settingsSearchArr.join(','))
    .then(handleResponse)
    .catch(error =>
      Notify.failure(`Oops, there is no country with that name! (${error})`)
    );
}

function doCountriesListMarkup(countries) {
  const markup = countries
    .map(
      ({ flags, name }) => `<li class="country-item">
    <img class="flag-img" src="${flags.svg}" alt="${name.official} flag" width="50" height="33"/>
    <p class="country-name" >${name.official}</p></li>`).join('');
  addListOfCountries(markup);
}
function doCountryInfoMarkup(countries) {
  const markup = countries.map(
    ({ flags, name, capital, population, languages }) =>
      `<div class="wrapper">
      <img class="flag-img" src="${flags.svg}" alt="${
        name.official
      } flag" width="40"/>
    <p class="name-country">${name.official}</p></div>
    <p class="capital-country"><span class="info">Capital:</span> ${capital}</p>
    <p class="population-country"><span class="info">Population:</span> ${population}</p>
    <p class="languages-country"><span class="info">Languages:</span> ${Object.keys(languages).join(
      ', '
    )}</p>
    `
  );
  addCountryInfo(markup);
}

function addCountryInfo(markup) {
  countryInfoEl.insertAdjacentHTML('afterbegin', markup);
}

function addListOfCountries(markup) {
  countryListEl.insertAdjacentHTML('afterbegin', markup);
}

function removeCountriesList() {
  countryListEl.innerHTML = '';
}
function removeCountryInfo() {
  countryInfoEl.innerHTML = '';
}

function handleResponse(countries) {
    if (countries.length > 10) {
      return Notify.info('Too many matches found. Please enter a more specific name.');
    }
    if (countries.length > 2 && countries.length < 10) {
      doCountriesListMarkup(countries);
    }
    if (countries.length === 1) {
      doCountryInfoMarkup(countries);
    }
  }
