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
import ItemModal from "./ItemModal/ItemModal";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

import {
  getItems,
  addItem,
  removeItem,
  addCardLike,
  removeCardLike,
  updateUser,
} from "../utils/api";
import { register, authorize, getContent } from "../utils/auth";

import CurrentUserContext from "../contexts/CurrentUserContext";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

import "./App.css";

function App() {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((unit) => (unit === "F" ? "C" : "F"));
  };

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [clothingItems, setClothingItems] = useState([]);

  const weatherData = { city: "Austin", temp: { F: 75, C: 24 }, type: "hot" };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    getItems()
      .then((data) => setClothingItems(data))
      .catch(console.error);
    if (token) {
      getContent(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Auto-login failed:", err);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  const handleLogin = ({ email, password }) => {
    authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return getContent(data.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        closeAllModals();
      })
      .catch((err) => {
        console.error("Login failed:", err);
        alert("Login failed. Please check your email and password.");
      });
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    register(name, avatar, email, password)
      .then(() => authorize(email, password))
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return getContent(data.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        closeAllModals();
      })
      .catch((err) => {
        console.error("Registration failed:", err);
        alert("Registration failed. Please try again.");
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleUpdateUser = (userData) => {
    const token = localStorage.getItem("jwt");
    updateUser(userData, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllModals();
      })
      .catch((err) => console.error("Update user error:", err));
  };

  const handleAddItem = (item) => {
    const token = localStorage.getItem("jwt");
    addItem(item, token)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeAllModals();
      })
      .catch((err) => console.error("Add item error:", err));
  };

  const handleCardLike = (item, isLiked) => {
    const token = localStorage.getItem("jwt");
    const likePromise = isLiked
      ? removeCardLike(item._id, token)
      : addCardLike(item._id, token);

    likePromise
      .then((updatedItem) => {
        setClothingItems((prev) =>
          prev.map((i) => (i._id === updatedItem._id ? updatedItem : i))
        );
      })
      .catch((err) => console.error("Like error:", err));
  };

  const handleCardDelete = (item) => {
    const token = localStorage.getItem("jwt");
    removeItem(item._id, token)
      .then(() => {
        setClothingItems((prev) => prev.filter((i) => i._id !== item._id));
        setIsItemModalOpen(false)
      })
      .catch((err) => console.error("Delete error:", err));
  };

  const handleCardClick = (item) => {
    setIsItemModalOpen(true);
    setSelectedCard(item);
  };

  const closeAllModals = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
    setIsEditProfileModalOpen(false);
    setIsAddItemModalOpen(false);
    setIsItemModalOpen(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="app">
          <Header
            weatherData={weatherData}
            handleAddClick={() => setIsAddItemModalOpen(true)}
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
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
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
                    clothingItems={clothingItems.filter(
                      (item) =>
                        (item.owner?._id || item.owner) === currentUser?._id
                    )}
                    onAddClick={() => setIsAddItemModalOpen(true)}
                    handleCardClick={handleCardClick}
                    handleCardLike={handleCardLike}
                    onEditProfile={() => setIsEditProfileModalOpen(true)}
                    onSignOut={handleSignOut}
                    isLoggedIn={isLoggedIn}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>

          <Footer />

          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={closeAllModals}
            onLogin={handleLogin}
            onSignUpClick={() => {
              setIsLoginModalOpen(false);
              setIsRegisterModalOpen(true);
            }}
          />

          <RegisterModal
            isOpen={isRegisterModalOpen}
            onClose={closeAllModals}
            onRegister={handleRegister}
            onSwitchToLogin={() => {
              setIsRegisterModalOpen(false);
              setIsLoginModalOpen(true);
            }}
          />

          <EditProfileModal
            isOpen={isEditProfileModalOpen}
            onClose={closeAllModals}
            onUpdateUser={handleUpdateUser}
          />

          <AddItemModal
            isOpen={isAddItemModalOpen}
            onClose={closeAllModals}
            onAddItem={handleAddItem}
          />

          <ItemModal isOpen={isItemModalOpen} onClose={closeAllModals} card={selectedCard} onConfirmDelete={handleCardDelete}/>
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
