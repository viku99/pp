import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import AnimatedPage from '../components/AnimatedPage';
import ProjectCard from '../components/ProjectCard';
import { useContent } from '../hooks/useContent';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const NoResults: React.FC = () => (
    <motion.div
      className="text-center col-span-full py-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold">No Projects Found</h2>
      <p className="text-neutral-400 mt-2">Try adjusting your search or filter criteria.</p>
    </motion.div>
  );

const PortfolioPage: React.FC = () => {
  const { content, loading, error, refetch } = useContent();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories: string[] = useMemo(() => {
    if (!content) return ['All'];
    return ['All', ...new Set(content.projects.map(p => p.category))];
  }, [content]);

  const filteredProjects = useMemo(() => {
    if (!content) return [];
    return content.projects.filter(project => {
      const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, activeCategory, content]);

  if (loading) {
    return (
      <AnimatedPage type="cinematic">
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </AnimatedPage>
    );
  }

  if (error || !content) {
    return (
      <AnimatedPage type="cinematic">
        <ErrorDisplay
          title="Failed to Load Portfolio"
          message={error?.message || "Content could not be found."}
          onRetry={refetch}
        />
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage type="cinematic">
      <>
        <motion.div initial={{opacity: 0, y:20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.2}}>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4">Work</h1>
          <p className="text-neutral-300 max-w-3xl text-lg leading-relaxed">A curated selection of projects demonstrating a blend of artistic vision and technical skill in motion design, VFX, and visual storytelling.</p>
          <motion.p
            className="text-neutral-500 text-sm mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Last Updated: {content.lastUpdated}
        </motion.p>
        </motion.div>

        <motion.div className="my-10 flex flex-col md:flex-row gap-6 items-center" initial={{opacity: 0, y:20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.4}}>
           <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                  <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                      activeCategory === category ? 'bg-brand-accent text-black' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  }`}
                  >
                  {category}
                  </button>
              ))}
           </div>
           <div className="w-full md:w-auto md:ml-auto">
              <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-64 bg-transparent border-b border-neutral-600 py-2 text-white placeholder-neutral-500 transition-colors duration-300 glow-underline"
              />
           </div>
        </motion.div>
        
        {filteredProjects.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                className={index === 0 ? 'md:col-span-2 aspect-video' : 'aspect-square'}
              />
            ))}
          </motion.div>
        ) : (
          <NoResults />
        )}
      </>
    </AnimatedPage>
  );
};

export default PortfolioPage;