"use client";
import React from "react";
import Link from "next/link";
import {
  Camera,
  Scan,
  Trophy,
  Target,
  Users,
  BarChart3,
  Truck,
  Bell,
  BookOpen,
  TrendingUp,
  Award,
  Zap,
  ArrowRight,
} from "lucide-react";
import { colors } from "@/lib/colors";

export default function DashboardPage() {
  const stats = [
    {
      label: "Items Scanned",
      value: "247",
      change: "+12%",
      icon: Camera,
      gradient: "from-green-500 to-emerald-600",
    },
    {
      label: "EcoPoints",
      value: "3,840",
      change: "+24%",
      icon: Award,
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      label: "Current Rank",
      value: "#42",
      change: "+5",
      icon: Trophy,
      gradient: "from-yellow-500 to-orange-600",
    },
    {
      label: "Active Streak",
      value: "12 days",
      change: "New!",
      icon: Zap,
      gradient: "from-purple-500 to-pink-600",
    },
  ];

  const quickActions = [
    {
      name: "AI Scanner",
      description: "Scan waste with AI",
      icon: Camera,
      link: "/content",
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      name: "Barcode Scan",
      description: "Scan product barcode",
      icon: Scan,
      link: "/scanner",
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      name: "Leaderboard",
      description: "View global rankings",
      icon: Trophy,
      link: "/leaderboard",
      gradient: "from-yellow-500 to-orange-600",
    },
    {
      name: "Challenges",
      description: "Complete challenges",
      icon: Target,
      link: "/challenges",
      gradient: "from-orange-500 to-red-600",
    },
    {
      name: "Campaigns",
      description: "Join eco campaigns",
      icon: Users,
      link: "/campaigns",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      name: "Analytics",
      description: "View city stats",
      icon: BarChart3,
      link: "/analytics",
      gradient: "from-indigo-500 to-purple-600",
    },
    {
      name: "Collection",
      description: "Schedule pickup",
      icon: Truck,
      link: "/collection",
      gradient: "from-cyan-600 to-blue-700",
    },
    {
      name: "Community",
      description: "Join workshops",
      icon: BookOpen,
      link: "/community",
      gradient: "from-teal-500 to-green-600",
    },
  ];

  const recentActivity = [
    {
      action: "Scanned plastic bottle",
      points: "+10 pts",
      time: "2 hours ago",
      icon: "🍶",
    },
    {
      action: "Completed 7-day streak challenge",
      points: "+500 pts",
      time: "5 hours ago",
      icon: "🔥",
    },
    {
      action: "Joined Beach Cleanup campaign",
      points: "+0 pts",
      time: "1 day ago",
      icon: "🏖️",
    },
    {
      action: "Scanned cardboard box",
      points: "+8 pts",
      time: "2 days ago",
      icon: "📦",
    },
  ];

  const activeChallenges = [
    {
      title: "7-Day Recycling Streak",
      progress: 4,
      target: 7,
      reward: 500,
      icon: "🔥",
    },
    {
      title: "Plastic-Free Week",
      progress: 32,
      target: 50,
      reward: 1000,
      icon: "🌊",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-bold text-green-600 dark:text-green-400">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link key={index} href={action.link}>
                <div className="group cursor-pointer bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 hover:shadow-lg transition-all hover:scale-105">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">
                    {action.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {action.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Challenges */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-gray-900 dark:text-white">
              Active Challenges
            </h2>
            <Link href="/challenges">
              <button className="text-sm font-bold text-green-600 hover:text-green-700 flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
          <div className="space-y-4">
            {activeChallenges.map((challenge, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{challenge.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {challenge.title}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Reward: {challenge.reward} pts
                    </p>
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                    style={{
                      width: `${
                        (challenge.progress / challenge.target) * 100
                      }%`,
                    }}
                  />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  {challenge.progress}/{challenge.target} completed
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
              >
                <span className="text-2xl">{activity.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {activity.time}
                  </p>
                </div>
                <span className="text-sm font-bold text-green-600 dark:text-green-400">
                  {activity.points}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 shadow-lg text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black mb-2">Weekly Progress</h2>
            <p className="text-white/90 text-lg font-semibold">
              You're doing great! Keep it up! 🎉
            </p>
          </div>
          <div className="text-right">
            <p className="text-5xl font-black mb-1">68%</p>
            <p className="text-white/90 font-semibold">This week's goal</p>
          </div>
        </div>
        <div className="mt-6 h-4 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full"
            style={{ width: "68%" }}
          />
        </div>
      </div>
    </div>
  );
}
