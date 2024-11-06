import React, { useState } from 'react';
import {QRCodeSVG} from 'qrcode.react';

interface QRCodeGeneratorProps {
  size?: number;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ size = 256 }) => {
  const [text, setText] = useState<string>('');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">QR Code Generator</h1>
      <input
        type="text"
        placeholder="Enter text or URL"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded-md w-full max-w-md"
      />
      {text && (
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <QRCodeSVG value={text} size={size} level="H"
          />
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
