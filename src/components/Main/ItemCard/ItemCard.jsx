import React, { useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext.jsx";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => id === currentUser._id);

  const handleLikeClick = () => {
    onCardLike(item);
  };

  return (
    <li className="item-card">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="item-card__image"
        onClick={() => onCardClick(item)}
      />
      <div className="item-card__info">
        <h3>{item.name}</h3>
        <button
          className={`item__like-button ${isLiked ? "item__like-button_active" : ""}`}
          onClick={handleLikeClick}
          disabled={!isLoggedIn}
        >
          Like {item.likes.length}
        </button>
      </div>
    </li>
  );
}

export default ItemCard;

