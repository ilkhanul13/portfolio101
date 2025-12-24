'use client'

import { useState } from 'react'
import { FiSend, FiUser, FiMail, FiMessageSquare, FiMapPin, FiCheck, FiAlertCircle } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subject: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)
  const [submitMessage, setSubmitMessage] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    
    try {
      // Kirim data ke API route kita
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setSubmitMessage(result.message || 'Message sent successfully!')
        
        // Reset form setelah berhasil
        setFormData({ 
          name: '', 
          email: '', 
          message: '', 
          subject: '' 
        })
        
        // Auto-hide success message setelah 5 detik
        setTimeout(() => {
          setSubmitStatus(null)
          setSubmitMessage('')
        }, 5000)
      } else {
        setSubmitStatus('error')
        setSubmitMessage(result.error || 'Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error('Submit error:', error)
      setSubmitStatus('error')
      setSubmitMessage('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="main-h-screen section-container py-6 md:py-8 lg:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16 relative">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-slate-900 dark:text-slate-50">
            Contact Me
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-100">
              Contact Information
            </h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4 p-4 bg-white dark:bg-slate-800/50 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-300 border border-slate-200 dark:border-slate-800">
                <div className="w-12 h-12 bg-sky-100 dark:bg-sky-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiMail className="text-sky-600 dark:text-sky-400 text-xl" />
                </div>
                <div>
                  <div className="font-medium text-slate-800 dark:text-slate-100 mb-1">Email</div>
                  <div className="text-slate-700 dark:text-slate-300">ilkhanull@gmail.com</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Response within 24 hours</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-white dark:bg-slate-800/50 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-300 border border-slate-200 dark:border-slate-800">
                <div className="w-12 h-12 bg-sky-100 dark:bg-sky-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiMapPin className="text-sky-600 dark:text-sky-400 text-xl" />
                </div>
                <div>
                  <div className="font-medium text-slate-800 dark:text-slate-100 mb-1">Location</div>
                  <div className="text-slate-700 dark:text-slate-300">Jakarta, Indonesia</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Available for remote work</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-white dark:bg-slate-800/50 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-300 border border-slate-200 dark:border-slate-800">
                <div className="w-12 h-12 bg-sky-100 dark:bg-sky-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiMessageSquare className="text-sky-600 dark:text-sky-400 text-xl" />
                </div>
                <div>
                  <div className="font-medium text-slate-800 dark:text-slate-100 mb-1">Response Time</div>
                  <div className="text-slate-700 dark:text-slate-300">1–2 Business Days</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Monday - Friday, 9AM - 8PM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg dark:shadow-slate-950/50 p-6 md:p-8 border border-slate-200 dark:border-slate-800">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-100">Send Message</h2>
              <p className="text-slate-600 dark:text-slate-300">
                Fill out the form below and I will get back to you shortly.
              </p>
            </div>
            
            {/* Success Message */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-sky-50 dark:bg-sky-900/30 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 rounded-lg animate-fade-in">
                <div className="flex items-center">
                  <FiCheck className="mr-2 text-sky-600 dark:text-sky-400" />
                  <span className="font-medium">Message sent successfully!</span>
                </div>
                <p className="text-sm mt-1">{submitMessage || 'I will respond to your message within 1-2 business days.'}</p>
              </div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg animate-fade-in">
                <div className="flex items-center">
                  <FiAlertCircle className="mr-2 text-red-600 dark:text-red-400" />
                  <span className="font-medium">An error occurred!</span>
                </div>
                <p className="text-sm mt-1">{submitMessage || 'Please try again in a moment'}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-transparent transition-all duration-300 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 disabled:opacity-60 disabled:cursor-not-allowed"
                      placeholder="Your Name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-transparent transition-all duration-300 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 disabled:opacity-60 disabled:cursor-not-allowed"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-transparent transition-all duration-300 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 disabled:opacity-60 disabled:cursor-not-allowed"
                  placeholder="Example: Logo/Flyer/Poster Design"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-transparent transition-all duration-300 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 resize-none disabled:opacity-60 disabled:cursor-not-allowed"
                  placeholder="Describe your project, requirements, or questions..."
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-sky-600 dark:bg-sky-700 hover:bg-sky-700 dark:hover:bg-sky-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
                
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 text-center">
                  By submitting this message, you agree to our{' '}
                  <button type="button" className="text-sky-600 dark:text-sky-400 hover:underline">
                    privacy policy
                  </button>{' '}
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center text-slate-800 dark:text-slate-100">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-2 text-slate-800 dark:text-slate-100">How long does the project take?</h3>
              <p className="text-slate-600 dark:text-slate-300">
                The timeline depends on the complexity of the project. Simple designs usually take 3–7 days, while more complex projects may take 1–2 weeks.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-2 text-slate-800 dark:text-slate-100">What is the payment process?</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Payment is split into two stages: 50% upfront and 50% upon project completion. Payments can be made via bank transfer, e-wallet, or PayPal.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-2 text-slate-800 dark:text-slate-100">Are revisions included?</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Yes, I provide 2–3 rounds of minor revisions to ensure you are satisfied with the final result.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-2 text-slate-800 dark:text-slate-100">Do you work remotely or onsite?</h3>
              <p className="text-slate-600 dark:text-slate-300">
                I primarily work remotely with regular communication via email, chat, and video calls.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-slate-100 to-sky-50 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-8 md:p-12 border border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-slate-800 dark:text-slate-100">
              Ready to Start a Project?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
              Feel free to get in touch. Let's create something amazing together!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:ilkhanull@gmail.com" 
                className="relative px-8 py-3 bg-transparent text-sky-600 dark:text-sky-400 rounded-lg border-2 border-sky-500 dark:border-sky-600 overflow-hidden group transition-all duration-300 font-medium inline-flex items-center justify-center hover:text-slate-100 dark:hover:text-slate-100"
              >
                {/* Background slide effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-sky-500 to-sky-600 dark:from-sky-600 dark:to-sky-700 transform translate-x-60 group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                
                {/* Content */}
                <span className="relative z-10 inline-flex items-center">
                  <FiMail className="mr-2 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:text-rose-600" />
                  Direct Email
                </span>
              </a>

              <a 
                href="https://wa.me/6281323233129" 
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-3 bg-sky-600 dark:bg-sky-700 text-white rounded-lg hover:bg-sky-700 dark:hover:bg-sky-600 font-medium inline-flex items-center justify-center"
              >
                <span className="relative z-10 inline-flex items-center">
                  <FaWhatsapp 
                    className="w-5 h-5 mr-2 transition-all duration-500 ease-out
                    group-hover:rotate-[20deg]
                    group-hover:scale-125
                    group-hover:text-green-500
                    group-hover:translate-y-[-2px]
                    group-active:scale-95
                    group-active:duration-100" 
                  />
                  WhatsApp
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}