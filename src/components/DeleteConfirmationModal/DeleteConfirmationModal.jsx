import "./DeleteConfirmationModal.css";
import closeIcon from "../../assets/closeiconnn.png";

function DeleteConfirmationModal({ card, onClose, onDelete }) {
  return (
    <div className="modal modal_opened">
      <div className="modal__content modal__content_type_confirm">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="close-icon" className="modal__close-icon" />
        </button>
        <h3 className="modal__warning">
          Are you sure you want to delete this item?
        </h3>
        <div className="modal__actions">
          <button className="modal__confirm" onClick={() => onDelete(card)}>
            Yes, Delete
          </button>
          <button className="modal__cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
