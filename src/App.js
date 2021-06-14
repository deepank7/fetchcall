import React, { useState, useEffect } from 'react'
import './App.css';

const Country = ({
  country: { name, capital, flag, languages, population, cioc }
}) => {
  const formatedCapital =
    capital.length > 0 ? (
      <>
        <span>Capital: </span>
        {capital}
      </>
    ) : (
      ""
    );
  const formatLanguage = languages.length > 1 ? `Languages` : `Language`;
  console.log(languages);
  return (
    <div className="country">
      <div className="country_flag">
        <img src={flag} alt={name} />
      </div>
      <h3 className="country_name">{name.toUpperCase()}</h3>
      <div class="country_text">
        <p>{formatedCapital}</p>
        <p>
          <span>{formatLanguage}: </span>
          {languages.map((language) => language.name).join(", ")}
        </p>
        <p>
          <span>Population: </span>
          {population.toLocaleString()}
        </p>
        <p>
          <span>AKA: </span>
          {cioc}
        </p>
      </div>
    </div>
  );
};

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchCountryData();
  })

  const fetchCountryData = async () => {
    const url = "https://restcountries.eu/rest/v2/all";
    const response = await fetch(url);
    const countryData = await response.json();
    setData(countryData);
  };

  return (
    <div className="App">
      <h1>Fetching API using Fetch</h1>
      <h1>Calling API</h1>
      <div>
        <p>There are {data.length} countries in the api</p>
        <div className="countries-wrapper">
          {data.map((country) => (
            <Country country={country} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
