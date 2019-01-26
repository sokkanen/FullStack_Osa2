import React, { useEffect, useState } from 'react';
import axios from 'axios'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState([])

  useEffect(() => {
    axios
    .get("https://restcountries.eu/rest/v2/all")
    .then(response => {
      setCountries(response.data)
    })
  },[])

  const HandleChange = (event) => {
    setSearch(event.target.value)
  }

  const ClickCountry = (country) => {
    setSearch(country.name)
  }

  const CountryList = () => {
    const tmp = countries.filter(country => country.name.toUpperCase().includes(search.toUpperCase()))
    const tmpLen = Object.keys(tmp).length
    if (tmpLen > 10){
      return <p>too many matches, specify another filter</p>
    } else if (tmpLen === 1){
      useEffect(() => {
        axios
        .get(`http://api.apixu.com/v1/current.json?key=INSERTKEYHERE=${tmp[0].capital}`)
        .then(response => setWeather(response.data))
      },[])
      return Country(tmp[0], weather)
    } else if (tmpLen === 0){
      return <p>no matches</p>
    } else {
      return (
      tmp.map(country => <div key={country.name}>{country.name}<button onClick={() => ClickCountry(country)}>show</button></div>)
    )
    }
  }

  return (
    <div>
      <div>
      find countries: 
      <input 
      value={search}
      onChange={HandleChange}
      ></input>
      </div>
      <div>
          {CountryList(countries, search)}
      </div>
    </div>
  )

}

const Country = (country, weather) => {
    return (
      <div>
      <h1>{country.name} {country.nativeName}</h1>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h2>Languages:</h2>
      <ul>
        {(country.languages.map(language => <li key={language.name}>{language.name}</li>))}
      </ul>
      <img src={country.flag} alt="The flag of the country" width="250"/>
      <h2>Weather in {country.capital}</h2>
      {getWeather(weather)}
      </div>
    )
}

const getWeather = (weather) => {
  if (weather.length === 0){
    return (
      <div></div>
    )
  }
  console.log(weather)
  return (
    <div>
      <p><b>temperature: </b>{weather.current.temp_c} Celsius</p>
      <img src={weather.current.condition.icon} alt="Weather icon" width="200"/>
      <p><b>wind: </b>{weather.current.vis_km} kph direction {weather.current.wind_dir}</p>
    </div>
  )
}

export default App;
