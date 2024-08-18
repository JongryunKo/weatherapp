import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({cities, currentCityClick, selectedCity}) => {
  return (
    <div className='weather-button'>
        <Button variant={`${selectedCity == null ? "outline-primary" : "warning"}`} onClick={()=> currentCityClick("current")}>Current Location</Button>
        {cities.map(item=>(
          <Button 
            variant={`${selectedCity == item ? "outline-primary" : "warning"}`} 
            key={item} 
            onClick={()=>currentCityClick(item)}
          >{item}
          </Button>
        ))}
    </div>
  )
}

export default WeatherButton