import { useEffect } from 'react';
import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals';

export function reportWebVitals(onPerfEntry?: (metric: any) => void) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry);
    onINP(onPerfEntry);
    onFCP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
  }
}

export function useWebVitals(onPerfEntry?: (metric: any) => void) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      reportWebVitals(onPerfEntry || ((metric) => {
        // Only log in development or if explicitly required
        if (import.meta.env.DEV) {
          console.log(metric);
        }
        
        // If Google Analytics is present, send data as event
        if (typeof window.gtag === 'function') {
          window.gtag('event', metric.name, {
            event_category: 'Web Vitals',
            event_label: metric.id,
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            non_interaction: true,
          });
        }
      }));
    }
  }, [onPerfEntry]);
}
