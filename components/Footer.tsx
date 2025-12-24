import { FiGithub, FiLinkedin, FiInstagram, FiMail, FiHeart, FiCode } from 'react-icons/fi'
import { ReactElement } from 'react'

interface SocialLink {
  icon: ReactElement;
  url: string;
  label: string;
}

interface FooterProps {
  name?: string;
  tagline?: string;
  copyrightText?: string;
  socialLinks?: SocialLink[];
  showMadeWith?: boolean;
  showPoweredBy?: boolean;
  heart?: string;
  madeWithText?: string;
  poweredByText?: string;
  backgroundColor?: string;
  textColor?: string;
}

export default function Footer({ 
  name = 'Portfolio', 
  tagline = 'Creating innovative digital solutions',
  copyrightText = 'Ilkhanul Khalik',
  socialLinks = [
    { icon: <FiGithub />, url: 'https://github.com/ilkhanul13', label: 'GitHub' },
    { icon: <FiLinkedin />, url: 'https://www.linkedin.com/in/ilkhanul-khalik-262920391/', label: 'LinkedIn' },
    { icon: <FiInstagram />, url: 'https://www.instagram.com/ilkhanul_/', label: 'Instagram' },
    { icon: <FiMail />, url: 'mailto:ilkhanull@gmail.com', label: 'Email' },
  ],
  showMadeWith = true,
  showPoweredBy = true,
  heart = "Built with",
  madeWithText = "using Next.js + Tailwind",
  poweredByText = "DeepSeek & ChatGPT",
  backgroundColor = "bg-slate-200/60 dark:bg-slate-950/80",
  textColor = "text-slate-800 dark:text-slate-100"
}: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={`${backgroundColor} ${textColor} py-8 transition-colors duration-300 border-t border-slate-200 dark:border-slate-800`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          {/* Logo/Brand */}
          <div className="mb-6 text-center">
            <h3 className="text-xl font-bold mb-2">{name}</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm transition-colors duration-300">
              {tagline}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4 mb-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-300 p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md"
                aria-label={link.label}
                title={link.label}
              >
                <div className="text-lg">
                  {link.icon}
                </div>
              </a>
            ))}
          </div>

          {/* Credits */}
          <div className="text-center text-slate-600 dark:text-slate-400 text-sm transition-colors duration-300">
            <p className="mb-2">&copy; {currentYear} {copyrightText}</p>
            
            <div className="flex flex-wrap justify-center items-center gap-4">
              {showMadeWith && (
                <div className="flex items-center gap-1.5">
                  <span>{heart}</span>
                  <FiHeart className="text-red-500 dark:text-red-400 text-xs transition-colors duration-300" />
                  <span>{madeWithText}</span>
                </div>
              )}
              
              {showPoweredBy && (
                <div className="flex items-center gap-1.5">
                  <FiCode className="text-slate-600 dark:text-slate-400 transition-colors duration-300" />
                  <span>Powered by</span>
                  <span className="font-medium">{poweredByText}</span>
                </div>
              )}
            </div>
          </div>
        
          {/* Tech Stack Badges - Updated to Slate/Sky */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="px-3 py-1.5 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-xs font-medium rounded-md border border-emerald-200 dark:border-emerald-500/20 transition-colors duration-300">
              TypeScript
            </span>
            <span className="px-3 py-1.5 bg-sky-100 dark:bg-sky-500/10 text-sky-800 dark:text-sky-300 text-xs font-medium rounded-md border border-sky-200 dark:border-sky-500/20 transition-colors duration-300">
              Next.js
            </span>
            <span className="px-3 py-1.5 bg-fuchsia-100 dark:bg-fuchsia-500/10 text-fuchsia-800 dark:text-fuchsia-300 text-xs font-medium rounded-md border border-fuchsia-200 dark:border-fuchsia-500/20 transition-colors duration-300">
              React
            </span>
            <span className="px-3 py-1.5 bg-cyan-100 dark:bg-cyan-500/10 text-cyan-800 dark:text-cyan-300 text-xs font-medium rounded-md border border-cyan-200 dark:border-cyan-500/20 transition-colors duration-300">
              Tailwind CSS
            </span>
            <span className="px-3 py-1.5 bg-amber-100 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 text-xs font-medium rounded-md border border-amber-200 dark:border-amber-500/20 transition-colors duration-300">
              Cloudinary
            </span>
            <span className="px-3 py-1.5 bg-red-100 dark:bg-red-500/10 text-red-800 dark:text-red-300 text-xs font-medium rounded-md border border-red-200 dark:border-red-500/20 transition-colors duration-300">
              Supabase
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}