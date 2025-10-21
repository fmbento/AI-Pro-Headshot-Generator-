
import React, { useCallback, useState } from 'react';
import { ImageData } from '../types';

interface FileUploadProps {
    onFileSelect: (imageData: ImageData) => void;
    currentImage: ImageData | null;
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = (error) => reject(error);
  });
};

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, currentImage }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleFile = useCallback(async (file: File | null) => {
        if (file && (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/webp")) {
            try {
                const base64 = await fileToBase64(file);
                const objectUrl = URL.createObjectURL(file);
                onFileSelect({ base64, mimeType: file.type, objectUrl });
            } catch (error) {
                console.error("Error converting file to base64", error);
            }
        } else {
            alert("Please upload a valid image file (jpg, png, webp).");
        }
    }, [onFileSelect]);

    const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };
    const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };
    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        handleFile(e.dataTransfer.files[0]);
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFile(e.target.files ? e.target.files[0] : null);
    };

    return (
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
             <h2 className="text-xl font-semibold mb-4 text-gray-100">1. Upload Your Photo</h2>
            <label
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`flex justify-center items-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300
                    ${isDragging ? 'border-indigo-500 bg-gray-700/50' : 'border-gray-600 hover:border-indigo-500 hover:bg-gray-700/30'}`}
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                    {currentImage ? (
                        <img src={currentImage.objectUrl} alt="Preview" className="max-h-56 rounded-md object-contain" />
                    ) : (
                        <>
                            <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500">PNG, JPG or WEBP</p>
                        </>
                    )}
                </div>
                <input id="dropzone-file" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
            </label>
        </div>
    );
};
