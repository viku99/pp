import React from 'react';

const BehanceIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        className={className}
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <path d="M14 7h-4v2h4v2h-4v3h4v2H6V5h8a2 2 0 0 1 2 2v2a2 2 0 0 1-2-2zM17 12h4v2h-4z"></path>
    </svg>
);

export default BehanceIcon;
