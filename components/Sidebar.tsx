import React from 'react';
import { NavLink } from 'react-router-dom';
import AnimatedLogo from './AnimatedLogo';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

const NavItem: React.FC<{ path: string; label: string }> = ({ path, label }) => {
  return (
    <NavLink
      to={path}
      end={path === '/'}
      className={({ isActive }) =>
        `relative flex items-center justify-center h-28 w-full transition-colors duration-300 ${
          isActive ? 'text-white' : 'text-neutral-500 hover:text-white'
        }`
      }
    >
      {/* This wrapper shifts the content to be visible when the sidebar is collapsed */}
      <div className="transition-transform duration-300 ease-in-out transform group-hover:translate-x-0 translate-x-5">
        <span
          style={{ writingMode: 'vertical-rl' }}
          className="transform rotate-180 uppercase text-xs tracking-[0.2em]"
        >
          {label}
        </span>
      </div>
    </NavLink>
  );
};

const Sidebar: React.FC = () => {
  return (
    <aside className="hidden md:flex flex-col items-center justify-between h-screen w-20 bg-brand-dark z-50 py-8 border-r border-neutral-800/50 transition-all duration-300 ease-in-out transform -translate-x-1/2 group-hover:translate-x-0">
      {/* Apply the same transform wrapper to the logo to keep it visible */}
      <div className="transition-transform duration-300 ease-in-out transform group-hover:translate-x-0 translate-x-5">
        <NavLink to="/" aria-label="Go to Home page">
            <AnimatedLogo />
        </NavLink>
      </div>
      
      <nav className="flex flex-col items-center">
        {navLinks.map(link => <NavItem key={link.path} {...link} />)}
      </nav>

      {/* Empty div for vertical alignment */}
      <div />
    </aside>
  );
};

export default Sidebar;