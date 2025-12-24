// utils/cloudinary.ts
export interface CloudinaryTransformations {
  crop?: 'fill' | 'fit' | 'crop' | 'thumb' | 'scale' | 'limit' | 'pad' | 'lfill' | 'fill_pad' | 'imagga_scale' | 'imagga_crop'
  gravity?: 'auto' | 'face' | 'face:center' | 'faces' | 'faces:center' | 'body' | 'body:face' | 'adv_face' | 'adv_faces' | 'adv_eyes' | 
            'north' | 'north_east' | 'east' | 'south_east' | 'south' | 'south_west' | 'west' | 'north_west' | 'center' | 'xy_center' | 'custom' | 'ocr_text'
  quality?: 'auto' | 'auto:best' | 'auto:good' | 'auto:eco' | 'auto:low' | 
            'best' | 'good' | 'eco' | 'low' | 
            number // 1-100
  format?: 'auto' | 'webp' | 'jpg' | 'jpeg' | 'png' | 'avif' | 'gif' | 'svg' | 'ico' | 'bmp' | 'tiff' | 'heic' | 'heif'
  effect?: string | string[]
  width?: number
  height?: number
  aspectRatio?: string // '16:9', '4:3', '1:1', '3:2', etc
  background?: string // hex, rgb, rgba, or named colors
  radius?: number | 'max' | Array<number> // single, all corners, or individual corners
  border?: string // width, style, color
  opacity?: number // 0-100
  blur?: number // 1-2000
  rotate?: number // 0-360 or 'auto_right', 'auto_left', 'ignore', 'vflip', 'hflip'
  zoom?: number // 0.1-10.0
  dpr?: 'auto' | number // 0.1-10.0
  fetchFormat?: 'auto' // auto format based on browser
  colorSpace?: 'srgb' | 'tinysrgb' | 'cmyk' | 'no_cmyk' | 'keep_cmyk' | 'srgb:truecolor'
}

/**
 * Quality presets untuk berbagai use case
 */
export const QualityPresets = {
  // Untuk gambar kualitas tinggi
  high: 'auto:best',
  // Untuk kualitas bagus dengan ukuran file optimal
  balanced: 'auto:good',
  // Untuk performa terbaik (kompresi tinggi)
  performance: 'auto:eco',
  // Untuk thumbnail atau placeholder
  low: 'auto:low',
  // Lossless untuk gambar penting
  lossless: 100,
  // Default
  default: 'auto',
} as const

/**
 * Generate transformations string for Cloudinary
 */
export function generateTransformationsString(
  transformations: CloudinaryTransformations
): string {
  const params: string[] = []
  
  // 1. Dimensi dan crop
  if (transformations.aspectRatio) {
    params.push(`ar_${transformations.aspectRatio}`)
  }
  
  if (transformations.crop) {
    params.push(`c_${transformations.crop}`)
  }
  
  if (transformations.gravity) {
    params.push(`g_${transformations.gravity}`)
  }
  
  // Width dan height dengan dpr support
  if (transformations.width) {
    params.push(`w_${transformations.width}`)
  }
  
  if (transformations.height) {
    params.push(`h_${transformations.height}`)
  }
  
  // 2. Kualitas dan format
  if (transformations.quality) {
    if (typeof transformations.quality === 'number') {
      params.push(`q_${Math.min(100, Math.max(1, transformations.quality))}`)
    } else {
      params.push(`q_${transformations.quality}`)
    }
  }
  
  if (transformations.format) {
    params.push(`f_${transformations.format}`)
  }
  
  if (transformations.fetchFormat) {
    params.push(`f_${transformations.fetchFormat}`)
  }
  
  // 3. DPR (Device Pixel Ratio)
  if (transformations.dpr) {
    if (transformations.dpr === 'auto') {
      params.push('dpr_auto')
    } else if (typeof transformations.dpr === 'number') {
      params.push(`dpr_${Math.min(10, Math.max(0.1, transformations.dpr))}`)
    }
  }
  
  // 4. Efek dan styling
  if (transformations.effect) {
    if (Array.isArray(transformations.effect)) {
      transformations.effect.forEach(effect => {
        params.push(`e_${effect}`)
      })
    } else {
      params.push(`e_${transformations.effect}`)
    }
  }
  
  if (transformations.blur) {
    const blurValue = Math.min(2000, Math.max(1, transformations.blur))
    params.push(`e_blur:${blurValue}`)
  }
  
  if (transformations.rotate) {
    if (typeof transformations.rotate === 'number') {
      const rotateValue = transformations.rotate % 360
      params.push(`a_${rotateValue}`)
    } else {
      params.push(`a_${transformations.rotate}`)
    }
  }
  
  if (transformations.zoom) {
    const zoomValue = Math.min(10, Math.max(0.1, transformations.zoom))
    params.push(`z_${zoomValue}`)
  }
  
  if (transformations.background) {
    // Normalize color format
    let bgColor = transformations.background
    if (bgColor.startsWith('#')) {
      bgColor = `rgb:${bgColor.slice(1)}`
    }
    params.push(`b_${bgColor}`)
  }
  
  if (transformations.radius) {
    if (Array.isArray(transformations.radius)) {
      // Format: [top-left, top-right, bottom-right, bottom-left]
      params.push(`r_${transformations.radius.join(':')}`)
    } else if (transformations.radius === 'max') {
      params.push('r_max')
    } else {
      params.push(`r_${transformations.radius}`)
    }
  }
  
  if (transformations.border) {
    params.push(`bo_${transformations.border}`)
  }
  
  if (transformations.opacity) {
    const opacityValue = Math.min(100, Math.max(0, transformations.opacity))
    params.push(`o_${opacityValue}`)
  }
  
  if (transformations.colorSpace) {
    params.push(`cs_${transformations.colorSpace}`)
  }
  
  return params.join(',')
}

/**
 * Get transformations for logo dengan quality presets
 */
export function getLogoTransformations(
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number = 'md',
  quality: keyof typeof QualityPresets | number = 'balanced',
  darkMode: boolean = false
): string {
  const sizes = {
    xs: { width: 24, height: 24 },
    sm: { width: 32, height: 32 },
    md: { width: 40, height: 40 },
    lg: { width: 48, height: 48 },
    xl: { width: 64, height: 64 }
  }
  
  const dimensions = typeof size === 'number' 
    ? { width: size, height: size }
    : sizes[size]
  
  const baseTransformations: CloudinaryTransformations = {
    ...dimensions,
    crop: 'pad', // Better for logos with transparent background
    gravity: 'center',
    quality: typeof quality === 'string' ? QualityPresets[quality] : quality,
    format: 'webp',
    dpr: 'auto', // Optimized for device pixel ratio
    fetchFormat: 'auto'
  }
  
  if (darkMode) {
    baseTransformations.effect = 'brightness:1.15'
    baseTransformations.background = 'rgb:1a1a1a'
  }
  
  return generateTransformationsString(baseTransformations)
}

/**
 * Get transformations for profile/avatar images
 */
export function getAvatarTransformations(
  size: number = 200,
  quality: keyof typeof QualityPresets | number = 'balanced',
  focusFace: boolean = true
): string {
  const transformations: CloudinaryTransformations = {
    width: size,
    height: size,
    crop: 'fill',
    gravity: focusFace ? 'face:center' : 'center',
    quality: typeof quality === 'string' ? QualityPresets[quality] : quality,
    format: 'webp',
    radius: 'max', // Circle
    dpr: 'auto'
  }
  
  return generateTransformationsString(transformations)
}

/**
 * Get transformations for hero/banner images
 */
export function getHeroTransformations(
  width: number = 1200,
  quality: keyof typeof QualityPresets | number = 'balanced',
  format: CloudinaryTransformations['format'] = 'webp'
): string {
  const transformations: CloudinaryTransformations = {
    width,
    height: Math.floor(width * 0.6), // 16:9 ratio
    crop: 'fill',
    gravity: 'auto',
    quality: typeof quality === 'string' ? QualityPresets[quality] : quality,
    format,
    dpr: 'auto',
    fetchFormat: 'auto'
  }
  
  return generateTransformationsString(transformations)
}

/**
 * Get transformations for thumbnail images
 */
export function getThumbnailTransformations(
  size: number = 300,
  quality: keyof typeof QualityPresets | number = 'performance',
  cropStyle: CloudinaryTransformations['crop'] = 'fill'
): string {
  const transformations: CloudinaryTransformations = {
    width: size,
    height: size,
    crop: cropStyle,
    gravity: 'auto',
    quality: typeof quality === 'string' ? QualityPresets[quality] : quality,
    format: 'webp',
    dpr: 'auto'
  }
  
  return generateTransformationsString(transformations)
}

/**
 * Build full Cloudinary URL with transformations
 */
export function buildCloudinaryUrl(
  publicId: string,
  transformations?: CloudinaryTransformations | string,
  cloudName: string = 'dfovmrebt'
): string {
  let transformationString = ''
  
  if (transformations) {
    if (typeof transformations === 'string') {
      transformationString = transformations
    } else {
      transformationString = generateTransformationsString(transformations)
    }
  }
  
  const parts = [
    `https://res.cloudinary.com/${cloudName}/image/upload`
  ]
  
  if (transformationString) {
    parts.push(transformationString)
  }
  
  parts.push(publicId)
  
  return parts.join('/')
}

/**
 * Generate responsive srcset untuk gambar
 */
export function generateSrcSet(
  publicId: string,
  widths: number[] = [320, 640, 768, 1024, 1280, 1536],
  baseTransformations?: CloudinaryTransformations,
  cloudName: string = 'dfovmrebt'
): string {
  return widths
    .map(width => {
      const transformations: CloudinaryTransformations = {
        ...baseTransformations,
        width,
        quality: 'auto:good',
        fetchFormat: 'auto'
      }
      
      const url = buildCloudinaryUrl(publicId, transformations, cloudName)
      return `${url} ${width}w`
    })
    .join(', ')
}