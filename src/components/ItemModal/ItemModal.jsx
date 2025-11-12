import "./ItemModal.css";
import closeIcon from "../../assets/closeiconnn.png";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({
  isOpen,
  onClose,
  card,
  onConfirmDelete,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  if ( !card) return null;

  const isOwn = currentUser && card.owner === currentUser._id;

  return (
    <div className={`modal ${isOpen ? "modal_opened": ""}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="close-icon" className="modal__close-icon" />
        </button>

        <img src={card.imageUrl} alt="garment" className="modal__image" />

        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>

          { isOwn && (
            <button
              className="modal__delete-button"
              onClick={() => onConfirmDelete(card)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
