"use client";
import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Camera,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Recycle,
  Trash2,
  Leaf,
} from "lucide-react";

export default function GuidePage() {
  const wasteCategories = [
    {
      name: "Paper & Cardboard",
      emoji: "🗞️",
      color:
        "from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-800/50",
      textColor: "text-green-800 dark:text-green-200",
      examples: [
        "Newspapers and magazines",
        "Cardboard boxes",
        "Office paper",
        "Paper bags",
        "Envelopes (without plastic windows)",
      ],
      dos: [
        "Remove any plastic or metal components",
        "Flatten cardboard boxes to save space",
        "Keep paper clean and dry",
      ],
      donts: [
        "Don't recycle greasy or food-stained paper",
        "Don't include tissue paper or paper towels",
        "Don't mix with plastic-coated paper",
      ],
    },
    {
      name: "Plastic & Glass",
      emoji: "🍶",
      color:
        "from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50",
      textColor: "text-blue-800 dark:text-blue-200",
      examples: [
        "Water and beverage bottles",
        "Food containers",
        "Glass jars and bottles",
        "Plastic packaging",
        "Shampoo bottles",
      ],
      dos: [
        "Rinse containers before recycling",
        "Remove caps and labels when possible",
        "Check the recycling symbol",
      ],
      donts: [
        "Don't include broken glass",
        "Don't mix different types of plastic",
        "Don't include plastic bags",
      ],
    },
    {
      name: "Metal & Cans",
      emoji: "🥫",
      color:
        "from-yellow-100 to-orange-200 dark:from-yellow-900/50 dark:to-orange-800/50",
      textColor: "text-orange-800 dark:text-orange-200",
      examples: [
        "Aluminum cans",
        "Steel food cans",
        "Metal bottle caps",
        "Clean aluminum foil",
        "Metal lids",
      ],
      dos: [
        "Rinse food and beverage cans",
        "Crush cans to save space",
        "Remove paper labels if possible",
      ],
      donts: [
        "Don't include aerosol cans",
        "Don't recycle paint cans",
        "Don't include metal with food residue",
      ],
    },
    {
      name: "Organic Waste",
      emoji: "🍎",
      color:
        "from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50",
      textColor: "text-purple-800 dark:text-purple-200",
      examples: [
        "Fruit and vegetable scraps",
        "Coffee grounds and tea bags",
        "Eggshells",
        "Garden waste",
        "Food leftovers",
      ],
      dos: [
        "Use for composting when possible",
        "Separate from other waste types",
        "Keep in sealed containers",
      ],
      donts: [
        "Don't include meat or dairy products",
        "Don't mix with plastic bags",
        "Don't include diseased plants",
      ],
    },
  ];

  const steps = [
    {
      number: 1,
      icon: <Camera className="w-8 h-8" />,
      title: "Capture or Describe",
      description:
        "Take a photo of your waste item or describe it using text input for quick classification.",
    },
    {
      number: 2,
      icon: <CheckCircle className="w-8 h-8" />,
      title: "AI Analysis",
      description:
        "Our advanced AI analyzes the item and determines the correct waste category with high accuracy.",
    },
    {
      number: 3,
      icon: <Recycle className="w-8 h-8" />,
      title: "Get Guidelines",
      description:
        "Receive specific disposal instructions and tips for proper waste management.",
    },
    {
      number: 4,
      icon: <Leaf className="w-8 h-8" />,
      title: "Earn Rewards",
      description:
        "Collect EcoPoints for each classification and track your environmental impact over time.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-green-900">
      {/* Header */}
      <header className="w-full px-6 py-4 flex items-center justify-between bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-green-200 dark:border-green-700 sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">♻</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            EcoSort
          </h1>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-gray-600 dark:text-gray-300 hover:text-green-600 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/features"
            className="text-gray-600 dark:text-gray-300 hover:text-green-600 transition-colors"
          >
            Features
          </Link>
          <Link
            href="/guide"
            className="text-green-600 dark:text-green-400 font-semibold"
          >
            Guide
          </Link>
          <Link
            href="/impact"
            className="text-gray-600 dark:text-gray-300 hover:text-green-600 transition-colors"
          >
            Impact
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/50 px-4 py-2 rounded-full text-green-700 dark:text-green-300 text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            Complete Waste Sorting Guide
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Master Waste
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
              {" "}
              Segregation
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
            Learn how to properly sort your waste and make a positive impact on
            the environment with our comprehensive guide.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  {step.number}
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white mb-6 mx-auto">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waste Categories Guide */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Waste Categories Guide
          </h2>
          <div className="space-y-8">
            {wasteCategories.map((category, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${category.color} rounded-3xl p-8 border border-gray-200 dark:border-gray-700`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-5xl">{category.emoji}</span>
                  <h3 className={`text-3xl font-bold ${category.textColor}`}>
                    {category.name}
                  </h3>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Examples */}
                  <div>
                    <h4
                      className={`font-bold ${category.textColor} mb-3 flex items-center gap-2`}
                    >
                      <Trash2 className="w-5 h-5" />
                      Examples
                    </h4>
                    <ul className="space-y-2">
                      {category.examples.map((example, idx) => (
                        <li
                          key={idx}
                          className={`flex items-start gap-2 text-sm ${category.textColor}`}
                        >
                          <div className="w-1.5 h-1.5 bg-current rounded-full mt-2 flex-shrink-0"></div>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Do's */}
                  <div>
                    <h4
                      className={`font-bold ${category.textColor} mb-3 flex items-center gap-2`}
                    >
                      <CheckCircle className="w-5 h-5" />
                      Do's
                    </h4>
                    <ul className="space-y-2">
                      {category.dos.map((item, idx) => (
                        <li
                          key={idx}
                          className={`flex items-start gap-2 text-sm ${category.textColor}`}
                        >
                          <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Don'ts */}
                  <div>
                    <h4
                      className={`font-bold ${category.textColor} mb-3 flex items-center gap-2`}
                    >
                      <AlertCircle className="w-5 h-5" />
                      Don'ts
                    </h4>
                    <ul className="space-y-2">
                      {category.donts.map((item, idx) => (
                        <li
                          key={idx}
                          className={`flex items-start gap-2 text-sm ${category.textColor}`}
                        >
                          <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-12 text-white">
          <div className="flex items-center gap-4 mb-6">
            <Lightbulb className="w-12 h-12" />
            <h2 className="text-4xl font-bold">Quick Tips</h2>
          </div>
          <ul className="space-y-4 text-lg">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-white rounded-full mt-3 flex-shrink-0"></div>
              <span>
                Always rinse containers before recycling to prevent
                contamination
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-white rounded-full mt-3 flex-shrink-0"></div>
              <span>
                Check local recycling guidelines as they may vary by region
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-white rounded-full mt-3 flex-shrink-0"></div>
              <span>
                When in doubt, use the EcoSort app to classify your waste items
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-white rounded-full mt-3 flex-shrink-0"></div>
              <span>
                Reduce waste by choosing reusable alternatives whenever possible
              </span>
            </li>
          </ul>
          <Link
            href="/content"
            className="inline-block mt-8 bg-white text-green-600 font-semibold text-lg px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Start Classifying Now →
          </Link>
        </div>
      </section>
    </div>
  );
}
