import { useState } from "react";

export interface ProfileFormData {
  ngaySinh: string;
  soCMND: string;
  soDienThoai: string;
  email: string;
  diaChi: string;
  ghiChu: string;
  uriHinhDaiDien: string;
}

export interface ProfileErrors {
  ngaySinh: string;
  soCMND: string;
  soDienThoai: string;
  email: string;
}

const initialErrors: ProfileErrors = {
  ngaySinh: "",
  soCMND: "",
  soDienThoai: "",
  email: "",
};

export function useProfileValidation(formData: ProfileFormData) {
  const [errors, setErrors] = useState(initialErrors);

  const validateForm = () => {
    const newErrors = { ...initialErrors };
    let isValid = true;

    if (!formData.ngaySinh) {
      newErrors.ngaySinh = "Vui lòng chọn ngày sinh";
      isValid = false;
    }

    if (!formData.soCMND || formData.soCMND.length < 9) {
      newErrors.soCMND = "Số CMND phải có ít nhất 9 ký tự";
      isValid = false;
    }

    const phoneRegex = /^[0-9]{10,11}$/;
    if (!formData.soDienThoai || !phoneRegex.test(formData.soDienThoai)) {
      newErrors.soDienThoai = "Số điện thoại không hợp lệ (10-11 số)";
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
