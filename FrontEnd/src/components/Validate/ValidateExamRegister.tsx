import { useState } from "react";

export interface ExamRegisterForm {
  fullname: string;
  gender: string;
  dob: string;
  cccd: string;
  phone: string;
  email: string;
  address: string;
}

export interface ExamRegisterErrors {
  fullname: string;
  dob: string;
  cccd: string;
  phone: string;
  email: string;
}

const initialErrors: ExamRegisterErrors = {
  fullname: "",
  dob: "",
  cccd: "",
  phone: "",
  email: "",
};

export function useExamRegisterValidation(formData: ExamRegisterForm) {
  const [errors, setErrors] = useState(initialErrors);

  const validateForm = () => {
    const newErrors: ExamRegisterErrors = { ...initialErrors };
    let isValid = true;

    if (!formData.fullname) {
      newErrors.fullname = "Vui lòng nhập họ và tên";
      isValid = false;
    }

    if (!formData.dob) {
      newErrors.dob = "Vui lòng chọn ngày sinh";
      isValid = false;
    }

    if (!formData.cccd || formData.cccd.length < 9) {
      newErrors.cccd = "Số CCCD phải có ít nhất 9 ký tự";
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
