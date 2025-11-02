import "./Header.css";
import wtwrlogo from "../../assets/wtwrlogo.svg";
import wtwravataricon from "../../assets/wtwravataricon.svg";
import { NavLink } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function Header({
  handleAddClick,
  weatherData,
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
        <img className="header__logo" alt="wtwr-logo" src={wtwrlogo} />
      </NavLink>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
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

          <NavLink className="header__nav-link" to="/profile">
            <div className="header__user-container">
              <p className="header__username">{currentUser.name}</p>
              {renderUserAvatar()}
            </div>
          </NavLink>

          {/* <NavLink className="header__nav-link" to="/profile">
            <div className="header__user-container">
              <p className="header__username">{currentUser.name}</p>
              <img
                src={currentUser.avatar || wtwravataricon}
                alt={currentUser.name || "User avatar"}
                className="header__avatar"
              />
            </div>
          </NavLink> */}

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
