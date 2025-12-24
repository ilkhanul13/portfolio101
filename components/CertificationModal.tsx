// components/CertificationModal.tsx
'use client';

import { useState } from 'react';
import { FiAward, FiExternalLink, FiDownload, FiImage } from 'react-icons/fi';
import { useScrollLock } from '@/hooks/useScrollLock';
import PDFPreview from '@/components/PDFPreview';
import ImageWithFallback from '@/components/ImageWithFallback';
import { type Certification } from '@/data/certificates';

interface CertificationModalProps {
  certification: Certification | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (cert: Certification) => Promise<void>;
  isLoading: boolean;
}

export default function CertificationModal({
  certification,
  isOpen,
  onClose,
  onDownload,
  isLoading
}: CertificationModalProps) {
  const [previewMode, setPreviewMode] = useState<'image' | 'pdf'>('image');
  
  useScrollLock(isOpen);

  if (!isOpen || !certification) return null;

  const getFallbackImage = (text: string) => {
    return `https://via.placeholder.com/800x500/0ea5e9/ffffff?text=${encodeURIComponent(text)}`;
  };

  const openPdfInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-40">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="fixed inset-0 overflow-y-auto z-50">
        <div className="min-h-screen flex items-center justify-center p-2 sm:p-3 md:p-4">
          <div className="relative w-full max-w-lg sm:max-w-2xl lg:max-w-4xl max-h-[90vh] sm:max-h-[95vh] bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex-shrink-0 bg-white dark:bg-slate-800 flex justify-between items-start sm:items-center p-3 sm:p-4 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-start gap-2 sm:gap-3 min-w-0">
                <div className="p-1.5 sm:p-2 bg-sky-100 dark:bg-sky-900/30 rounded-lg flex-shrink-0">
                  <FiAward className="text-sky-600 dark:text-sky-400 text-lg sm:text-xl" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-white truncate">
                    {certification.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 truncate">
                    {certification.subtitle} • {certification.year}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 ml-2">
                {/* Preview Mode Toggle */}
                <div className="flex bg-slate-100 dark:bg-slate-700 rounded-lg p-0.5 sm:p-1 mr-1">
                  <button
                    onClick={() => setPreviewMode('image')}
                    className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                      previewMode === 'image'
                        ? 'bg-white dark:bg-slate-600 shadow-sm text-sky-600 dark:text-sky-400'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => setPreviewMode('pdf')}
                    className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                      previewMode === 'pdf'
                        ? 'bg-white dark:bg-slate-600 shadow-sm text-sky-600 dark:text-sky-400'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    PDF
                  </button>
                </div>
                <button
                  onClick={onClose}
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 p-1.5 sm:p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  aria-label="Close preview"
                >
                  <span className="text-lg">✕</span>
                </button>
              </div>
            </div>
            
            {/* Preview Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-2 sm:p-3 md:p-4">
              {previewMode === 'image' ? (
                <div className="space-y-3 sm:space-y-4">
                  {/* Preview Image */}
                  <div className="relative w-full h-auto bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden min-h-[200px] sm:min-h-[300px]">
                    <ImageWithFallback
                      src={certification.previewUrl}
                      alt={`Preview ${certification.title}`}
                      width={800}
                      height={500}
                      className="w-full h-auto max-h-[50vh] object-contain"
                      fallbackSrc={getFallbackImage(certification.title)}
                    />
                  </div>
                  
                  {/* Description */}
                  <div className="bg-white dark:bg-slate-800 p-3 sm:p-4 rounded-lg">
                    <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">
                      {certification.description}
                    </p>
                  </div>
                </div>
              ) : (
                <PDFPreview url={certification.pdfUrl} />
              )}
            </div>
            
            {/* Footer with actions */}
            <div className="flex-shrink-0 bg-slate-100 dark:bg-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 border-t border-slate-200 dark:border-slate-700">
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
                {certification.tags.slice(0, 7).map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="items-center gap-1 px-2 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 rounded-md text-xs sm:text-sm font-medium whitespace-nowrap"
                  >
                    <span className="w-1.5 h-1.5 bg-sky-500 rounded-full flex-shrink-0"></span>
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Buttons */}
              <div className="flex flex-row gap-2 sm:gap-3 w-full sm:w-auto flex-shrink-0">
                <button
                  onClick={() => openPdfInNewTab(certification.pdfUrl)}
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-all duration-200 hover:shadow-lg text-sm sm:text-base whitespace-nowrap"
                >
                  <FiExternalLink className="text-sm sm:text-lg flex-shrink-0" />
                  <span>Open PDF</span>
                </button>
                <button
                  onClick={() => onDownload(certification)}
                  disabled={isLoading}
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-slate-700 text-white rounded-lg transition-all duration-200 hover:shadow-lg text-sm sm:text-base whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent flex-shrink-0"></div>
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <FiDownload className="text-sm sm:text-lg flex-shrink-0" />
                      <span>Download</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}