import React from 'react';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

const MobileNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full h-16 bg-brand-dark border-t border-neutral-800/50 z-50 flex items-center justify-around md:hidden">
      {navLinks.map(link => (
        <NavLink
          key={link.path}
          to={link.path}
          end={link.path === '/'}
          className={({ isActive }) =>
            `text-xs uppercase tracking-widest transition-colors duration-300 ${
              isActive ? 'text-white' : 'text-neutral-500 hover:text-white'
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default MobileNav;