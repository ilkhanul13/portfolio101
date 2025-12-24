// components/ToastNotification.tsx
'use client';

interface ToastNotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

export default function ToastNotification({ message, type, onClose }: ToastNotificationProps) {
  const bgColor = type === 'success' 
    ? 'bg-green-100 dark:bg-green-900/50 border-green-200 dark:border-green-800' 
    : type === 'error'
    ? 'bg-red-100 dark:bg-red-900/50 border-red-200 dark:border-red-800'
    : 'bg-blue-100 dark:bg-blue-900/50 border-blue-200 dark:border-blue-800';

  const textColor = type === 'success' 
    ? 'text-green-800 dark:text-green-300' 
    : type === 'error'
    ? 'text-red-800 dark:text-red-300'
    : 'text-blue-800 dark:text-blue-300';

  const iconBgColor = type === 'success' 
    ? 'bg-green-500' 
    : type === 'error'
    ? 'bg-red-500'
    : 'bg-blue-500';

  const iconText = type === 'success' ? '✓' : type === 'error' ? '!' : 'i';

  return (
    <div className={`fixed top-3 sm:top-4 right-3 sm:right-4 z-50 px-3 py-2 sm:px-4 sm:py-3 rounded-lg shadow-lg transition-all duration-300 max-w-xs sm:max-w-sm border ${bgColor}`}>
      <div className="flex items-center gap-2 sm:gap-3">
        <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 ${iconBgColor} text-white`}>
          {iconText}
        </div>
        <span className={`font-medium text-sm sm:text-base break-words ${textColor}`}>{message}</span>
        <button onClick={onClose} className="ml-2 text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>
    </div>
  );
}