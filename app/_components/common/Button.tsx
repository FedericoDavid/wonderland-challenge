import { ButtonHTMLAttributes } from "react";
import { Spinner } from "./Spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  isLoading?: boolean;
}

export function Button({
  children,
  variant = "primary",
  isLoading,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200
      ${
        variant === "primary"
          ? "bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/50"
          : "bg-gray-700/20 hover:bg-gray-700/30 text-gray-300 border border-gray-600/50"
      }
      disabled:opacity-50 disabled:cursor-not-allowed
      ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center min-w-24">
          <Spinner />
        </span>
      ) : (
        children
      )}
    </button>
  );
}
