// /components/home/StatsDisplay.tsx
import { ReactElement } from 'react';

interface Stat {
  icon: ReactElement;
  value: string;
  label: string;
}

interface StatsDisplayProps {
  stats: Stat[];
}

export default function StatsDisplay({ stats }: StatsDisplayProps) {
  return (
    <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
      <div className="mt-6 sm:mt-2 pt-4 sm:pt-3 inline-flex flex-wrap items-center justify-center sm:justify-start gap-1 sm:gap-2 bg-gray-200/30 dark:bg-gray-800/50 rounded-lg px-3 py-2 sm:px-4 sm:py-3 hover:shadow-sm 
      transition-all duration-300 w-full sm:w-auto border border-gray-200 dark:border-gray-700">
        {stats.map((stat, index) => (
          <StatItem key={index} stat={stat} isLast={index === stats.length - 1} />
        ))}
      </div>
    </div>
  );
}

function StatItem({ stat, isLast }: { stat: Stat; isLast: boolean }) {
  return (
    <div className="flex items-center">
      <div className="px-2 py-1.5 sm:px-3 sm:py-1.5 group cursor-pointer min-w-[100px] sm:min-w-0">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Icon Container */}
          <div className="relative p-1 sm:p-1.5 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 dark:from-gray-700 dark:to-gray-800 transition-all duration-300 group-hover:shadow-xs flex-shrink-0">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative text-sky-600 dark:text-sky-500 text-sm transition-transform duration-300 group-hover:scale-110">
              {stat.icon}
            </div>
          </div>

          {/* Text Content */}
          <div className="transition-all duration-300 group-hover:translate-x-0.5 overflow-hidden">
            <div className="flex items-center text-sm sm:text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-gray-800 dark:group-hover:text-gray-100 whitespace-nowrap overflow-hidden text-ellipsis">
              <span>{stat.value}</span>
              {stat.label === 'Years Experience' && (
                <span className="text-sky-600 dark:text-sky-00 text-sm sm:text-lg ml-0.5 transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-300">
                  +
                </span>
              )}
            </div>
            <div className="text-[10px] xs:text-[11px] sm:text-[12px] text-gray-500 dark:text-gray-400 font-medium leading-tight transition-colors duration-300 group-hover:text-gray-600 dark:group-hover:text-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">
              {stat.label}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}