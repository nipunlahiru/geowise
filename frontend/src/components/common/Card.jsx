import React from 'react';
import { Card as MuiCard, CardContent, CardMedia } from '@mui/material';

/**
 * Reusable Card Component
 * @param {Object} props - Component props
 * @param {string} props.title - Card title
 * @param {string} props.image - Image URL for the card
 * @param {ReactNode} props.children - Card content
 * @param {string} props.className - Additional Tailwind CSS classes
 * @returns {JSX.Element} Card component
 */
const Card = ({ title, image, children, className = '' }) => {
  return (
    <MuiCard className={`rounded-lg shadow-lg overflow-hidden ${className}`}>
      {image && (
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={title}
          className="object-cover"
        />
      )}
      <CardContent className="p-4">
        {title && <h3 className="text-xl font-semibold mb-2">{title}</h3>}
        <div className="text-gray-600">{children}</div>
      </CardContent>
    </MuiCard>
  );
};

export default Card; 