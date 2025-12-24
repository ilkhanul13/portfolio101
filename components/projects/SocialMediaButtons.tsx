'use client'

import { 
  FiGlobe,
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiGithub,
  FiExternalLink
} from 'react-icons/fi'
import { FaTiktok } from 'react-icons/fa'
import { type Project } from '@/data/projects'

export default function SocialMediaButtons({ project }: { project: Project }) {
  if (!project.socialLinks) return null
  
  const links = []
  
  // Collect all available social links
  if (project.socialLinks.website) {
    links.push({ key: 'website', icon: <FiGlobe />, label: 'Website', url: project.socialLinks.website })
  }
  if (project.socialLinks.instagram) {
    links.push({ key: 'instagram', icon: <FiInstagram />, label: 'Instagram', url: project.socialLinks.instagram })
  }
  if (project.socialLinks.facebook) {
    links.push({ key: 'facebook', icon: <FiFacebook />, label: 'Facebook', url: project.socialLinks.facebook })
  }
  if (project.socialLinks.twitter) {
    links.push({ key: 'twitter', icon: <FiTwitter />, label: 'Twitter', url: project.socialLinks.twitter })
  }
  if (project.socialLinks.tiktok) {
    links.push({ key: 'tiktok', icon: <FaTiktok />, label: 'TikTok', url: project.socialLinks.tiktok })
  }
  if (project.socialLinks.linkedin) {
    links.push({ key: 'linkedin', icon: <FiLinkedin />, label: 'LinkedIn', url: project.socialLinks.linkedin })
  }
  if (project.socialLinks.github) {
    links.push({ key: 'github', icon: <FiGithub />, label: 'GitHub', url: project.socialLinks.github })
  }
  
  if (links.length === 0) return null
  
  return (
    <div className="bg-white dark:bg-slate-800/50 rounded-xl p-4 md:p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        {project.client || 'Project'} Links
      </h3>
      <div className="space-y-3">
        {links.map((link) => (
          <a
            key={link.key}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-blue-600 dark:text-blue-400">
                {link.icon}
              </div>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {link.label}
              </span>
            </div>
            <FiExternalLink className="text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
          </a>
        ))}
      </div>
    </div>
  )
}