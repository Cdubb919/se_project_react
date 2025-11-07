import { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
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

  const weatherData = { city: "Austin", temp: { F: 75, C: 24 }, type: "hot" };
  const [clothingItems, setClothingItems] = useState([
    { _id: 1, name: "T-shirt", weather: "hot", owner: "123" },
    { _id: 2, name: "Jacket", weather: "cold", owner: "123" },
  ]);

  const handleLoginClick = () => setIsLoginModalOpen(true);
  const handleRegisterClick = () => setIsRegisterModalOpen(true);
  const handleAddClick = () => setIsAddItemModalOpen(true);

  const closeAllModals = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
    setIsEditProfileModalOpen(false);
    setIsAddItemModalOpen(false);
    setIsItemModalOpen(false);
  };

  const handleLogin = (data) => {
    console.log("Logging in:", data);
    setIsLoggedIn(true);
    setCurrentUser({ _id: "123", name: "Demo User", avatar: "" });
    closeAllModals();
  };

  const handleRegister = (data) => {
    console.log("Registering:", data);
    setIsLoggedIn(true);
    setCurrentUser({ _id: "123", name: "Demo User", avatar: "" });
    closeAllModals();
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleUpdateUser = (userData) => {
    setCurrentUser({ ...currentUser, ...userData });
    closeAllModals();
  };

  const handleCardClick = (item) => {
    console.log("Card clicked:", item);
    setIsItemModalOpen(true);
  };

  const handleCardLike = (item) => {
    console.log("Liked item:", item);
  };

  return (
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="app">
            <Header
              weatherData={weatherData}
              handleAddClick={handleAddClick}
              onLoginClick={handleLoginClick}
              onRegisterClick={handleRegisterClick}
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
                      clothingItems={clothingItems}
                      onAddClick={handleAddClick}
                      handleCardClick={handleCardClick}
                      handleCardLike={handleCardLike}
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
            />

            <EditProfileModal
              isOpen={isEditProfileModalOpen}
              onClose={closeAllModals}
              onUpdateUser={handleUpdateUser}
            />

            <AddItemModal
              isOpen={isAddItemModalOpen}
              onClose={closeAllModals}
            />

            <ItemModal isOpen={isItemModalOpen} onClose={closeAllModals} />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
  );
}

export default App;
