// hooks/useScrollLock.ts
import { useEffect } from 'react';

export function useScrollLock(lock: boolean) {
  useEffect(() => {
    if (lock) {
      const scrollY = window.scrollY;
      const body = document.body;
      const html = document.documentElement;
      
      const scrollbarWidth = window.innerWidth - html.clientWidth;
      
      body.style.position = 'fixed';
      body.style.top = `-${scrollY}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.style.overflow = 'hidden';
      body.style.paddingRight = `${scrollbarWidth}px`;
      
      sessionStorage.setItem('scrollY', scrollY.toString());
    } else {
      const body = document.body;
      const scrollY = sessionStorage.getItem('scrollY');
      
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.overflow = '';
      body.style.paddingRight = '';
      
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY));
        sessionStorage.removeItem('scrollY');
      }
    }

    return () => {
      if (lock) {
        const body = document.body;
        const scrollY = sessionStorage.getItem('scrollY');
        
        body.style.position = '';
        body.style.top = '';
        body.style.left = '';
        body.style.right = '';
        body.style.overflow = '';
        body.style.paddingRight = '';
        
        if (scrollY) {
          window.scrollTo(0, parseInt(scrollY));
          sessionStorage.removeItem('scrollY');
        }
      }
    };
  }, [lock]);
}