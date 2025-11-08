import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

/**
 * Determines the MIME type of a video file based on its URL extension.
 * @param url The URL of the video file.
 * @returns The corresponding video MIME type.
 */
const getVideoMimeType = (url: string | undefined): string => {
  if (!url) return '';
  // For blob URLs, we can't infer from an extension, so we let the browser handle it.
  if (url.startsWith('blob:')) return ''; 
  const extension = url.split('.').pop()?.toLowerCase();
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


// Fix: Explicitly type itemVariants as Variants to resolve the type error with the 'ease' property.
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// A high-quality, smooth ease-out curve for all hover animations.
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const ProjectCard: React.FC<ProjectCardProps> = ({ project, className }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const hasVideo = !!project.thumbnailVideo;
  
  useEffect(() => {
    const cardElement = cardRef.current;
    if (!cardElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(cardElement);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(cardElement);

    return () => {
      observer.unobserve(cardElement);
    };
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      if (isHovered) {
        videoElement.play().catch(error => {
            // This error is expected when the user quickly hovers away from the card
            // before the video has a chance to start playing. We can safely ignore it.
            if (error.name !== 'AbortError') {
                console.error("Hover video play failed:", error);
            }
        });
      } else {
        videoElement.pause();
        videoElement.currentTime = 0;
      }
    }
  }, [isHovered]);

  return (
    <motion.div 
        ref={cardRef}
        variants={itemVariants} 
        className={`relative block overflow-hidden ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/project/${project.id}`} className="block w-full h-full">
        <motion.img
          src={project.thumbnail}
          alt={`${project.title} thumbnail`}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ scale: isHovered ? (hasVideo ? 0.97 : 1.03) : 1 }}
          transition={{ duration: 0.6, ease: smoothEase }}
          loading="lazy"
        />
        
        {hasVideo && (
            <motion.video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                loop
                muted
                playsInline
                crossOrigin="anonymous"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1.03 : 0.95 }}
                transition={{ duration: 0.6, ease: smoothEase }}
                preload="none"
                poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            >
              {isVisible && <source src={project.thumbnailVideo} type={getVideoMimeType(project.thumbnailVideo)} />}
            </motion.video>
        )}
        
        {/* Enhanced gradient overlay ensures text is always readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        {/* Overlay darkens smoothly on hover */}
        <motion.div 
          className="absolute inset-0 bg-black"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: isHovered ? 0.4 : 0.2 }}
          transition={{ duration: 0.5, ease: smoothEase }}
        />

        {/* Always-Visible Text Info */}
        <div className="absolute bottom-0 left-0 p-6 text-white w-full">
          <div className="flex justify-between items-baseline">
            <p className="text-neutral-300 uppercase text-sm tracking-widest">{project.category}</p>
            <p className="text-neutral-400 text-sm">{project.year}</p>
          </div>
          <h3 className="text-2xl lg:text-3xl font-bold uppercase tracking-tight mt-1">{project.title}</h3>
        </div>
      </Link>
       {/* Refined Glow Effect controlled entirely by Framer Motion */}
      <motion.div
        className="absolute inset-0 pointer-events-none ring-2 ring-brand-accent"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.6 : 0 }}
        transition={{ duration: 0.4, ease: smoothEase }}
      />
    </motion.div>
  );
};

export default ProjectCard;