"use client";

import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children: React.ReactNode;
  onclick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  type,
  fullWidth,
  children,
  onclick,
  secondary,
  danger,
  disabled,
}) => {
  return (
    <div>
      <button
        onClick={onclick}
        type={type}
        disabled={disabled}
        className={clsx(
          `first-letter:flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`,
          disabled && "opacity-50 cursor-default",
          fullWidth && "w-full",
          secondary ? "text-gray-900" : "text-white",
          danger &&
            "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
          !secondary &&
            !danger &&
            "bg-blue-600 hover:bg-blue-700 focus-visible:outline-blue-700"
        )}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
