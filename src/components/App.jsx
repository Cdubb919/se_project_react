import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { coordinates, APIkey } from "../utils/constants.js";
import { getWeather, filterWeatherData } from "../utils/weatherApi.js";
import {
  getItems,
  addItem,
  removeItem,
  addCardLike,
  removeCardLike,
  updateUser,
} from "../utils/api.js";
import * as auth from "../utils/auth";

import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import Profile from "./Profile/Profile.jsx";

import AddItemModal from "./AddItemModal/AddItemModal.jsx";
import ItemModal from "./ItemModal/ItemModal.jsx";
import DeleteConfirmationModal from "./DeleteConfirmationModal/DeleteConfirmationModal.jsx";
import RegisterModal from "./RegisterModal/RegisterModal.jsx";
import LoginModal from "./LoginModal/LoginModal.jsx";
import EditProfileModal from "./EditProfileModal/EditProfileModal.jsx";

import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";

import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnit.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 0 },
    city: "",
  });

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const handleToggleSwitchChange = () =>
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleAddClick = () => setActiveModal("add-garment");

  const closeActiveModal = () => {
    setActiveModal("");
    setSelectedCard(null);
    setCardToDelete(null);
  };

  const handleCardLike = (item) => {
    if (!isLoggedIn) return;

    const isLiked = item.likes.some((id) => id === currentUser._id);
    const apiCall = isLiked ? removeCardLike : addCardLike;
    const token = localStorage.getItem("jwt");

    apiCall(item._id, token)
      .then((updatedItem) => {
        setClothingItems((items) =>
          items.map((i) => (i._id === updatedItem._id ? updatedItem : i))
        );
      })
      .catch(console.error);
  };

  const handleCardDelete = (card) => {
    const token = localStorage.getItem("jwt");
    removeItem(card._id, token)
      .then(() => {
        setClothingItems((prev) => prev.filter((i) => i._id !== card._id));
        closeActiveModal();
      })
      .catch(console.error);
  };

  const openConfirmationModal = (card) => {
    setCardToDelete(card);
    setActiveModal("confirm");
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
  };

  const handleUpdateUser = (userData) => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    updateUser(userData, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
        setIsEditProfileOpen(false);
      })
      .catch(console.error);
  };

  const onAddItem = (inputValues, handleReset) => {
    const token = localStorage.getItem("jwt");
    const newCard = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weatherType,
    };
    addItem(newCard, token)
      .then((data) => {
        setClothingItems((prev) => [data, ...prev]);
        handleReset();
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .getContent(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch(console.error);
    }
  }, []);

  useEffect(() => {
    const fetchWeather = (coords) =>
      getWeather(coords, APIkey)
        .then((data) => setWeatherData(filterWeatherData(data)))
        .catch(console.error);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          fetchWeather({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        (error) => {
          console.error("Geolocation error:", error);
          fetchWeather(coordinates.fallback);
        }
      );
    } else {
      fetchWeather(coordinates.fallback);
    }

    getItems().then(setClothingItems).catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              onLoginClick={() => setIsLoginModalOpen(true)}
              onRegisterClick={() => setIsRegisterModalOpen(true)}
              onSignOut={handleSignOut}
              isLoggedIn={isLoggedIn}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
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
                      onAddClick={handleAddClick}
                      handleCardClick={handleCardClick}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>

          {/* Modals */}
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItem={onAddItem}
          />

          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onConfirmDelete={openConfirmationModal}
          />

          {activeModal === "confirm" && (
            <DeleteConfirmationModal
              card={cardToDelete}
              onClose={closeActiveModal}
              onDelete={handleCardDelete}
            />
          )}

          <RegisterModal
            isOpen={isRegisterModalOpen}
            onClose={() => setIsRegisterModalOpen(false)}
            onRegister={(data) =>
              auth
                .register(data)
                .then(() =>
                  auth.authorize({ email: data.email, password: data.password })
                )
                .then((res) => {
                  if (res.token) {
                    localStorage.setItem("jwt", res.token);
                    setIsLoggedIn(true);
                    return auth.getContent(res.token);
                  }
                })
                .then(setCurrentUser)
                .catch(console.error)
            }
          />

          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
            onLogin={(data) =>
              auth
                .authorize(data)
                .then((res) => {
                  if (res.token) {
                    localStorage.setItem("jwt", res.token);
                    setIsLoggedIn(true);
                    return auth.getContent(res.token);
                  }
                })
                .then(setCurrentUser)
                .then(() => setIsLoginModalOpen(false))
                .catch(console.error)
            }
          />

          <EditProfileModal
            isOpen={isEditProfileOpen}
            onClose={() => setIsEditProfileOpen(false)}
            onUpdateUser={handleUpdateUser}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
