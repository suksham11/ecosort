"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Target,
  Trophy,
  Calendar,
  Users,
  TrendingUp,
  Award,
  CheckCircle,
  Clock,
  Zap,
  Star,
} from "lucide-react";

export default function ChallengesPage() {
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");

  const activeChallenges = [
    {
      id: 1,
      title: "7-Day Recycling Streak",
      description: "Recycle at least one item every day for 7 consecutive days",
      progress: 4,
      target: 7,
      reward: 500,
      timeLeft: "3 days left",
      difficulty: "Easy",
      participants: 12543,
      icon: "🔥",
    },
    {
      id: 2,
      title: "Plastic-Free Week",
      description: "Recycle 50 plastic items within one week",
      progress: 32,
      target: 50,
      reward: 1000,
      timeLeft: "5 days left",
      difficulty: "Medium",
      participants: 8234,
      icon: "🌊",
    },
    {
      id: 3,
      title: "Community Champion",
      description: "Help 10 neighbors learn about proper waste sorting",
      progress: 6,
      target: 10,
      reward: 1500,
      timeLeft: "10 days left",
      difficulty: "Hard",
      participants: 3421,
      icon: "🤝",
    },
    {
      id: 4,
      title: "Zero Waste Weekend",
      description: "Produce zero non-recyclable waste for 2 days",
      progress: 0,
      target: 2,
      reward: 800,
      timeLeft: "Starts Friday",
      difficulty: "Medium",
      participants: 5678,
      icon: "♻️",
    },
  ];

  const completedChallenges = [
    {
      id: 5,
      title: "First Steps",
      description: "Recycle your first 10 items",
      reward: 100,
      completedDate: "2 days ago",
      icon: "🎯",
    },
    {
      id: 6,
      title: "Cardboard King",
      description: "Recycle 30 cardboard items",
      reward: 300,
      completedDate: "1 week ago",
      icon: "📦",
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Hard":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-orange-900/20 dark:to-red-900/20 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </Link>
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Challenges
              </h1>
              <p className="text-gray-600 dark:text-gray-400 font-semibold">
                Complete challenges and earn rewards
              </p>
            </div>
          </div>
          <Target className="w-12 h-12 text-orange-600" />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Active Challenges",
              value: activeChallenges.length,
              icon: <Zap className="w-6 h-6 text-orange-500" />,
              gradient: "from-orange-500 to-red-600",
            },
            {
              label: "Completed",
              value: completedChallenges.length,
              icon: <CheckCircle className="w-6 h-6 text-green-500" />,
              gradient: "from-green-500 to-emerald-600",
            },
            {
              label: "Total Rewards",
              value: "2,400",
              icon: <Trophy className="w-6 h-6 text-yellow-500" />,
              gradient: "from-yellow-500 to-orange-600",
            },
            {
              label: "Rank",
              value: "#42",
              icon: <Star className="w-6 h-6 text-purple-500" />,
              gradient: "from-purple-500 to-pink-600",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center mb-3`}
              >
                {stat.icon}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-1">
                {stat.label}
              </p>
              <p className="text-3xl font-black text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Tab Selector */}
        <div className="flex gap-3 mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-2 rounded-2xl shadow-lg">
          <button
            onClick={() => setActiveTab("active")}
            className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === "active"
                ? "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg scale-105"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <Zap className="w-5 h-5" />
            Active Challenges
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === "completed"
                ? "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg scale-105"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            Completed
          </button>
        </div>

        {/* Active Challenges */}
        {activeTab === "active" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl">{challenge.icon}</div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(
                      challenge.difficulty
                    )}`}
                  >
                    {challenge.difficulty}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                  {challenge.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {challenge.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                      Progress
                    </span>
                    <span className="text-sm font-bold text-orange-600">
                      {challenge.progress}/{challenge.target}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          (challenge.progress / challenge.target) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                {/* Challenge Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-semibold">
                      {challenge.timeLeft}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Users className="w-4 h-4" />
                    <span className="text-sm font-semibold">
                      {challenge.participants.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Reward */}
                <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-white" />
                    <span className="text-white font-bold">Reward</span>
                  </div>
                  <span className="text-white text-xl font-black">
                    {challenge.reward} pts
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Completed Challenges */}
        {activeTab === "completed" && (
          <div className="space-y-4">
            {completedChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border-2 border-green-500/50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{challenge.icon}</div>
                    <div>
                      <h3 className="text-xl font-black text-gray-900 dark:text-white">
                        {challenge.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {challenge.description}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                        Completed {challenge.completedDate}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <CheckCircle className="w-12 h-12 text-green-500 mb-2" />
                    <div className="bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-xl">
                      <p className="text-green-700 dark:text-green-400 font-black">
                        +{challenge.reward} pts
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
