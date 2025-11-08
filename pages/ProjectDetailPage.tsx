import React, { useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Project } from '../types';
import AnimatedPage from '../components/AnimatedPage';
import ArrowIcon from '../components/icons/ArrowIcon';
import { useContent } from '../hooks/useContent';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';

/**
 * Determines the MIME type of a video file based on its URL extension.
 * @param url The URL of the video file.
 * @returns The corresponding video MIME type.
 */
const getVideoMimeType = (url: string): string => {
  if (!url) return '';
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

const HeroMedia: React.FC<{ media: Project['heroMedia']; poster?: string }> = ({ media, poster }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (media.type !== 'video') return;

    const videoElement = videoRef.current;
    const containerElement = containerRef.current;
    if (!videoElement || !containerElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const source = videoElement.querySelector('source');
          if (source && source.getAttribute('src') !== media.src) {
            source.src = media.src;
            videoElement.load();
          }
          videoElement.play().catch(error => {
            if (error.name !== 'AbortError') {
              console.error("Hero video autoplay was prevented:", error);
            }
          });
          observer.unobserve(containerElement);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(containerElement);

    return () => {
      observer.unobserve(containerElement);
    };
  }, [media]);


  switch (media.type) {
    case 'image':
      return <img src={media.src} alt="Project hero" className="w-full h-auto object-cover" loading="lazy" />;
    case 'video':
      return (
        <div ref={containerRef} className="aspect-video bg-black">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
            controls
            preload="none"
            crossOrigin="anonymous"
            poster={poster}
          >
            <source src="" type={getVideoMimeType(media.src)} />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    default:
      return null;
  }
};


const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { content, loading, error, refetch } = useContent();

  if (loading) {
    return (
      <AnimatedPage type="cinematic">
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </AnimatedPage>
    );
  }

  if (error) {
     return (
      <AnimatedPage type="cinematic">
        <ErrorDisplay
          title="Failed to Load Project"
          message={error.message}
          onRetry={refetch}
        />
      </AnimatedPage>
    );
  }

  const project = content?.projects.find(p => p.id === id);

  if (!project) {
    return (
      <AnimatedPage type="cinematic">
        <div className="flex flex-col items-center justify-center text-center px-4 py-24 md:py-32">
          <div>
            <h1 className="text-4xl font-bold">Project Not Found</h1>
            <Link to="/portfolio" className="mt-4 inline-block text-white hover:underline">
              Back to Portfolio
            </Link>
          </div>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage type="cinematic">
      <>
        <motion.div initial={{opacity:0, y: -20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.2}}>
             <Link to="/portfolio" className="group inline-flex items-center text-neutral-400 hover:text-white transition-colors duration-300 mb-8 uppercase text-xs tracking-widest">
                <ArrowIcon className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1 mr-2 transform rotate-180" />
                Back to Portfolio
            </Link>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">{project.title}</h1>
        </motion.div>

        <motion.div className="my-12" initial={{opacity:0}} animate={{opacity: 1}} transition={{delay: 0.4}}>
            <HeroMedia media={project.heroMedia} poster={project.thumbnail} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div className="lg:col-span-2" initial={{opacity:0, x:-20}} animate={{opacity: 1, x:0}} transition={{delay: 0.6}}>
                <h2 className="text-2xl font-bold uppercase tracking-wider mb-4">Project Overview</h2>
                <p className="text-neutral-300 leading-relaxed text-lg">{project.description}</p>
                
                {project.gallery && (
                    <div className="mt-12">
                        <h3 className="text-xl font-bold uppercase tracking-wider mb-4">Gallery</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {project.gallery.map((imgSrc, index) => (
                                <img key={index} src={imgSrc} alt={`Gallery image ${index + 1}`} className="w-full h-auto object-cover" loading="lazy" />
                            ))}
                        </div>
                    </div>
                )}
            </motion.div>
            <motion.div initial={{opacity:0, x:20}} animate={{opacity: 1, x:0}} transition={{delay: 0.7}}>
                <div className="bg-neutral-900/50 p-6 sticky top-24">
                    <h3 className="text-xl font-bold uppercase tracking-wider mb-6 border-b border-neutral-700 pb-4">Details</h3>
                    <div className="space-y-4 text-sm">
                        <div className="flex justify-between">
                            <span className="font-bold">CLIENT</span>
                            <span className="text-neutral-300 text-right">{project.client}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-bold">YEAR</span>
                            <span className="text-neutral-300">{project.year}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-bold">CATEGORY</span>
                            <span className="text-neutral-300">{project.category}</span>
                        </div>
                    </div>
                    <h4 className="text-lg font-bold uppercase tracking-wider mt-8 mb-4">Tools Used</h4>
                    <div className="flex flex-wrap gap-2">
                        {project.tools.map(tool => (
                            <span key={tool} className="bg-neutral-800 text-neutral-300 text-xs px-3 py-1">{tool}</span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
      </>
    </AnimatedPage>
  );
};

export default ProjectDetailPage;