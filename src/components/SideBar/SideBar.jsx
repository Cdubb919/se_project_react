import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import wtwravataricon from "../../assets/wtwravataricon.svg";
import "./SideBar.css";
import { useContext } from "react";

function SideBar({ onEditProfile, onSignOut }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__top">
      <img
        className="sidebar__avatar"
        src={currentUser?.avatar || wtwravataricon}
        alt={currentUser?.name || "Default avatar"}
      />
      <p className="sidebar__username">{currentUser?.name || "Username"}</p>
      </div>

      <button className="sidebar__edit-button" onClick={onEditProfile}>
        Change profile data
      </button>
      <button className="sidebar__signout-button" onClick={onSignOut}>
        Log out
      </button>
    </div>
  );
}

export default SideBar;
