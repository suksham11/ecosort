"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Sparkles, TrendingUp, Zap, Shield } from "lucide-react";
import IndiaWasteMap from "@/components/IndiaWasteMap";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-green-900 dark:to-blue-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            left: `${mousePosition.x / 50}px`,
            top: `${mousePosition.y / 50}px`,
            transition: "all 0.3s ease-out",
          }}
        />
        <div
          className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            right: `${mousePosition.x / 80}px`,
            bottom: `${mousePosition.y / 80}px`,
            transition: "all 0.5s ease-out",
            animationDelay: "1s",
          }}
        />
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-bounce" />
      </div>
      {/* Premium Header */}
      <header
        className={`w-full px-6 py-4 flex items-center justify-between transition-all duration-300 sticky top-0 z-50 ${
          scrollY > 50
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-xl border-b border-green-200/50 dark:border-green-700/50"
            : "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-green-200/30 dark:border-green-700/30"
        }`}
      >
        <div className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-green-500/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
            <span className="text-white font-bold text-2xl">♻</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              EcoSort
            </h1>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
              AI-Powered Sorting
            </p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-2">
          <Link
            href="/features"
            className="px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300 font-medium"
          >
            Features
          </Link>
          <Link
            href="/guide"
            className="px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300 font-medium"
          >
            Guide
          </Link>
          <Link
            href="/impact"
            className="px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300 font-medium"
          >
            Impact
          </Link>
          <Link
            href="/dashboard"
            className="ml-2 px-6 py-2 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105"
          >
            Go to Dashboard
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Hero Content with 3D Effects */}
          <div className="text-center mb-16 relative">
            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-500 rounded-full animate-ping" />
              <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-blue-500 rounded-full animate-ping animation-delay-1000" />
              <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-purple-500 rounded-full animate-ping animation-delay-2000" />
            </div>

            <div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 px-6 py-3 rounded-full text-green-700 dark:text-green-300 text-sm font-semibold mb-8 shadow-lg border border-green-200 dark:border-green-700/50 backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
              style={{
                transform: `translateY(${scrollY * 0.1}px)`,
              }}
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              Smart Waste Management Platform
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>

            <h2
              className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight"
              style={{
                transform: `perspective(1000px) rotateX(${scrollY * 0.02}deg)`,
                transition: "transform 0.1s ease-out",
              }}
            >
              Revolutionize Your
              <br />
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 animate-gradient">
                  Waste Sorting
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-green-600/20 to-blue-600/20 blur-xl animate-pulse" />
              </span>
            </h2>

            <p
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-medium"
              style={{
                transform: `translateY(${scrollY * 0.05}px)`,
              }}
            >
              Transform waste management with{" "}
              <span className="font-bold text-green-600 dark:text-green-400">
                AI-powered segregation
              </span>
              , real-time tracking, and gamified recycling rewards. Join{" "}
              <span className="font-bold text-blue-600 dark:text-blue-400">
                15,000+ users
              </span>{" "}
              making a sustainable impact.
            </p>

            <div className="flex gap-6 items-center justify-center flex-col sm:flex-row mb-16">
              <Link
                href="/content"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white font-bold text-lg px-10 py-5 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/50 hover:scale-110 transform-gpu"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Zap className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  Start Sorting Now
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-emerald-700 to-green-800 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-white/20 animate-shimmer" />
                </div>
              </Link>

              <Link
                href="/guide"
                className="group relative rounded-2xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold text-lg px-10 py-5 transition-all duration-300 hover:border-green-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 hover:scale-105 backdrop-blur-sm"
              >
                <span className="flex items-center gap-3">
                  <svg
                    className="w-6 h-6 group-hover:rotate-12 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  How It Works
                </span>
              </Link>
            </div>

            {/* Trusted by section */}
            <div className="flex items-center justify-center gap-8 flex-wrap text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Trusted by 15K+ users</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span>2.5M+ items classified</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>98% accuracy rate</span>
              </div>
            </div>
          </div>

          {/* India Live Waste Tracking Map - Right After Hero */}
          <div className="mb-20">
            <IndiaWasteMap />
          </div>

          {/* Premium 3D Stats Cards */}
          <div
            id="impact"
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20"
          >
            {[
              {
                value: "98%",
                label: "Sorting Accuracy",
                color: "green",
                icon: "🎯",
              },
              {
                value: "2.5M",
                label: "Items Processed",
                color: "blue",
                icon: "📊",
              },
              {
                value: "15K+",
                label: "Active Users",
                color: "purple",
                icon: "👥",
              },
              {
                value: "850T",
                label: "CO₂ Saved",
                color: "orange",
                icon: "🌱",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 text-center border border-gray-200/50 dark:border-gray-700/50 hover:scale-110 transition-all duration-500 hover:shadow-2xl hover:shadow-${stat.color}-500/30 transform-gpu cursor-pointer"
                style={{
                  transform: `perspective(1000px) rotateY(${
                    mousePosition.x / 100 - 10
                  }deg) rotateX(${-mousePosition.y / 100 + 5}deg)`,
                  transition: "transform 0.1s ease-out",
                }}
              >
                <div className="text-5xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  {stat.icon}
                </div>
                <div
                  className={`text-4xl font-black text-${stat.color}-600 mb-3 group-hover:scale-110 transition-transform`}
                >
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-semibold text-sm">
                  {stat.label}
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-${stat.color}-500/0 to-${stat.color}-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>

          {/* 3D Waste Categories with Glassmorphism */}
          <div id="guide" className="mb-20">
            <h3 className="text-4xl md:text-5xl font-black text-center text-gray-900 dark:text-white mb-4">
              Smart Waste Categories
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              Advanced AI categorization for precise waste sorting
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  emoji: "🗞",
                  title: "Paper & Cardboard",
                  desc: "Newspapers, magazines, cardboard boxes, office paper",
                  gradient: "from-green-400 to-emerald-600",
                  shadow: "green",
                },
                {
                  emoji: "🍶",
                  title: "Plastic & Glass",
                  desc: "Bottles, containers, jars, plastic packaging",
                  gradient: "from-blue-400 to-cyan-600",
                  shadow: "blue",
                },
                {
                  emoji: "🥫",
                  title: "Metal & Cans",
                  desc: "Aluminum cans, steel containers, metal scraps",
                  gradient: "from-yellow-400 to-orange-600",
                  shadow: "orange",
                },
                {
                  emoji: "🍎",
                  title: "Organic Waste",
                  desc: "Food scraps, garden waste, compostable materials",
                  gradient: "from-purple-400 to-pink-600",
                  shadow: "purple",
                },
              ].map((category, index) => (
                <div
                  key={index}
                  className={`group relative bg-gradient-to-br ${category.gradient} rounded-3xl p-8 hover:shadow-2xl hover:shadow-${category.shadow}-500/50 transition-all duration-500 hover:-translate-y-4 hover:rotate-2 cursor-pointer transform-gpu overflow-hidden`}
                  style={{
                    transform: `perspective(1000px) rotateX(${
                      scrollY * 0.01
                    }deg)`,
                  }}
                >
                  {/* Glass morphism overlay */}
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-xl" />

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="text-6xl mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 filter drop-shadow-2xl">
                      {category.emoji}
                    </div>
                    <h4 className="text-2xl font-black text-white mb-3 drop-shadow-lg">
                      {category.title}
                    </h4>
                    <p className="text-white/90 text-sm leading-relaxed font-medium drop-shadow">
                      {category.desc}
                    </p>
                  </div>

                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 border-2 border-white/20 rounded-3xl group-hover:border-white/40 transition-colors duration-500" />
                </div>
              ))}
            </div>
          </div>

          {/* All Features Grid */}
          <div id="all-features" className="mb-20">
            <h3 className="text-4xl md:text-5xl font-black text-center text-gray-900 dark:text-white mb-4">
              Complete Platform Features
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto text-lg">
              Scan, Track, and Pickup waste with integrated technology - Mobile
              alerts, AI recognition, and community engagement
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {[
                {
                  title: "Barcode Scanner",
                  description:
                    "Scan product barcodes for instant recycling info",
                  icon: "📷",
                  link: "/scanner",
                  gradient: "from-blue-500 to-cyan-600",
                },
                {
                  title: "Leaderboards",
                  description: "Compete with eco-warriors worldwide",
                  icon: "🏆",
                  link: "/leaderboard",
                  gradient: "from-purple-500 to-pink-600",
                },
                {
                  title: "Challenges",
                  description: "Complete challenges and earn rewards",
                  icon: "🎯",
                  link: "/challenges",
                  gradient: "from-orange-500 to-red-600",
                },
                {
                  title: "Campaigns",
                  description: "Join community environmental initiatives",
                  icon: "🌱",
                  link: "/campaigns",
                  gradient: "from-green-500 to-emerald-600",
                },
                {
                  title: "Analytics Dashboard",
                  description: "City and neighborhood waste statistics",
                  icon: "📊",
                  link: "/analytics",
                  gradient: "from-indigo-500 to-purple-600",
                },
                {
                  title: "Smart Collection",
                  description: "Pickup requests and route optimization",
                  icon: "🚛",
                  link: "/collection",
                  gradient: "from-cyan-500 to-blue-600",
                },
                {
                  title: "Community & Education",
                  description: "Workshops, events, and learning resources",
                  icon: "👥",
                  link: "/community",
                  gradient: "from-teal-500 to-green-600",
                },
                {
                  title: "Notifications",
                  description: "Mobile alerts for pickups and reminders",
                  icon: "🔔",
                  link: "/notifications",
                  gradient: "from-violet-500 to-fuchsia-600",
                },
                {
                  title: "AI Classification",
                  description: "Real-time waste identification",
                  icon: "🤖",
                  link: "/content",
                  gradient: "from-pink-500 to-rose-600",
                },
              ].map((feature, index) => (
                <Link key={index} href={feature.link}>
                  <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 hover:scale-105 transition-all duration-300 hover:shadow-2xl cursor-pointer h-full">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                    >
                      {feature.icon}
                    </div>
                    <h4 className="text-xl font-black text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-green-600 group-hover:to-blue-600 transition-all">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                      {feature.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Features Section */}
          <div id="features" className="mb-20">
            <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Core Technology
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        AI-Powered Recognition
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Advanced computer vision identifies and categorizes
                        waste items automatically with 98% accuracy.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Real-time Tracking
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Monitor your environmental impact with detailed
                        analytics and progress tracking.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Reward System
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Earn EcoPoints for proper waste segregation and redeem
                        for eco-friendly rewards.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-green-400/20 to-blue-600/20 rounded-3xl p-8 backdrop-blur-sm border border-white/20">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📱</div>
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Mobile-First Design
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Snap a photo, get instant categorization, and track your
                      environmental impact on the go.
                    </p>
                    <div className="flex justify-center gap-4">
                      <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-3">
                        <span className="text-2xl">📸</span>
                      </div>
                      <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-3">
                        <span className="text-2xl">🔍</span>
                      </div>
                      <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-3">
                        <span className="text-2xl">📊</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-6 items-center justify-center text-sm">
            <Link
              className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-gray-600 dark:text-gray-400 hover:text-green-600 transition-colors"
              href="/guide"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              Learning Center
            </Link>
            <Link
              className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-gray-600 dark:text-gray-400 hover:text-green-600 transition-colors"
              href="/features"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Platform Features
            </Link>
            <Link
              className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-gray-600 dark:text-gray-400 hover:text-green-600 transition-colors"
              href="/impact"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                />
              </svg>
              Global Impact →
            </Link>
          </div>
          <div className="text-center mt-8 text-gray-500 dark:text-gray-500">
            <p>
              © 2025 EcoSort. Building a sustainable future, one sort at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
