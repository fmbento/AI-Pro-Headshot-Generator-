
export interface StyleOption {
  id: string;
  title: string;
  description: string;
  prompt: string;
}

export interface ImageData {
  base64: string; // Base64 string WITHOUT the data URL prefix
  mimeType: string;
  objectUrl: string; // For client-side preview
}
