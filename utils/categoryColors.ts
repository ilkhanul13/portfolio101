
/**
 * Alternative function with more vibrant colors for special use cases
 */
export const getCategoryColor = (category?: string): string => {
  if (!category) {
    return 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
  }
  
  const normalizedCategory = category.toLowerCase().trim()
  
  switch(normalizedCategory) {
    case 'poster design':
      return 'bg-violet-500 dark:bg-violet-600 text-slate-100'
    
    case 'logo design':
      return 'bg-emerald-500 dark:bg-emerald-600 text-slate-100'
    
    case 't-shirt design':
      return 'bg-sky-500 dark:bg-sky-600 text-slate-100'
    
    case 'flyer design':
      return 'bg-amber-500 dark:bg-amber-600 text-slate-100'
    
    case 'branding':
      return 'bg-rose-500 dark:bg-rose-600 text-slate-100'
    
    case 'web design':
      return 'bg-indigo-500 dark:bg-indigo-600 text-slate-100'
    
    case 'ui/ux':
      return 'bg-cyan-500 dark:bg-cyan-600 text-slate-100'
    
    case 'illustration':
      return 'bg-fuchsia-500 dark:bg-fuchsia-600 text-slate-100'
    
    case 'social media':
      return 'bg-pink-500 dark:bg-pink-600 text-slate-100'
    
    case 'packaging':
      return 'bg-orange-500 dark:bg-orange-600 text-slate-100'
    
    default:
      return 'bg-slate-500 dark:bg-slate-600 text-slate-100'
  }
}