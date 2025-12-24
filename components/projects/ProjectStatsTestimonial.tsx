// components/projects/ProjectStatsTestimonial.tsx - FIXED VERSION
'use client'

import { useState, useEffect } from 'react'
import { 
  FiStar, 
  FiMessageSquare, 
  FiSend, 
  FiCheckCircle, 
  FiClock, 
  FiUser, 
  FiBriefcase, 
  FiCloud,
  FiHardDrive,
  FiRefreshCw,
  FiAlertCircle
} from 'react-icons/fi'
import type { Project } from '@/data/projects'
import { supabase } from '@/lib/supabase'

interface ProjectStatsTestimonialProps {
  project: Project
}

interface TestimonialForm {
  name: string
  email: string
  role: string
  company: string
  rating: number
  message: string
}

interface Testimonial {
  id: number
  name: string
  role?: string
  company?: string
  rating: number
  message: string
  created_at: string
  project_id: string
  status?: string
}

export default function ProjectStatsTestimonial({ project }: ProjectStatsTestimonialProps) {
  // State untuk form
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<TestimonialForm>({
    name: '',
    email: '',
    role: '',
    company: '',
    rating: 5,
    message: ''
  })

  // State untuk testimonial
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loadingTestimonials, setLoadingTestimonials] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  
  // State untuk storage mode
  const [storageMode, setStorageMode] = useState<'supabase' | 'none'>('none')
  const [connectionChecked, setConnectionChecked] = useState(false)
  
  // State untuk statistik
  const [stats, setStats] = useState({
    total: 0,
    averageRating: 0
  })

  // ==================== FUNGSI CHECK CONNECTION ====================
  const checkSupabaseConnection = async (): Promise<boolean> => {
    try {
      // Cek apakah environment variables sudah di-set
      const hasConfig = process.env.NEXT_PUBLIC_SUPABASE_URL && 
                        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      
      if (!hasConfig) {
        console.log('⚠️ Supabase env vars not set')
        return false
      }
      
      // Test koneksi dengan query sederhana
      const { data, error } = await supabase
        .from('testimonials')
        .select('id', { count: 'exact', head: true })
        .limit(1)
      
      if (error) {
        console.error('❌ Supabase connection test error:', error)
        
        // Jika error karena table tidak ada, coba buat table
        if (error.code === '42P01' || error.message?.includes('does not exist')) {
          console.log('📋 Table not found, attempting to create...')
          return await createTestimonialsTable()
        }
        
        // Jika error karena RLS, masih consider connected
        if (error.code === '42501' || error.message?.includes('permission denied')) {
          console.log('⚠️ RLS error, but Supabase is connected')
          return true
        }
        
        return false
      }
      
      console.log('✅ Supabase connected successfully')
      return true
      
    } catch (error: any) {
      console.error('❌ Error checking Supabase connection:', error)
      return false
    }
  }

  // Fungsi untuk membuat table jika tidak ada
  const createTestimonialsTable = async (): Promise<boolean> => {
    try {
      console.log('🔄 Creating testimonials table...')
      
      // Kita tidak bisa create table dari client, jadi kita coba insert data dulu
      // Table akan otomatis dibuat saat pertama kali insert
      const { error } = await supabase
        .from('testimonials')
        .insert([{
          name: 'Test Connection',
          email: 'test@example.com',
          rating: 5,
          message: 'Test connection',
          project_id: 'test',
          project_title: 'Test Project',
          status: 'pending'
        }])
      
      if (error && error.code !== '42501') { // 42501 = RLS error, tapi table ada
        console.error('❌ Failed to create table:', error)
        return false
      }
      
      console.log('✅ Table created or already exists')
      return true
      
    } catch (error) {
      console.error('❌ Error creating table:', error)
      return false
    }
  }

  // ==================== INISIALISASI ====================
  useEffect(() => {
    const initialize = async () => {
      console.log('🚀 Initializing testimonial system...')
      
      // Cek koneksi Supabase
      const isSupabaseConnected = await checkSupabaseConnection()
      
      if (isSupabaseConnected) {
        console.log('✅ Using Supabase database')
        setStorageMode('supabase')
        await fetchTestimonialsFromSupabase()
      } else {
        console.log('⚠️ Supabase not connected')
        setStorageMode('none')
        setTestimonials([])
        setStats({ total: 0, averageRating: 0 })
      }
      
      setConnectionChecked(true)
      setLoadingTestimonials(false)
    }
    
    initialize()
  }, [project.id])

// ==================== FUNGSI LOAD DATA ====================
const fetchTestimonialsFromSupabase = async () => {
  try {
    console.log('fetching for project_id')
    console.log('Project ID:', project.id)
    console.log('Project ID as string:', project.id.toString())
    
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('project_id', project.id.toString())
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .limit(20)
    
    if (error) {
      console.error('❌ FETCH ERROR:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      })
      
      // Coba fetch tanpa filter dulu untuk debugging
      const { data: allData } = await supabase
        .from('testimonials')
        .select('*')
        .limit(10)
      
      console.log('📊 ALL TESTIMONIALS IN DB:', allData)
      
      throw error
    }
    
    console.log('✅ FETCH RESULT:', {
      count: data?.length || 0,
      data: data
    })
    
    if (data && data.length > 0) {
      setTestimonials(data)
      calculateStats(data)
    } else {
      console.log('⚠️ NO DATA FOUND for project_id:', project.id.toString())
      setTestimonials([])
      setStats({ total: 0, averageRating: 0 })
    }
    
  } catch (error: any) {
    console.error('❌ ERROR IN FETCH:', error)
    setError(`Failed to load testimonials: ${error.message}`)
    setTestimonials([])
    setStats({ total: 0, averageRating: 0 })
  }
}

  // ==================== FUNGSI HELPER ====================
  const calculateStats = (data: Testimonial[]) => {
    if (data.length === 0) {
      setStats({ total: 0, averageRating: 0 })
      return
    }
    
    const total = data.length
    const totalRating = data.reduce((sum, t) => sum + t.rating, 0)
    const averageRating = totalRating / total
    
    setStats({
      total,
      averageRating: parseFloat(averageRating.toFixed(1))
    })
  }

  const refreshData = async () => {
    setLoadingTestimonials(true)
    setError(null)
    
    if (storageMode === 'supabase') {
      await fetchTestimonialsFromSupabase()
    }
    
    setLoadingTestimonials(false)
  }

  // ==================== FUNGSI FORM ====================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (formError) setFormError(null)
  }

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      rating
    }))
    if (formError) setFormError(null)
  }

  const validateForm = (): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []
    
    if (!formData.name.trim()) errors.push('Name is required')
    if (!formData.email.trim()) errors.push('Email is required')
    if (!formData.message.trim()) errors.push('Testimonial message is required')
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push('Please enter a valid email address')
    }
    
    if (formData.message.trim().length < 10) {
      errors.push('Message must be at least 10 characters')
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    
    const validation = validateForm()
    if (!validation.isValid) {
      setFormError(validation.errors.join('. '))
      return
    }
    
    setIsSubmitting(true)

    try {
      console.log('📤 Submitting testimonial to Supabase...')
      
      // Insert ke Supabase
      const { data, error } = await supabase
        .from('testimonials')
        .insert([{
          name: formData.name.trim(),
          email: formData.email.trim(),
          role: formData.role.trim() || null,
          company: formData.company.trim() || null,
          rating: formData.rating,
          message: formData.message.trim(),
          project_id: project.id.toString(),
          project_title: project.title,
          status: 'pending'
        }])
        .select()
      
      if (error) {
        console.error('❌ Supabase insert error details:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        })
        
        // User-friendly error messages
        if (error.code === '42501') {
          throw new Error('Database permission denied. Please check RLS policies.')
        } else if (error.code === '23505') {
          throw new Error('Duplicate submission detected.')
        } else if (error.code === '23514') {
          throw new Error('Invalid data format. Please check your input.')
        } else {
          throw new Error(`Database error: ${error.message}`)
        }
      }
      
      console.log('✅ Testimonial saved to Supabase:', data?.[0]?.id)
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        role: '',
        company: '',
        rating: 5,
        message: ''
      })

      // Show success message
      setIsSubmitted(true)
      
      // Refresh data setelah beberapa detik
      setTimeout(() => {
        setIsSubmitted(false)
        if (storageMode === 'supabase') {
          fetchTestimonialsFromSupabase()
        }
      }, 3000)

    } catch (error: any) {
      console.error('❌ Error submitting testimonial:', error)
      setFormError(error.message || 'Failed to submit testimonial. Please try again.')
      
      // Tampilkan instruksi RLS jika error permission
      if (error.message.includes('RLS') || error.message.includes('permission')) {
        setFormError(prev => prev + ' See console for RLS setup instructions.')
        console.log(`
        `)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // ==================== RENDER FUNCTIONS ====================
  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-6 h-6'
    }
    
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <FiStar 
            key={i} 
            className={`${sizeClasses[size]} ${
              i < rating 
                ? 'text-amber-500 fill-amber-500' 
                : 'text-slate-300 dark:text-slate-600'
            }`}
          />
        ))}
      </div>
    )
  }

  const renderTestimonialItem = (testimonial: Testimonial) => (
    <div 
      key={testimonial.id}
      className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-slate-500 rounded-lg flex items-center justify-center text-white font-semibold text-lg shadow-md">
            {testimonial.name.charAt(0).toUpperCase()}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <div>
              <p className="font-semibold text-slate-800 dark:text-white">
                {testimonial.name}
              </p>
              {(testimonial.role || testimonial.company) && (
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  {testimonial.role && (
                    <span className="inline-flex items-center gap-1">
                      <FiUser className="w-3 h-3" />
                      {testimonial.role}
                    </span>
                  )}
                  {testimonial.role && testimonial.company && ' • '}
                  {testimonial.company && (
                    <span className="inline-flex items-center gap-1">
                      <FiBriefcase className="w-3 h-3" />
                      {testimonial.company}
                    </span>
                  )}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {renderStars(testimonial.rating, 'sm')}
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {testimonial.rating}.0
              </span>
            </div>
          </div>
          
          <div className="relative">
            <div className="text-2xl text-sky-200 dark:text-sky-900/50 absolute -top-2 -left-1">"</div>
            <p className="text-slate-700 dark:text-slate-300 pl-3 italic">
              {testimonial.message}
            </p>
            <div className="text-2xl text-sky-200 dark:text-sky-900/50 absolute -bottom-2 -right-1">"</div>
          </div>
          
          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-3 pt-2 border-t border-slate-100 dark:border-slate-700">
            <FiClock className="w-3 h-3" />
            {new Date(testimonial.created_at).toLocaleDateString('id-ID', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
            
            {testimonial.status === 'pending' && (
              <span className="ml-2 px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded text-xs">
                Pending Approval
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Testimonials Statistics - Hanya tampil jika ada testimonial */}
      {testimonials.length > 0 && (
        <div className="bg-gradient-to-r from-sky-50 to-slate-50 dark:from-sky-900/20 dark:to-slate-900/20 rounded-xl p-6 border border-sky-100 dark:border-sky-800/30">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                Client Feedback
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                What clients say about this project
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-sky-600 dark:text-sky-400">
                  {stats.total}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Reviews
                </div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <span className="text-2xl font-bold text-slate-800 dark:text-white">
                    {stats.averageRating.toFixed(1)}
                  </span>
                  {renderStars(Math.round(stats.averageRating), 'sm')}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Average Rating
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submit Testimonial Form - Hanya tampil jika Supabase connected */}
      {storageMode === 'supabase' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-slate-900/50 overflow-hidden">
          <div className="bg-gradient-to-r from-sky-600 to-slate-600 dark:from-sky-700 dark:to-slate-700 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <FiMessageSquare className="text-white text-lg" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Share Your Experience
                </h3>
                <p className="text-sm text-sky-100">
                  Your feedback helps improve our work
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiCheckCircle className="text-emerald-600 dark:text-emerald-400 text-2xl" />
                </div>
                <h4 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                  Thank You!
                </h4>
                <p className="text-slate-600 dark:text-slate-300 mb-1">
                  Your testimonial has been submitted successfully.
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  It will appear here after admin approval.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {formError && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
                    <div className="flex items-start gap-2">
                      <FiAlertCircle className="text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-red-600 dark:text-red-400 text-sm font-medium mb-1">
                          Submission Error
                        </p>
                        <p className="text-red-600 dark:text-red-400 text-sm">{formError}</p>
                        {formError.includes('RLS') && (
                          <a className="text-xs text-red-500 hover:underline mt-1 inline-block">
                            Please! Try again later
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Rating Section */}
                <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 text-center">
                    Rate Me!
                  </label>
                  <div className="flex justify-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingChange(star)}
                        className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                      >
                        <FiStar 
                          className={`w-8 h-8 ${
                            star <= formData.rating 
                              ? 'text-amber-500 fill-amber-500' 
                              : 'text-slate-300 dark:text-slate-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <div className="text-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {formData.rating === 5 ? 'Excellent!' : 
                       formData.rating === 4 ? 'Good' : 
                       formData.rating === 3 ? 'Average' : 
                       formData.rating === 2 ? 'Fair' : 'Poor'}
                    </span>
                  </div>
                </div>

                {/* Personal Info Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Your Role (Optional)
                    </label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors"
                      placeholder="Marketing Director"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Company (Optional)
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                {/* Message Section */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Your Testimonial *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Share your experience working on this project. What did you like? What could be improved?"
                  />
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                    Your testimonial will be visible after admin approval.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-slate-600 to-sky-600 hover:from-sky-700 hover:to-slate-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FiSend />
                      Submit Testimonial
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Testimonials List */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-slate-900/50 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">
              Client Testimonials
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              {storageMode === 'supabase' 
                ? 'Real feedback from clients' 
                : 'Connect database to view testimonials'}
            </p>
          </div>
          
          {storageMode === 'supabase' && (
            <div className="flex items-center gap-3">
              <button
                onClick={refreshData}
                disabled={loadingTestimonials}
                className="px-4 py-2 bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-lg hover:bg-sky-100 dark:hover:bg-sky-900/50 transition-colors text-sm font-medium disabled:opacity-50 flex items-center gap-2"
              >
                {loadingTestimonials ? (
                  <>
                    <div className="w-3 h-3 border border-sky-600 border-t-transparent rounded-full animate-spin"></div>
                    Loading...
                  </>
                ) : (
                  <>
                    <FiRefreshCw className="w-3 h-3" />
                    Refresh
                  </>
                )}
              </button>
              <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {testimonials.length} {testimonials.length === 1 ? 'review' : 'reviews'}
                </span>
              </div>
            </div>
          )}
        </div>

        {loadingTestimonials ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 dark:border-sky-500"></div>
            <p className="mt-4 text-slate-500 dark:text-slate-400">
              Loading testimonials...
            </p>
          </div>
        ) : testimonials.length > 0 ? (
          <div className="space-y-6">
            {testimonials.map(renderTestimonialItem)}
          </div>
        ) : storageMode === 'supabase' ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 text-slate-300 dark:text-slate-600">
              <FiMessageSquare className="w-full h-full" />
            </div>
            <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
              No testimonials yet
            </h4>
            <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
              Be the first to share your experience with this project.
            </p>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 text-slate-300 dark:text-slate-600">
              <FiCloud className="w-full h-full" />
            </div>
            <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Database Connection Required
            </h4>
            <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
              Setup Supabase to enable testimonial features.
            </p>
            <a
              href="https://supabase.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors"
            >
              <FiCloud />
              Setup Supabase Database
            </a>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-start gap-2">
              <FiAlertCircle className="text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-red-600 dark:text-red-400 font-medium mb-1">
                  Database Error
                </p>
                <p className="text-red-600 dark:text-red-400 text-sm mb-2">
                  {error}
                </p>
                <button
                  onClick={refreshData}
                  className="text-sm text-red-600 dark:text-red-400 hover:underline font-medium"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}