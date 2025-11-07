import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import wtwravataricon from "../../assets/wtwravataricon.svg";
import "./SideBar.css";
import { useContext } from "react";

function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={currentUser?.avatar || wtwravataricon}
        alt={currentUser?.name || "Default avatar"}
      />
      <p className="sidebar__username">{currentUser?.name || "Username"}</p>

      <button className="sidebar__edit-button" onClick={onEditProfile}>
        Edit profile
      </button>
      <button className="sidebar__signout-button" onClick={onSignOut}>
        Sign out
      </button>
    </div>
  );
}

export default SideBar;
