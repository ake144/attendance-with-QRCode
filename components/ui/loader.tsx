import React from "react";

interface LoaderProps {
  message?: string;
  size?: number; // Optional: Allows customization of spinner size
}

export const Loader: React.FC<LoaderProps> = ({ message = "Loading...", size = 40 }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 min-h-[200px]">
      <div
        className={`animate-spin rounded-full border-t-4 border-primary border-opacity-80`}
        style={{
          width: size,
          height: size,
          borderTopColor: "#4F46E5", // Customize to your theme's primary color
        }}
      ></div>
      {message && <p className="text-gray-500 text-sm">{message}</p>}
    </div>
  );
};
