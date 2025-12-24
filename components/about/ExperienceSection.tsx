// components/about/ExperienceSection.tsx
'use client';

import Link from 'next/link';
import { experiences } from '@/data/experiences';

export default function ExperienceSection() {
  return (
    <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24">
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 md:mb-6 pb-3 sm:pb-4
      text-slate-800 dark:text-slate-100">
        Experience
      </h3>
      
      <div className="space-y-4 sm:space-y-5 md:space-y-6">
        {experiences.map((exp, index) => (
          <div 
            key={index} 
            className="bg-white dark:bg-slate-800/50 rounded-xl sm:rounded-2xl shadow-lg dark:shadow-slate-900/30 p-4 sm:p-5 md:p-6 lg:p-8 border border-slate-100 dark:border-slate-700 hover:shadow-xl dark:hover:shadow-slate-900/50 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-3 sm:gap-4">
              {/* Left Column: Metadata */}
              <div className="md:w-1/4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 rounded-md text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-sky-600 dark:bg-sky-400 rounded-full"></div>
                  {exp.year}
                </div>
                <h4 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 leading-normal text-slate-800 dark:text-slate-100">
                  {exp.companyUrl ? (
                    <Link 
                      href={exp.companyUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-300"
                    >
                      {exp.company}
                    </Link>
                  ) : (
                    exp.company
                  )}
                </h4>
                <div className="font-medium text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  {exp.position}
                </div>
                <div className="font-medium text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  {exp.period}
                </div>
              </div>
              
              {/* Right Column: Description */}
              <div className="md:w-3/4">
                {exp.role && (
                  <h5 className="font-bold text-sm sm:text-base mb-2 text-slate-800 dark:text-slate-100">
                    {exp.role}
                  </h5>
                )}
                {Array.isArray(exp.description) ? (
                  exp.description.map((desc, idx) => (
                    <p key={idx} className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-2 last:mb-0">
                      {desc}
                    </p>
                  ))
                ) : (
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                    {exp.description}
                  </p>
                )}
                
                {/* Tags */}
                {exp.tags && exp.tags.length > 0 && (
                  <div className="mt-2 sm:mt-3 flex flex-wrap gap-1.5">
                    {exp.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="px-1.5 py-1 sm:px-2 sm:py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}