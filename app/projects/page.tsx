'use client'

import { useState, useEffect } from 'react'
import ProjectCard from '@/components/ProjectCard'
import Link from 'next/link'
import { getProjectSummaries } from '@/data/projects'

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [projects, setProjects] = useState<any[]>([])
  const [categories, setCategories] = useState<string[]>(['All'])
  
  // Load data dari project.ts
  useEffect(() => {
    // Gunakan getProjectSummaries() untuk data ringkas
    const projectSummaries = getProjectSummaries()
    setProjects(projectSummaries)
    
    // Set kategori dari data proyek
    const uniqueCategories = ['All', ...Array.from(new Set(projectSummaries.map(p => p.category)))]
    setCategories(uniqueCategories)
  }, [])

  // Filter projects berdasarkan kategori dan search query
  const filteredProjects = projects.filter(project => {
    // Filter kategori
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory
    
    // Jika search query kosong, langsung return berdasarkan kategori
    if (!searchQuery.trim()) {
      return matchesCategory
    }
    
    const query = searchQuery.toLowerCase().trim()
    
    // Cari di semua field yang relevan
    const matchesSearch = 
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.technologies.some((tech: string) => tech.toLowerCase().includes(query)) ||
      project.client.toLowerCase().includes(query) ||
      project.category.toLowerCase().includes(query)
    
    return matchesCategory && matchesSearch
  })

  // Fungsi untuk mengembalikan ke filter default
  const resetFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All')
  }

  return (
    <div className="main-h-screen section-container py-6 md:py-8 lg:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16 relative">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-slate-900 dark:text-white">
            Project Portfolio
          </h1>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects or technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 pr-10 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-transparent transition-all duration-300 text-slate-800 dark:text-slate-200"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                ✕
              </button>
            )}
          </div>
          
          {searchQuery && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 text-center">
              Showing {filteredProjects.length} projects for "{searchQuery}"
            </p>
          )}
        </div>

        {/* Filter Categories */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-4 text-center text-slate-700 dark:text-slate-300">
            Filter by category
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-sky-600 dark:bg-slate-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="text-center mt-4">
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Showing {filteredProjects.length} from {projects.length} projects
            </span>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {/* Stats Section */}
            <div className="mt-16 mb-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                <div className="bg-slate-200/50 dark:bg-slate-800/50 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-sky-600 dark:text-sky-400">{projects.length}</div>
                  <div className="text-slate-600 dark:text-slate-400">Total Projects</div>
                </div>
                <div className="bg-slate-200/50 dark:bg-slate-800/50 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                    {Array.from(new Set(projects.map(p => p.client))).length}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">Clients</div>
                </div>
                <div className="bg-slate-200/50 dark:bg-slate-800/50 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-violet-600 dark:text-violet-400">
                    {Array.from(new Set(projects.map(p => p.category))).length}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">Categories</div>
                </div>
                <div className="bg-slate-200/50 dark:bg-slate-800/50 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                    {Array.from(new Set(projects.flatMap(p => p.technologies))).length}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">Tools & Technologies</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-2">
              No projects found
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              No projects match your search "{searchQuery}" {selectedCategory !== 'All' && `in category "${selectedCategory}"`}
            </p>
            <div className="flex flex-col gap-3 items-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Try searching for: "Illustrator", "Logo", "Design", "2024", "Alumni"
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-3 bg-sky-600 dark:bg-sky-500 text-white rounded-lg hover:bg-sky-700 dark:hover:bg-sky-600 transition-colors duration-300"
              >
                Reset Filter
              </button>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="mt-8 text-slate-500 dark:text-slate-400">
            <p>
              Want to see more?{' '}
              <Link href="/contact" className="text-sky-600 dark:text-sky-400 hover:underline">
                Request the full portfolio.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}