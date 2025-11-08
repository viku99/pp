import { useEffect } from 'react';

// A set to keep track of already preloaded URLs to avoid redundant fetches across component mounts.
const preloadedUrls = new Set<string>();

const isImage = (url: string): boolean => /\.(jpe?g|png|gif|webp|svg)$/i.test(url);

/**
 * A hook to preload an array of media URLs (images and videos).
 * This will hint the browser to fetch these resources in the background,
 * making them available in the cache for when they are actually needed.
 * @param urls - An array of strings representing the URLs to preload.
 */
export function usePreloader(urls: string[]): void {
  // Stabilize the dependency by sorting and stringifying the URLs array.
  const urlsKey = JSON.stringify([...new Set(urls)].sort());

  useEffect(() => {
    // We only want this to run on the client side.
    if (typeof window === 'undefined') {
      return;
    }
    
    const urlsToPreload: string[] = JSON.parse(urlsKey);
    if (!urlsToPreload || urlsToPreload.length === 0) {
        return;
    }

    urlsToPreload.forEach(url => {
      if (!url || preloadedUrls.has(url)) {
        return; // Skip if URL is empty or already processed
      }

      if (isImage(url)) {
        // For images, creating an Image object is a classic preloading technique.
        const img = new Image();
        img.src = url;
      } else {
        // For other media like videos, <link rel="preload"> is the modern standard.
        // It's more efficient as it doesn't execute or decode the content.
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'video';
        link.href = url;
        link.crossOrigin = 'anonymous'; // Important for CORS content
        document.head.appendChild(link);
      }
      preloadedUrls.add(url);
    });

    // No cleanup function is needed as we want the preloading hints to persist.
  }, [urlsKey]);
}
