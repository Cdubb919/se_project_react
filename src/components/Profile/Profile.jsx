import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import SideBar from "../SideBar/SideBar.jsx";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function Profile({ clothingItems, onAddClick, handleCardClick }) {
  const currentUser = useContext(CurrentUserContext);

  const filteredItems = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );

  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        clothingItems={userItems}
        onAddClick={handleAddClick}
        handleCardClick={handleCardClick}
        onCardLike={handleCardLike}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}

export default Profile;
