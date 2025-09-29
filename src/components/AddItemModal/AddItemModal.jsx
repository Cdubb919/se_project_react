import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onClose, }) => {
    const defaultValues = { 
        name: "", 
        link:"", 
        weatherType:"",
    };

    const { values, handleChange } = useForm(defaultValues);

    function handleSubmit(evt) {
        evt.preventDefault();
        onAddItem(values);
    }

  return (
    <ModalWithForm 
    title="New garment" 
    name="new-card" 
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
            Name{" "}
            <input
              type="text"
              className="modal__input"
              id="name"
              placeholder="Name"
              required
              min-length={1}
              max-length={30}
              value={values.name}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="imageUrl" className="modal__label">
            Image{" "}
            <input
              type="url"
              className="modal__input"
              id="imageUrl"
              placeholder="Image URL"
              required
              value={values.link}
              onChange={handleChange}
            />
          </label>
          <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">Select the weather type:</legend>
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="hot"
                type="radio"
                name="weatherType"
                className="modal__radio-input"
                value={values.weatherType}
                onChange={handleChange}
              />{" "}
              Hot
            </label>
            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="warm"
                type="radio"
                name="weatherType"
                className="modal__radio-input"
                value={values.weatherType}
                onChange={handleChange}
              />{" "}
              Warm
            </label>
            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="cold"
                type="radio"
                name="weatherType"
                className="modal__radio-input"
                value={values.weatherType}
                onChange={handleChange}
              />{" "}
              Cold
            </label>
          </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;