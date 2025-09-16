import { useState } from "react";

import "./App.css";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import ModalWithForm from "./ModalWithForm/ModalWithForm.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "cold" });

  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main weatherData={weatherData} />
      </div>
      <ModalWithForm />
    </div>
  );
}

export default App;

