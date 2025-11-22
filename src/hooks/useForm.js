import { useState, useCallback } from "react";

export function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);

  return { values, handleChange, resetForm, setValues };
}
