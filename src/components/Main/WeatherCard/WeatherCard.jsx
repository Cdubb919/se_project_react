import "./WeatherCard.css";
import {
  weatherOptions,
  defaultWeatherOptions,
} from "../../../utils/constants";
import CurrentTemperatureUnitContext from "../../../contexts/CurrentTemperatureUnit";
import { useContext } from "react";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

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

  const weatherOptionUrl = weatherOption.url;
  const weatherOptionCondition = weatherOptions[0]?.condition;
  const weatherOptionDay = weatherOptions[0]?.day;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {currentTemperatureUnit === "F"
          ? weatherData.temp.F
          : weatherData.temp.C}
        ° {currentTemperatureUnit}
      </p>
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
