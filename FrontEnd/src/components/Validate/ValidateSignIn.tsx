import { useState } from "react";

export interface SignInErrors {
  email?: string;
  password?: string;
}

export function useSignInValidation(email: string, password: string) {
  const [errors, setErrors] = useState<SignInErrors>({});

  const validate = () => {
    const newErrors: SignInErrors = {};
    if (!email) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải từ 6 ký tự";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field: keyof SignInErrors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return { errors, validate, clearError };
}
