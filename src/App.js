import './App.css';
import React, { useState, use, useEffect } from 'react';


const App = () => {

  const [state, setState] = useState({
    ip: 'ip',
    city: 'city',
  })
  const [streetList, setStreetList] = useState([])

  const getIPandCity = async () => {
    const data = await fetch('https://api.ipify.org?format=json')
    .then((response) => response.json())
    // .then((data) => console.log(data))
    .catch(error => console.log("error", error))
    const ip = data.ip

    const daDataToken = "888e43ddc015dac9c9e66bd5f849f6927a7ef54a"
    const daData = await fetch("https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=", {
      headers: {
        "Authorization": "Token " + daDataToken
      }})
    .then((response) => response.json())
    .catch(error => console.log("error", error))
    const city = daData.location.data.city
    console.log(ip, city)
    setState({
      ip: ip,
      city: city
    })
    console.log('api is done')
  };

  useEffect( getIPandCity, [])

  return (
    <div className="App">
      <div> 
        Ваш IP: {state.ip}
      </div>
      <div> 
        Ваш Город: {state.city}
      </div>
      <form>
        <input type='text' pattern='^[А-Яа-яЁё\s]+$'></input>
        <button onClick={console.log('HEYYYY!!!')}>Подтвердить</button>
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
