// app/admin/testimonials/page.tsx - Supabase Admin Panel
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { FiCheck, FiX, FiRefreshCw, FiUser, FiStar, FiMail } from 'react-icons/fi'

export default function TestimonialAdmin() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const loadPendingTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setTestimonials(data || [])
    } catch (error) {
      console.error('Error loading testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: number, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ status })
        .eq('id', id)
      
      if (error) throw error
      
      // Refresh list
      loadPendingTestimonials()
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  useEffect(() => {
    loadPendingTestimonials()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Testimonial Admin</h1>
      
      <div className="mb-6">
        <button
          onClick={loadPendingTestimonials}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <FiRefreshCw />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4">Loading testimonials...</p>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <p className="text-gray-500">No pending testimonials</p>
        </div>
      ) : (
        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{testimonial.name}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <FiMail />
                      {testimonial.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiUser />
                      {testimonial.role || 'Not specified'}
                    </span>
                    <span>Project: {testimonial.project_title}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateStatus(testimonial.id, 'approved')}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"
                  >
                    <FiCheck />
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(testimonial.id, 'rejected')}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2"
                  >
                    <FiX />
                    Reject
                  </button>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FiStar 
                        key={i}
                        className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{testimonial.rating}/5</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.message}"</p>
              </div>
              
              <div className="text-sm text-gray-500">
                Submitted: {new Date(testimonial.created_at).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}