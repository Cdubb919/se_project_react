import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../../contexts/CurrentUserContext.js";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes?.some((id) => id === currentUser?._id) || false;

  const handleLike = () => {
    if (isLoggedIn && onCardLike) {
      onCardLike(item._id, isLiked);
    }
  };

  const handleClick = () => {
    if (onCardClick) {
      onCardClick(item);
    }
  };

  return (
    <li className="card">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
        onClick={handleClick}
      />
      <div className="card__info">
        <h3 className="card__name">{item.name}</h3>

        {isLoggedIn && (
          <button
            className={`card__like-button ${
              isLiked ? "card__like-button_liked" : ""
            }`}
            onClick={handleLike}
            aria-label={isLiked ? "Unlike" : "Like"}
          />
        )}
      </div>
    </li>
  );
}

export default ItemCard;

