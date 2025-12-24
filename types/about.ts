// types/about.ts
import { ReactNode } from 'react'

export interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
}

export interface Certification {
  id: number;
  title: string;
  subtitle: string;
  year: string;
  description: string;
  tags: string[]; // Pastikan ada properti tags
  previewUrl: string;
  pdfUrl: string;
}

export interface Certification {
  id: number;
  title: string;
  subtitle: string;
  year: string;
  description: string;
  tags: string[];
  previewUrl: string;
  pdfUrl: string;
}

export interface ProjectStats {
  completedProjects: number;
  totalClients: number;
  yearsOfExperience: string;
  lastUpdated?: string;
  error?: string;
}

// Untuk API response
export interface ApiStatsResponse {
  completedProjects: number;
  totalClients: number;
  yearsOfExperience: string;
  lastUpdated?: string;
  error?: string;
}

export interface Experience {
  id: string;
  year: string;
  company: string;
  companyUrl?: string;
  role: string;
  employmentType: string;
  period: string;
  description: string[];
  skills: string[];
}

export interface Education {
  id: string;
  period: string;
  degree: string;
  institution: string;
  institutionUrl?: string;
  description: string;
  skills: string[];
}