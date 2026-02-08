"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Truck,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Navigation,
  Route,
  Package,
  Bell,
  Map as MapIcon,
  Plus,
} from "lucide-react";

export default function CollectionPage() {
  const [activeTab, setActiveTab] = useState<"pickup" | "routes" | "map">(
    "pickup"
  );

  const pickupRequests = [
    {
      id: 1,
      address: "123 Main Street, Downtown",
      type: "Bulk Waste",
      status: "scheduled",
      date: "Dec 15, 2025",
      time: "10:00 AM - 12:00 PM",
      items: ["Old Furniture", "Cardboard Boxes"],
    },
    {
      id: 2,
      address: "456 Oak Avenue, Westside",
      type: "E-Waste",
      status: "pending",
      date: "Dec 16, 2025",
      time: "2:00 PM - 4:00 PM",
      items: ["Old TV", "Computer Monitor"],
    },
    {
      id: 3,
      address: "789 Pine Road, Eastside",
      type: "Recyclables",
      status: "completed",
      date: "Dec 10, 2025",
      time: "9:00 AM - 11:00 AM",
      items: ["Plastic Bottles", "Aluminum Cans"],
    },
  ];

  const collectionRoutes = [
    {
      id: 1,
      name: "Downtown Route A",
      truck: "Truck #12",
      driver: "John Smith",
      stops: 24,
      completed: 18,
      distance: "12.5 km",
      eta: "2:30 PM",
      status: "in-progress",
    },
    {
      id: 2,
      name: "Westside Route B",
      truck: "Truck #08",
      driver: "Sarah Johnson",
      stops: 32,
      completed: 32,
      distance: "15.8 km",
      eta: "Completed",
      status: "completed",
    },
    {
      id: 3,
      name: "Eastside Route C",
      truck: "Truck #15",
      driver: "Mike Davis",
      stops: 28,
      completed: 0,
      distance: "14.2 km",
      eta: "3:00 PM",
      status: "scheduled",
    },
  ];

  const nearbyCollectionPoints = [
    {
      name: "Central Recycling Hub",
      address: "100 Green Street",
      distance: "0.5 km",
      open: true,
      hours: "8 AM - 6 PM",
      types: ["All Types"],
    },
    {
      name: "Eastside Drop-off Center",
      address: "250 Elm Avenue",
      distance: "1.2 km",
      open: true,
      hours: "9 AM - 5 PM",
      types: ["Plastic", "Paper", "Metal"],
    },
    {
      name: "E-Waste Collection Point",
      address: "500 Tech Boulevard",
      distance: "2.1 km",
      open: false,
      hours: "Mon-Fri: 10 AM - 4 PM",
      types: ["Electronics Only"],
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return {
          bg: "bg-blue-100 dark:bg-blue-900/30",
          text: "text-blue-700 dark:text-blue-400",
          label: "Scheduled",
        };
      case "pending":
        return {
          bg: "bg-yellow-100 dark:bg-yellow-900/30",
          text: "text-yellow-700 dark:text-yellow-400",
          label: "Pending",
        };
      case "completed":
        return {
          bg: "bg-green-100 dark:bg-green-900/30",
          text: "text-green-700 dark:text-green-400",
          label: "Completed",
        };
      case "in-progress":
        return {
          bg: "bg-purple-100 dark:bg-purple-900/30",
          text: "text-purple-700 dark:text-purple-400",
          label: "In Progress",
        };
      default:
        return {
          bg: "bg-gray-100 dark:bg-gray-900/30",
          text: "text-gray-700 dark:text-gray-400",
          label: "Unknown",
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-cyan-900/20 dark:to-blue-900/20 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </Link>
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Smart Collection & Logistics
              </h1>
              <p className="text-gray-600 dark:text-gray-400 font-semibold">
                Pickup requests, route optimization & collection points
              </p>
            </div>
          </div>
          <Truck className="w-12 h-12 text-cyan-600" />
        </div>

        {/* Tab Selector */}
        <div className="flex gap-3 mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-2 rounded-2xl shadow-lg">
          <button
            onClick={() => setActiveTab("pickup")}
            className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === "pickup"
                ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg scale-105"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <Package className="w-5 h-5" />
            Pickup Requests
          </button>
          <button
            onClick={() => setActiveTab("routes")}
            className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === "routes"
                ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg scale-105"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <Route className="w-5 h-5" />
            Collection Routes
          </button>
          <button
            onClick={() => setActiveTab("map")}
            className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === "map"
                ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg scale-105"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <MapIcon className="w-5 h-5" />
            Collection Points
          </button>
        </div>

        {/* Pickup Requests */}
        {activeTab === "pickup" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                Your Pickup Requests
              </h2>
              <button className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg flex items-center gap-2">
                <Plus className="w-5 h-5" />
                New Request
              </button>
            </div>

            <div className="space-y-4">
              {pickupRequests.map((request) => {
                const statusInfo = getStatusBadge(request.status);
                return (
                  <div
                    key={request.id}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-black text-gray-900 dark:text-white">
                            {request.type}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${statusInfo.bg} ${statusInfo.text}`}
                          >
                            {statusInfo.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm font-semibold">
                            {request.address}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm font-semibold">
                              {request.date}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm font-semibold">
                              {request.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Bell className="w-8 h-8 text-cyan-600" />
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                      <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        Items:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {request.items.map((item, index) => (
                          <span
                            key={index}
                            className="bg-white dark:bg-gray-800 px-3 py-1 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Collection Routes */}
        {activeTab === "routes" && (
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">
              Optimized Collection Routes
            </h2>

            <div className="space-y-4">
              {collectionRoutes.map((route) => {
                const statusInfo = getStatusBadge(route.status);
                const progress = (route.completed / route.stops) * 100;

                return (
                  <div
                    key={route.id}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-black text-gray-900 dark:text-white">
                            {route.name}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${statusInfo.bg} ${statusInfo.text}`}
                          >
                            {statusInfo.label}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 font-semibold">
                          {route.truck} • Driver: {route.driver}
                        </p>
                      </div>
                      <Navigation className="w-8 h-8 text-cyan-600" />
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                          Stops: {route.completed}/{route.stops}
                        </span>
                        <span className="text-sm font-bold text-cyan-600">
                          {Math.round(progress)}%
                        </span>
                      </div>
                      <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold mb-1">
                          Distance
                        </p>
                        <p className="text-lg font-black text-gray-900 dark:text-white">
                          {route.distance}
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold mb-1">
                          ETA
                        </p>
                        <p className="text-lg font-black text-gray-900 dark:text-white">
                          {route.eta}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Collection Points Map */}
        {activeTab === "map" && (
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">
              Nearby Collection Points
            </h2>

            {/* Map Placeholder */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700 mb-8">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl h-[400px] flex items-center justify-center text-white">
                <div className="text-center">
                  <MapIcon className="w-24 h-24 mx-auto mb-4 opacity-50" />
                  <p className="text-2xl font-black">Interactive Map</p>
                  <p className="text-white/80 font-semibold">
                    Collection points near you
                  </p>
                </div>
              </div>
            </div>

            {/* Collection Points List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {nearbyCollectionPoints.map((point, index) => (
                <div
                  key={index}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start justify-between mb-4">
                    <MapPin className="w-8 h-8 text-cyan-600" />
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        point.open
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {point.open ? "Open Now" : "Closed"}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2">
                    {point.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {point.address}
                  </p>
                  <p className="text-sm font-semibold text-cyan-600 mb-3">
                    {point.distance} away
                  </p>

                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 mb-3">
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold mb-1">
                      Hours
                    </p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {point.hours}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {point.types.map((type, i) => (
                      <span
                        key={i}
                        className="bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 px-2 py-1 rounded text-xs font-bold"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
