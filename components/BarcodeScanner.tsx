"use client";
import React, { useState, useRef, useEffect } from "react";
import { Camera, X, CheckCircle, AlertCircle, Loader } from "lucide-react";
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
  onClose: () => void;
}

export default function BarcodeScanner({
  onScan,
  onClose,
}: BarcodeScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detectedBarcode, setDetectedBarcode] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);
  const [manualInput, setManualInput] = useState("");

  useEffect(() => {
    startScanning();
    return () => {
      stopScanning();
    };
  }, []);

  const startScanning = async () => {
    try {
      setIsScanning(true);
      setError(null);

      // Initialize the barcode reader
      codeReaderRef.current = new BrowserMultiFormatReader();

      // Get available video devices
      const videoInputDevices = await codeReaderRef.current.listVideoInputDevices();

      if (videoInputDevices.length === 0) {
        throw new Error("No camera found");
      }

      // Try to find back camera (environment facing)
      const backCamera = videoInputDevices.find(device =>
        device.label.toLowerCase().includes('back') ||
        device.label.toLowerCase().includes('environment')
      );

      const selectedDeviceId = backCamera?.deviceId || videoInputDevices[0].deviceId;

      // Start continuous scanning
      if (videoRef.current) {
        await codeReaderRef.current.decodeFromVideoDevice(
          selectedDeviceId,
          videoRef.current,
          (result, error) => {
            if (result) {
              // Barcode detected!
              const barcodeText = result.getText();
              setDetectedBarcode(barcodeText);

              // Vibrate if supported
              if (navigator.vibrate) {
                navigator.vibrate(200);
              }

              // Auto-submit after detection
              setTimeout(() => {
                onScan(barcodeText);
              }, 500);
            }

            if (error && !(error instanceof NotFoundException)) {
              console.error('Barcode scanning error:', error);
            }
          }
        );
      }
    } catch (err: any) {
      console.error('Camera error:', err);
      setError(err.message || "Unable to access camera. Please check permissions.");
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
      codeReaderRef.current = null;
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualInput.trim()) {
      onScan(manualInput.trim());
      setManualInput("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <div className="w-full h-full max-w-2xl relative flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Scan Barcode</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Camera View */}
        <div className="flex-1 relative bg-black">
          {error ? (
            <div className="h-full flex flex-col items-center justify-center p-6 text-center">
              <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
              <p className="text-white text-lg mb-4">{error}</p>
              <button
                onClick={startScanning}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Scanning Frame Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={`relative w-64 h-40 border-4 rounded-lg transition-colors ${detectedBarcode ? 'border-green-400' : 'border-green-500'
                  }`}>
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-lg"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg"></div>

                  {/* Detection Indicator */}
                  {detectedBarcode && (
                    <div className="absolute inset-0 flex items-center justify-center bg-green-500/20">
                      <CheckCircle className="w-12 h-12 text-green-400 animate-pulse" />
                    </div>
                  )}
                </div>
              </div>

              {/* Scanning Line Animation */}
              {!detectedBarcode && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-64 h-40 relative overflow-hidden">
                    <div className="absolute inset-0 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-scan"></div>
                  </div>
                </div>
              )}

              {/* Status Text */}
              <div className="absolute bottom-24 left-0 right-0 text-center pointer-events-none">
                {detectedBarcode ? (
                  <div className="bg-green-500/90 text-white px-6 py-3 rounded-full inline-block">
                    <p className="font-bold">✓ Barcode Detected!</p>
                    <p className="text-sm">{detectedBarcode}</p>
                  </div>
                ) : (
                  <div className="bg-black/50 text-white px-6 py-3 rounded-full inline-block">
                    <p className="font-semibold">🔍 Scanning for barcodes...</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Controls */}
        <div className="bg-gray-900 p-6 space-y-4">
          {/* Manual Input */}
          <form onSubmit={handleManualSubmit} className="flex gap-2">
            <input
              type="text"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              placeholder="Or enter barcode manually..."
              className="flex-1 bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
            >
              Submit
            </button>
          </form>

          <p className="text-gray-400 text-sm text-center">
            {detectedBarcode
              ? "Barcode detected! Submitting..."
              : "Position the barcode within the frame for automatic scanning"
            }
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(200%);
          }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
}
