import React from "react";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ButtonProps } from "@mui/material";
interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  color?: "Gray" | "Yellow" | "Red" | "Orange";
  size?: "small" | "medium" | "large";
  icon?:
    | "plus"
    | "minus"
    | "check"
    | "close"
    | "menu"
    | "search"
    | "home"
    | "settings"
    | "user";
}

export default function Button({
  className = "",
  onClick,
  size = "medium",
  children,
  color = "Gray",
  icon,
  ...rest
}: CustomButtonProps) {
  let colorClass = "";
  let sizeClass = "";
  const defaultClass =
    "flex items-center justify-center gap-2 rounded-md w-full";

  switch (color) {
    case "Yellow":
      colorClass = "bg-yellow-500 text-white";
      break;
    case "Red":
      colorClass = "bg-red-500 text-white";
      break;
    case "Orange":
      colorClass = "bg-orange-500 text-white";
      break;
    case "Gray":
      colorClass = "bg-gray-300 text-black";
      break;
    default:
      colorClass = "bg-slate-300 text-black";
      break;
  }

  switch (size) {
    case "small":
      sizeClass = "px-2 py-1 text-sm";
      break;
    case "medium":
      sizeClass = "p-4 text-base";
      break;
    case "large":
      sizeClass = "px-6 py-3 text-lg";
      break;
    default:
      sizeClass = "px-4 py-2 text-base";
      break;
  }

  let iconComponent: React.ReactNode = null;

  const icons = {
    plus: (
      <svg
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-3 h-3"
      >
        <path
          d="M10 1H6V6L1 6V10H6V15H10V10H15V6L10 6V1Z"
          fill="currentColor"
        ></path>
      </svg>
    ),
    // <-- Add this new icon
    minus: (
      <svg
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-3 h-3"
      >
        <path
          d="M2 8H14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    home: (
      <svg
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-3 h-3"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 0L0 6V8H1V15H4V10H7V15H15V8H16V6L14 4.5V1H11V2.25L8 0ZM9 10H12V13H9V10Z"
          fill="currentColor"
        ></path>
      </svg>
    ),
    check: (
      <svg
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-3 h-3"
      >
        <path
          d="M2 8L6 12L14 4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    close: (
      <svg
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-3 h-3"
      >
        <path
          d="M4 4L12 12M12 4L4 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    menu: (
      <svg
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-3 h-3"
      >
        <path
          d="M2 4H14M2 8H14M2 12H14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    search: (
      <svg
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-3 h-3"
      >
        <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="2" />
        <path
          d="M11 11L15 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    settings: (
      <svg
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-3 h-3"
      >
        <path
          d="M2 8H14M4 4H12M6 12H10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    user: (
      <svg
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-3 h-3"
      >
        <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="2" />
        <path
          d="M2 14C2 10.6863 4.68629 8 8 8C11.3137 8 14 10.6863 14 14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  };

  if (icon && icons[icon]) {
    iconComponent = React.cloneElement(icons[icon], {
      style: {
        width: size === "small" ? "12px" : size === "large" ? "16px" : "14px",
        height: size === "small" ? "12px" : size === "large" ? "16px" : "14px",
      },
    });
  }

  return (
    <button
      className={`${defaultClass} ${colorClass} ${sizeClass} ${className}`}
      onClick={onClick}
      {...rest}
    >
      {iconComponent}
      {children}
    </button>
  );
}
