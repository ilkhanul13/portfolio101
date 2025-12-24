// app/about/page.tsx (diperbarui)
'use client';

import { FiAward, FiBriefcase, FiUsers, FiDownload, FiExternalLink, FiFile, FiImage, FiGlobe, FiCheck } from 'react-icons/fi';
import Link from 'next/link';
import CloudinaryImage from '@/components/cloudinaryImage';
import { useState, useEffect } from 'react';
import { Stat } from '@/types/about';

// Import data
import { getProjectStats } from '@/data/projects';
import { getAllCertifications, type Certification } from '@/data/certificates';

// Import komponen yang sudah dipisah
import { useFileDownload } from '@/hooks/useFileDownload';
import CVLanguageModal from '@/components/CVLanguageModal';
import CertificationModal from '@/components/CertificationModal';
import ImageWithFallback from '@/components/ImageWithFallback';

// Import toast notification
import ToastNotification from '@/components/ToastNotification';
import { skills } from '@/data/skills'
import SkillsSection from '@/components/home/SkillsSection'

// Import komponen section terpisah
import ExperienceSection from '@/components/about/ExperienceSection';
import EducationSection from '@/components/about/EducationSection';

// Hook untuk toast
function useToast() {
  const [toast, setToast] = useState<{message: string; type: 'success' | 'error' | 'info'} | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return { toast, showToast };
}

export default function AboutPage() {
  // Tahun pengalaman manual
  const MANUAL_YEARS_EXPERIENCE = "3+";

  // State
  const [stats, setStats] = useState<Stat[]>([
    { icon: <FiBriefcase />, value: '0', label: 'Total Projects' },
    { icon: <FiUsers />, value: '0', label: 'Clients' },
    { icon: <FiAward />, value: MANUAL_YEARS_EXPERIENCE, label: 'Years Experience' },
  ]);

  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showCVLanguageModal, setShowCVLanguageModal] = useState(false);
  
  // Hooks
  const { toast, showToast } = useToast();
  const { downloadFile, isLoading: isDownloading } = useFileDownload();

  // Data
  const certifications = getAllCertifications();

  // Fungsi untuk mengambil data statistik
  const loadProjectStats = () => {
    try {
      const projectStats = getProjectStats({
        manualYearsOfExperience: MANUAL_YEARS_EXPERIENCE
      });
      
      setStats([
        { 
          icon: <FiBriefcase />, 
          value: `${projectStats.totalProjects}`, 
          label: 'Total Projects' 
        },
        { 
          icon: <FiUsers />, 
          value: `${projectStats.totalClients}`, 
          label: 'Clients' 
        },
        { 
          icon: <FiAward />, 
          value: projectStats.yearsOfExperience,
          label: 'Years Experience' 
        },
      ]);
      
    } catch (error) {
      console.error('Error loading project stats:', error);
      setStats([
        { icon: <FiBriefcase />, value: '8', label: 'Total Projects' },
        { icon: <FiUsers />, value: '6', label: 'Clients' },
        { icon: <FiAward />, value: MANUAL_YEARS_EXPERIENCE, label: 'Years Experience' },
      ]);
    }
  };

  // Fungsi untuk preview sertifikasi
  const openCertPreview = (cert: Certification) => {
    setSelectedCert(cert);
    setShowPreview(true);
  };

  // Fungsi untuk close modal sertifikasi
  const closeCertPreview = () => {
    setShowPreview(false);
  };

  // Fungsi untuk download CV
  const handleCVLanguageSelect = async (cvOption: any) => {
    const result = await downloadFile(cvOption.url, cvOption.filename, 'cv');
    showToast(result.message, result.type);
    setShowCVLanguageModal(false);
  };

  // Fungsi untuk download sertifikat
  const handleCertDownload = async (cert: Certification) => {
    const filename = `${cert.title.replace(/\s+/g, '_')}_${cert.year}.pdf`;
    const result = await downloadFile(cert.pdfUrl, filename, 'cert');
    showToast(result.message, result.type);
  };

  // Fungsi untuk membuka CV modal
  const handleDownloadCV = () => {
    setShowCVLanguageModal(true);
  };

  // Fungsi untuk menutup modal CV
  const handleCloseCVModal = () => {
    if (!isDownloading) {
      setShowCVLanguageModal(false);
    }
  };

  // Close modal dengan ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showPreview) {
          closeCertPreview();
        }
        if (showCVLanguageModal && !isDownloading) {
          handleCloseCVModal();
        }
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showPreview, showCVLanguageModal, isDownloading]);

  // Fetch data saat komponen dimount
  useEffect(() => {
    loadProjectStats();
  }, []);

  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Toast Notification */}
      {toast && (
        <ToastNotification
          message={toast.message}
          type={toast.type}
          onClose={() => showToast('', 'info')}
        />
      )}

      {/* Modal Pilihan Bahasa CV */}
      <CVLanguageModal
        isOpen={showCVLanguageModal}
        onClose={handleCloseCVModal}
        onSelect={handleCVLanguageSelect}
        isLoading={isDownloading}
      />

      {/* Preview Modal Sertifikasi */}
      <CertificationModal
        certification={selectedCert}
        isOpen={showPreview}
        onClose={closeCertPreview}
        onDownload={handleCertDownload}
        isLoading={isDownloading}
      />

      {/* Main Content */}
      <div className="main-h-screen section-container py-6 md:py-8 lg:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with Download CV Button */}
          <div className="text-center mb-8 md:mb-12 lg:mb-16 relative">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-slate-900 dark:text-white">
              About Me
            </h1>
          </div>
          
          {/* Profile Section */}
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-top mb-12 md:mb-16 lg:mb-20">
            <div className="order-2 lg:order-1">
              <div className="relative w-full">
                {/* Container dengan rasio 4:5 untuk gambar */}
                <div className="relative aspect-[1/1] overflow-hidden rounded-xl sm:rounded-2xl shadow-lg dark:shadow-slate-900/50 group">
                  <CloudinaryImage
                    src="https://res.cloudinary.com/dfovmrebt/image/upload/v1765630853/saya_iacikb.png"
                    alt="Ilkhanul Khalik - About Me"
                    width={600}
                    height={600}
                    className="object-cover w-full h-750 group-hover:scale-105 transition-transform duration-700 ease-out"
                    eager={true}
                  />
                  
                  {/* Badge dengan efek slide dari kiri */}
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                    <div className="relative overflow-hidden rounded-lg">
                      <div className="absolute left-0 top-0 w-full h-full bg-slate-800 transition-all duration-500 ease-in-out -translate-x-full group-hover:translate-x-0 rounded-lg"></div>
                      <span className="relative inline-block px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-sm bg-white/10 dark:bg-slate-900/10 text-white text-xs sm:text-sm font-bold rounded-lg border border-white/20 dark:border-slate-600/30 z-10">
                        ILKHANUL KHALIK
                      </span>
                    </div>
                  </div>
                  
                  {/* Subtle vignette effect */}
                  <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_60px_rgba(0,0,0,0.3)] group-hover:shadow-[inset_0_0_80px_rgba(0,0,0,0.2)] dark:group-hover:shadow-[inset_0_0_80px_rgba(0,0,0,0.4)] transition-shadow duration-300"></div>
                </div>
                
                {/* Container untuk tombol dan info CV */}
                <div className="mt-6 sm:mt-8">
                  {/* Tombol Download CV */}
                  <button
                    onClick={handleDownloadCV}
                    disabled={isDownloading}
                    className="w-full flex items-center justify-center gap-2 sm:gap-3 px-5 py-3 sm:px-6 sm:py-3.5 
                    bg-gradient-to-r from-slate-400 to-slate-500 hover:from-slate-500 hover:to-slate-600
                    dark:from-slate-800 dark:to-slate-900 dark:hover:from-slate-700 dark:hover:to-slate-800
                    text-slate-100 hover:text-white dark:text-white dark:hover:text-slate-50
                    rounded-lg sm:rounded-xl transition-all duration-300 mx-auto group disabled:opacity-50 
                    disabled:cursor-not-allowed border border-slate-200 dark:border-slate-700">
                    {isDownloading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent"></div>
                        <span className="font-semibold text-sm sm:text-base">Loading...</span>
                      </>
                    ) : (
                      <>
                        <div className="relative">
                          <FiDownload className="text-lg sm:text-xl group-hover:animate-bounce" />
                          <div className="absolute -top-1 -right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-ping"></div>
                        </div>
                        <span className="font-semibold text-sm sm:text-base">Download My CV</span>
                      </>
                    )}
                  </button>
                  
                  {/* Info CV */}
                  <div className="flex flex-wrap items-center justify-center gap-x-1.5 sm:gap-x-2 gap-y-1 mt-3 sm:mt-4">
                    <div className="flex items-center gap-1">
                      <FiFile className="text-slate-400 text-xs sm:text-sm" />
                      <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">PDF</span>
                    </div>
                    <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">•</span>
                    <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Updated December 2025</span>
                    <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">•</span>
                    <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      Available in English & Indonesian
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight text-slate-800 dark:text-white">
                Where Design Meets <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-slate-600 dark:from-sky-500 dark:to-slate-400">
                  Technology
                </span>
              </h2>
              <div className="space-y-3 sm:space-y-4 md:space-y-5 text-slate-600 dark:text-slate-300 max-w-3xl">
                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                  I am a graphic designer focused on creating functional and communicative visual designs, with the goal of delivering messages effectively through graphic design. 
                  In addition, I have expertise in computer system maintenance and troubleshooting to ensure optimal performance of devices and systems.
                </p>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                  With more than three years of experience in the creative and technology fields, I have been involved in various projects ranging from visual identity development to IT technical support. 
                  My approach emphasizes precise solutions, efficient processes, and results that align with client needs.
                </p>
              </div>
              
              {/* Stats for mobile */}
              <div className="mt-6 sm:mt-8 md:mt-10 grid grid-cols-3 gap-3 lg:hidden">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md sm:shadow-lg">
                    <div className="text-lg sm:text-xl text-sky-600 dark:text-sky-400 mb-2 sm:mb-3 flex justify-center">
                      {stat.icon}
                    </div>
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-0.5 sm:mb-1">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-tight">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Section for desktop */}
          <div className="hidden lg:grid grid-cols-3 gap-4 xl:gap-5 mb-8 lg:mb-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center bg-white dark:bg-slate-800
                          rounded-xl p-5 xl:p-6 shadow-lg dark:shadow-slate-900/40
                          transition-all duration-300 group hover:-translate-y-0.5">
                <div className="inline-flex items-center justify-center
                                w-10 h-10 xl:w-12 xl:h-12 rounded-xl
                                bg-gradient-to-br from-sky-100 to-slate-100
                                dark:from-sky-900/20 dark:to-slate-900/20
                                mb-3 xl:mb-4 group-hover:scale-105 transition-transform">
                  <div className="text-xl xl:text-2xl text-sky-600 dark:text-sky-400">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl xl:text-3xl font-bold mb-1 text-slate-800 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Experience Section */}
          <ExperienceSection />
          
          {/* Education Section */}
          <EducationSection />

          {/* Certifications Section */}
          <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24">
            <div className="flex justify-center items-center mb-4 sm:mb-5 md:mb-6">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-slate-800 dar:text-slate-100">
                Certification
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {certifications.map((cert) => (
                <div 
                  key={cert.id} 
                  className="bg-white dark:bg-slate-800/50 rounded-xl sm:rounded-2xl shadow-lg dark:shadow-slate-900/30 p-4 sm:p-5 md:p-6 border border-slate-100 dark:border-slate-700 hover:shadow-xl dark:hover:shadow-slate-900/50 transition-all duration-300 group cursor-pointer"
                  onClick={() => openCertPreview(cert)}
                >
                  {/* Preview Image */}
                  <div className="relative h-40 sm:h-44 md:h-48 mb-3 sm:mb-4 rounded-lg sm:rounded-xl overflow-hidden">
                    <ImageWithFallback
                      src={cert.previewUrl}
                      alt={`Preview ${cert.title}`}
                      width={400}
                      height={200}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      fallbackSrc={`https://via.placeholder.com/800x500/0ea5e9/ffffff?text=${encodeURIComponent(cert.title)}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-3">
                      <span className="text-white text-xs sm:text-sm font-medium flex items-center gap-1.5">
                        <FiImage className="text-xs sm:text-sm" />
                        Klik untuk preview
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="mb-2 sm:mb-3">
                    <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
                      <div className="inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-2 sm:py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 rounded text-xs font-semibold">
                        <FiAward className="text-xs" />
                        {cert.year}
                      </div>
                    </div>
                    <h4 className="font-bold text-base sm:text-lg mb-0.5 sm:mb-1 text-slate-800 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-1">
                      {cert.title}
                    </h4>
                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-2 sm:mb-3 line-clamp-1">{cert.subtitle}</div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                      {cert.description}
                    </p>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {cert.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="px-1.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs truncate max-w-[100px]">
                        {tag}
                      </span>
                    ))}
                    {cert.tags.length > 2 && (
                      <span className="px-1.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs">
                        +{cert.tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 sm:mt-16 md:mt-12 lg:mt-24">
            {/* Skills Section */}
            <SkillsSection skills={skills} />
          </div>
        </div>
      </div>
    </div>
  );
}