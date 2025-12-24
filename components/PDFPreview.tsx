// components/PDFPreview.tsx
'use client';

import { useState } from 'react';
import { FiFile, FiExternalLink } from 'react-icons/fi';

interface PDFPreviewProps {
  url: string;
}

export default function PDFPreview({ url }: PDFPreviewProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className="w-full h-full min-h-[300px] sm:min-h-[400px] flex flex-col">
      {isLoading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-4 border-sky-600 border-t-transparent"></div>
        </div>
      )}
      {error ? (
        <div className="flex-1 flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
          <FiFile className="text-4xl sm:text-5xl text-slate-400 mb-3 sm:mb-4" />
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-3 sm:mb-4 text-center">
            Failed to load PDF preview. Please try again or download the file.
          </p>
          <button
            onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
            className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors text-sm sm:text-base"
          >
            <FiExternalLink />
            View PDF in New Tab
          </button>
        </div>
      ) : (
        <iframe
          src={`${url}#view=FitH&toolbar=0&navpanes=0`}
          className={`w-full h-full min-h-[300px] sm:min-h-[400px] border-0 ${isLoading ? 'hidden' : 'block'}`}
          title="PDF Preview"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setError(true);
          }}
        />
      )}
    </div>
  );
}