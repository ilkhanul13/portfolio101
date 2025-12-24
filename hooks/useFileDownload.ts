// hooks/useFileDownload.ts
import { useState } from 'react';

type FileType = 'cv' | 'cert';

interface DownloadResult {
  success: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}

export function useFileDownload() {
  const [isLoading, setIsLoading] = useState(false);

  const downloadFile = async (
    url: string, 
    filename: string, 
    fileType: FileType
  ): Promise<DownloadResult> => {
    try {
      setIsLoading(true);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => {
        window.URL.revokeObjectURL(blobUrl);
      }, 1000);
      
      setIsLoading(false);
      
      return {
        success: true,
        message: fileType === 'cv' 
          ? 'Download complete: CV' 
          : 'Download complete: Certificate',
        type: 'success'
      };
      
    } catch (error) {
      console.error(`Error downloading ${fileType}:`, error);
      setIsLoading(false);
      
      window.open(url, '_blank', 'noopener,noreferrer');
      
      return {
        success: false,
        message: fileType === 'cv' 
          ? 'CV opened in new tab' 
          : 'Certificate opened in new tab',
        type: 'info'
      };
    }
  };

  return { downloadFile, isLoading };
}