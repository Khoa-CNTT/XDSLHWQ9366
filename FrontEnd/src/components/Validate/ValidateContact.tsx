import { useState } from "react";

export interface ContactForm {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactErrors {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}

const initialErrors: ContactErrors = {
  firstname: "",
  lastname: "",
  phone: "",
  email: "",
};

export function useContactValidation(formData: ContactForm) {
  const [errors, setErrors] = useState(initialErrors);

  const validateForm = () => {
    const newErrors: ContactErrors = { ...initialErrors };
    let isValid = true;

    if (!formData.firstname) {
      newErrors.firstname = "Vui lòng nhập tên";
      isValid = false;
    }

    if (!formData.lastname) {
      newErrors.lastname = "Vui lòng nhập họ";
      isValid = false;
    }

    const phoneRegex = /^[0-9]{10,11}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ (10-11 số)";
      isValid = false;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const clearErrors = () => setErrors(initialErrors);

  return { errors, validateForm, clearErrors, setErrors };
}
