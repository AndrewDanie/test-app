import './App.css'
import React, { useState, useEffect } from 'react'
import StreetForm from './StreetForm.js'


const App = () => {
  
  const [state, setState] = useState({
    daDataToken: "888e43ddc015dac9c9e66bd5f849f6927a7ef54a",
  })

  useEffect(() => {
    async function getIPandCity() {
      const ipURL = 'https://api.ipify.org?format=json'
      const ipData = await fetch(ipURL)
      .then((response) => response.json())
      .catch(error => console.log("error", error))
      
      const token = state.daDataToken
      const daDataURL = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip='
      const daData = await fetch(daDataURL, {
        headers: {"Authorization": "Token " + token}})
      .then((response) => response.json())
      .catch(error => console.log("error", error))

      const ip = ipData.ip
      const city = daData.location.data.city
      const cityId = daData.location.data.city_fias_id

      setState({
        daDataToken: token,
        ip: ip,
        city: city,
        cityId: cityId,
      })
    }
    getIPandCity()
  }, [state.daDataToken]);

  return (
    <div className="App">
      <div> 
        Ваш IP: {state.ip}
      </div>
      <div> 
        Ваш Город: {state.city}
      </div>
      <StreetForm token={state.daDataToken} cityId={state.cityId} />
    </div>
  )
}

export default App
