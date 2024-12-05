import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  to?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg"; // Add size prop
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className, to, disabled, size = "md" }) => {
  const sizeClasses = size === "lg" ? "px-6 py-3 text-lg" : size === "sm" ? "px-2 py-1 text-sm" : "px-4 py-2";

  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (to) {
      navigate(to); // Navigate to the specified route
    } else if (onClick) {
      onClick(event); // Call the onClick function if provided
    }
  };

  return (
    <button
    onClick={handleClick}
    className={`rounded-md transition-colors ${sizeClasses} ${className}`}
    disabled={disabled}
  >
    {children}
  </button>
  );
};

export default Button;
