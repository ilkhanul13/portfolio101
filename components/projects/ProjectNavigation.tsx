'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { allProjects } from '@/data/projects'

export default function ProjectNavigation() {
  const params = useParams()
  const currentProjectId = Number(params.id) || 1
  const currentIndex = allProjects.findIndex(p => p.id === currentProjectId)
  
  const getPreviousProject = () => {
    if (currentIndex === -1) return null
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : allProjects.length - 1
    return allProjects[prevIndex]
  }

  const getNextProject = () => {
    if (currentIndex === -1) return null
    const nextIndex = currentIndex < allProjects.length - 1 ? currentIndex + 1 : 0
    return allProjects[nextIndex]
  }

  const previousProject = getPreviousProject()
  const nextProject = getNextProject()

  return (
    <div className="w-full">
      {/* Desktop Version */}
      <div className="hidden md:flex justify-between items-center">
        <Link 
          href={`/projects/${previousProject?.id || 1}`}
          className="flex items-center text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-sky-400 transition-colors group max-w-[45%]"
        >
          <div className="flex-shrink-0 p-3 rounded-lg bg-slate-200/70 dark:bg-slate-800 group-hover:bg-slate-300 dark:group-hover:bg-sky-900/30 transition-colors">
            <FiChevronLeft className="text-xl" />
          </div>
          <div className="ml-4 min-w-0">
            <div className="text-sm text-slate-500 dark:text-slate-400">Previous</div>
            <div className="font-medium truncate text-slate-700 dark:text-white">
              {previousProject?.title || 'Previous Project'}
            </div>
          </div>
        </Link>
        
        <Link 
          href={`/projects/${nextProject?.id || 1}`}
          className="flex items-center text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-sky-400 transition-colors group max-w-[45%] text-right"
        >
          <div className="mr-4 min-w-0">
            <div className="text-sm text-slate-500 dark:text-slate-400">Next</div>
            <div className="font-medium truncate text-slate-700 dark:text-white">
              {nextProject?.title || 'Next Project'}
            </div>
          </div>
          <div className="flex-shrink-0 p-3 rounded-lg bg-slate-200/70 dark:bg-slate-800 group-hover:bg-slate-300 dark:group-hover:bg-sky-900/30 transition-colors">
            <FiChevronRight className="text-xl" />
          </div>
        </Link>
      </div>

      {/* Mobile Version */}
      <div className="flex md:hidden justify-between gap-3">
        <Link 
          href={`/projects/${previousProject?.id || 1}`}
          className="flex-1 px-4 py-3 bg-slate-200/70 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-center min-w-0"
        >
          <div className="flex items-center justify-center gap-2">
            <FiChevronLeft className="flex-shrink-0 text-lg" />
            <div className="min-w-0">
              <div className="text-xs text-slate-500 dark:text-slate-400">Previous</div>
              <div className="font-medium text-slate-800 dark:text-white truncate text-sm">
                {previousProject?.title || 'Previous'}
              </div>
            </div>
          </div>
        </Link>
        
        <Link 
          href={`/projects/${nextProject?.id || 1}`}
          className="flex-1 px-4 py-3 bg-slate-200/70 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-center min-w-0"
        >
          <div className="flex items-center justify-center gap-2">
            <div className="min-w-0">
              <div className="text-xs text-slate-500 dark:text-slate-400">Next</div>
              <div className="font-medium text-slate-800 dark:text-white truncate text-sm">
                {nextProject?.title || 'Next'}
              </div>
            </div>
            <FiChevronRight className="flex-shrink-0 text-lg" />
          </div>
        </Link>
      </div>
    </div>
  )
}