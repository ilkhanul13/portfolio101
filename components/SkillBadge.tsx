'use client';

import { ReactElement } from 'react';

type SkillLevel = 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner' | 'Novice';

interface Skill {
  id?: string;
  name: string;
  icon: string | ReactElement;
  category: string;
  description?: string;
  rating?: number;
  years?: number;
}

interface SkillBadgeProps {
  skill: Skill;
  level?: SkillLevel;
  showIcon?: boolean;
  showCategory?: boolean;
  showLevelIcon?: boolean;
  showRating?: boolean;
  showYears?: boolean;
  onClick?: (skill: Skill) => void;
  className?: string;
  compact?: boolean;
}

export default function SkillBadge({ 
  skill, 
  level,
  showIcon = true,
  showCategory = true,
  showLevelIcon = false,
  showRating = false,
  showYears = false,
  onClick,
  className = '',
  compact = false
}: SkillBadgeProps) {
  
  const getLevelFromRating = (rating: number = 0): SkillLevel => {
    if (rating >= 4.5) return 'Expert';
    if (rating >= 4) return 'Advanced';
    if (rating >= 3) return 'Intermediate';
    if (rating >= 2) return 'Beginner';
    return 'Novice';
  };

  const skillLevel = level || getLevelFromRating(skill?.rating || 0);
  
  const getLevelColor = (level: SkillLevel): string => {
    const colorMap: Record<SkillLevel, string> = {
      'Expert': 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/50',
      'Advanced': 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800/50',
      'Intermediate': 'bg-yellow-200/70 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800/50',
      'Beginner': 'bg-purple-200/70 text-violet-700 border-violet-200 dark:bg-violet-950/50 dark:text-violet-300 dark:border-violet-800/50',
      'Novice': 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-900/50 dark:text-slate-300 dark:border-slate-700/50'
    };
    
    return `${colorMap[level]} border rounded-md`;
  }

  const getBackgroundAccent = (level: SkillLevel): string => {
    const accentMap: Record<SkillLevel, string> = {
      'Expert': 'bg-white dark:bg-slate-800',
      'Advanced': 'bg-white dark:dark:bg-slate-800',
      'Intermediate': 'bg-white dark:bg-slate-800',
      'Beginner': 'bg-white dark:dark:bg-slate-800',
      'Novice': 'bg-white dark:dark:bg-slate-800'
    };
    
    return accentMap[level];
  }

  const getIconBackground = (level: SkillLevel): string => {
    const iconBgMap: Record<SkillLevel, string> = {
      'Expert': 'bg-emerald-100 dark:bg-emerald-900/40',
      'Advanced': 'bg-blue-100 dark:bg-blue-900/40',
      'Intermediate': 'bg-amber-200 dark:bg-amber-900/40',
      'Beginner': 'bg-violet-200 dark:bg-violet-900/40',
      'Novice': 'bg-slate-200 dark:bg-slate-800/40'
    };
    
    return iconBgMap[level];
  }

  const getIconColor = (level: SkillLevel): string => {
    const iconColorMap: Record<SkillLevel, string> = {
      'Expert': 'text-emerald-600 dark:text-emerald-400',
      'Advanced': 'text-blue-600 dark:text-blue-400',
      'Intermediate': 'text-amber-600 dark:text-amber-400',
      'Beginner': 'text-violet-600 dark:text-violet-400',
      'Novice': 'text-slate-600 dark:text-slate-400'
    };
    
    return iconColorMap[level];
  }

  const getLevelIcon = (level: SkillLevel): string => {
    const iconMap: Record<SkillLevel, string> = {
      'Expert': '⭐⭐⭐⭐⭐',
      'Advanced': '⭐⭐⭐⭐',
      'Intermediate': '⭐⭐⭐',
      'Beginner': '⭐⭐',
      'Novice': '⭐'
    };
    
    return iconMap[level];
  }

  const getProgressColor = (rating: number = 0, index: number): string => {
    const isFullBar = index < Math.floor(rating);
    const isPartialBar = index === Math.floor(rating) && rating % 1 > 0.3;
    
    if (isFullBar) {
      if (rating >= 4.5) return 'bg-emerald-500 dark:bg-emerald-400';
      if (rating >= 4) return 'bg-blue-500 dark:bg-blue-400';
      if (rating >= 3) return 'bg-amber-500 dark:bg-amber-400';
      if (rating >= 2) return 'bg-violet-500 dark:bg-violet-400';
      return 'bg-slate-500 dark:bg-slate-400';
    }
    
    if (isPartialBar) {
      if (rating >= 4.5) return 'bg-emerald-300 dark:bg-emerald-600';
      if (rating >= 4) return 'bg-blue-300 dark:bg-blue-600';
      if (rating >= 3) return 'bg-amber-300 dark:bg-amber-600';
      if (rating >= 2) return 'bg-violet-300 dark:bg-violet-600';
      return 'bg-slate-300 dark:bg-slate-600';
    }
    
    return 'bg-slate-200 dark:bg-slate-700';
  }

  const renderRatingVisual = (rating: number = 0) => {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className={`w-4 h-2 rounded-sm transition-colors ${getProgressColor(rating, i)}`}
            />
          ))}
        </div>
        
        <span className="text-xs text-slate-600 dark:text-slate-400 font-medium min-w-[40px]">
          {rating > 0 ? `${rating}/5` : 'Not rated'}
        </span>
      </div>
    );
  }

  const handleClick = () => {
    if (onClick) {
      onClick(skill);
    }
  }

  return (
    <div 
      className={`
        relative overflow-hidden
        flex items-center justify-between p-4 
        bg-white dark:bg-slate-800
        rounded-lg border border-slate-200 dark:border-slate-700
        hover:bg-slate-50 dark:hover:bg-slate-750
        hover:shadow-sm dark:hover:shadow-slate-900/30
        transition-all duration-200
        ${onClick ? 'cursor-pointer' : ''}
        ${compact ? 'py-3 px-4' : ''}
        ${className}
      `}
      onClick={handleClick}
      role={onClick ? 'button' : 'listitem'}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Background level indicator */}
      <div className={`absolute inset-0 ${getBackgroundAccent(skillLevel)}`} />
      
      <div className="relative flex items-center space-x-3 flex-1 min-w-0 z-10">
        {showIcon && (
          <div className={`w-10 h-10 ${getIconBackground(skillLevel)} rounded-lg flex items-center justify-center flex-shrink-0 transition-colors`}>
            <span className={`${getIconColor(skillLevel)} font-bold text-lg`}>
              {skill?.icon && (typeof skill.icon === 'string' ? skill.icon : skill.icon)}
            </span>
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <div className="min-w-0">
              <h4 className="font-semibold text-slate-800 dark:text-slate-100 truncate">
                {skill?.name || 'Unnamed Skill'}
              </h4>
              
              {showCategory && skill?.category && (
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {skill.category}
                </p>
              )}
              
              {skill?.description && (
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 line-clamp-1">
                  {skill.description}
                </p>
              )}
              
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                {showYears && skill?.years !== undefined && (
                  <span className="text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">
                    {skill.years} tahun
                  </span>
                )}
                
                {showRating && skill?.rating !== undefined && (
                  <div className="flex items-center">
                    {renderRatingVisual(skill.rating)}
                  </div>
                )}
                
                {showLevelIcon && (
                  <p className="text-xs">
                    {getLevelIcon(skillLevel)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <span className={`relative px-3 py-1 text-xs font-semibold ml-3 flex-shrink-0 z-10 ${getLevelColor(skillLevel)}`}>
        {skillLevel}
      </span>
    </div>
  );
}