import React, { useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Fix: Add Variants to framer-motion import
import { motion, Variants } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import ArrowIcon from '../components/icons/ArrowIcon';
import { useContent } from '../hooks/useContent';
import { usePreloader } from '../hooks/usePreloader';
import { Project } from '../types';

/**
 * Determines the MIME type of a video file based on its URL extension.
 * @param url The URL of the video file.
 * @returns The corresponding video MIME type.
 */
const getVideoMimeType = (url: string): string => {
  if (!url || !url.includes('.')) return ''; // Return early if no url or no extension
  const extension = url.split('.').pop()?.split('?')[0].toLowerCase(); // Handle query params
  switch (extension) {
    case 'mp4':
      return 'video/mp4';
    case 'webm':
      return 'video/webm';
    case 'ogv':
    case 'ogg':
      return 'video/ogg';
    default:
      // Let the browser infer if we can't determine it.
      return ''; 
  }
};

const title = "VIKAS";
const titleContainerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.5,
    },
  },
};

// Fix: Explicitly type letterVariants as Variants to satisfy framer-motion's expected types for cubic-bezier easing.
const letterVariants: Variants = {
  initial: { y: 20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      ease: [0.6, 0.01, 0.05, 0.95],
      duration: 1,
    },
  },
};

const HomePage: React.FC = () => {
  const { content } = useContent();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const homeVideoSrc = content?.homeBackgroundVideo || '';

  useEffect(() => {
    const videoElement = videoRef.current;
    const containerElement = containerRef.current;
    if (!videoElement || !containerElement || !homeVideoSrc.startsWith('http')) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const source = videoElement.querySelector('source');
          if (source && !source.getAttribute('src')) {
            source.src = homeVideoSrc;
            videoElement.load();
          }
          videoElement.play().catch(error => {
            if (error.name !== 'AbortError') {
              console.error("Background video autoplay was prevented:", error);
            }
          });
          observer.unobserve(containerElement);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(containerElement);

    return () => {
      if (containerElement) {
        observer.unobserve(containerElement);
      }
    };
  }, [homeVideoSrc]);

  // Extract all media URLs to be preloaded for the portfolio page
  const portfolioMediaUrls = useMemo(() => {
    if (!content?.projects) return [];

    const urls = new Set<string>();

    content.projects.forEach((project: Project) => {
      if (project.thumbnail) urls.add(project.thumbnail);
      if (project.thumbnailVideo && project.thumbnailVideo.startsWith('http')) urls.add(project.thumbnailVideo);
      if (project.heroMedia?.type === 'image' && project.heroMedia.src) {
         urls.add(project.heroMedia.src);
      }
      if (project.heroMedia?.type === 'video' && project.heroMedia.src.startsWith('http')) {
        urls.add(project.heroMedia.src);
      }
      if (project.gallery) {
        project.gallery.forEach(url => urls.add(url));
      }
    });

    return Array.from(urls);
  }, [content]);

  // Start preloading the assets for a smoother portfolio experience
  usePreloader(portfolioMediaUrls);
  
  return (
    <AnimatedPage type="fade">
      <div ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          className="absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2"
          loop
          muted
          playsInline
          crossOrigin="anonymous"
          preload="none"
          poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        >
          <source src="" type={getVideoMimeType(homeVideoSrc)} />
        </video>
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 text-center text-white p-4">
          <motion.h1
            className="font-black text-6xl sm:text-8xl md:text-9xl tracking-tighter uppercase"
            variants={titleContainerVariants}
            initial="initial"
            animate="animate"
          >
            {title.split("").map((letter, index) => (
              <motion.span key={index} className="inline-block" variants={letterVariants}>
                {letter}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p 
            className="text-neutral-300 text-lg md:text-xl tracking-widest uppercase mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Motion Designer & VFX Storyteller
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <Link
              to="/portfolio"
              className="group inline-flex items-center justify-center mt-12 px-8 py-3 border border-white text-white uppercase text-sm tracking-widest transition-colors duration-300 hover:bg-white hover:text-black focus:bg-white focus:text-black focus:outline-none focus:ring-2 focus:ring-white"
            >
              View Portfolio
              <motion.div
                className="ml-2"
              >
                 <ArrowIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default HomePage;