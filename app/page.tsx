'use client';

import { useState, useEffect, ReactElement } from 'react'
import Link from 'next/link'
import { FiPenTool, FiFileText, FiMonitor, FiArrowRight, FiCode, FiBriefcase, FiUsers, FiAward, FiMail, FiFolderPlus } from 'react-icons/fi'

// Components
import CloudinaryImage from '@/components/cloudinaryImage'
import ProjectCard from '@/components/ProjectCard'
import Animations from '@/components/Animations'
import StatsDisplay from '@/components/home/StatsDisplay'
import ServicesSection from '@/components/home/ServicesSection'

// Data
import { getLatestProjectSummaries, getProjectStats, type ProjectSummary } from '@/data/projects'



// Types
interface Stat {
  icon: ReactElement;
  value: string;
  label: string;
}

export default function Home() {
  // Tahun pengalaman manual
  const MANUAL_YEARS_EXPERIENCE = "3";
  
  // State
  const [stats, setStats] = useState<Stat[]>([
    { icon: <FiBriefcase />, value: '0', label: 'Total Projects' },
    { icon: <FiUsers />, value: '0', label: 'Happy Clients' },
    { icon: <FiAward />, value: MANUAL_YEARS_EXPERIENCE, label: 'Years Experience' },
  ]);

  const [featuredProjects, setFeaturedProjects] = useState<ProjectSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load data saat komponen mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Load project stats
        const projectStats = getProjectStats({
          manualYearsOfExperience: MANUAL_YEARS_EXPERIENCE
        });
        
        setStats([
          { 
            icon: <FiBriefcase />, 
            value: `${projectStats.totalProjects}`, 
            label: 'Total Projects' 
          },
          { 
            icon: <FiUsers />, 
            value: `${projectStats.totalClients}`, 
            label: 'Happy Clients' 
          },
          { 
            icon: <FiAward />, 
            value: projectStats.yearsOfExperience,
            label: 'Years Experience' 
          },
        ]);

        // Load featured projects
        const latestProjects = getLatestProjectSummaries(3);
        setFeaturedProjects(latestProjects);
      } catch (error) {
        console.error('Error loading data:', error);
        // Fallback values
        setStats([
          { icon: <FiBriefcase />, value: '8', label: 'Total Projects' },
          { icon: <FiUsers />, value: '6', label: 'Happy Clients' },
          { icon: <FiAward />, value: MANUAL_YEARS_EXPERIENCE, label: 'Years Experience' },
        ]);
        setFeaturedProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className='main-h-screen section-container py-6 md:py-8 lg:py-12'>
          <div className="py-6 md:py-8 lg:py-12">
          {/* Hero Section */}
            <section className="animate-fade-in py-8 md:py-12">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Text Content - Mobile: center, Desktop: left */}
                <div className="animate-slide-up order-2 md:order-1 text-center md:text-left">
                  {/* Title */}
                  <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-2">
                    Hi, I'm
                  </h1>
                  <h1 className="mb-6 md:mb-6 leading-tight">
                    <Animations />
                  </h1>
                  {/* Badge */}
                  <h6 className="inline-block px-4 py-2 bg-sky-200/60 dark:bg-slate-700/50 text-sky-700 dark:text-slate-200 rounded-md text-sm md:text-base font-semibold mb-6 md:mb-8">
                    🎨 Graphic Designer & IT Enthusiast
                  </h6>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center md:justify-start mb-8">
                    <Link
                      href="/projects"
                      className="btn-primary group flex items-center justify-center sm:justify-start transform-none px-6 py-3"
                    >
                      View Projects
                      <FiArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                    </Link>
                    <Link
                      href="/contact"
                      className="group px-6 py-3 backdrop-blur-sm 
                      bg-sky-500/10 dark:bg-slate-900 border border-sky-500/20 dark:border-slate-400/70 text-sky-600 dark:text-slate-100 dark:hover:text-slate-100
                      rounded-lg hover:bg-sky-500/20 dark:hover:bg-slate-600/20 transition-all duration-300 font-medium inline-flex items-center 
                      justify-center hover:border-sky-500/40 dark:hover:border-slate-400/70 hover:shadow-lg hover:shadow-sky-500/10 dark:hover:shadow-slate300/10"
                    >
                      Contact Me
                      <FiMail className="ml-2 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:text-sky-500 dark:group-hover:text-slate-100" />
                    </Link>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-center md:justify-start">
                    <StatsDisplay stats={stats} />
                  </div>
                </div>

                {/* Image Content */}
                <div className="relative order-1 md:order-2 mb-8 md:mb-0 flex justify-center">
                  <div className="relative aspect-square w-full max-w-sm sm:max-w-md md:w-full rounded-2xl overflow-hidden shadow-2xl dark:shadow-gray-900/50">
                    <CloudinaryImage
                      src="https://res.cloudinary.com/dfovmrebt/image/upload/v1765630961/about-me_vjp8g4.jpg"
                      alt="Ilkhanul Khalik - About Me"
                      width={600}
                      height={600}
                      className="object-cover w-full h-full grayscale hover:grayscale-0 hover:scale-105 transition-all duration-300 ease-in-out"
                      sizes="(max-width: 768px) 80vw, 50vw"
                      eager={true}
                    />
                  </div>
                </div>
              </div>
            </section>

          {/* Projects Preview Section */}
            <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-slate-800 dark:text-slate-100">
                  Latest Projects
                </h2>
                <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4">
                  A Selection of My Work
                </p>
              </div>
            </div>

            {/* Projects Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {[1, 2, 3].map((index) => (
                  <ProjectSkeleton key={index} />
                ))}
              </div>
            ) : featuredProjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {featuredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <EmptyProjectsState />
            )}

            {/* View More CTA */}
            <div className="text-center mt-8 sm:mt-8">
              <Link
                href="/projects"
                className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 
                bg-sky-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg 
                hover:bg-sky-300 dark:hover:bg-gray-700 transition-colors duration-300 font-medium text-sm sm:text-base group"
              >
                <FiFolderPlus className="mr-2"/>
                Explore All Projects
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Services Section */}
            <ServicesSection />
        </div>
    </div>

  )
}

// Component untuk loading skeleton project
const ProjectSkeleton = () => (
  <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 sm:p-6 animate-pulse">
    <div className="h-40 sm:h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 sm:mb-4"></div>
    <div className="h-5 sm:h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2 sm:mb-3"></div>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-1.5 sm:mb-2"></div>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
  </div>
);

// Component untuk empty state projects
const EmptyProjectsState = () => (
  <div className="text-center py-8 sm:py-12">
    <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">📁</div>
    <h3 className="text-xl sm:text-2xl font-bold text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
      No projects yet
    </h3>
    <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
      Projects will appear here when available
    </p>
  </div>
);