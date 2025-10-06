import wtwravataricon from "../../assets/wtwravataricon.svg";
import "./SideBar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={wtwravataricon}
        alt="Default avatar"
      />
      <p className="sidebar__username">Username</p>
    </div>
  );
}

export default SideBar;
