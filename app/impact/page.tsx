"use client";
import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  Users,
  Globe,
  Leaf,
  Award,
  Target,
  BarChart3,
  Heart,
} from "lucide-react";

export default function ImpactPage() {
  const globalStats = [
    {
      icon: <Users className="w-8 h-8" />,
      value: "15,247+",
      label: "Active Users",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      value: "2.5M+",
      label: "Items Classified",
      color: "from-green-500 to-green-600",
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      value: "850 Tons",
      label: "CO₂ Saved",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      value: "120+",
      label: "Countries",
      color: "from-orange-500 to-orange-600",
    },
  ];

  const impactMetrics = [
    {
      title: "Recycling Rate Improvement",
      value: "34%",
      description:
        "Average increase in recycling accuracy for users after 1 month",
      icon: <TrendingUp className="w-12 h-12" />,
      color: "bg-green-100 dark:bg-green-900/30",
      textColor: "text-green-600 dark:text-green-400",
    },
    {
      title: "Trees Saved",
      value: "12,500+",
      description:
        "Equivalent trees saved through proper paper and cardboard recycling",
      icon: <Leaf className="w-12 h-12" />,
      color: "bg-emerald-100 dark:bg-emerald-900/30",
      textColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Water Conservation",
      value: "4.2M Liters",
      description: "Water saved through recycling initiatives by our community",
      icon: <Globe className="w-12 h-12" />,
      color: "bg-blue-100 dark:bg-blue-900/30",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Energy Saved",
      value: "1.8M kWh",
      description:
        "Energy conserved through proper waste segregation and recycling",
      icon: <Award className="w-12 h-12" />,
      color: "bg-yellow-100 dark:bg-yellow-900/30",
      textColor: "text-yellow-600 dark:text-yellow-400",
    },
  ];

  const milestones = [
    {
      year: "2023",
      title: "Launch",
      description:
        "EcoSort launched with AI-powered waste classification in 10 cities",
      icon: "🚀",
    },
    {
      year: "2023",
      title: "1M Items",
      description: "Reached 1 million classified waste items in 6 months",
      icon: "🎯",
    },
    {
      year: "2024",
      title: "Global Expansion",
      description: "Expanded to 120+ countries with localized guidelines",
      icon: "🌍",
    },
    {
      year: "2024",
      title: "Community Growth",
      description: "Built a community of 15,000+ active eco-conscious users",
      icon: "👥",
    },
    {
      year: "2025",
      title: "Advanced AI",
      description: "Launched enhanced AI with 98% classification accuracy",
      icon: "🤖",
    },
    {
      year: "2025",
      title: "Impact Milestone",
      description: "Achieved 850 tons of CO₂ savings through user actions",
      icon: "🌱",
    },
  ];

  const userStories = [
    {
      name: "Sarah Johnson",
      location: "Seattle, USA",
      avatar: "👩‍💼",
      story:
        "EcoSort helped me reduce my household waste by 40% in just 3 months. The gamification aspect keeps my whole family engaged!",
      impact: "320 kg CO₂ saved",
    },
    {
      name: "Miguel Rodriguez",
      location: "Barcelona, Spain",
      avatar: "👨‍🔬",
      story:
        "As an environmental scientist, I'm impressed by the accuracy. I now use it to educate my students about proper waste management.",
      impact: "580 kg CO₂ saved",
    },
    {
      name: "Yuki Tanaka",
      location: "Tokyo, Japan",
      avatar: "👩‍🎓",
      story:
        "The app makes recycling so easy! I love tracking my progress and competing with friends on the leaderboard.",
      impact: "410 kg CO₂ saved",
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
            className="text-gray-600 dark:text-gray-300 hover:text-green-600 transition-colors"
          >
            Guide
          </Link>
          <Link
            href="/impact"
            className="text-green-600 dark:text-green-400 font-semibold"
          >
            Impact
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/50 px-4 py-2 rounded-full text-green-700 dark:text-green-300 text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            Making a Real Difference
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Our Global
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
              {" "}
              Environmental Impact
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
            Together, we're building a sustainable future. See the real-world
            impact of our community's collective efforts.
          </p>
        </div>
      </section>

      {/* Global Stats */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {globalStats.map((stat, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${stat.color} text-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
              >
                <div className="flex items-center gap-4 mb-4">
                  {stat.icon}
                  <div>
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <div className="text-sm opacity-90">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Environmental Impact Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {impactMetrics.map((metric, index) => (
              <div
                key={index}
                className={`${metric.color} rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300`}
              >
                <div className="flex items-start gap-4">
                  <div className={metric.textColor}>{metric.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {metric.title}
                    </h3>
                    <div
                      className={`text-4xl font-bold ${metric.textColor} mb-3`}
                    >
                      {metric.value}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {metric.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Our Journey
          </h2>
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="flex gap-6 items-start bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-3xl">
                    {milestone.icon}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-green-600 dark:text-green-400 mb-1">
                    {milestone.year}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Stories */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            User Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {userStories.map((story, index) => (
              <div
                key={index}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl mb-4">{story.avatar}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {story.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {story.location}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                  "{story.story}"
                </p>
                <div className="bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-lg inline-block">
                  <span className="text-green-700 dark:text-green-400 font-semibold">
                    {story.impact}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-12 text-center">
          <Target className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Be part of the solution. Start making a positive environmental
            impact today.
          </p>
          <Link
            href="/content"
            className="inline-block bg-white text-green-600 font-semibold text-lg px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Start Your Impact Journey →
          </Link>
        </div>
      </section>
    </div>
  );
}
