import { Content } from '../types';
import { contentData } from '../data';

interface UseContentResult {
  content: Content | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * A hook to provide site content.
 *
 * This version imports the content directly from a local data file,
 * making it easy to manage all portfolio content within the codebase.
 * It's fast, reliable, and avoids network requests for static data.
 */
export function useContent(): UseContentResult {
  return {
    content: contentData,
    loading: false, // Data is available instantly.
    error: null,    // No network request means no fetch-related errors.
    refetch: () => {}, // A no-op as refetching is not needed for static imports.
  };
}
