import React, { useState, FormEvent, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import CopyIcon from '../components/icons/CopyIcon';
import CheckIcon from '../components/icons/CheckIcon';
import BehanceIcon from '../components/icons/BehanceIcon';
import DiscordIcon from '../components/icons/DiscordIcon';
import GithubIcon from '../components/icons/GithubIcon';
import InstagramIcon from '../components/icons/InstagramIcon';
import LinkedInIcon from '../components/icons/LinkedInIcon';
import MailIcon from '../components/icons/MailIcon';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';
import { useContent } from '../hooks/useContent';
import LoadingSpinner from '../components/LoadingSpinner';

const ContactPage: React.FC = () => {
  const { content, loading } = useContent();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  type Status = 'idle' | 'submitting' | 'success';
  const [status, setStatus] = useState<Status>('idle');
  
  const [copied, setCopied] = useState(false);
  
   const socialLinks = useMemo(() => [
    { name: 'LinkedIn', icon: <LinkedInIcon className="w-6 h-6" />, href: "https://www.linkedin.com/in/vikasbala19" },
    { name: 'Behance', icon: <BehanceIcon className="w-6 h-6" />, href: "https://www.behance.net/vikasbala" },
    { name: 'Github', icon: <GithubIcon className="w-6 h-6" />, href: "https://github.com/viku99" },
    { name: "Instagram", icon: <InstagramIcon className="w-6 h-6" />, href: "https://www.instagram.com/zorox.x_" },
    { name: 'WhatsApp', icon: <WhatsAppIcon className="w-6 h-6" />, href: "https://wa.me/919043529067" },
    { name: 'Discord', icon: <DiscordIcon className="w-6 h-6" />, href: "https://discord.com/users/zororobinxo" },
    { name: 'Email', icon: <MailIcon className="w-6 h-6" />, href: "mailto:vikasbg.png@gmail.com" },
  ], []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() === '') return;

    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };
  
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('vikasbg.png@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const ContactForm = () => (
    <motion.form 
      key="form"
      onSubmit={handleSubmit} 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
              <label htmlFor="name" className="text-xs uppercase tracking-widest text-neutral-400">Name</label>
              <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-b border-neutral-600 py-2 text-white placeholder-neutral-500 transition-colors duration-300 glow-underline"
              />
          </div>
          <div>
              <label htmlFor="email" className="text-xs uppercase tracking-widest text-neutral-400">Email</label>
              <input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-neutral-600 py-2 text-white placeholder-neutral-500 transition-colors duration-300 glow-underline"
              />
          </div>
      </div>
      <div>
           <label htmlFor="message" className="text-xs uppercase tracking-widest text-neutral-400">Message</label>
          <textarea
            id="message"
            placeholder="Your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className="w-full bg-transparent border-b border-neutral-600 py-2 text-white placeholder-neutral-500 transition-colors duration-300 glow-underline resize-none"
          />
      </div>
      
      <div className="text-left pt-4">
          <button
              type="submit"
              disabled={status === 'submitting' || message.trim() === ''}
              className="inline-flex items-center justify-center w-full md:w-auto px-10 py-3 border border-white uppercase text-sm tracking-widest transition-all duration-300 disabled:cursor-not-allowed disabled:text-neutral-600 disabled:border-neutral-700 disabled:bg-transparent enabled:bg-white enabled:text-black enabled:hover:bg-transparent enabled:hover:text-white"
          >
              {status === 'submitting' ? (
                  <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                  </>
              ) : 'Send Message'}
          </button>
      </div>
    </motion.form>
  );

  const SuccessMessage = () => (
    <motion.div
        key="success"
        className="text-center bg-neutral-900/50 p-8 flex flex-col items-center justify-center min-h-[460px] md:min-h-0 md:h-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1, transition: { delay: 0.1, type: 'spring', stiffness: 200, damping: 10 } }}
      >
          <CheckIcon className="w-8 h-8 text-green-400" />
      </motion.div>
      <motion.h2 
        className="text-2xl font-bold text-white mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
      >
        Message Sent!
      </motion.h2>
      <motion.p 
        className="text-neutral-300"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
      >
        Thank you for reaching out. I'll be in touch.
      </motion.p>
    </motion.div>
  );

  if (loading) {
      return (
          <AnimatedPage type="fade">
              <div className="min-h-[60vh] flex items-center justify-center">
                  <LoadingSpinner/>
              </div>
          </AnimatedPage>
      )
  }

  return (
    <AnimatedPage type="fade">
      <div className="max-w-5xl mx-auto">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4">Let's Create Together</h1>
          <p className="text-neutral-300 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Reach out and let's make something amazing.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <motion.div 
                className="lg:col-span-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            >
                <h3 className="text-2xl font-bold uppercase tracking-wider mb-6">Contact Details</h3>
                <div className="space-y-6">
                    <div>
                        <p className="text-xs uppercase tracking-widest text-neutral-400 mb-1">Direct Email</p>
                        <div className="flex items-center gap-2">
                            <a href="mailto:vikasbg.png@gmail.com" className="text-white hover:underline transition-colors">vikasbg.png@gmail.com</a>
                            <button onClick={handleCopyEmail} className="text-neutral-400 hover:text-white transition-colors" aria-label="Copy email address">
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.span
                                        key={copied ? 'check' : 'copy'}
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        transition={{ duration: 0.2 }}
                                        className="block"
                                    >
                                        {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
                                    </motion.span>
                                </AnimatePresence>
                            </button>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-widest text-neutral-400 mb-3">Find me on</p>
                        <div className="flex items-center flex-wrap gap-6">
                             {socialLinks.map(link => (
                                <a 
                                    key={link.name} 
                                    href={link.href} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-neutral-500 hover:text-white transition-colors duration-300" 
                                    aria-label={link.name}
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
            
            <motion.div 
                className="lg:col-span-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
            >
                <AnimatePresence mode="wait">
                    {status === 'success' ? <SuccessMessage /> : <ContactForm />}
                </AnimatePresence>
            </motion.div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ContactPage;