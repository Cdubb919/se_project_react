import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { addItem } from "../utils/api";
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
import "./App.css";

import CurrentUserContext from "../contexts/CurrentUserContext";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

import { getWeather, filterWeatherData } from "../utils/weatherApi";
import { getItems, addCardLike, removeCardLike } from "../utils/api";
import { getContent, authorize, register } from "../utils/auth";

function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const [activeModal, setActiveModal] = useState("");
  const [clothingItems, setClothingItems] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleRegister = (values) => {
    const { name, avatar, email, password } = values;

    return register(name, avatar, email, password)
      .then(() => {
        return authorize(email, password);
      })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        setCurrentUser(data.user);
        setActiveModal("");
      })
      .catch((err) => {
        console.error("Registration error:", err);
      });
  };

  const handleUpdateUser = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.error("No token, user not logged in");
      return;
    }

    fetch("http://localhost:3001/users/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, avatar }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => Promise.reject(data));
        }
        return res.json();
      })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        console.log("User updated!", updatedUser);
        setActiveModal("");
      })
      .catch((err) => {
        console.error("Failed to update user:", err.message || err);
      });
  };

  const handleLogin = ({ email, password }) => {
    authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setActiveModal("");

          getContent(data.token)
            .then((user) => {
              setIsLoggedIn(true);
              setCurrentUser(user);
            })
            .catch(() => {
              localStorage.removeItem("jwt");
              setIsLoggedIn(false);
            });
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

    addItem(itemData, token)
      .then((newItem) => {
        setClothingItems((prev) => [newItem.data, ...prev]);
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
      .then((items) => {
        setClothingItems(items);
        console.log(items);
      })
      .catch((err) => console.error("Error loading clothing items:", err));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setAuthLoading(false);
      return;
    }

    getContent(token)
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
      })
      .finally(() => setAuthLoading(false));
  }, []);

  if (!weatherData) return <p className="loading">Loading weather...</p>;

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
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
                  <Profile
                    clothingItems={clothingItems}
                    handleCardClick={handleCardClick}
                    onAddClick={() => setActiveModal("add-item")}
                    handleCardLike={handleLike}
                    isLoggedIn={isLoggedIn}
                    onSignOut={() => {
                      setIsLoggedIn(false);
                      setCurrentUser(null);
                      localStorage.removeItem("jwt");
                    }}
                    onEditProfile={() => setActiveModal("edit-profile")}
                  />
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
            <RegisterModal
              isOpen={true}
              onClose={() => setActiveModal("")}
              onRegister={handleRegister}
            />
          )}

          {activeModal === "edit-profile" && (
            <EditProfileModal
              isOpen={true}
              onClose={() => setActiveModal("")}
              onUpdateUser={handleUpdateUser}
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
