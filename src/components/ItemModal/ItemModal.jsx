import React, { useContext } from "react";
import "./ItemModal.css";
import closeIcon from "../../assets/closeiconnn.png";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ card, onClose, onDelete }) {
  const { currentUser } = useContext(CurrentUserContext);
  if (!card) return null;

  return (
    <div className="modal modal_opened">
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>
          <img src={closeIcon} alt="close" />
        </button>

        <div className="modal__body">
          <img src={card.imageUrl} alt={card.name} className="modal__image" />

          <div className="modal__header">
            <div className="modal__title-weather">
              <h2 className="modal__caption">{card.name}</h2>
              <p className="modal__weather">Weather: {card.weather}</p>
            </div>
            {currentUser && (
              <button
                className="modal__delete-button"
                onClick={() => onDelete(card)}
              >
                Delete Item
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
