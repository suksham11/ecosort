"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Camera,
  Upload,
  RotateCcw,
  CheckCircle,
  Award,
  TrendingUp,
  Zap,
  Target,
  ArrowLeft,
  Sparkles,
  Trophy,
  Flame,
  Star,
} from "lucide-react";

const WasteClassificationDashboard = () => {
  const [currentView, setCurrentView] = useState("camera"); // camera, results, progress
  const [isScanning, setIsScanning] = useState(false);
  type WasteCategory = keyof typeof wasteCategories;

  type ClassificationResult = {
    item: string;
    category: WasteCategory;
    confidence: number;
    points: number;
    suggestions: string[];
  } | null;

  const [classificationResult, setClassificationResult] =
    useState<ClassificationResult>(null);
  const [userStats, setUserStats] = useState({
    totalItems: 1247,
    todayItems: 23,
    accuracy: 94,
    ecoPoints: 3840,
    streak: 12,
    co2Saved: 45.8,
  });
  const [recentClassifications, setRecentClassifications] = useState([
    {
      id: 1,
      item: "Plastic Bottle",
      category: "Plastic & Glass",
      confidence: 97,
      points: 10,
      time: "2 min ago",
    },
    {
      id: 2,
      item: "Newspaper",
      category: "Paper & Cardboard",
      confidence: 95,
      points: 8,
      time: "5 min ago",
    },
    {
      id: 3,
      item: "Aluminum Can",
      category: "Metal & Cans",
      confidence: 98,
      points: 12,
      time: "8 min ago",
    },
    {
      id: 4,
      item: "Apple Core",
      category: "Organic Waste",
      confidence: 92,
      points: 6,
      time: "12 min ago",
    },
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const wasteCategories = {
    "Paper & Cardboard": {
      color: "bg-green-500",
      emoji: "🗞️",
      description: "Recyclable paper products",
    },
    "Plastic & Glass": {
      color: "bg-blue-500",
      emoji: "🍶",
      description: "Recyclable containers",
    },
    "Metal & Cans": {
      color: "bg-yellow-500",
      emoji: "🥫",
      description: "Metal recyclables",
    },
    "Organic Waste": {
      color: "bg-purple-500",
      emoji: "🍎",
      description: "Compostable materials",
    },
    "Electronic Waste": {
      color: "bg-red-500",
      emoji: "📱",
      description: "Electronic devices",
    },
    Hazardous: {
      color: "bg-orange-500",
      emoji: "⚠️",
      description: "Special disposal required",
    },
  };

  const simulateClassification = () => {
    setIsScanning(true);
    setCurrentView("camera");

    // Simulate scanning process
    setTimeout(() => {
      const categories = Object.keys(wasteCategories);
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];
      const confidence = Math.floor(Math.random() * 20) + 80; // 80-99%
      const points = Math.floor(confidence / 10);

      const items = {
        "Paper & Cardboard": [
          "Newspaper",
          "Cardboard Box",
          "Office Paper",
          "Magazine",
        ],
        "Plastic & Glass": [
          "Plastic Bottle",
          "Glass Jar",
          "Food Container",
          "Beverage Bottle",
        ],
        "Metal & Cans": [
          "Aluminum Can",
          "Steel Container",
          "Metal Scrap",
          "Tin Can",
        ],
        "Organic Waste": [
          "Apple Core",
          "Banana Peel",
          "Food Scraps",
          "Garden Waste",
        ],
        "Electronic Waste": ["Old Phone", "Battery", "Circuit Board", "Cable"],
        Hazardous: [
          "Paint Can",
          "Chemical Container",
          "Aerosol Can",
          "Light Bulb",
        ],
      };

      const randomItem =
        items[randomCategory as keyof typeof items][
        Math.floor(
          Math.random() * items[randomCategory as keyof typeof items].length
        )
        ];

      const result = {
        item: randomItem,
        category: randomCategory as WasteCategory,
        confidence: confidence,
        points: points,
        suggestions: [
          "Clean the item before disposal",
          "Remove any labels if possible",
          "Check local recycling guidelines",
        ],
      };

      setClassificationResult(result);
      setUserStats((prev) => ({
        ...prev,
        todayItems: prev.todayItems + 1,
        totalItems: prev.totalItems + 1,
        ecoPoints: prev.ecoPoints + points,
      }));

      // Add to recent classifications
      setRecentClassifications((prev) => [
        {
          id: Date.now(),
          item: randomItem,
          category: randomCategory,
          confidence: confidence,
          points: points,
          time: "Just now",
        },
        ...prev.slice(0, 3),
      ]);

      setIsScanning(false);
      setCurrentView("results");
    }, 3000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      simulateClassification();
    }
  };

  const CameraView = () => (
    <div className="bg-gray-900 rounded-3xl p-8 text-center relative overflow-hidden min-h-[500px] flex flex-col justify-center">
      {isScanning && (
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 animate-pulse"></div>
      )}

      <div className="relative z-10">
        {isScanning ? (
          <div className="space-y-6">
            <div className="w-24 h-24 mx-auto border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-white text-xl font-semibold">
              Analyzing waste item...
            </div>
            <div className="text-green-400 text-sm">
              AI Classification in progress
            </div>
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-6xl mb-6">📸</div>
            <div className="text-white text-2xl font-bold mb-4">
              Ready to Classify Waste
            </div>
            <div className="text-gray-300 text-lg mb-8">
              Point your camera at any waste item for instant AI classification
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={simulateClassification}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-500/25 flex items-center gap-3"
              >
                <Camera className="w-5 h-5" />
                Start Camera Scan
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center gap-3"
              >
                <Upload className="w-5 h-5" />
                Upload Image
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        )}
      </div>

      {/* Scanning overlay effect */}
      {isScanning && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-pulse"></div>
        </div>
      )}
    </div>
  );

  const ResultsView = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Classification Complete!
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              AI analysis finished
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">
                {classificationResult?.category
                  ? wasteCategories[classificationResult.category].emoji
                  : ""}
              </span>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                {classificationResult?.item}
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {classificationResult?.category}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Confidence:
              </div>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${classificationResult?.category
                    ? wasteCategories[classificationResult.category].color
                    : ""
                    }`}
                  style={{ width: `${classificationResult?.confidence}%` }}
                ></div>
              </div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {classificationResult?.confidence}%
              </div>
            </div>

            <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 p-3 rounded-xl">
              <Award className="w-5 h-5 text-green-600" />
              <span className="text-green-800 dark:text-green-200 font-semibold">
                +{classificationResult?.points} EcoPoints Earned!
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h5 className="font-semibold text-gray-900 dark:text-white">
              Disposal Tips:
            </h5>
            <ul className="space-y-2">
              {classificationResult?.suggestions.map((tip, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setCurrentView("camera")}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Scan Another Item
          </button>
          <button
            onClick={() => setCurrentView("progress")}
            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 flex items-center gap-2"
          >
            <TrendingUp className="w-4 h-4" />
            View Progress
          </button>
        </div>
      </div>
    </div>
  );

  const ProgressView = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-6 h-6" />
            <span className="text-sm opacity-90">Total Items</span>
          </div>
          <div className="text-3xl font-bold">
            {userStats.totalItems.toLocaleString()}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-6 h-6" />
            <span className="text-sm opacity-90">Today's Items</span>
          </div>
          <div className="text-3xl font-bold">{userStats.todayItems}</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-6 h-6" />
            <span className="text-sm opacity-90">EcoPoints</span>
          </div>
          <div className="text-3xl font-bold">
            {userStats.ecoPoints.toLocaleString()}
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6" />
            <span className="text-sm opacity-90">CO₂ Saved</span>
          </div>
          <div className="text-3xl font-bold">{userStats.co2Saved}kg</div>
        </div>
      </div>

      {/* Recent Classifications */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Recent Classifications
        </h3>
        <div className="space-y-3">
          {recentClassifications.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
            >
              <span className="text-2xl">
                {wasteCategories[item.category as WasteCategory]?.emoji}
              </span>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 dark:text-white">
                  {item.item}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {item.category}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-green-600">
                  +{item.points} pts
                </div>
                <div className="text-xs text-gray-500">
                  {item.confidence}% • {item.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => setCurrentView("camera")}
        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-2xl font-semibold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-green-500/25 flex items-center justify-center gap-3"
      >
        <Camera className="w-5 h-5" />
        Start New Classification
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-900 dark:to-green-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="w-12 h-12 bg-green-600 hover:bg-green-700 rounded-xl flex items-center justify-center transition-colors duration-300"
              title="Back to Home"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Waste Classification Hub
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                AI-powered smart sorting dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/50 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-700 dark:text-green-300 text-sm font-medium">
                AI Ready
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Award className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold">{userStats.ecoPoints} pts</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 bg-white dark:bg-gray-800 p-2 rounded-2xl border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setCurrentView("camera")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex-1 ${currentView === "camera"
              ? "bg-green-500 text-white shadow-lg"
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
          >
            <Camera className="w-4 h-4 inline mr-2" />
            Classify
          </button>
          <button
            onClick={() => setCurrentView("results")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex-1 ${currentView === "results"
              ? "bg-green-500 text-white shadow-lg"
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            disabled={!classificationResult}
          >
            <CheckCircle className="w-4 h-4 inline mr-2" />
            Results
          </button>
          <button
            onClick={() => setCurrentView("progress")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex-1 ${currentView === "progress"
              ? "bg-green-500 text-white shadow-lg"
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
          >
            <TrendingUp className="w-4 h-4 inline mr-2" />
            Progress
          </button>
        </div>

        {/* Main Content */}
        <div className="transition-all duration-500">
          {currentView === "camera" && <CameraView />}
          {currentView === "results" && classificationResult && <ResultsView />}
          {currentView === "progress" && <ProgressView />}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          {Object.entries(wasteCategories).map(([category, info]) => (
            <div
              key={category}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{info.emoji}</span>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                  {category}
                </div>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {info.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WasteClassificationDashboard;
