'use client'

import Image from 'next/image'

interface ThumbnailGalleryProps {
  projectImages: string[]
  selectedImage: number
  onSelectImage: (index: number) => void
  thumbnailDimensions: Array<{width: number, height: number}>
}

export default function ThumbnailGallery({ 
  projectImages, 
  selectedImage, 
  onSelectImage,
  thumbnailDimensions 
}: ThumbnailGalleryProps) {
  
  if (thumbnailDimensions.length === 0) {
    return (
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-100 mb-3">Project Gallery</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {projectImages.map((img, index) => (
            <div 
              key={index}
              className="relative aspect-video bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse border border-slate-300 dark:border-slate-600"
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-100 mb-3">Galeri Project</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {projectImages.map((img, index) => {
          const dimensions = thumbnailDimensions[index] || { width: 800, height: 600 }
          const aspectRatio = dimensions.width / dimensions.height
          
          return (
            <button
              key={index}
              onClick={() => onSelectImage(index)}
              className={`relative overflow-hidden border transition-all rounded-lg ${
                selectedImage === index 
                  ? 'border-slate-300 dark:border-slate-500 ring-2 ring-slate-200 dark:ring-slate-900/50' 
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
              aria-label={`View image ${index + 1}`}
              style={{ aspectRatio }}
            >
              <div className="absolute inset-0">
                <Image
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}