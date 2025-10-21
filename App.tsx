
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { StyleSelector } from './components/StyleSelector';
import { ImageDisplay } from './components/ImageDisplay';
import { Loader } from './components/Loader';
import { generateHeadshot } from './services/geminiService';
import { ImageData, StyleOption } from './types';
import { STYLE_OPTIONS } from './constants';

const App: React.FC = () => {
    const [originalImage, setOriginalImage] = useState<ImageData | null>(null);
    const [generatedImage, setGeneratedImage] = useState<ImageData | null>(null);
    const [selectedStyle, setSelectedStyle] = useState<StyleOption | null>(null);
    const [customPrompt, setCustomPrompt] = useState<string>('');
    const [extraInstructions, setExtraInstructions] = useState<string>('');
    const [refinementPrompt, setRefinementPrompt] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileSelect = (imageData: ImageData) => {
        setOriginalImage(imageData);
        setGeneratedImage(null);
        setError(null);
    };

    const handleStyleSelect = (style: StyleOption) => {
        setSelectedStyle(style);
        setExtraInstructions(''); // Reset extra instructions when style changes
    };

    const handleGenerate = useCallback(async () => {
        if (!originalImage || !selectedStyle) {
            setError("Please upload an image and select a style.");
            return;
        }

        let prompt = selectedStyle.id === 'open' ? customPrompt : selectedStyle.prompt;

        if (selectedStyle.id !== 'open' && extraInstructions) {
            prompt += `. ${extraInstructions}`;
        }

        if (!prompt) {
            setError("Please provide a prompt for the 'Open' style.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);

        try {
            const newImage = await generateHeadshot(originalImage, prompt);
            setGeneratedImage(newImage);
        } catch (e) {
            console.error(e);
            setError(e instanceof Error ? e.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [originalImage, selectedStyle, customPrompt, extraInstructions]);
    
    const handleRefine = useCallback(async () => {
        if (!generatedImage || !refinementPrompt) {
            setError("Please add a refinement instruction.");
            return;
        }

        setIsLoading(true);
        setError(null);
        
        try {
            // Use the currently generated image as the source for refinement
            const newImage = await generateHeadshot(generatedImage, refinementPrompt);
            setGeneratedImage(newImage);
            setRefinementPrompt(''); // Clear input after submission
        } catch (e) {
            console.error(e);
            setError(e instanceof Error ? e.message : 'An unknown error occurred during refinement.');
        } finally {
            setIsLoading(false);
        }
    }, [generatedImage, refinementPrompt]);

    const isGenerateDisabled = !originalImage || !selectedStyle || (selectedStyle?.id === 'open' && !customPrompt);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
            {isLoading && <Loader />}
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column: Controls */}
                    <div className="flex flex-col gap-8">
                        <FileUpload onFileSelect={handleFileSelect} currentImage={originalImage} />
                        <StyleSelector
                            styles={STYLE_OPTIONS}
                            selectedStyle={selectedStyle}
                            onStyleSelect={handleStyleSelect}
                            customPrompt={customPrompt}
                            onCustomPromptChange={setCustomPrompt}
                        />

                        {selectedStyle && selectedStyle.id !== 'open' && (
                            <div className="-mt-4">
                                <label htmlFor="extra-instructions" className="block text-sm font-medium text-gray-300 mb-2">
                                    Extra Instructions (Optional)
                                </label>
                                <input
                                    id="extra-instructions"
                                    type="text"
                                    value={extraInstructions}
                                    onChange={(e) => setExtraInstructions(e.target.value)}
                                    placeholder="e.g., 'wearing a dark blue suit' or 'smiling more'"
                                    className="w-full bg-gray-700 border border-gray-600 text-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                />
                            </div>
                        )}
                        
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerateDisabled || isLoading}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 text-lg shadow-lg shadow-indigo-600/30"
                        >
                            Generate Headshot
                        </button>
                         {error && <div className="mt-4 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg">{error}</div>}
                    </div>

                    {/* Right Column: Display */}
                    <ImageDisplay 
                      originalImage={originalImage}
                      generatedImage={generatedImage}
                      refinementPrompt={refinementPrompt}
                      onRefinementChange={setRefinementPrompt}
                      onRefine={handleRefine}
                      isLoading={isLoading}
                    />
                </div>
            </main>
        </div>
    );
};

export default App;
