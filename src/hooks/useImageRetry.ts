// 1. GLOBAL IMAGE RETRY HOOK - Prevents repeated failed requests
// ========================================

// File Path: src/hooks/useImageRetry.ts
import { useState, useCallback } from 'react';

// Global cache to track failed URLs and retry attempts
const failedUrls = new Set<string>();
const retryAttempts = new Map<string, number>();
const MAX_RETRIES = 2;

export function useImageRetry(src: string) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [shouldLoad, setShouldLoad] = useState(!failedUrls.has(src));

  const handleError = useCallback(() => {
    const currentRetries = retryAttempts.get(src) || 0;
    
    if (currentRetries < MAX_RETRIES) {
      // Increment retry count
      retryAttempts.set(src, currentRetries + 1);
      console.log(`Image retry ${currentRetries + 1}/${MAX_RETRIES} for: ${src}`);
      
      // Retry with cache-busting parameter
      setCurrentSrc(`${src}${src.includes('?') ? '&' : '?'}retry=${Date.now()}`);
    } else {
      // Max retries reached - mark as permanently failed
      failedUrls.add(src);
      setShouldLoad(false);
      console.warn(`Max retries reached for image: ${src}`);
    }
  }, [src]);

  const handleLoad = useCallback(() => {
    // Reset retry count on successful load
    if (retryAttempts.has(src)) {
      retryAttempts.delete(src);
    }
    if (failedUrls.has(src)) {
      failedUrls.delete(src);
    }
  }, [src]);

  return {
    currentSrc,
    shouldLoad,
    handleError,
    handleLoad
  };
}
