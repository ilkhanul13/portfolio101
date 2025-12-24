// components/CloudinaryImageV2.tsx - VERSI AMAN
'use client'

import { CldImage, CldImageProps } from 'next-cloudinary'
import { FC } from 'react'

type CloudinaryImageProps = {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  eager?: boolean
  fill?: boolean
  sizes?: string
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  onLoad?: () => void
  onError?: () => void
  transformations?: string
  folder?: string
  version?: string
} & Omit<CldImageProps, 'src' | 'alt' | 'priority' | 'loading'> // HAPUS keduanya

const CloudinaryImageV2: FC<CloudinaryImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  eager = false,
  fill = false,
  sizes = '100vw',
  placeholder,
  blurDataURL,
  onLoad,
  onError,
  transformations,
  folder,
  version,
  ...cldProps
}) => {
  
  // Filter out priority dan loading dari cldProps
  const { priority, loading, ...restCldProps } = cldProps as any
  
  // Construct full Cloudinary source path
  const constructSource = () => {
    let fullSrc = src.trim()
    
    if (fullSrc.startsWith('/')) {
      fullSrc = fullSrc.substring(1)
    }
    
    if (folder && !src.includes('/')) {
      fullSrc = `${folder}/${fullSrc}`
    }
    
    if (version && !src.startsWith('v')) {
      fullSrc = `v${version}/${fullSrc}`
    }
    
    return fullSrc
  }

  // Siapkan props khusus untuk CldImage
  const cldImageProps: CldImageProps = {
    src: constructSource(),
    alt,
    width: fill ? undefined : width,
    height: fill ? undefined : height,
    fill,
    sizes,
    placeholder,
    blurDataURL,
    onLoad,
    onError,
    className,
    ...restCldProps,
  }

  // Handle eager loading khusus
  if (eager) {
    // Untuk CldImage, kita set priority: true dan biarkan loading default
    cldImageProps.priority = true
  } else {
    // Untuk non-eager, set loading: 'lazy'
    cldImageProps.loading = 'lazy'
  }

  // Add transformations if provided
  if (transformations) {
    cldImageProps.transformations = transformations
  }

  return <CldImage {...cldImageProps} />
}

export default CloudinaryImageV2