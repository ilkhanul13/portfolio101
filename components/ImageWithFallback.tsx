// components/ImageWithFallback.tsx
'use client';

import { useState, useEffect } from 'react';
import CloudinaryImage from '@/components/cloudinaryImage';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallbackSrc?: string;
}

export default function ImageWithFallback({ 
  src, 
  alt, 
  width, 
  height, 
  className,
  fallbackSrc = 'https://via.placeholder.com/500x300?text=Image+Not+Available'
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  return (
    <CloudinaryImage
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
    />
  );
}