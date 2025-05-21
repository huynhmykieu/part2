import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [countryName, setCountryName] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(countryName.toLowerCase())
  );

  const tooManyCountriesMatch = filteredCountries.length > 10;
  const tooFewCountriesMatch =
    filteredCountries.length <= 10 && filteredCountries.length > 1;
  const onlyOneCountryMatch = filteredCountries.length === 1;

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => setCountries(response.data))
      .catch((err) => {
        console.log("Error fetching country data", err);
      });
  }, []);

  const searchCountryName = (event) => {
    setCountryName(event.target.value);
    setSelectedCountry(null);
  };

  return (
    <>
      <form>
        find countries
        <input type="text" value={countryName} onChange={searchCountryName} />
      </form>

      {countryName && tooManyCountriesMatch && (
        <div>Too many matches, specify another filter</div>
      )}

      {tooFewCountriesMatch && (
        <div>
          {filteredCountries.map((country) => (
            <div key={country.name.cca3}>
              {country.name.common}
              <button onClick={() => setSelectedCountry(country)}>Show</button>
            </div>
          ))}
        </div>
      )}

      {(onlyOneCountryMatch || selectedCountry) && (
        <CountryDetail country={selectedCountry || filteredCountries[0]} />
      )}
    </>
  );
}

function CountryDetail({ country }) {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png}></img>
    </div>
  );
}

export default App;
