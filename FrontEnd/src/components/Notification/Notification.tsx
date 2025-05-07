import React, { useEffect } from "react";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
} from "react-icons/fa";

interface NotificationProps {
  type: "success" | "error" | "info";
  message: string;
  onClose: () => void;
}

const styles = {
  base: "fixed top-6 right-6 z-50 flex items-start gap-3 px-4 py-3 rounded-xl shadow-lg border max-w-xs w-full text-sm animate-fade-in-up",
  success: "bg-green-50 border-green-300 text-green-800",
  error: "bg-red-50 border-red-300 text-red-800",
  info: "bg-blue-50 border-blue-300 text-blue-800",
};

const icons = {
  success: <FaCheckCircle className="text-green-600 text-lg mt-0.5" />,
  error: <FaExclamationCircle className="text-red-600 text-lg mt-0.5" />,
  info: <FaInfoCircle className="text-blue-600 text-lg mt-0.5" />,
};

const Notification: React.FC<NotificationProps> = ({
  type,
  message,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500); // auto-dismiss
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${styles.base} ${styles[type]}`}>
      <div>{icons[type]}</div>
      <div className="flex-1">{message}</div>
      <button
        onClick={onClose}
        className="ml-2 text-neutral-500 hover:text-neutral-700 transition"
      >
        ×
      </button>
    </div>
  );
};

export default Notification;
