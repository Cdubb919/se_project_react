import { useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import "./ItemCard.css";

import likeIcon from "../../../assets/likeicon.svg";
import likedIcon from "../../../assets/likedicon.svg";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isLiked = item.likes?.includes(currentUser?._id);

  const handleLike = (e) => {
    e.stopPropagation();
    if (isLoggedIn && onCardLike) {
      onCardLike(item, isLiked);
    }
  };

  return (
    <li className="card" onClick={() => onCardClick(item)}>
      <img src={item.imageUrl} alt={item.name} className="card__image" />

      <div className="card__header">
        <span className="card__name">{item.name}</span>

        {isLoggedIn && (
          <button className="card__like-btn" onClick={handleLike}>
            <img
              src={isLiked ? likedIcon : likeIcon}
              alt="like"
              className="card__like-icon"
            />
          </button>
        )}
      </div>
    </li>
  );
}

export default ItemCard;


