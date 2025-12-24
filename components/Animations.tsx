'use client'

import { useEffect, useState } from 'react'

interface GradientNameProps {
  name?: string
  scrambleDelay?: number
}

export default function GradientName({
  name = "Ilkhanul",
  scrambleDelay = 7000
}: GradientNameProps) {
  const [displayText, setDisplayText] = useState(name)
  
  useEffect(() => {
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    
    const scramble = () => {
      let iteration = 0
      
      const interval = setInterval(() => {
        setDisplayText(
          name.split('').map((letter, index) => {
            if (index < iteration) {
              return name[index]
            }
            return chars[Math.floor(Math.random() * chars.length)]
          }).join('')
        )
        
        if (iteration >= name.length) {
          clearInterval(interval)
        }
        
        iteration += 1 / 3
      }, 80)
    }
    
    // Jalankan scramble pertama kali
    scramble()
    
    // Loop scramble setiap 30 detik
    const loopInterval = setInterval(() => {
      scramble()
    }, scrambleDelay)
    
    return () => {
      clearInterval(loopInterval)
    }
  }, [name, scrambleDelay])

  return (
    <div className="relative inline-block">
      <h1 
        className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-sky-700 dark:text-sky-600"
      >
        {displayText}
      </h1>
    </div>
  )
}