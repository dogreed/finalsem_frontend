import { toast } from "react-toastify";
import type { ToastOptions } from "react-toastify";

export const useToast = () => {
  const showToast = (
    message: string,
    type: "success" | "error" | "info" | "warning" = "info",
    options?: ToastOptions,
  ) => {
    const defaultOptions: ToastOptions = {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      pauseOnFocusLoss: false,
      draggable: true,
      ...options,
    };

    switch (type) {
      case "success":
        return toast.success(message, defaultOptions);
      case "error":
        return toast.error(message, defaultOptions);
      case "warning":
        return toast.warn(message, defaultOptions);
      case "info":
      default:
        return toast.info(message, defaultOptions);
    }
  };

  const showSuccess = (message: string, options?: ToastOptions) =>
    showToast(message, "success", options);

  const showError = (message: string, options?: ToastOptions) =>
    showToast(message, "error", options);

  const showWarning = (message: string, options?: ToastOptions) =>
    showToast(message, "warning", options);

  const showInfo = (message: string, options?: ToastOptions) =>
    showToast(message, "info", options);

  return {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};
