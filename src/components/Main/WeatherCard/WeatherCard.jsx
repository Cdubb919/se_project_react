//import weathercardimg from "../../../assets/weathercardimg.svg";
import "./WeatherCard.css";
import {
  weatherOptions,
  defaultWeatherOptions,
} from "../../../utils/constants";

function WeatherCard({ weatherData }) {
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition &&
      option.url === weatherData.url
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  const weatherOptionUrl = weatherOptions[0]?.url;
  const weatherOptionCondition = weatherOptions[0]?.condition;
  const weatherOptionDay = weatherOptions[0]?.day;

  return (
    <section className="weather-card">
      <p className="weather-card__temp"> {weatherData.temp.F} </p>
      <img
        src={weatherOptionUrl}
        alt={`Card showing ${
          weatherOptionDay ? "day" : "night"
        } time ${weatherOptionCondition} weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
