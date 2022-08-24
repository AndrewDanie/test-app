import './App.css';
import React, { useState, use, useEffect } from 'react';


const App = () => {
  const [state, setState] = useState({
    daDataToken: "888e43ddc015dac9c9e66bd5f849f6927a7ef54a",
    ip: '',
    city: '',
    city_id: '',
  })
  const [streetList, setStreetList] = useState([])

  const getIPandCity = async () => {
    const data = await fetch('https://api.ipify.org?format=json')
    .then((response) => response.json())
    // .then((data) => console.log(data))
    .catch(error => console.log("error", error))
    const ip = data.ip

    
    const daData = await fetch("https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=", {
      headers: {
        "Authorization": "Token " + state.daDataToken
      }})
    .then((response) => response.json())
    .catch(error => console.log("error", error))
    const city = daData.location.data.city
    const city_id = daData.location.data.city_fias_id
    console.log(ip, city, city_id)
    setState({
      ip: ip,
      city: city,
      city_id: city_id,
    })
  };

  useEffect(getIPandCity, [])

  return (
    <div className="App">
      <div> 
        Ваш IP: {state.ip}
      </div>
      <div> 
        Ваш Город: {state.city}
      </div>
      <StreetForm Token="888e43ddc015dac9c9e66bd5f849f6927a7ef54a" city_id={state.city_id}/>
    </div>
  )
}


function StreetForm(props) {

  const [query, setQuery] = useState('')

  const handleClick = (event) => {
    event.preventDefault()
    console.log(props)
    console.log('ey!!')
    console.log(query)

    let queryReq = {
      "locations": [
        {
          "city_fias_id": props.city_id
        }
      ],
      "fias_level": "7",
      "from_bound": {
        "value": "street"
      },
      "to_bound": {
        "value": "street"
      },
      "restrict_value": true,
      "query": query
    }
    getStreetList(queryReq)
  }

  const getStreetList = async (query) => {

    const streetData = await fetch("https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + props.Token,
      },
      body: JSON.stringify(query),
      })
    .then((response) => response.json())
    .catch(error => console.log("error", error))
    console.log(streetData)
    
    const StreetArray = []
    for (let suggestion of streetData.suggestions) {
        if (suggestion.data.fias_level === "7") {
          console.log(suggestion.value)
          StreetArray.push(suggestion.value)
        }
    }
    console.log(StreetArray)
    }

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  return (
    <div>
      <form onSubmit={handleClick}>
        <input type='text' pattern='^[A-Za-zА-Яа-яЁё]+$' onChange={handleChange}></input>
        <button type='submit'>Подтвердить</button>
      </form>
      <select>
        <option> Первая опция</option>
        <option> Вторая опция</option>
        <option> Третья опция</option>
        <option> Четвертая опция</option>
        <option> Пятая опция</option>
      </select>
    </div>
  )
}

export default App;
