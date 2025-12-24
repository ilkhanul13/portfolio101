'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { 
  FiArrowLeft, 
  FiCalendar,
  FiUser,
  FiFolder,
  FiChevronLeft,
  FiChevronRight,
  FiGlobe,
  FiStar,
  FiExternalLink
} from 'react-icons/fi'

import { getProjectById, type Project } from '@/data/projects'
import ProjectNavigation from '@/components/projects/ProjectNavigation'
import SocialMediaButtons from '@/components/projects/SocialMediaButtons'
import ThumbnailGallery from '@/components/projects/ThumbnailGallery'
import ProjectStatsTestimonial from '@/components/projects/ProjectStatsTestimonial'
import { getCategoryColor } from '@/utils/categoryColors'

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState(0)
  const [project, setProject] = useState<Project | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [imageDimensions, setImageDimensions] = useState<{width: number, height: number} | null>(null)
  const [thumbnailDimensions, setThumbnailDimensions] = useState<Array<{width: number, height: number}>>([])

  // Get all project images
  const projectImages = useMemo(() => {
    if (!project) return []
    return project.images || []
  }, [project])

  // Get image dimensions function
  const getImageDimensions = (url: string): Promise<{width: number, height: number}> => {
    return new Promise((resolve) => {
      const img = new window.Image()
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight })
      }
      img.onerror = () => {
        resolve({ width: 800, height: 600 }) // Fallback dimensions
      }
      img.src = url
    })
  }

  // Load image dimensions when project changes
  useEffect(() => {
    if (projectImages.length > 0) {
      // Load dimensions for preview image
      getImageDimensions(projectImages[selectedImage]).then(setImageDimensions)
      
      // Load dimensions for all thumbnails
      Promise.all(projectImages.map(getImageDimensions)).then(setThumbnailDimensions)
    }
  }, [projectImages, selectedImage])

  // Image navigation
  const nextImage = () => {
    setIsImageLoaded(false)
    const nextIndex = (selectedImage + 1) % projectImages.length
    setSelectedImage(nextIndex)
    getImageDimensions(projectImages[nextIndex]).then(setImageDimensions)
  }

  const prevImage = () => {
    setIsImageLoaded(false)
    const prevIndex = (selectedImage - 1 + projectImages.length) % projectImages.length
    setSelectedImage(prevIndex)
    getImageDimensions(projectImages[prevIndex]).then(setImageDimensions)
  }

  // Handle thumbnail selection
  const handleThumbnailSelect = (index: number) => {
    setIsImageLoaded(false)
    setSelectedImage(index)
    getImageDimensions(projectImages[index]).then(setImageDimensions)
  }

  // Load project data
  useEffect(() => {
    if (params.id) {
      const foundProject = getProjectById(params.id as string)
      if (foundProject) {
        setProject(foundProject)
      } else {
        router.push('/projects')
      }
    }
  }, [params.id, router])

  // Check mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 dark:border-sky-500 mx-auto"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-300">Memuat detail project...</p>
        </div>
      </div>
    )
  }

  // Calculate aspect ratio for preview image
  const previewAspectRatio = imageDimensions 
    ? imageDimensions.width / imageDimensions.height 
    : 16/9 // Fallback ratio

  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-40">
        <div className="section-container py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/projects" 
              className="inline-flex items-center text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 transition-colors group"
            >
              <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Projects</span>
            </Link>
            
            {/* Mobile View - Project Title */}
            {isMobile && (
              <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-50 truncate max-w-[200px]">
                {project.title}
              </h1>
            )}
          </div>
        </div>
      </div>

      <div className="section-container py-6 md:py-8">
        {/* Project Header */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 md:gap-6 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-3.5 py-1.5 text-sm font-semibold rounded-md border border-slate-300/30 dark:border-slate-600/30 ${getCategoryColor(project.category)}`}>
                  {project.category}
                </span>
                <span className="text-slate-400 dark:text-slate-500">•</span>
                <span className="text-slate-500 dark:text-slate-400">{project.year}</span>
              </div>
              
              <h1 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                {project.title}
              </h1>
              
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-4 md:mb-0">
                {project.description}
              </p>
            </div>
          </div>

          {/* Project Metadata */}
          <div className="flex flex-wrap gap-4 md:gap-6 text-slate-600 dark:text-slate-400">
            <div className="flex items-center bg-white dark:bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700">
              <FiCalendar className="mr-2 text-sky-500 dark:text-sky-400" />
              <span className="font-medium">{project.year}</span>
            </div>
            <div className="flex items-center bg-white dark:bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700">
              <FiUser className="mr-2 text-sky-500 dark:text-sky-400" />
              <span className="font-medium">{project.client || 'Personal Project'}</span>
            </div>
            <div className="flex items-center bg-white dark:bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700">
              <FiFolder className="mr-2 text-sky-500 dark:text-sky-400" />
              <span className="font-medium">{project.category}</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* Main Image Gallery */}
          <div className="lg:col-span-2">
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
              {/* Main Image Container */}
              <div 
                className="relative w-full"
                style={{ aspectRatio: previewAspectRatio }}
              >
                {!isImageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 dark:border-sky-500"></div>
                  </div>
                )}
                <Image
                  src={projectImages[selectedImage]}
                  alt={`${project.title} - Image ${selectedImage + 1}`}
                  fill
                  className={`object-contain bg-white dark:bg-slate-900 ${!isImageLoaded ? 'opacity-0' : 'opacity-100'}`}
                  priority
                  unoptimized
                  onLoad={() => setIsImageLoaded(true)}
                  onError={() => setIsImageLoaded(true)}
                />
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 dark:bg-slate-900/70 hover:bg-black/70 dark:hover:bg-slate-900/90 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all md:opacity-0 group-hover:opacity-100"
                  aria-label="Previous image"
                >
                  <FiChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 dark:bg-slate-900/70 hover:bg-black/70 dark:hover:bg-slate-900/90 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all md:opacity-0 group-hover:opacity-100"
                  aria-label="Next image"
                >
                  <FiChevronRight size={20} />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 dark:bg-slate-900/80 text-white text-sm rounded-full backdrop-blur-sm">
                  {selectedImage + 1} / {projectImages.length}
                </div>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <ThumbnailGallery
              projectImages={projectImages}
              selectedImage={selectedImage}
              onSelectImage={handleThumbnailSelect}
              thumbnailDimensions={thumbnailDimensions}
            />
          </div>

          {/* Sidebar - Info */}
          <div className="space-y-6">
            {/* Technologies */}
            <div className="bg-white dark:bg-slate-800/50 rounded-xl p-4 md:p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Tools & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string) => (
                  <span 
                    key={tech}
                    className="px-3 py-2 bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 rounded-lg text-sm font-medium hover:bg-sky-100 dark:hover:bg-sky-900/50 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Media Links */}
            <SocialMediaButtons project={project} />
          </div>
        </div>

        {/* Project Details Grid */}
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Long Description & Features */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 md:p-8 border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold mb-6 text-slate-700 dark:text-white">About the Project</h2>
              <div className="space-y-4">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {project.longDescription}
                </p>
              </div>

              {/* Deliverables */}
              {project.deliverables && project.deliverables.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">Deliverables</h3>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {project.deliverables.map((item: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-slate-600 dark:bg-slate-300 rounded-full mr-3 flex-shrink-0"></span>
                        <span className="text-slate-700 dark:text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Project Stats */}
              {project.stats && project.stats.length > 0 && (
                <div className="mt-8">
                  <div className="relative">
                    <div className="">
                      {project.stats.map((stat, index) => (
                        <div key={index} className="relative">
                          <div className="flex justify-between items-center p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-sky-600 transition-colors shadow-sm hover:shadow-md">
                            <span className="text-slate-700 dark:text-slate-300 font-medium">
                              {stat.label}
                            </span>
                            <span className="font-medium text-md text-sky-600 dark:text-sky-400">
                              {stat.value}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Next Project */}
          <div className="space-y-6">
            {/* Next Project CTA */}
            <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="text-xl font-semibold mb-3 text-slate-700 dark:text-slate-50">Other Projects</h3>
              <p className="mb-4 text-slate-600 dark:text-slate-400 text-sm">Explore other interesting projects in my portfolio.</p>
              <Link 
                href="/projects" 
                className="inline-flex items-center justify-center w-full py-3 bg-sky-600 hover:bg-sky-700 backdrop-blur-sm rounded-lg transition-colors text-slate-100"
              >
                View All Projects
              </Link>
            </div>
          </div>
        </div>

        {/* Project Navigation */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-slate-200 dark:border-slate-800">
          <ProjectNavigation />
        </div>

        {/* Project Stats & Testimonial */}
        <div className="mt-8 md:mt-12">
          <ProjectStatsTestimonial project={project} />
        </div>
      </div>
    </div>
  )
}