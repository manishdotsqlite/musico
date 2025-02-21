declare global {
  interface Window {
    ENV: {
      CLOUDINARY_URL: string;
      CLOUDINARY_NAME: string;
    };
  }
}

export {};
