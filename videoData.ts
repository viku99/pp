/**
 * This file is no longer used.
 * Video assets are now managed globally via VideoContext, allowing for a single
 * custom video to be uploaded by the user and applied site-wide. The logic
 * for which projects display a video is now handled by a `hasThumbnailVideo`
 * flag in the main `data.ts` file.
 */
export const projectVideos: Record<string, string> = {};