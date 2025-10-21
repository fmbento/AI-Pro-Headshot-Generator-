
import React from 'react';

export const Loader: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-400"></div>
            <p className="text-white text-lg mt-4 font-semibold">Generating your headshot...</p>
            <p className="text-gray-400 text-sm mt-1">This may take a moment.</p>
        </div>
    );
};
