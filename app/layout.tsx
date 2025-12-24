import { ReactNode } from 'react'
import { Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/contexts/ThemeContext'

// SOLUSI SIMPLE: Hapus font weights yang tidak digunakan
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Hanya 4 weights (90% kasus cukup)
  // Hapus: '100', '200', '300', '800', '900', 'italic' 
  style: ['normal', 'italic'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata = {
  title: 'Portofolio Saya - Developer & Desainer',
  description: 'Portofolio profesional dengan showcase project dan skill',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="id" suppressHydrationWarning className={poppins.variable}>
      <body className={`${poppins.className} antialiased min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300`}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Header/>
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}