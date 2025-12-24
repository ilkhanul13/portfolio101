// app/data/certificate.ts
import { Certification } from '@/types/about';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hzxtupwhhwuwzyfdkfyp.supabase.co';

// URL Supabase untuk file
export const getSupabaseFileUrl = (bucket: string, fileName: string): string => {
    return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${fileName}`;
};

// URL CV dari Supabase bucket "cv" - DUA VERSI
export const CV_URLS = {
    indonesia: getSupabaseFileUrl('cv', 'hanul-cv-id.pdf'),
    english: getSupabaseFileUrl('cv', 'hanul-cv-en.pdf')
};

// Interface untuk CV
export interface CVOption {
    id: string;
    language: 'indonesia' | 'english';
    label: string;
    description: string;
    url: string;
    filename: string;
}


// Data CV options
export const cvOptions: CVOption[] = [
    {
        id: 'cv-id',
        language: 'indonesia',
        label: 'CV Bahasa Indonesia',
        description: 'Versi lengkap dalam bahasa Indonesia',
        url: CV_URLS.indonesia,
        filename: 'hanul-cv-id.pdf'
    },
    {
        id: 'cv-en',
        language: 'english',
        label: 'CV English Version',
        description: 'Complete version in English',
        url: CV_URLS.english,
        filename: 'hanul-cv-en.pdf'
    }
];

// Data sertifikasi dengan URL Supabase
export const certifications: Certification[] = [
    {
        id: 1,
        title: 'Microsoft Office Specialist',
        subtitle: 'Office Excel 2016',
        year: '2022',
        description: '',
        tags: ['Data Processing', 'Administration', 'Microsoft Office', 'Office Specialist', 'Excel2016'],
        previewUrl: 'https://res.cloudinary.com/dfovmrebt/image/upload/v1765814452/microsoft-excel2016_gg0yes.jpg',
        pdfUrl: getSupabaseFileUrl('sertif', 'microsoft-excel2016.pdf')
    },
    {
        id: 2,
        title: 'TOEFL',
        subtitle: 'Test of English as a Foreign Language',
        year: '2024',
        description: '',
        tags: ['TOEFL', 'Language', 'English', 'Reading', 'Listening', 'Speaking', 'Writing'],
        previewUrl: 'https://res.cloudinary.com/dfovmrebt/image/upload/v1765970888/toefl_b8ertk.jpg',
        pdfUrl: getSupabaseFileUrl('sertif', 'toefl.pdf')
    },
    {
        id: 3,
        title: 'Intro to Data Analytics',
        subtitle: 'Data Analytics',
        year: '2025',
        description: '',
        tags: ['Data', 'Data Analytics', 'Data Analyst', 'Data Management', 'RevoU', 'DAMC'],
        previewUrl: 'https://res.cloudinary.com/dfovmrebt/image/upload/v1766512705/RevoU-Intro_to_DA_sadnaq.jpg',
        pdfUrl: getSupabaseFileUrl('sertif', 'RevoU-Intro to DA.pdf')
    },
];

// Fungsi untuk mendapatkan semua sertifikat
export const getAllCertifications = (): Certification[] => {
    return certifications;
};

// Fungsi untuk mendapatkan sertifikat berdasarkan ID
export const getCertificationById = (id: number): Certification | undefined => {
    return certifications.find(cert => cert.id === id);
};

// Fungsi untuk mendapatkan sertifikat berdasarkan tahun
export const getCertificationsByYear = (year: string): Certification[] => {
    return certifications.filter(cert => cert.year === year);
};

// Export types
export type { Certification };