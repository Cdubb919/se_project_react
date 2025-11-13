import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

function RegisterModal({ isOpen, onClose, onRegister, onSwitchToLogin }) {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values);
  };

  return (
    <ModalWithForm
      name="register"
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name*
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Avatar URL
        <input
          type="url"
          name="avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
        />
      </label>

      <label className="modal__label">
        Email*
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Password*
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>

      <div className="modal__switch-container">
        <button
          type="button"
          className="modal__switch-btn"
          onClick={() => {
            onClose();
            if (typeof onSwitchToLogin === "function") {
              onSwitchToLogin();
            }
          }}
        >
          Already have an account? Log in
        </button>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
