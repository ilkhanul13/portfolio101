// components/about/EducationSection.tsx
'use client';

import Link from 'next/link';

interface EducationItem {
  year: string;
  degree: string;
  institution: string;
  institutionUrl?: string;
  description: string | string[];
  tags: string[];
}

const educationData: EducationItem = {
  year: "2018 - 2024",
  degree: "Bachelor's Degree in Informatics Engineering",
  institution: "Muhammadiyah University of Prof. Dr. Hamka (UHAMKA)",
  institutionUrl: "https://uhamka.ac.id",
  description: "Graduated in 2024 with a specialization in multimedia, including graphic design, UI/UX, and web development. Completed a thesis titled 'Design and Development of a Website-Based Information System for Hospital Room Availability for COVID-19 Patient Care in DKI Jakarta During the Pandemic.'",
  tags: ["Desain Grafis", "Web Development", "UI/UX Design", "Multimedia"]
};

export default function EducationSection() {
  return (
    <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24">
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 md:mb-6 pb-3 sm:pb-4 text-slate-800 dark:text-slate-100">
        Education
      </h3>
      
      <div className="bg-white dark:bg-slate-800/50 rounded-xl sm:rounded-2xl shadow-lg dark:shadow-slate-900/30 p-4 sm:p-5 md:p-6 lg:p-8 border border-slate-100 dark:border-slate-700">
        <div className="flex flex-col md:flex-row md:items-start gap-3 sm:gap-4">
          {/* Left Column: Metadata */}
          <div className="md:w-1/4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-md text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-600 dark:bg-emerald-400 rounded-full"></div>
              {educationData.year}
            </div>
            <h4 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 leading-normal text-slate-800 dark:text-slate-100">
              {educationData.degree}
            </h4>
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {educationData.institutionUrl ? (
                <Link 
                  href={educationData.institutionUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-300"
                >
                  {educationData.institution}
                </Link>
              ) : (
                educationData.institution
              )}
            </div>
          </div>
          
          {/* Right Column: Description */}
          <div className="md:w-3/4">
            {Array.isArray(educationData.description) ? (
              educationData.description.map((desc, idx) => (
                <p key={idx} className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-2 last:mb-3">
                  {desc}
                </p>
              ))
            ) : (
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-3">
                {educationData.description}
              </p>
            )}
            
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {educationData.tags.map((tag, idx) => (
                <span 
                  key={idx} 
                  className="px-1.5 py-1 sm:px-2 sm:py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}