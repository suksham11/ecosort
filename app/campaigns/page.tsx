"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  TrendingUp,
  MessageCircle,
  Heart,
  Share2,
  Plus,
  Search,
  Filter,
} from "lucide-react";
import CampaignJoinModal from "@/components/CampaignJoinModal";

export default function CampaignsPage() {
  const [filter, setFilter] = useState<"all" | "active" | "upcoming" | "past">(
    "all"
  );
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [showJoinModal, setShowJoinModal] = useState(false);

  const handleJoinCampaign = (campaign: any) => {
    setSelectedCampaign(campaign);
    setShowJoinModal(true);
  };

  const campaigns = [
    {
      id: 1,
      title: "Plastic-Free Ocean Initiative",
      organizer: "EcoWarriors Foundation",
      description:
        "Join us in removing plastic waste from our oceans and beaches",
      image: "🌊",
      location: "Coastal Areas",
      startDate: "Dec 15, 2025",
      endDate: "Dec 22, 2025",
      participants: 15420,
      target: 50000,
      status: "active",
      category: "Ocean Cleanup",
      impact: "125 tons collected",
    },
    {
      id: 2,
      title: "Green City Challenge",
      organizer: "City Council",
      description: "Transform our city into the greenest metropolitan area",
      image: "🌳",
      location: "Downtown District",
      startDate: "Jan 1, 2026",
      endDate: "Mar 31, 2026",
      participants: 8234,
      target: 30000,
      status: "upcoming",
      category: "Urban Greening",
      impact: "Target: 10,000 trees",
    },
    {
      id: 3,
      title: "E-Waste Recycling Drive",
      organizer: "TechRecycle Inc",
      description:
        "Safely dispose of electronic waste and recover valuable materials",
      image: "💻",
      location: "Community Centers",
      startDate: "Nov 1, 2025",
      endDate: "Nov 30, 2025",
      participants: 12567,
      target: 20000,
      status: "active",
      category: "E-Waste",
      impact: "8.5 tons recycled",
    },
    {
      id: 4,
      title: "Compost Revolution",
      organizer: "Green Living Co",
      description: "Learn composting and reduce organic waste in landfills",
      image: "🌱",
      location: "Citywide",
      startDate: "Feb 15, 2026",
      endDate: "May 15, 2026",
      participants: 5678,
      target: 15000,
      status: "upcoming",
      category: "Composting",
      impact: "Target: 50 tons",
    },
    {
      id: 5,
      title: "Zero Waste Festival",
      organizer: "Sustainability Network",
      description: "Celebrate sustainable living with workshops and activities",
      image: "🎉",
      location: "Central Park",
      startDate: "Oct 15, 2025",
      endDate: "Oct 17, 2025",
      participants: 23456,
      target: 25000,
      status: "past",
      category: "Education",
      impact: "20,000 attended",
    },
  ];

  const filteredCampaigns =
    filter === "all" ? campaigns : campaigns.filter((c) => c.status === filter);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "upcoming":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "past":
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-green-900/20 dark:to-emerald-900/20 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </Link>
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Campaigns
              </h1>
              <p className="text-gray-600 dark:text-gray-400 font-semibold">
                Join community-driven environmental initiatives
              </p>
            </div>
          </div>
          <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create Campaign
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Active Campaigns", value: "12", change: "+3" },
            { label: "Total Participants", value: "65K", change: "+8%" },
            { label: "Waste Collected", value: "342T", change: "+15%" },
            { label: "Cities Involved", value: "89", change: "+12" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl"
            >
              <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-1">
                {stat.label}
              </p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-black text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <span className="text-green-600 text-sm font-bold flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-2 rounded-2xl shadow-lg">
          {[
            { id: "all", label: "All Campaigns" },
            { id: "active", label: "Active" },
            { id: "upcoming", label: "Upcoming" },
            { id: "past", label: "Past" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all ${
                filter === tab.id
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg scale-105"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform"
            >
              {/* Campaign Image */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 h-40 flex items-center justify-center text-7xl">
                {campaign.image}
              </div>

              {/* Campaign Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(
                      campaign.status
                    )}`}
                  >
                    {campaign.status.toUpperCase()}
                  </span>
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                    {campaign.category}
                  </span>
                </div>

                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">
                  {campaign.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {campaign.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-semibold">
                      {campaign.startDate} - {campaign.endDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-semibold">
                      {campaign.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Users className="w-4 h-4" />
                    <span className="text-sm font-semibold">
                      {campaign.participants.toLocaleString()} participants
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                      Participation
                    </span>
                    <span className="text-xs font-bold text-green-600">
                      {Math.round(
                        (campaign.participants / campaign.target) * 100
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                      style={{
                        width: `${
                          (campaign.participants / campaign.target) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                {/* Impact Badge */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 mb-4">
                  <p className="text-xs text-green-700 dark:text-green-400 font-semibold mb-1">
                    Impact
                  </p>
                  <p className="text-green-900 dark:text-green-300 font-black">
                    {campaign.impact}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleJoinCampaign(campaign)}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 rounded-xl font-bold hover:shadow-lg transition-all"
                  >
                    Join Campaign
                  </button>
                  <button className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center hover:scale-110 transition-transform">
                    <Heart className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center hover:scale-110 transition-transform">
                    <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Campaign Join Modal */}
      {showJoinModal && selectedCampaign && (
        <CampaignJoinModal
          isOpen={showJoinModal}
          onClose={() => {
            setShowJoinModal(false);
            setSelectedCampaign(null);
          }}
          campaign={selectedCampaign}
        />
      )}
    </div>
  );
}
