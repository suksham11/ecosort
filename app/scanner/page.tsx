"use client";
import React, { useState } from "react";
import {
  Camera,
  Scan,
  Package,
  CheckCircle,
  Info,
  Sparkles,
} from "lucide-react";
import BarcodeScanner from "@/components/BarcodeScanner";

export default function BarcodeScannerPage() {
  const [showScanner, setShowScanner] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);

  const productDatabase: any = {
    "8901030123450": {
      name: "Plastic Bottle 500ml",
      brand: "EcoWater",
      category: "Plastic & Glass",
      recyclable: true,
      material: "PET Plastic",
      disposalInstructions: [
        "Rinse thoroughly",
        "Remove cap and label",
        "Flatten to save space",
        "Place in blue recycling bin",
      ],
      ecoScore: 85,
      points: 10,
    },
    "8901030987654": {
      name: "Cardboard Box",
      brand: "Generic",
      category: "Paper & Cardboard",
      recyclable: true,
      material: "Corrugated Cardboard",
      disposalInstructions: [
        "Flatten the box",
        "Remove any tape or staples",
        "Keep it dry",
        "Place in green recycling bin",
      ],
      ecoScore: 95,
      points: 8,
    },
    "8901030456789": {
      name: "Aluminum Can",
      brand: "RefreshCo",
      category: "Metal & Cans",
      recyclable: true,
      material: "Aluminum",
      disposalInstructions: [
        "Rinse the can",
        "Crush to save space",
        "No need to remove tab",
        "Place in metal recycling bin",
      ],
      ecoScore: 98,
      points: 12,
    },
  };

  const handleScan = (barcode: string) => {
    const product = productDatabase[barcode];
    if (product) {
      setScannedData({ barcode, ...product });
    } else {
      setScannedData({
        barcode,
        name: "Unknown Product",
        recyclable: false,
        message:
          "Product not found in database. Please dispose according to local guidelines.",
      });
    }
    setShowScanner(false);
  };

  return (
    <div className="space-y-6">
      {/* Scanner Area */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700 mb-8">
        <div className="relative bg-gray-900 rounded-2xl overflow-hidden min-h-[400px] flex items-center justify-center">
          {scannedData ? (
            <div className="w-full p-8">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                <div className="flex items-center gap-4 mb-6">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Scan Successful!
                    </h3>
                    <p className="text-gray-300">
                      Barcode: {scannedData.barcode}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Product</p>
                    <p className="text-white font-bold">{scannedData.name}</p>
                  </div>
                  {scannedData.brand && (
                    <div className="bg-white/10 rounded-xl p-4">
                      <p className="text-gray-400 text-sm mb-1">Brand</p>
                      <p className="text-white font-bold">
                        {scannedData.brand}
                      </p>
                    </div>
                  )}
                  {scannedData.material && (
                    <div className="bg-white/10 rounded-xl p-4">
                      <p className="text-gray-400 text-sm mb-1">Material</p>
                      <p className="text-white font-bold">
                        {scannedData.material}
                      </p>
                    </div>
                  )}
                  {scannedData.ecoScore && (
                    <div className="bg-white/10 rounded-xl p-4">
                      <p className="text-gray-400 text-sm mb-1">Eco Score</p>
                      <p className="text-green-400 font-bold text-xl">
                        {scannedData.ecoScore}/100
                      </p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setScannedData(null)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:shadow-xl transition-all"
                >
                  Scan Another
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <Package className="w-24 h-24 text-gray-500 mx-auto" />
              <p className="text-white text-xl font-bold">
                Ready to scan product barcode
              </p>
              <button
                onClick={() => setShowScanner(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform shadow-xl flex items-center gap-3 mx-auto"
              >
                <Camera className="w-6 h-6" />
                Start Camera Scanning
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Disposal Instructions */}
      {scannedData && scannedData.disposalInstructions && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <Info className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              Disposal Instructions
            </h2>
          </div>

          <div className="space-y-3 mb-6">
            {scannedData.disposalInstructions.map(
              (instruction: string, index: number) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {instruction}
                  </span>
                </div>
              )
            )}
          </div>

          {scannedData.points && (
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/90 text-sm font-semibold mb-1">
                    Points Earned
                  </p>
                  <p className="text-3xl font-black">
                    +{scannedData.points} EcoPoints
                  </p>
                </div>
                <Sparkles className="w-12 h-12 text-yellow-300" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Camera Scanner Modal */}
      {showScanner && (
        <BarcodeScanner
          onScan={handleScan}
          onClose={() => setShowScanner(false)}
        />
      )}
    </div>
  );
}
