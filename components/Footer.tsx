import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useContent } from '../hooks/useContent';
import BehanceIcon from './icons/BehanceIcon';
import GithubIcon from './icons/GithubIcon';
import InstagramIcon from './icons/InstagramIcon';
import LinkedInIcon from './icons/LinkedInIcon';

const SocialIcon: React.FC<{ name: string }> = ({ name }) => {
    switch (name) {
        case 'LinkedIn': return <LinkedInIcon className="w-5 h-5" />;
        case 'Behance': return <BehanceIcon className="w-5 h-5" />;
        case 'Github': return <GithubIcon className="w-5 h-5" />;
        case 'Instagram': return <InstagramIcon className="w-5 h-5" />;
        default: return null;
    }
};

const Footer: React.FC = () => {
    const { content } = useContent();

    if (!content) return null;

    const navLinks = [
        { path: '/portfolio', label: 'Portfolio' },
        { path: '/about', label: 'About' },
        { path: '/contact', label: 'Contact' },
    ];

    return (
        <footer className="bg-neutral-900/50 border-t border-neutral-800">
            <div className="max-w-screen-xl mx-auto px-6 py-8 md:px-12 lg:px-24">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-white font-black text-2xl tracking-tighter">V</Link>
                    </div>

                    <nav className="flex items-center gap-6 md:gap-8">
                        {navLinks.map(link => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className="text-sm text-neutral-400 hover:text-white transition-colors duration-300"
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="flex items-center gap-6">
                        {content.socialLinks.map(link => (
                            <a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-neutral-500 hover:text-white transition-colors duration-300"
                                aria-label={link.name}
                            >
                                <SocialIcon name={link.name} />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-neutral-800 text-center text-neutral-500 text-xs">
                    <p>&copy; {new Date().getFullYear()} Vikas. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
