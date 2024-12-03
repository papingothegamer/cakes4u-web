import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  to?: string; // Optional prop for navigation
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className, to }) => {
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
      className={`px-4 py-2 rounded-md transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
