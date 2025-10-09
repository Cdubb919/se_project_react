import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard.jsx";
import ItemCard from "./ItemCard/ItemCard.jsx";

function Main({ weatherData, handleCardClick, clothingItems }) {
  const filteredItems = clothingItems.filter((item) => {
    return item.weather === weatherData.type;
  });

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp.F} &deg; F ... You may want to wear:
        </p>
        <ul className="cards__list">
          {filteredItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main