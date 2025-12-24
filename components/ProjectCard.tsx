'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getCategoryColor } from '@/utils/categoryColors'

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    image: string;
    images?: string[];
    technologies: string[];
    instagram?: string;
    demo?: string;
    category?: string;
    client?: string;
    year?: string;
    longDescription?: string;
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false)

  return (
    <Link 
      href={`/projects/${project.id}`}
      className="block h-full focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900 rounded-xl transition-all duration-300"
    >
      {/* Main Container - Scale akan diterapkan di sini */}
      <div 
        className="relative bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-md dark:shadow-slate-950/50 border border-slate-200/60 dark:border-slate-700/50 transition-all duration-500 ease-out hover:shadow-xl hover:shadow-sky-200/20 dark:hover:shadow-sky-900/20 hover:scale-105 cursor-pointer group h-full flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          // Hanya ini yang perlu untuk animasi smooth
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden'
        }}
      >
        {/* Image Container */}
        <div className="relative h-64 w-full flex-shrink-0 overflow-hidden rounded-t-xl">
          {/* Inner container that's larger than visible area */}
          <div className="absolute inset-0 scale-110">
            <div className="relative w-full h-full">
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={750}
                className={`object-cover w-full h-full transition-transform duration-700 ease-out ${
                  isHovered ? 'scale-110' : 'scale-100'
                }`}
                priority={false}
                style={{ 
                  transformOrigin: 'center',
                  backfaceVisibility: 'hidden'
                }}
              />
            </div>
          </div>
          
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent transition-opacity duration-500 ${
            isHovered ? 'opacity-80' : 'opacity-60'
          }`} />
          
          {/* Category Badge */}
          <div className={`absolute bottom-4 left-4 z-10 transition-all duration-500 ${
            isHovered ? 'translate-y-0 opacity-100' : '-translate-x-2 opacity-0'
          }`}>
            <span className={`inline-block px-3 py-1 backdrop-blur-sm text-sm font-medium rounded-md shadow-md ${getCategoryColor(project.category)}`}>
              {project.category || 'Project'}
            </span>
          </div>
          
          {/* Year Badge */}
          <div className={`absolute top-4 right-4 z-10 transition-all duration-500 ${
            isHovered ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
          }`}>
            <span className="inline-block px-3 py-1.5 bg-slate-900/70 dark:bg-slate-950/80 backdrop-blur-md text-white text-xs font-semibold rounded-lg border border-sky-400/20 shadow-lg">
              {project.year}
            </span>
          </div>
        </div>
        
        {/* Content Container - DI SINI kita handle blur issue */}
        <div className="p-5 flex flex-col flex-grow bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-b-xl">
          {/* Title */}
          <div className="mb-3">
            <h3 
              className="text-lg font-bold text-slate-700 dark:text-slate-100 transition-colors duration-300 group-hover:text-sky-700 dark:group-hover:text-sky-400 leading-tight"
              style={{
                // Ini yang bikin teks tajam
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                textRendering: 'optimizeLegibility',
                // Tidak pakai translateZ karena bertentangan dengan parent scale
              }}
            >
              {project.title}
            </h3>
          </div>
          
          {/* Description */}
          <div className="min-h-[44px] mb-4 flex-grow">
            <p 
              className="text-sm font- text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed transition-all duration-300 group-hover:text-slate-700 dark:group-hover:text-slate-300"
              style={{
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                textRendering: 'optimizeLegibility'
              }}
            >
              {project.description}
            </p>
          </div>
          
          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4 flex-shrink-0">
            {project.technologies.slice(0, 3).map((tech: string) => (
              <span 
                key={tech} 
                className={`px-2.5 py-1 text-sm font-medium rounded-md transition-all duration-300 ${
                  isHovered 
                    ? 'bg-sky-500 dark:bg-sky-600 text-white shadow-md scale-105' 
                    : 'bg-slate-100 dark:bg-slate-700/80 text-slate-700 dark:text-slate-300'
                }`}
                style={{
                  backfaceVisibility: 'hidden'
                }}
              >
                {tech}
              </span>
            ))}

            {project.technologies.length > 3 && (
              <span className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-300 ${
                isHovered 
                  ? 'bg-sky-600 dark:bg-sky-700 text-white shadow-md' 
                  : 'bg-slate-100 dark:bg-slate-700/80 text-slate-600 dark:text-slate-400'
              }`}>
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
          
          {/* Footer */}
          <div className="pt-3 border-t border-slate-200/80 dark:border-slate-700/60 mt-auto flex-shrink-0">
            <div className="flex items-center justify-between">
              <span 
                className={`text-sm font-medium transition-all duration-300 ${
                  isHovered 
                    ? 'text-sky-600 dark:text-sky-400' 
                    : 'text-slate-500 dark:text-slate-500'
                }`}
                style={{
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                  textRendering: 'optimizeLegibility'
                }}
              >
                {project.client || 'Personal Project'}
              </span>
              
              <div className={`transition-all duration-500 ${
                isHovered ? 'translate-x-1 opacity-100' : 'translate-x-0 opacity-0'
              }`}>
                <svg 
                  className="w-4 h-4 text-sky-600 dark:text-sky-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  style={{
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2.5" 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Hover Effects */}
        <div className={`absolute inset-0 bg-gradient-to-br from-sky-50/30 via-transparent to-slate-50/20 dark:from-sky-950/15 dark:via-transparent dark:to-slate-900/15 pointer-events-none transition-opacity duration-500 rounded-xl ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />
        
        <div 
          className={`absolute inset-0 pointer-events-none transition-opacity duration-500 rounded-xl ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            boxShadow: isHovered ? 'inset 0 0 0 1px rgba(56, 189, 248, 0.3)' : 'none'
          }}
        />
      </div>
    </Link>
  )
}