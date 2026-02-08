"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Trash2,
  MapPin,
  Calendar,
  Target,
  Award,
  Activity,
  PieChart,
} from "lucide-react";

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState<"week" | "month" | "year">(
    "month"
  );

  const cityStats = {
    totalWaste: "1,245 tons",
    recyclingRate: "68%",
    activeUsers: "23,456",
    neighborhoods: 45,
    collections: "8,934",
    co2Saved: "542 tons",
  };

  const neighborhoodData = [
    { name: "Downtown", recyclingRate: 78, waste: 342, trend: "+5%" },
    { name: "Westside", recyclingRate: 72, waste: 289, trend: "+3%" },
    { name: "Eastside", recyclingRate: 65, waste: 234, trend: "-2%" },
    { name: "Northville", recyclingRate: 71, waste: 198, trend: "+7%" },
    { name: "Southbrook", recyclingRate: 59, waste: 182, trend: "+1%" },
  ];

  const wasteBreakdown = [
    { category: "Plastic & Glass", percentage: 35, color: "bg-blue-500" },
    { category: "Paper & Cardboard", percentage: 28, color: "bg-green-500" },
    { category: "Metal & Cans", percentage: 18, color: "bg-yellow-500" },
    { category: "Organic Waste", percentage: 12, color: "bg-orange-500" },
    { category: "Electronic Waste", percentage: 7, color: "bg-purple-500" },
  ];

  const monthlyTrend = [
    { month: "Jul", waste: 1120, recycled: 756 },
    { month: "Aug", waste: 1180, recycled: 802 },
    { month: "Sep", waste: 1150, recycled: 782 },
    { month: "Oct", waste: 1245, recycled: 847 },
    { month: "Nov", waste: 1290, recycled: 903 },
    { month: "Dec", waste: 1245, recycled: 872 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-purple-900/20 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </Link>
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Data Analytics
              </h1>
              <p className="text-gray-600 dark:text-gray-400 font-semibold">
                City & neighborhood waste management insights
              </p>
            </div>
          </div>
          <BarChart3 className="w-12 h-12 text-indigo-600" />
        </div>

        {/* Timeframe Selector */}
        <div className="flex gap-3 mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-2 rounded-2xl shadow-lg">
          {[
            { id: "week", label: "This Week" },
            { id: "month", label: "This Month" },
            { id: "year", label: "This Year" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTimeframe(tab.id as any)}
              className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all ${
                timeframe === tab.id
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* City Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {[
            {
              label: "Total Waste",
              value: cityStats.totalWaste,
              icon: <Trash2 className="w-6 h-6" />,
              gradient: "from-red-500 to-pink-600",
            },
            {
              label: "Recycling Rate",
              value: cityStats.recyclingRate,
              icon: <Target className="w-6 h-6" />,
              gradient: "from-green-500 to-emerald-600",
            },
            {
              label: "Active Users",
              value: cityStats.activeUsers,
              icon: <Users className="w-6 h-6" />,
              gradient: "from-blue-500 to-cyan-600",
            },
            {
              label: "Neighborhoods",
              value: cityStats.neighborhoods,
              icon: <MapPin className="w-6 h-6" />,
              gradient: "from-purple-500 to-indigo-600",
            },
            {
              label: "Collections",
              value: cityStats.collections,
              icon: <Calendar className="w-6 h-6" />,
              gradient: "from-orange-500 to-amber-600",
            },
            {
              label: "CO₂ Saved",
              value: cityStats.co2Saved,
              icon: <Award className="w-6 h-6" />,
              gradient: "from-teal-500 to-cyan-600",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center mb-3 text-white`}
              >
                {stat.icon}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-1">
                {stat.label}
              </p>
              <p className="text-2xl font-black text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Monthly Trend Chart */}
          <div className="lg:col-span-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <Activity className="w-8 h-8 text-indigo-600" />
              Waste Collection Trend
            </h2>

            <div className="space-y-4">
              {monthlyTrend.map((data, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                      {data.month}
                    </span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                        Total: {data.waste}t
                      </span>
                      <span className="text-sm font-semibold text-green-600">
                        Recycled: {data.recycled}t
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div
                      className="h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg transition-all"
                      style={{
                        width: `${(data.recycled / data.waste) * 100}%`,
                      }}
                    />
                    <div
                      className="h-8 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg transition-all"
                      style={{
                        width: `${
                          ((data.waste - data.recycled) / data.waste) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Waste Breakdown */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <PieChart className="w-8 h-8 text-purple-600" />
              Waste Categories
            </h2>

            <div className="space-y-4">
              {wasteBreakdown.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                      {item.category}
                    </span>
                    <span className="text-sm font-bold text-indigo-600">
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Neighborhood Stats */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <MapPin className="w-8 h-8 text-blue-600" />
            Neighborhood Performance
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-6 text-gray-700 dark:text-gray-300 font-black">
                    Neighborhood
                  </th>
                  <th className="text-left py-4 px-6 text-gray-700 dark:text-gray-300 font-black">
                    Recycling Rate
                  </th>
                  <th className="text-left py-4 px-6 text-gray-700 dark:text-gray-300 font-black">
                    Total Waste (tons)
                  </th>
                  <th className="text-left py-4 px-6 text-gray-700 dark:text-gray-300 font-black">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody>
                {neighborhoodData.map((neighborhood, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="py-4 px-6 font-bold text-gray-900 dark:text-white">
                      {neighborhood.name}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                            style={{ width: `${neighborhood.recyclingRate}%` }}
                          />
                        </div>
                        <span className="font-bold text-green-600 min-w-[45px]">
                          {neighborhood.recyclingRate}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">
                      {neighborhood.waste}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`flex items-center gap-1 font-bold ${
                          neighborhood.trend.startsWith("+")
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {neighborhood.trend.startsWith("+") ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        {neighborhood.trend}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
