// /data/skills.ts
import { ReactElement } from 'react'

export interface Skill {
  name: string;
  category: string;
  icon: string;
  rating: number; // 1-3: beginner, 4-7: intermediate, 8-10: expert
  years: number;
}

export const skills: Skill[] = [
  { 
    name: 'Adobe Illustrator', 
    category: 'Vector Design', 
    icon: 'AI',
    rating: 3,
    years: 2
  },
  { 
    name: 'Adobe Photoshop', 
    category: 'Image Editing', 
    icon: 'PS',
    rating: 2,
    years: 1
  },
  { 
    name: 'Figma', 
    category: 'UI/UX Design', 
    icon: 'F',
    rating: 2,
    years: 1
  },
  { 
    name: 'Affinity', 
    category: 'Quick Design', 
    icon: 'C',
    rating: 3,
    years: 1
  },
  { 
    name: 'Canva', 
    category: 'Quick Design', 
    icon: 'C',
    rating: 3,
    years: 1
  },
  { 
    name: 'Computer Maintanance', 
    category: 'IT Support', 
    icon: 'CS',
    rating: 2,
    years: 1
  },
  { 
    name: 'MS Word', 
    category: 'Document', 
    icon: 'W',
    rating: 4,
    years: 1
  },
  { 
    name: 'MS Excel', 
    category: 'Spreadsheets', 
    icon: 'E',
    rating: 2,
    years: 1
  },
  { 
    name: 'MS Power Point', 
    category: 'Presentations', 
    icon: 'P',
    rating: 3,
    years: 1
  },
]

// Fungsi untuk mendapatkan level berdasarkan rating
export const getLevelFromRating = (rating: number): string => {
  if (rating <= 3) return 'Beginner';
  if (rating <= 7) return 'Intermediate';
  return 'Expert';
}

// Fungsi untuk mendapatkan semua skill categories unik
export const getAllSkillCategories = (): string[] => {
  const categories = skills.map(skill => skill.category);
  return Array.from(new Set(categories));
}

// Export default untuk compatibility
export default skills;