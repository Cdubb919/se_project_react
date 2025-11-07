import { useContext } from "react";
import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard.jsx";
import ItemCard from "./ItemCard/ItemCard.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";

function Main({
  weatherData,
  handleCardClick,
  clothingItems,
  onCardLike,
  isLoggedIn,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  if (!weatherData || !weatherData.temp) {
    return (
      <main className="main">
        <p className="cards__text">Loading weather data...</p>
      </main>
    );
  }

  const displayTemp =
    currentTemperatureUnit === "F" ? weatherData.temp.F : weatherData.temp.C;

  const filteredItems =
    clothingItems?.filter((item) => item.weather === weatherData.type) || [];

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {displayTemp}°{currentTemperatureUnit}. You may want to wear:
        </p>
        <ul className="cards__list">
          {filteredItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
