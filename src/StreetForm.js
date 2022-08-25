import { useState } from 'react'


function StreetForm(props) {

    const [query, setQuery] = useState('')
  
    const handleChangeQuery = (event) => {
      setQuery(event.target.value)
    }
  
    const [streetArray, setStreetArray] = useState([])
  
    const handleClick = (event) => {
      event.preventDefault()
      let queryReq = {
        "locations": [
          {
            "city_fias_id": props.cityId
          }
        ],
        count: 20,
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
      const StreetListURL = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address'
      const streetData = await fetch(StreetListURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + props.token,
        },
        body: JSON.stringify(query),
        })
      .then((response) => response.json())
      .catch(error => console.log("error", error))
      
      const streetArray = []
      let streetId = 0
      const fiasStreetLevel = '7'
      for (let suggestion of streetData.suggestions) {
          if (suggestion.data.fias_level === fiasStreetLevel) {
            streetArray.push({
              key: streetId,
              value: suggestion.value,
            })
            streetId++
          }
      }
      setStreetArray(streetArray)
    }
  
    const streetComponents = streetArray.map(street => <StreetOption key={street.key} value={street.value} />)
    const rePattern = '^[A-Za-zА-Яа-яЁё]+$'

    return (
      <div>
        <form onSubmit={handleClick}>
          <input type='text' 
                pattern={rePattern} 
                title='Можно вводить только русские или английские буквы.' 
                onChange={handleChangeQuery} />
          <button type='submit'>Подтвердить</button>
        </form>
        <select>
          {streetComponents}
        </select>
      </div>
    )
  }
  
  
  function StreetOption(props) {
    return (
      <option>
        {props.value}
      </option>
    )
  }
  
  export default StreetForm