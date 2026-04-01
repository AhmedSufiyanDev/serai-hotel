import axios from "axios";
const corsProxy = 'https://proxy.cors.sh/';
const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=islamabad&appid=7bbe2800fd427b70407cf6b8bc569f36';

const fetchWeatherData = () => {
  return axios.get(corsProxy+weatherApiUrl,{
    headers: {
      'x-cors-api-key': 'temp_c7d8502a1f06142f44467cf9c2659650'
      }
  });
};

export default fetchWeatherData;