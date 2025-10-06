import "./Header.css";
import wtwrlogo from "../../assets/wtwrlogo.svg";
import wtwravataricon from "../../assets/wtwravataricon.svg";

import { NavLink } from "react-router-dom";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <NavLink to="/" className="header__home-link">
        <img className="header__logo" alt="wtwr-logo" src={wtwrlogo} />
      </NavLink>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}{" "}
      </p>

      <ToggleSwitch />

      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>
      <NavLink className="header__nav-link" to="/profile">
        <div className="header__user-container">
          <p className="header__username">Terrance Tegegne</p>
          <img
            src={wtwravataricon}
            alt="Terrance Tegegne"
            className="header__avatar"
          />
        </div>
      </NavLink>
    </header>
  );
}

export default Header;
