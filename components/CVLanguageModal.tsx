// components/CVLanguageModal.tsx
'use client';

import { useEffect, useRef } from 'react';
import { FiGlobe, FiCheck } from 'react-icons/fi';
import { useScrollLock } from '@/hooks/useScrollLock';
import { cvOptions, type CVOption } from '@/data/certificates';

interface CVLanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (cvOption: CVOption) => void;
  isLoading: boolean;
}

export default function CVLanguageModal({ 
  isOpen, 
  onClose, 
  onSelect,
  isLoading 
}: CVLanguageModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useScrollLock(isOpen);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLoading) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
      onClick={handleBackdropClick}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div 
        className="relative z-50 bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-2xl max-w-xs sm:max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-sky-100 dark:bg-sky-900/30 rounded-lg">
              <FiGlobe className="text-sky-600 dark:text-sky-400 text-lg sm:text-xl" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Select CV Version
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Please select your preferred language
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 p-1.5 sm:p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            aria-label="Close modal"
            disabled={isLoading}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-2 sm:space-y-3">
            {cvOptions.map((cvOption) => (
              <button
                key={cvOption.id}
                onClick={() => onSelect(cvOption)}
                disabled={isLoading}
                className={`w-full flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-all duration-200 text-left ${
                  isLoading 
                    ? 'opacity-70 cursor-not-allowed' 
                    : 'cursor-pointer hover:scale-[1.02] hover:shadow-md'
                } ${
                  cvOption.language === 'indonesia'
                    ? 'border-rose-200 dark:border-rose-700 bg-red-50 dark:bg-red-900/10 hover:bg-rose-100 dark:hover:bg-red-900/20'
                    : 'border-sky-200 dark:border-sky-700 bg-sky-50 dark:bg-sky-900/10 hover:bg-sky-100 dark:hover:bg-sky-900/20'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                    <span className={`font-bold text-sm sm:text-base ${
                      cvOption.language === 'indonesia'
                        ? 'text-rose-700 dark:text-rose-300'
                        : 'text-sky-700 dark:text-sky-300'
                    }`}>
                      {cvOption.label}
                    </span>
                    <span className={`px-1.5 py-0.5 text-xs rounded-full flex-shrink-0 ${
                      cvOption.language === 'indonesia' 
                        ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400'
                        : 'bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400'
                    }`}>
                      {cvOption.language === 'indonesia' ? 'ID' : 'EN'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                    {cvOption.description}
                  </p>
                  <div className="mt-1.5 text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
                    Format: PDF • Updated: Dec 2025
                  </div>
                </div>
                <FiCheck className={`text-base sm:text-lg mt-0.5 flex-shrink-0 ${
                  cvOption.language === 'indonesia'
                    ? 'text-rose-500'
                    : 'text-sky-500'
                }`} />
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors font-medium disabled:opacity-70"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}