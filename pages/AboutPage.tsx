import React from 'react';
import { motion, Variants } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import { useContent } from '../hooks/useContent';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' },
  },
};

const AboutPage: React.FC = () => {
  const { content, loading, error, refetch } = useContent();

  if (loading) {
    return (
      <AnimatedPage type="fade">
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </AnimatedPage>
    );
  }

  if (error || !content) {
    return (
      <AnimatedPage type="fade">
        <ErrorDisplay
          title="Failed to Load Page Content"
          message={error?.message || "Content could not be found."}
          onRetry={refetch}
        />
      </AnimatedPage>
    );
  }
  
  const { about, skills, testimonials } = content;

  return (
    <AnimatedPage type="fade">
      <>
        <motion.h1 
          className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          The Visual Architect
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          >
            <p className="text-neutral-300 leading-relaxed text-lg max-w-2xl">{about.bio}</p>
          </motion.div>
          <motion.div
            className="lg:col-span-2 w-full h-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
          >
            <img src={about.imageUrl} alt="Vikas" className="object-cover w-full" loading="lazy" />
          </motion.div>
        </div>

        <div className="my-20">
          <motion.h2 
            className="text-3xl font-bold uppercase tracking-wider mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
          >
            Core Skills
          </motion.h2>
          <motion.div
            className="flex flex-wrap justify-center gap-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="bg-neutral-800 text-neutral-300 px-5 py-2 text-sm font-medium"
                variants={itemVariants}
              >
                {skill.name}
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="my-20">
          <motion.h2 
            className="text-3xl font-bold uppercase tracking-wider mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
          >
            What Others Say
          </motion.h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-1 gap-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-neutral-900/50 p-8 relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute top-0 left-0 -translate-x-3 -translate-y-3 text-7xl text-brand-accent font-black opacity-20">”</div>
                <p className="text-neutral-200 italic text-xl leading-relaxed">"{testimonial.quote}"</p>
                <div className="text-right mt-6">
                  <p className="text-white font-bold">- {testimonial.author}</p>
                  <p className="text-neutral-400 text-sm">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </>
    </AnimatedPage>
  );
};

export default AboutPage;