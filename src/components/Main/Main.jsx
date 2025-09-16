import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

function Main() {
  return (
    <main>
      <WeatherCard />
      <section className="cards">
        <p className="cards__text">
          Today is 75° F / You may want to wear:
          </p>
        <ul className="cards__list">
          {defaultClothingItems.map((item) => {
            return (
              <div key={item._id}>
                <h2>{item.name}</h2>
                <img src={item.link} alt={item.name} />
              </div>
            );
          })}
          ;
        </ul>
      </section>
    </main>
  );
}

export default Main;
