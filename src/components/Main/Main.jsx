import React, { useContext } from "react";
import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard.jsx";
import ItemCard from "./ItemCard/ItemCard.jsx";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnit.jsx";

function Main({ weatherData, handleCardClick, clothingItems, onCardLike, isLoggedIn }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredItems = clothingItems.filter((item) => item.weather === weatherData.type);

  const displayTemp =
    currentTemperatureUnit === "F" ? weatherData.temp.F : weatherData.temp.C;

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {displayTemp} &deg; {currentTemperatureUnit}. You may want to wear:
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
