import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Sidebar from './components/Sidebar';
import PageLayout from './components/PageLayout';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ScrollToTop from './components/ScrollToTop';
import MobileNav from './components/MobileNav';
import Footer from './components/Footer';

// A wrapper to apply the standard page layout to interior pages
const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <PageLayout>{children}</PageLayout>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <Main />
    </HashRouter>
  );
};

const Main: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="bg-brand-dark text-neutral-300">
      <div className="flex min-h-screen group">
        <Sidebar />
        <ScrollToTop />
        <div className="w-full flex-grow flex flex-col transition-all duration-300 ease-in-out pl-0 md:pl-10 group-hover:md:pl-20">
            <main className="flex-grow w-full pb-16 md:pb-0">
            <AnimatePresence mode="wait" initial={false}>
                <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage />} />
                <Route path="/portfolio" element={<LayoutWrapper><PortfolioPage /></LayoutWrapper>} />
                <Route path="/project/:id" element={<LayoutWrapper><ProjectDetailPage /></LayoutWrapper>} />
                <Route path="/about" element={<LayoutWrapper><AboutPage /></LayoutWrapper>} />
                <Route path="/contact" element={<LayoutWrapper><ContactPage /></LayoutWrapper>} />
                </Routes>
            </AnimatePresence>
            </main>
            {!isHomePage && (
                <div className="hidden md:block">
                    <Footer />
                </div>
            )}
        </div>
      </div>
      <MobileNav />
    </div>
  );
}

export default App;