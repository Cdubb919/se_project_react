import { useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes?.some((id) => id === currentUser?._id) || false;

  const handleLike = (e) => {
    e.stopPropagation(); 
    if (isLoggedIn && onCardLike) {
      onCardLike(item, isLiked);
    }
  };

  const handleClick = () => {
    if (onCardClick) {
      onCardClick(item);
    }
  };

  return (
    <li className="card" onClick={handleClick}>
      <img src={item.imageUrl} alt={item.name} className="card__image" />
      <div className="card__info">
        <p className="card__name">{item.name}</p>
        {isLoggedIn && (
          <button
            className={`card__like ${isLiked ? "card__like--active" : ""}`}
            onClick={handleLike}
          >
            ❤️
          </button>
        )}
      </div>
    </li>
  );
}

export default ItemCard;
