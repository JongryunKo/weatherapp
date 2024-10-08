import React from 'react'

const WeatherBox = ({weather}) => {
  // console.log("weather ??" , weather)
  return (
    <div className='weather-box'>
      <div>{weather?.name}</div>  
      <h2>{weather?Math.floor(weather.main.temp) : ""}℃ / {weather?Math.floor(weather.main.temp * 9/5 + 32) : "" }℉</h2>
      <h3>{weather?.weather[0].description}</h3>
    </div>
  )
}

export default WeatherBox