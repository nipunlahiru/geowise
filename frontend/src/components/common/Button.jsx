import React from 'react';
import { Button as MuiButton } from '@mui/material';

/**
 * Reusable Button Component
 * @param {Object} props - Component props
 * @param {string} props.variant - Button variant (contained, outlined, text)
 * @param {string} props.color - Button color (primary, secondary, etc.)
 * @param {string} props.size - Button size (small, medium, large)
 * @param {boolean} props.fullWidth - Whether the button should take full width
 * @param {ReactNode} props.children - Button content
 * @param {Function} props.onClick - Click handler function
 * @param {string} props.className - Additional Tailwind CSS classes
 * @returns {JSX.Element} Button component
 */
const Button = ({
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  fullWidth = false,
  children,
  onClick,
  className = '',
  ...props
}) => {
  return (
    <MuiButton
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      onClick={onClick}
      className={`transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button; 