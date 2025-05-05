import React from 'react';
import { Skeleton } from '@mui/material';

/**
 * Loading Skeleton Component
 * Displays a loading animation while content is being fetched
 * @param {Object} props - Component props
 * @param {string} props.variant - Skeleton variant (text, circular, rectangular)
 * @param {number} props.width - Width of the skeleton
 * @param {number} props.height - Height of the skeleton
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} Loading skeleton component
 */
const LoadingSkeleton = ({
  variant = 'rectangular',
  width = '100%',
  height = 20,
  className = '',
}) => {
  return (
    <Skeleton
      variant={variant}
      width={width}
      height={height}
      className={`animate-pulse ${className}`}
    />
  );
};

/**
 * Loading Skeleton Wrapper
 * Creates a group of loading skeletons
 * @param {Object} props - Component props
 * @param {number} props.count - Number of skeletons to display
 * @param {Object} props.skeletonProps - Props to pass to each skeleton
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} Loading skeleton wrapper component
 */
export const LoadingSkeletonWrapper = ({
  count = 3,
  skeletonProps = {},
  className = '',
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <LoadingSkeleton key={index} {...skeletonProps} />
      ))}
    </div>
  );
};

export default LoadingSkeleton; 