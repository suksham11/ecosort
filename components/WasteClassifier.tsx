// components/WasteClassifier.tsx

"use client"; // This directive marks the component as a Client Component

import { useState } from "react";

// Type definition for the classification result
interface ClassificationResult {
  item: string;
  category: string;
  isMixed?: boolean;
  suggestion?: string;
}

// Text-based classification logic (runs on the client)
const wasteDatabase: { [key: string]: string } = {
  "apple core": "organic",
  "banana peel": "organic",
  "vegetable scraps": "organic",
  paper: "recyclable",
  "cardboard box": "recyclable",
  "plastic bottle": "recyclable",
  batteries: "hazardous",
  "paint can": "hazardous",
  "light bulb": "hazardous",
  "old phone": "e-waste",
  charger: "e-waste",
  laptop: "e-waste",
};

const getWasteCategory = (item: string): string => {
  const lowerItem = item.toLowerCase().trim();
  for (const key in wasteDatabase) {
    if (lowerItem.includes(key)) return wasteDatabase[key];
  }
  return "general";
};

// Image resizing function (runs on the client before upload)
const resizeImage = (
  file: File,
  maxWidth: number,
  maxHeight: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.8));
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};

export default function WasteClassifier() {
  const [textInput, setTextInput] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!textInput.trim()) return;
    const category = getWasteCategory(textInput);
    setResult({ item: textInput, category });

    // Save to database
    try {
      await fetch("/api/waste-classifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wasteType:
            category === "organic"
              ? "biodegradable"
              : category === "recyclable"
                ? "recyclable"
                : category === "hazardous"
                  ? "hazardous"
                  : "unknown",
          confidence: 75,
          userId: "guest-user",
        }),
      });
    } catch (err) {
      console.error("Failed to save classification:", err);
    }

    setTextInput("");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setError("");
      setResult(null);
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleImageSubmit = async () => {
    if (!imageFile) return;
    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const resizedBase64 = await resizeImage(imageFile, 800, 800);
      const base64ImageData = resizedBase64.split(",")[1];

      const response = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: base64ImageData,
          mimeType: "image/jpeg",
        }),
      });

      const data = await response.json();

      // Check if the response indicates non-waste image
      if (!response.ok || data.isWaste === false) {
        throw new Error(data.message || "This image does not contain waste items. Please upload an image of waste, trash, or recyclable materials.");
      }

      // Set result with mixed waste info if applicable
      setResult({
        item: imageFile.name,
        category: data.category,
        isMixed: data.isMixed || false,
        suggestion: data.suggestion || ''
      });

      // Save to database only if it's valid waste
      try {
        await fetch("/api/waste-classifications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            wasteType:
              data.category === "organic"
                ? "biodegradable"
                : data.category === "recyclable"
                  ? "recyclable"
                  : data.category === "hazardous"
                    ? "hazardous"
                    : data.category === "e-waste"
                      ? "e-waste"
                      : "unknown",
            confidence: 85,
            userId: "guest-user",
            imageUrl: resizedBase64,
          }),
        });
      } catch (err) {
        console.error("Failed to save classification:", err);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setImageFile(null);
      setImagePreview(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg space-y-8">
      {/* Text Classifier */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Classify by Text
        </h2>
        <form onSubmit={handleTextSubmit} className="flex gap-4">
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="e.g., 'plastic bottle'"
            className="flex-grow px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Classify
          </button>
        </form>
      </div>
      <hr />
      {/* Image Classifier */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Classify by Image
        </h2>
        <div className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
          {imagePreview && (
            <div className="text-center space-y-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-60 mx-auto rounded-lg shadow-md"
              />
              <button
                onClick={handleImageSubmit}
                disabled={isLoading}
                className="w-full bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
              >
                {isLoading ? "Analyzing..." : "Classify with AI"}
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Result Display */}
      {error && (
        <p className="text-red-500 text-center font-semibold">{error}</p>
      )}
      {result && (
        <div className={`p-6 rounded-lg text-center ${result.isMixed ? 'bg-yellow-50 border-2 border-yellow-400' : 'bg-green-50'
          }`}>
          <p className="text-gray-600">
            The item{" "}
            <span className="font-bold text-gray-800">"{result.item}"</span> is
            classified as:
          </p>
          <p className={`text-3xl font-bold capitalize mt-2 ${result.isMixed ? 'text-yellow-700' : 'text-green-700'
            }`}>
            {result.category}
          </p>
          {result.isMixed && (
            <div className="mt-4 p-4 bg-yellow-100 rounded-lg text-left">
              <p className="font-semibold text-yellow-800 mb-2">⚠️ Mixed Waste Detected</p>
              <p className="text-sm text-yellow-900">{result.suggestion}</p>
              <p className="text-xs text-yellow-700 mt-2 italic">
                Tip: Photograph each item separately for accurate classification
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
