import React from 'react';
import { ImageData } from '../types';

interface ImageDisplayProps {
    originalImage: ImageData | null;
    generatedImage: ImageData | null;
    refinementPrompt: string;
    onRefinementChange: (prompt: string) => void;
    onRefine: () => void;
    isLoading: boolean;
}

const ImageCard: React.FC<{ title: string, image: ImageData | null, isGenerated?: boolean }> = ({ title, image, isGenerated = false }) => {
  return (
    <div className="group relative w-full aspect-square bg-gray-800 rounded-xl border border-gray-700 flex flex-col items-center justify-center overflow-hidden">
      <h3 className="absolute top-4 left-4 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded-full backdrop-blur-sm z-10">{title}</h3>
      {image ? (
        <img src={image.objectUrl} alt={isGenerated ? "AI generated headshot" : "Original user-uploaded image"} className="w-full h-full object-contain" />
      ) : (
        <div className="text-gray-500 text-center px-4">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            <p>{isGenerated ? "Your generated headshot will appear here." : "Upload an image to start."}</p>
        </div>
      )}
      {isGenerated && image && (
          <a
            href={image.objectUrl}
            download="ai-headshot.png"
            className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            aria-label="Download generated headshot"
            title="Download Image"
          >
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          </a>
      )}
    </div>
  )
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ originalImage, generatedImage, refinementPrompt, onRefinementChange, onRefine, isLoading }) => {
    return (
        <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <ImageCard title="Original" image={originalImage} />
              <ImageCard title="Generated" image={generatedImage} isGenerated={true} />
            </div>

            {generatedImage && (
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <h2 className="text-xl font-semibold mb-4 text-gray-100">3. Refine Your Headshot</h2>
                    <p className="text-sm text-gray-400 mb-4">Not quite right? Add instructions to make changes.</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            value={refinementPrompt}
                            onChange={(e) => onRefinementChange(e.target.value)}
                            placeholder="e.g., 'Make the background darker' or 'Change my shirt to blue'"
                            className="flex-grow bg-gray-700 border border-gray-600 text-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            disabled={isLoading}
                        />
                        <button
                            onClick={onRefine}
                            disabled={isLoading || !refinementPrompt}
                            className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-900 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
                        >
                            Refine
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};