"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Trophy,
  Medal,
  Crown,
  TrendingUp,
  Flame,
  Award,
  Users,
  Target,
} from "lucide-react";

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState<
    "daily" | "weekly" | "monthly" | "alltime"
  >("weekly");

  const leaderboardData = [
    {
      rank: 1,
      name: "Sarah Johnson",
      avatar: "👩‍💼",
      points: 15420,
      items: 892,
      streak: 45,
      city: "Seattle",
      badge: "Eco Champion",
    },
    {
      rank: 2,
      name: "Miguel Rodriguez",
      avatar: "👨‍🔬",
      points: 14850,
      items: 821,
      streak: 38,
      city: "Barcelona",
      badge: "Green Hero",
    },
    {
      rank: 3,
      name: "Yuki Tanaka",
      avatar: "👩‍🎓",
      points: 13920,
      items: 756,
      streak: 42,
      city: "Tokyo",
      badge: "Recycle Master",
    },
    {
      rank: 4,
      name: "Alex Kumar",
      avatar: "👨‍💻",
      points: 12540,
      items: 698,
      streak: 31,
      city: "Mumbai",
      badge: "Eco Warrior",
    },
    {
      rank: 5,
      name: "Emma Wilson",
      avatar: "👩‍🎨",
      points: 11230,
      items: 645,
      streak: 28,
      city: "London",
      badge: "Green Pioneer",
    },
    {
      rank: 6,
      name: "Carlos Santos",
      avatar: "👨‍🏫",
      points: 10890,
      items: 612,
      streak: 25,
      city: "São Paulo",
      badge: "Eco Enthusiast",
    },
    {
      rank: 7,
      name: "Lisa Chen",
      avatar: "👩‍⚕️",
      points: 9850,
      items: 567,
      streak: 22,
      city: "Singapore",
      badge: "Green Leader",
    },
    {
      rank: 8,
      name: "Ahmed Hassan",
      avatar: "👨‍✈️",
      points: 8920,
      items: 521,
      streak: 19,
      city: "Dubai",
      badge: "Eco Advocate",
    },
  ];

  const yourRank = {
    rank: 42,
    name: "You",
    avatar: "😊",
    points: 3840,
    items: 247,
    streak: 12,
    city: "Your City",
    badge: "Rising Star",
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-8 h-8 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-8 h-8 text-gray-400" />;
    if (rank === 3) return <Medal className="w-8 h-8 text-orange-600" />;
    return (
      <div className="w-8 h-8 flex items-center justify-center font-bold text-gray-600">
        #{rank}
      </div>
    );
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return "from-yellow-400 to-yellow-600";
    if (rank === 2) return "from-gray-300 to-gray-500";
    if (rank === 3) return "from-orange-400 to-orange-600";
    return "from-gray-200 to-gray-300";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </Link>
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Leaderboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 font-semibold">
                Compete with eco-warriors worldwide
              </p>
            </div>
          </div>
          <Trophy className="w-12 h-12 text-yellow-500" />
        </div>

        {/* Timeframe Selector */}
        <div className="flex gap-3 mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-2 rounded-2xl shadow-lg">
          {[
            { id: "daily", label: "Daily" },
            { id: "weekly", label: "Weekly" },
            { id: "monthly", label: "Monthly" },
            { id: "alltime", label: "All Time" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTimeframe(tab.id as any)}
              className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all ${
                timeframe === tab.id
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {[leaderboardData[1], leaderboardData[0], leaderboardData[2]].map(
            (user, index) => {
              const actualRank = index === 0 ? 2 : index === 1 ? 1 : 3;
              return (
                <div
                  key={user.rank}
                  className={`relative ${
                    index === 1 ? "transform -translate-y-4" : ""
                  }`}
                >
                  <div
                    className={`bg-gradient-to-br ${getRankColor(
                      actualRank
                    )} rounded-3xl p-6 text-center shadow-2xl border-4 ${
                      actualRank === 1
                        ? "border-yellow-300"
                        : actualRank === 2
                        ? "border-gray-300"
                        : "border-orange-300"
                    }`}
                  >
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                      {getRankIcon(actualRank)}
                    </div>
                    <div className="text-6xl mb-4 mt-4">{user.avatar}</div>
                    <h3 className="font-black text-white text-lg mb-2">
                      {user.name}
                    </h3>
                    <div className="bg-white/20 backdrop-blur-xl rounded-xl p-3 mb-2">
                      <p className="text-white/80 text-xs mb-1">Points</p>
                      <p className="text-white font-black text-2xl">
                        {user.points.toLocaleString()}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white/20 backdrop-blur-xl rounded-lg p-2">
                        <p className="text-white/80 text-xs">Items</p>
                        <p className="text-white font-bold">{user.items}</p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-xl rounded-lg p-2">
                        <Flame className="w-4 h-4 text-orange-300 mx-auto mb-1" />
                        <p className="text-white font-bold">{user.streak}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>

        {/* Your Rank Card */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-6 mb-8 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-3xl">
                {yourRank.avatar}
              </div>
              <div>
                <p className="text-white/90 text-sm font-semibold mb-1">
                  Your Rank
                </p>
                <h3 className="text-3xl font-black text-white">
                  #{yourRank.rank}
                </h3>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white/90 text-sm font-semibold mb-1">Points</p>
              <p className="text-3xl font-black text-white">
                {yourRank.points.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-8 h-8 text-yellow-300" />
              <div>
                <p className="text-white/90 text-sm font-semibold">
                  {yourRank.badge}
                </p>
                <p className="text-white text-xs">
                  {yourRank.streak} day streak
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full Leaderboard */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <Users className="w-8 h-8 text-purple-600" />
            Global Rankings
          </h2>

          <div className="space-y-4">
            {leaderboardData.map((user) => (
              <div
                key={user.rank}
                className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl hover:shadow-lg transition-all hover:scale-105 transform-gpu"
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  {getRankIcon(user.rank)}
                </div>
                <div className="text-4xl">{user.avatar}</div>
                <div className="flex-1">
                  <h3 className="font-black text-lg text-gray-900 dark:text-white">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {user.city} • {user.badge}
                  </p>
                </div>
                <div className="text-right mr-4">
                  <p className="font-black text-xl text-purple-600">
                    {user.points.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    points
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <Target className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                      {user.items}
                    </p>
                  </div>
                  <div className="text-center">
                    <Flame className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                    <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                      {user.streak}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
