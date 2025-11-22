import React from "react";
import "./ItemModal.css";
import likeicon from "../../assets/likeicon.svg";
import closeIcon from "../../assets/closeiconnn.png";

function ItemModal({ card, onClose, onDelete }) {
  if (!card) return null;

  return (
    <div className="modal modal_opened">
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>
          <img src={closeIcon} alt="close" />
        </button>

        <img
          src={card.imageUrl}
          alt={card.name}
          className="modal__image"
        />

        <h2 className="modal__caption">{card.name}</h2>
        <p className="modal__weather">Weather: {card.weather}</p>

        <button
          className="modal__delete-button"
          onClick={() => onDelete(card)}
        >
          Delete Item
        </button>
      </div>
    </div>
  );
}

export default ItemModal;
