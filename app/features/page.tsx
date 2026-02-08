"use client";
import React from "react";
import Link from "next/link";
import {
  Camera,
  Brain,
  TrendingUp,
  Award,
  Users,
  Smartphone,
  BarChart3,
  Shield,
  Zap,
  Globe,
  Leaf,
  Bell,
} from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Recognition",
      description:
        "Advanced computer vision technology identifies and categorizes waste items with 98% accuracy using deep learning models.",
      color: "from-green-500 to-green-600",
      benefits: [
        "Real-time object detection",
        "Multi-item recognition",
        "Continuous learning",
      ],
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Smart Camera Integration",
      description:
        "Seamless camera integration for instant waste classification. Just point, shoot, and get immediate results.",
      color: "from-blue-500 to-blue-600",
      benefits: [
        "Instant classification",
        "High-quality image processing",
        "Works in various lighting",
      ],
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Real-Time Analytics",
      description:
        "Track your environmental impact with detailed analytics, charts, and progress tracking over time.",
      color: "from-purple-500 to-purple-600",
      benefits: [
        "Daily/weekly/monthly stats",
        "Impact visualization",
        "Progress milestones",
      ],
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Gamified Rewards",
      description:
        "Earn EcoPoints for every correct classification and unlock achievements as you contribute to sustainability.",
      color: "from-yellow-500 to-orange-600",
      benefits: [
        "Points for every scan",
        "Achievement badges",
        "Leaderboard ranking",
      ],
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Features",
      description:
        "Join a global community of eco-conscious users, share tips, and participate in challenges.",
      color: "from-pink-500 to-pink-600",
      benefits: [
        "Community challenges",
        "Share achievements",
        "Learn from others",
      ],
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile-First Design",
      description:
        "Optimized for mobile devices with responsive design that works perfectly on any screen size.",
      color: "from-indigo-500 to-indigo-600",
      benefits: ["Works on all devices", "Touch-optimized", "Fast performance"],
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Detailed Statistics",
      description:
        "Comprehensive statistics showing your sorting accuracy, total items processed, and environmental impact.",
      color: "from-teal-500 to-teal-600",
      benefits: [
        "Sorting accuracy metrics",
        "Category breakdown",
        "Time-based trends",
      ],
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy & Security",
      description:
        "Your data is secure with end-to-end encryption. We never share your personal information.",
      color: "from-red-500 to-red-600",
      benefits: ["Data encryption", "Privacy-first approach", "GDPR compliant"],
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description:
        "Optimized performance ensures instant classification results and smooth user experience.",
      color: "from-yellow-400 to-yellow-600",
      benefits: [
        "Sub-second processing",
        "Efficient algorithms",
        "Low data usage",
      ],
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Database",
      description:
        "Access to a comprehensive global waste database with region-specific disposal guidelines.",
      color: "from-cyan-500 to-cyan-600",
      benefits: [
        "Regional guidelines",
        "Multi-language support",
        "Regular updates",
      ],
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Eco-Impact Tracking",
      description:
        "See your environmental contribution with CO₂ savings, recycling rates, and more.",
      color: "from-green-400 to-green-600",
      benefits: [
        "CO₂ savings calculator",
        "Tree equivalent metrics",
        "Water saved tracking",
      ],
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Smart Notifications",
      description:
        "Get reminders, tips, and updates to help you maintain your eco-friendly habits.",
      color: "from-purple-400 to-purple-600",
      benefits: ["Daily reminders", "Recycling tips", "Achievement alerts"],
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
            className="text-green-600 dark:text-green-400 font-semibold"
          >
            Features
          </Link>
          <Link
            href="/guide"
            className="text-gray-600 dark:text-gray-300 hover:text-green-600 transition-colors"
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
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Powered by Advanced AI Technology
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Features That Make
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
              {" "}
              a Difference
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
            Discover the powerful features that make EcoSort the leading waste
            management platform for sustainable living.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Eco Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of users making a positive impact on the environment.
          </p>
          <Link
            href="/content"
            className="inline-block bg-white text-green-600 font-semibold text-lg px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Start Sorting Now →
          </Link>
        </div>
      </section>
    </div>
  );
}
