import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Camera, X } from 'lucide-react';

interface PhotoCaptureProps {
  onCapture: (photoData: string) => void;
}

export function PhotoCapture({ onCapture }: PhotoCaptureProps) {
  const [isOpen, setIsOpen] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc);
      setIsOpen(false);
    }
  }, [onCapture]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        <Camera size={20} />
        Take Photo
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg">
        <div className="flex justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="rounded-lg"
        />
        <button
          onClick={capture}
          className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Capture Photo
        </button>
      </div>
    </div>
  );
}