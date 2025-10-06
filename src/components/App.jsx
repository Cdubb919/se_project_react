import { useEffect, useState } from "react";

import "./App.css";
import { coordinates, APIkey } from "../utils/constants.js";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import ModalWithForm from "./ModalWithForm/ModalWithForm.jsx";
import ItemModal from "./ItemModal/ItemModal.jsx";
import Footer from "./Footer/Footer.jsx";
import SideBar from "./SideBar/SideBar.jsx";
import { filterWeatherData, getWeather } from "../utils/weatherApi.js";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnit.jsx";
import AddItemModal from "./AddItemModal/AddItemModal.jsx";

//import { defaultClothingItems } from "../utils/constants";
import { Routes, Route } from "react-router-dom";
import Profile from "./Profile/Profile.jsx";
import { Link } from "react-router-dom";
import { addItem, getItems, removeItem } from "../utils/api.js";
import api from "../utils/api.js";
//import React from "react";
import DeleteConfirmationModal from "./DeleteConfirmationModal/DeleteConfirmationModal.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [cardToDelete, setCardToDelete] = useState(null);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const onAddItem = (inputValues) => {
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weatherType,
    };

    addItem(newCardData)
      .then((data) => {
        //setClothingItems([data, ...clothingItems, newCardData]);
        setClothingItems([ItemModal, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  function openConfirmationModal(card) {
    setCardToDelete(card);
    setActiveModal("confirm");
  }

  function handleCardDelete(card) {
    removeItem(card._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== card._id)
        );
        setActiveModal(null);
        setCardToDelete(null);
      })
      .catch((err) => console.error("Delete failed:", err));
  }

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={<Profile clothingItems={clothingItems} />}
            />
          </Routes>

          <Footer />
        </div>
        <AddItemModal
          onClose={closeActiveModal}
          isOpen={activeModal === "add-garment"}
          onAddItem={onAddItem}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
        />

        {activeModal === "preview" && (
          <ItemModal
            activeModal={activeModal}
            onClose={() => setActiveModal(null)}
            card={selectedCard}
            onConfirmDelete={openConfirmationModal}
          />
        )}

        {activeModal === "confirm" && (
          <DeleteConfirmationModal
            card={cardToDelete}
            onClose={() => setActiveModal(null)}
            onDelete={handleCardDelete}
          />
        )}
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
