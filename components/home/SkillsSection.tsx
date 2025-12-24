// /components/home/SkillsSection.tsx
import SkillBadge from '@/components/SkillBadge';

interface Skill {
  name: string;
  category: string;
  icon: string;
  rating: number;
  years: number;
}

interface SkillsSectionProps {
  skills: Skill[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const expertiseAreas = [
    'Typography',
    'Color Theory',
    'Layout Design',
    'Print Production',
    'UI/UX',
    'Web Development',
    'System Troubleshooting',
    'Data Management'
  ];

  return (
    <section className="mt-12 sm:mt-16 md:mt-20 lg:mt-24">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-slate-800 dark:text-white">
          Skills & Technologies
        </h2>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4">
          Technologies and tools I usually use to deliver the best results.
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4">
        {skills.map((skill) => (
          <SkillBadge
            key={skill.name}
            skill={skill}
            showIcon={true}
            showCategory={true}
            showRating={false}
            showYears={false}
            compact={false}
          />
        ))}
      </div>

      {/* Additional Expertise */}
      <div className="mt-8 sm:mt-12 pt-8 sm:pt-12 border-t border-slate-200 dark:border-slate-700">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-slate-800 dark:text-white">
          Other Expertise Areas
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          {expertiseAreas.map((expertise, index) => (
            <div
              key={index}
              className="bg-slate-100 dark:bg-slate-800 p-2.5 sm:p-4 rounded-lg text-center hover:bg-sky-100 dark:hover:bg-slate-700 transition-colors duration-300 group"
            >
              <div className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-200 font-medium group-hover:scale-105 transition-transform line-clamp-1">
                {expertise}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}