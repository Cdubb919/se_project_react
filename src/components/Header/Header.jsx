import "./Header.css";
import wtwrlogo from "../../assets/wtwrlogo.svg";
import wtwravataricon from "../../assets/wtwravataricon.svg";

function Header({ handleAddClick }) {
const currentDate = new Date().toLocaleString('default', { 
  month: 'long', 
  day: 'numeric' 
});

  return (
    <header className="header">
      <img className="header__logo" src={wtwrlogo} />
      <p className="header__date-and-location">DATE, LOCATION</p>
      <button onClick={handleAddClick} className="header__add-clothes-btn">+ Add clothes</button>
      <div className="header__user-container">
        <p className="header__username">Terrance Tegegne</p>
        <img src={wtwravataricon} alt="Terrance Tegegne" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
