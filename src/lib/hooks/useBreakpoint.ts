import { useState, useEffect } from 'react';
import { BREAKPOINTS } from '../constants/theme';

type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'large' | 'xlarge';

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= BREAKPOINTS.MOBILE) {
        setBreakpoint('mobile');
      } else if (width <= BREAKPOINTS.TABLET) {
        setBreakpoint('tablet');
      } else if (width <= BREAKPOINTS.DESKTOP) {
        setBreakpoint('desktop');
      } else if (width <= BREAKPOINTS.LARGE) {
        setBreakpoint('large');
      } else {
        setBreakpoint('xlarge');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
} 