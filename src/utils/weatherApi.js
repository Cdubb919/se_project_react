
import { handleResponse } from "./apiHelpers";


  @param {{ latitude: number, longitude: number }} coords - User's latitude and longitude
  @param {string} apiKey 
  @returns {Promise<object>} 
 
export const getWeather = ({ latitude, longitude }, apiKey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  ).then(handleResponse);
};


  @param {object} data - API response data
  @returns {{ city: string, temp: { F: number, C: number }, type: string, condition: string, isDay: boolean }}
 
export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = {
    F: Math.round(data.main.temp),
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };
  result.type = getWeatherType(result.temp.F);
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys, Date.now());
  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (temperature) => {
  if (temperature > 86) return "hot";
  if (temperature >= 66 && temperature < 85) return "warm";
  return "cold";
};
