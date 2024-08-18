import './App.css';
import { useEffect, useState } from 'react';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClipLoader from "react-spinners/ClipLoader";

// 앱이 실행되자마자 현재 위치기반의 날씨가 보인다 (도시, 섭씨, 화씨, 상태)
// 5개의 버튼이 있다 (1개는 현재위치, 4개는 다른도시)
// 도시버튼을 클릭할때마다 도시별 날씨가 나온다
// 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨정보가 나온다
// 데이터를 들고오는 동안 로딩 스피너가 돈다
function App() {

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  
  const cities=['paris','new york','tokyo','seoul']
  const getCurrentLocation=()=> {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude
      let lon = position.coords.longitude;

      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const currentCityClick = (city) => {
     if(city === "current"){
      setCity(null);
     }else{
      setCity(city);
     }
  }

  const getWeatherByCurrentLocation= async(lat, lon) =>{
    
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7ac752c6bd17aacb0076085bc6586672&units=metric`
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch(error) {
      setApiError(error.message);
      setLoading(false);
    }
    
  }

  const getWeatherByCity=async()=>{
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7ac752c6bd17aacb0076085bc6586672&units=metric`
      setLoading(true);
      let response = await fetch(url)
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (error) {
      setApiError(error.message);
      setLoading(false);
    }
    
  }

  useEffect(()=>{
    if(city== null){
      getCurrentLocation();
    }else{
      getWeatherByCity();
    }
    
  },[city])


  return (
    <div>
      {loading ? (
        <div className="container">
          <ClipLoader color='#f88c6b' loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader"/> 
        </div>
      ) : !apiError ? (
        <div className="container">
          <WeatherBox weather={weather} className="equal-width"/>
          <WeatherButton cities={cities} currentCityClick={currentCityClick} selectedCity={city} className="equal-width"/>
        </div>
      ) : (
        apiError
      )}
    </div>
  );
}

export default App;
