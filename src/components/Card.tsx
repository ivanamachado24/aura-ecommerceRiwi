import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    glass?: boolean;
}

export default function Card({ children, className = '', hover = false, glass = false }: CardProps) {
    const baseClasses = 'rounded-xl p-6 transition-smooth';
    const hoverClasses = hover ? 'card-hover cursor-pointer' : '';
    const glassClasses = glass ? 'glass' : 'bg-white shadow-md';

    return (
        <div className={`${baseClasses} ${glassClasses} ${hoverClasses} ${className}`}>
            {children}
        </div>
    );
}
