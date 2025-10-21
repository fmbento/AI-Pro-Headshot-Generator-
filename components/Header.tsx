
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4">
                <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                    AI Headshot Generator
                </h1>
                <p className="text-center text-gray-400 mt-1">
                  Create authentic, professional headshots in seconds.
                </p>
            </div>
        </header>
    );
};
