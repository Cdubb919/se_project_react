import "./Header.css";
import wtwrlogo from "../../assets/wtwrlogo.svg";
import { NavLink } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function Header({
  handleAddClick,
  weatherData = {},
  onLoginClick,
  onRegisterClick,
  onSignOut,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const renderUserAvatar = () => {
    if (currentUser?.avatar) {
      return (
        <img
          src={currentUser.avatar}
          alt={`${currentUser.name || "User"}'s avatar`}
          className="header__avatar"
        />
      );
    }

    const firstLetter = currentUser?.name
      ? currentUser.name[0].toUpperCase()
      : "?";

    return <div className="header__avatar-placeholder">{firstLetter}</div>;
  };

  return (
    <header className="header">
      <NavLink to="/" className="header__home-link">
        <img className="header__logo" alt="WTWR logo" src={wtwrlogo} />
      </NavLink>

      <p className="header__date-and-location">
        {currentDate}
        {weatherData?.city ? `, ${weatherData.city}` : ""}
      </p>

      <ToggleSwitch />

      {isLoggedIn ? (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>

          <NavLink to="/profile" className="header__nav-link">
            <div className="header__user-container">
              <p className="header__username">{currentUser?.name || "User"}</p>
              {renderUserAvatar()}
            </div>
          </NavLink>

          <button
            onClick={onSignOut}
            type="button"
            className="header__logout-btn"
          >
            Log out
          </button>
        </>
      ) : (
        <div className="header__auth-buttons">
          <button
            onClick={onLoginClick}
            type="button"
            className="header__login-btn"
          >
            Log in
          </button>
          <button
            onClick={onRegisterClick}
            type="button"
            className="header__signup-btn"
          >
            Sign up
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
