import React from 'react';
import { TextField } from '@mui/material';

/**
 * Reusable Input Component
 * @param {Object} props - Component props
 * @param {string} props.label - Input label
 * @param {string} props.type - Input type (text, password, email, etc.)
 * @param {string} props.value - Input value
 * @param {Function} props.onChange - Change handler function
 * @param {boolean} props.error - Whether the input has an error
 * @param {string} props.helperText - Helper text to display below the input
 * @param {boolean} props.required - Whether the input is required
 * @param {string} props.className - Additional Tailwind CSS classes
 * @returns {JSX.Element} Input component
 */
const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  error = false,
  helperText = '',
  required = false,
  className = '',
  ...props
}) => {
  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      required={required}
      className={`w-full ${className}`}
      variant="outlined"
      {...props}
    />
  );
};

export default Input; 