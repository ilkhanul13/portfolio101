'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '@/contexts/ThemeContext'
import { usePathname } from 'next/navigation'
import { GoHomeFill } from "react-icons/go";
import { RiArchive2Fill } from "react-icons/ri";
import { RiUserSmileFill } from "react-icons/ri";
import { TbMailFilled } from "react-icons/tb";

interface NavItem {
  name: string
  path: string
  icon?: React.ReactNode
}

interface HeaderProps {
  logoText?: string
  logoHref?: string
  navItems?: NavItem[]
  showMobileMenu?: boolean
  showThemeToggle?: boolean
}

export default function Header({
  logoText = "Portfolio",
  logoHref = "/",
  navItems = [
    // { name: 'Home', path: '/'},
    // { name: 'About', path: '/about'},
    // { name: 'Projects', path: '/projects'},
    // { name: 'Contact', path: '/contact'},

    { name: 'Home', path: '/', icon: <GoHomeFill /> },
    { name: 'About', path: '/about', icon: <RiUserSmileFill /> },
    { name: 'Projects', path: '/projects', icon: <RiArchive2Fill /> },
    { name: 'Contact', path: '/contact', icon: <TbMailFilled/> },
  ],
  showMobileMenu = true,
  showThemeToggle = true
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-slate-200/60 dark:bg-slate-950/80 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link 
            href={logoHref} 
            className="group flex items-center space-x-2 md:space-x-3"
          >
            <div className="w-2.5 h-2.5 bg-slate-900 dark:bg-slate-100 rounded-full group-hover:w-7 transition-all duration-200"></div>
            <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-400 dark:from-slate-100 dark:to-slate-800 bg-clip-text text-transparent tracking-tight transition-all duration-300">
              {logoText}
            </span>
          </Link>

          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Desktop Navigation - Neumorphic */}
            <nav className="hidden md:flex items-center space-x-2 p-1.5 bg-slate-300/60 dark:bg-slate-800/60 rounded-xl shadow-inner border-slate-400/30 dark:border-slate-700/50">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`group relative px-4 py-2.5 rounded-lg
                    ${isActive(item.path) 
                      ? 'bg-slate-100 dark:bg-slate-700/40 shadow-lg'
                      : 'hover:shadow-[0_0_20px_rgba(56,189,248,0.1)] dark:hover:shadow-[0_0_20px_rgba(56,189,248,0.05)]'
                    }
                    transition-all duration-800 ease-out`}
                >
                  <div className="relative flex items-center gap-3">
                    {/* Icon dengan subtle glow */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 to-blue-500/10 
                        rounded-xl blur-xl opacity-0 group-hover:opacity-100
                        transition-opacity duration-1000 ease-out"></div>
                      
                      <span className={`relative text-xl transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)]
                        ${isActive(item.path) 
                          ? 'text-sky-500 drop-shadow-[0_0_10px_rgba(56,189,248,0.3)]' 
                          : 'text-slate-600 dark:text-slate-300 group-hover:text-sky-400'
                        }
                        group-hover:translate-y-[-2px] group-hover:drop-shadow-[0_5px_15px_rgba(56,189,248,0.2)]`}
                      >
                        {item.icon}
                      </span>
                    </div>

                    <span className="font-medium text-sm transition-all duration-700 ease-out
                      group-hover:translate-x-1
                      relative">
                      {item.name}
                      {/* Subtle highlight */}
                      <span className="absolute inset-x-0 -bottom-1 h-[1px] bg-gradient-to-r from-transparent via-sky-400/50 to-transparent
                        scale-x-0 group-hover:scale-x-100
                        transition-transform duration-1000 ease-out origin-center"></span>
                    </span>
                  </div>
                </Link>
              ))}
            </nav>

            {/* Theme Toggle - Smooth Animation (Simple) */}
            {showThemeToggle && (
              <button
                onClick={toggleTheme}
                className="p-2 md:p-3 rounded-xl bg-slate-300/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300  
                border-slate-400/30 dark:border-slate-700/50
                  over:shadow-slate transition-all duration-300 active:scale-95
                  w-10 h-10 md:w-12 md:h-12 flex items-center justify-center"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                type="button"
              >
                {/* Icons with smooth transition - Ukuran disamakan dengan mobile menu button */}
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Moon Icon (Light mode) */}
                  <FiMoon 
                    className={`absolute transition-all duration-700 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]
                      ${theme === 'light' 
                        ? 'opacity-100 rotate-0 scale-100 w-5 h-5 md:w-6 md:h-6' 
                        : 'opacity-0 rotate-90 scale-0 w-5 h-5 md:w-6 md:h-6'}`}
                  />
                  
                  {/* Sun Icon (Dark mode) */}
                  <FiSun 
                    className={`absolute transition-all duration-700 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]
                      ${theme === 'dark' 
                        ? 'opacity-100 rotate-0 scale-100 w-5 h-5 md:w-6 md:h-6' 
                        : 'opacity-0 -rotate-90 scale-0 w-5 h-5 md:w-6 md:h-6'}`}
                  />
                </div>
              </button>
            )}

            {/* Mobile Menu Button - Neumorphic */}
            {showMobileMenu && (
              <button
                className="relative p-2 md:p-3 bg-slate-300/70 dark:bg-slate-800/70 rounded-xl text-slate-700 dark:text-slate-300
                          backdrop-blur-md
                           border-slate-400/30 dark:border-slate-700/50
                          shadow-[0_8px_32px_rgba(0,0,0,0.1)]
                          dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                          transition-all duration-500 ease-out
                          w-10 h-10 md:w-12 md:h-12 flex items-center justify-center
                          active:scale-95 md:hidden
                          group
                          overflow-hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                type="button"
              > 
                <div className="relative z-10">
                  {/* Menu Icon dengan flip animation */}
                  <div className={`relative w-5 h-5 md:w-6 md:h-6 transition-transform duration-500 ease-out
                    ${isMenuOpen ? 'rotate-180' : 'group-hover:rotate-12'}`}
                  >
                    <FiMenu 
                      size="100%"
                      className={`absolute inset-0 transition-all duration-400 ease-out
                        ${isMenuOpen 
                          ? 'opacity-0 rotate-90' 
                          : 'opacity-100 rotate-0 group-hover:scale-110'}`}
                    />
                    
                    <FiX 
                      size="100%"
                      className={`absolute inset-0 transition-all duration-400 ease-out
                        ${isMenuOpen 
                          ? 'opacity-100 rotate-0 group-hover:scale-110' 
                          : 'opacity-0 -rotate-90'}`}
                    />
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu - Neumorphic */}
        {isMenuOpen && showMobileMenu && (
          <div className="md:hidden pt-4 pb-6">
            <div className="rounded-2xl bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 p-3 shadow-lg">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 
                      ${isActive(item.path)
                        ? 'bg-gradient-to-r from-sky-50 to-slate-50 dark:from-sky-900/20 dark:to-slate-900/20 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-800/30'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-700/80'
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className={`text-xl transition-colors
                      ${isActive(item.path) 
                        ? 'text-sky-500 dark:text-sky-400' 
                        : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="font-medium tracking-wide">{item.name}</span>
                    {isActive(item.path) && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-sky-500 dark:bg-sky-400 animate-pulse"></div>
                    )}
                  </Link>
                ))}
                
                {showThemeToggle && (
                  <button
                    onClick={() => {
                      toggleTheme();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-4 w-full px-4 py-3.5 rounded-xl 
                              bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-slate-800 dark:to-slate-900/50
                              border border-slate-200/60 dark:border-slate-700/60
                              text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700
                              transition-all duration-300 active:scale-[0.98] group"
                    type="button"
                  >
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 shadow-sm 
                                  group-hover:shadow-md transition-shadow duration-300">
                      {theme === 'light' ? (
                        <FiMoon className="text-slate-700 dark:text-slate-400 transition-transform group-hover:rotate-12" size={20} />
                      ) : (
                        <FiSun className="text-amber-500 dark:text-amber-400 transition-transform group-hover:rotate-12" size={20} />
                      )}
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Switch Theme</span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                      </span>
                    </div>
                    <div className="ml-auto px-3 py-1 rounded-full bg-slate-200/70 dark:bg-slate-700/70 text-sm font-medium">
                      {theme === 'light' ? 'Light' : 'Dark'}
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}