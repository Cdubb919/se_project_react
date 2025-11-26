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
import ItemModal from "./ItemModal/ItemModal";

import CurrentUserContext from "../contexts/CurrentUserContext";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

import { getWeather, filterWeatherData } from "../utils/weatherApi";
import { getItems, addCardLike, removeCardLike } from "../utils/api";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [clothingItems, setClothingItems] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleLogin = ({ email, password }) => {
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Login failed");
        return res.json();
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setIsLoggedIn(true);
          setActiveModal("");
          console.log("Login successful, token stored:", data.token);
        } else {
          console.error("Login failed, no token returned:", data);
        }
      })
      .catch((err) => console.error("Login error:", err));
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const [currentUser, setCurrentUser] = useState({
    name: "User",
    avatar: "",
  });

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleAddItem = (itemData) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.error("Must be logged in to add item");
      return;
    }

    fetch("http://localhost:3001/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(itemData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add item");
        return res.json();
      })
      .then((newItem) => {
        setClothingItems((prev) => [...prev, newItem]);
        setActiveModal("");
      })
      .catch((err) => console.error("Error adding item:", err));
  };

  const handleDeleteItem = (card) => {
    setClothingItems((prev) => prev.filter((item) => item._id !== card._id));
    setActiveModal("");
    setSelectedCard(null);
  };

  const handleLike = (item, isLiked) => {
    if (!item || !item._id) {
      console.error("Cannot like item without _id:", item);
      return;
    }

    const token = localStorage.getItem("jwt");
    if (!token) {
      console.error("Cannot like item: No JWT token found");
      return;
    }

    const apiCall = isLiked
      ? removeCardLike(item._id, token)
      : addCardLike(item._id, token);

    apiCall
      .then((updatedItem) => {
        setClothingItems((prev) =>
          prev.map((i) => (i._id === updatedItem._id ? updatedItem : i))
        );
      })
      .catch((err) => console.error("Error liking item:", err));
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  useEffect(() => {
    const apiKey = "38f021d5b17cc38af69bb55222cda0e5";

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getWeather({ latitude, longitude }, apiKey)
          .then((data) => setWeatherData(filterWeatherData(data)))
          .catch((err) => console.error("Weather fetch error:", err));
      },
      () => {
        const fallback = { latitude: 30.2672, longitude: -97.7431 };
        getWeather(fallback, apiKey)
          .then((data) => setWeatherData(filterWeatherData(data)))
          .catch((err) => console.error("Weather fallback error:", err));
      }
    );
  }, []);

  useEffect(() => {
    getItems()
      .then((items) => setClothingItems(items))
      .catch((err) => console.error("Error loading clothing items:", err));
  }, []);

  if (!weatherData) return <p className="loading">Loading weather...</p>;

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="app">
          <Header
            weatherData={weatherData}
            onLoginClick={() => setActiveModal("login")}
            onRegisterClick={() => setActiveModal("register")}
            handleAddClick={() => setActiveModal("add-item")}
            onSignOut={() => {
              setIsLoggedIn(false);
              localStorage.removeItem("jwt");
            }}
            isLoggedIn={isLoggedIn}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                  onCardLike={handleLike}
                  isLoggedIn={isLoggedIn}
                />
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
            <LoginModal
              isOpen={true}
              onClose={() => setActiveModal("")}
              onLogin={handleLogin}
              onSignUpClick={() => setActiveModal("register")}
            />
          )}

          {activeModal === "register" && (
            <RegisterModal isOpen={true} onClose={() => setActiveModal("")} />
          )}

          {activeModal === "edit-profile" && (
            <EditProfileModal
              isOpen={true}
              onClose={() => setActiveModal("")}
            />
          )}

          {activeModal === "add-item" && (
            <AddItemModal
              isOpen={true}
              onClose={() => setActiveModal("")}
              onAddItem={handleAddItem}
            />
          )}

          {activeModal === "preview" && selectedCard && (
            <ItemModal
              card={selectedCard}
              onClose={() => {
                setActiveModal("");
                setSelectedCard(null);
              }}
              onDelete={handleDeleteItem}
            />
          )}
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
