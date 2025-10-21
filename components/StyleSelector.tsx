
import React from 'react';
import { StyleOption } from '../types';

interface StyleSelectorProps {
    styles: StyleOption[];
    selectedStyle: StyleOption | null;
    onStyleSelect: (style: StyleOption) => void;
    customPrompt: string;
    onCustomPromptChange: (prompt: string) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyle, onStyleSelect, customPrompt, onCustomPromptChange }) => {
    return (
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-gray-100">2. Choose a Style</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {styles.map(style => (
                    <button
                        key={style.id}
                        onClick={() => onStyleSelect(style)}
                        className={`p-3 rounded-lg text-left transition-all duration-200 border-2 ${selectedStyle?.id === style.id ? 'bg-indigo-600 border-indigo-500' : 'bg-gray-700 hover:bg-gray-600 border-gray-600 hover:border-gray-500'}`}
                    >
                        <h3 className="font-semibold text-sm text-white">{style.title}</h3>
                        <p className="text-xs text-gray-300 mt-1">{style.description}</p>
                    </button>
                ))}
            </div>
            {selectedStyle?.id === 'open' && (
                <div className="mt-6">
                    <label htmlFor="custom-prompt" className="block text-sm font-medium text-gray-300 mb-2">Your Custom Instructions:</label>
                    <textarea
                        id="custom-prompt"
                        rows={4}
                        className="w-full bg-gray-700 border border-gray-600 text-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        placeholder="e.g., A headshot of the person as a futuristic astronaut on Mars, with a helmet under their arm..."
                        value={customPrompt}
                        onChange={(e) => onCustomPromptChange(e.target.value)}
                    />
                </div>
            )}
        </div>
    );
};
