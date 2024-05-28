import React from 'react';
import '../../css/dashboard/Button.css';

interface ButtonProps {
  className: string;
  text: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ className, text, onClick }) => {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
