import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Profile from "./Profile/Profile";
import Footer from "./Footer/Footer";
import LoginModal from "./LoginModal/LoginModal";
import RegisterModal from "./RegisterModal/RegisterModal";
import EditProfileModal from "./EditProfileModal/EditProfileModal";
import AddItemModal from "./AddItemModal/AddItemModal";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

import { getWeather, filterWeatherData } from "../utils/weatherApi";
import { getItems } from "../utils/api";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [clothingItems, setClothingItems] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const apiKey = "YOUR_OPENWEATHER_API_KEY";

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getWeather({ latitude, longitude }, apiKey)
          .then((data) => {
            const filtered = filterWeatherData(data);
            setWeatherData(filtered);
          })
          .catch((err) => console.error("Weather fetch error:", err));
      },
      (error) => {
        console.error("Geolocation blocked or failed:", error);

        const fallbackCoords = { latitude: 30.2672, longitude: -97.7431 };
        getWeather(fallbackCoords, apiKey)
          .then((data) => {
            const filtered = filterWeatherData(data);
            setWeatherData(filtered);
          })
          .catch((err) => console.error("Weather fallback error:", err));
      }
    );
  }, []);

  useEffect(() => {
    getItems()
      .then((items) => setClothingItems(items))
      .catch((err) => console.error("Error loading clothing items:", err));
  }, []);

  if (!weatherData) {
    return <p className="loading">Loading weather...</p>;
  }

  return (
    <div className="app">
      <Header
        city={weatherData.city}
        onLogin={() => setActiveModal("login")}
        onRegister={() => setActiveModal("register")}
        isLoggedIn={isLoggedIn}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Main weatherData={weatherData} clothingItems={clothingItems} />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile clothingItems={clothingItems} />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />

      {activeModal === "login" && (
        <LoginModal onClose={() => setActiveModal("")} />
      )}
      {activeModal === "register" && (
        <RegisterModal onClose={() => setActiveModal("")} />
      )}
      {activeModal === "edit-profile" && (
        <EditProfileModal onClose={() => setActiveModal("")} />
      )}
      {activeModal === "add-item" && (
        <AddItemModal onClose={() => setActiveModal("")} />
      )}
    </div>
  );
}

export default App;
