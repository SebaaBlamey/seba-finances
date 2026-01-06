import { ReactNode, useEffect, useState } from "react";
import { CheckCircle, AlertTriangle, Info, X } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onClose?: () => void;
}

export default function Toast({
  message,
  type = "info",
  duration = 4000,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose?.(), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const getStyles = () => {
    switch (type) {
      case "success":
        return "bg-surface-container-high text-on-surface border-l-4 border-success";
      case "error":
        return "bg-surface-container-high text-on-surface border-l-4 border-danger";
      case "info":
      default:
        return "bg-surface-container-high text-on-surface border-l-4 border-primary";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-success" size={24} />;
      case "error":
        return <AlertTriangle className="text-danger" size={24} />;
      case "info":
      default:
        return <Info className="text-primary" size={24} />;
    }
  };

  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-lg shadow-lg min-w-[300px] animate-in slide-in-from-bottom-5 fade-in duration-300 ${getStyles()}`}
      role="alert"
      aria-live="assertive"
    >
      <span className="flex-shrink-0">{getIcon()}</span>
      <span className="flex-grow text-body-medium font-medium">{message}</span>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => onClose?.(), 300);
        }}
        className="p-1 rounded-full hover:bg-surface-variant/20 transition-colors text-on-surface-variant"
        aria-label="Cerrar notificación"
      >
        <X size={18} />
      </button>
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState<
    Array<{ id: string; message: string; type: "success" | "error" | "info" }>
  >([]);

  const addToast = (
    message: string,
    type: "success" | "error" | "info" = "info",
  ) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const ToastContainer = () => (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );

  return { addToast, ToastContainer };
}
