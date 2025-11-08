import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

// Removed 'Home' link as the 'V' logo links to the homepage, saving space on mobile.
const navLinks = [
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

// Simplified NavItem component, as it's now only used for the main header.
const NavItem: React.FC<{ path: string; label: string; layoutId: string }> = ({ path, label, layoutId }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        // Responsive font size for better fit on small screens
        `relative uppercase tracking-widest transition-colors duration-300 text-xs md:text-sm ${
          isActive ? 'text-white' : 'text-neutral-500 hover:text-white'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {label}
          {isActive && (
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-px bg-brand-accent"
              layoutId={layoutId}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            />
          )}
        </>
      )}
    </NavLink>
  );
};

const Header: React.FC = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

  // The header no longer needs state or handlers for a mobile menu.
  return (
    <header className={`fixed top-0 left-0 w-full p-4 z-50 transition-colors duration-300 ${!isHomePage ? 'bg-brand-dark/80 backdrop-blur-sm' : 'bg-transparent'}`}>
        <div className="max-w-screen-xl mx-auto px-2 md:px-8 flex justify-between items-center">
            <NavLink to="/" className="text-white font-black text-2xl tracking-tighter">V</NavLink>
            
            {/* The navigation is now always visible with responsive spacing. */}
            <nav className="flex items-center space-x-4 sm:space-x-6 md:space-x-8">
                {navLinks.map(link => <NavItem key={link.path} {...link} layoutId="header-nav-indicator" />)}
            </nav>
            {/* The hamburger menu button and the full-screen mobile menu have been completely removed. */}
        </div>
    </header>
  );
};

export default Header;