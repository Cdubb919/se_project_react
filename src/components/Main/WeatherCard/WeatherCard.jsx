import weathercardimg from "../../../assets/weathercardimg.svg";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
    return <section className="weather-card">
        <p className="weather-card__temp"> { weatherData.temp.F } </p>
        <img src={weathercardimg} alt="sunny" className="weather-card__image" />
    </section>;
}

export default WeatherCard;