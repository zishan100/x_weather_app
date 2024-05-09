import React , { useState , useEffect } from 'react';
import './index.css';
import envVar from './env.const'
import WeatherCard from './WeatherCard/WeatherCard';

function App () {
  
  let [ search , setSearch ] = useState('');
  
  let [weather , setWeather ] = useState([...envVar.weatherObj]);
  
  let [ loader , setLoader ] = useState(false);

  const fetchWeatherData = async(search)=>{
    try{
      const getResponse = await fetch(`http://api.weatherapi.com/v1/current.json?key=${envVar.apiKey}&q=${search}&aqi=no`);
      
      const getData = await getResponse.json();

      
      // console.log(getData); 

      if( getData?.error ){
        setLoader(false);
        // console.log(envVar.weatherObj)
        envVar.weatherObj[0].val=''
        setWeather([...envVar.weatherObj]);
        alert('Failed to fetch weather data');
        return;
      }

      const {  current: { condition, temp_c, humidity, wind_kph } } = getData;
      
      // console.log(condition.text, temp_c ," ",humidity," ",wind_kph);
      let weatherObj = [...envVar.weatherObj];
      weatherObj[0].val = temp_c;
      weatherObj[1].val = humidity;
      weatherObj[2].val = condition.text;
      weatherObj[3].val = wind_kph;
      // console.log("Original arrOfObj :",envVar.weatherObj);
      setWeather(weatherObj);
      
    }catch(err){
      // console.log(err);
      alert('Failed to fetch weather data')    
    }
    setLoader(false);
  }

  const handleClickEvent = async(search)=>{
    setLoader(true);
    if( search && search.trim() ){
      await fetchWeatherData(search); 
    }
    
  }

  return (
    <div className="main">
      <div className='searchContainer' >
        <input 
          className='searchInput' 
          type='text' 
          placeholder='Enter city name' 
          onChange={(e)=>setSearch(e.target.value)}
        />
        <button 
          className='searchBtn' 
          type='button'
          onClick={(e)=>handleClickEvent(search)} 
        >Search</button>
      </div>
      <div className='weather-cards' >
          {
            // weather &&  weather.length > 0 ? 
            // (weather.map((items,idx)=>{
            //   return (<WeatherCard key={idx} props={items.prop} val={items.val} />)
            // })) : (<p>Loading Data</p>)
          }

          {
            loader ? (<p>Loading data...</p>) : 
            (  
              (
                weather[0]?.val && weather.map((items,idx)=>{
                  return (<WeatherCard key={idx} props={items.prop} val={items.val} />)
                })
              )   
            ) 
          }
          
      </div>   
    </div>
  );
  
}

export default App;
