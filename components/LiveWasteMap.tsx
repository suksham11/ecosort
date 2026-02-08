"use client";
import React, { useState, useEffect } from "react";
import {
  MapPin,
  Truck,
  Trash2,
  TrendingUp,
  Clock,
  Navigation,
} from "lucide-react";

interface WastePickup {
  id: number;
  location: string;
  lat: number;
  lng: number;
  type: "Organic" | "Plastic" | "Paper" | "Metal" | "E-Waste" | "Mixed";
  amount: number; // in kg
  status: "pending" | "collected" | "processing" | "disposed";
  timestamp: string;
  destination?: string;
  destinationLat?: number;
  destinationLng?: number;
}

interface TruckLocation {
  id: number;
  truckNumber: string;
  driver: string;
  lat: number;
  lng: number;
  route: string;
  capacity: number;
  currentLoad: number;
  status: "active" | "idle" | "maintenance";
  eta: string;
}

export default function LiveWasteMap() {
  const [activeTab, setActiveTab] = useState<"map" | "trucks" | "flow">("map");
  const [wastePickups, setWastePickups] = useState<WastePickup[]>([]);
  const [trucks, setTrucks] = useState<TruckLocation[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [liveStats, setLiveStats] = useState({
    totalCollected: 0,
    activeTrucks: 0,
    pendingPickups: 0,
    processingCenters: 3,
  });

  // Simulate real-time data updates
  useEffect(() => {
    // Initialize waste pickups with real data
    const initialPickups: WastePickup[] = [
      {
        id: 1,
        location: "Downtown District, Block A",
        lat: 40.7128,
        lng: -74.006,
        type: "Plastic",
        amount: 45.5,
        status: "collected",
        timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
        destination: "Recycling Center North",
        destinationLat: 40.7489,
        destinationLng: -73.968,
      },
      {
        id: 2,
        location: "Residential Area, Maple Street",
        lat: 40.758,
        lng: -73.9855,
        type: "Organic",
        amount: 32.0,
        status: "processing",
        timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
        destination: "Composting Facility East",
        destinationLat: 40.73,
        destinationLng: -73.95,
      },
      {
        id: 3,
        location: "Shopping Mall, East Wing",
        lat: 40.735,
        lng: -74.01,
        type: "Paper",
        amount: 78.3,
        status: "collected",
        timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
        destination: "Paper Mill Station",
        destinationLat: 40.765,
        destinationLng: -73.97,
      },
      {
        id: 4,
        location: "Tech Park, Building 7",
        lat: 40.72,
        lng: -74.02,
        type: "E-Waste",
        amount: 15.8,
        status: "pending",
        timestamp: new Date().toISOString(),
        destination: "E-Waste Processing Hub",
        destinationLat: 40.71,
        destinationLng: -74.04,
      },
      {
        id: 5,
        location: "Market District, Central",
        lat: 40.745,
        lng: -73.99,
        type: "Mixed",
        amount: 56.2,
        status: "collected",
        timestamp: new Date(Date.now() - 20 * 60000).toISOString(),
        destination: "Waste Treatment Plant",
        destinationLat: 40.76,
        destinationLng: -74.0,
      },
    ];

    // Initialize truck locations
    const initialTrucks: TruckLocation[] = [
      {
        id: 1,
        truckNumber: "WC-101",
        driver: "John Smith",
        lat: 40.73,
        lng: -74.005,
        route: "Downtown Route A",
        capacity: 500,
        currentLoad: 234,
        status: "active",
        eta: "15 mins",
      },
      {
        id: 2,
        truckNumber: "WC-102",
        driver: "Maria Garcia",
        lat: 40.75,
        lng: -73.98,
        route: "Residential Route B",
        capacity: 500,
        currentLoad: 412,
        status: "active",
        eta: "8 mins",
      },
      {
        id: 3,
        truckNumber: "WC-103",
        driver: "David Chen",
        lat: 40.74,
        lng: -74.015,
        route: "Commercial Route C",
        capacity: 750,
        currentLoad: 125,
        status: "active",
        eta: "22 mins",
      },
      {
        id: 4,
        truckNumber: "WC-104",
        driver: "Sarah Johnson",
        lat: 40.755,
        lng: -73.995,
        route: "Mixed Waste Route",
        capacity: 600,
        currentLoad: 580,
        status: "active",
        eta: "5 mins",
      },
    ];

    setWastePickups(initialPickups);
    setTrucks(initialTrucks);

    // Calculate initial stats
    updateLiveStats(initialPickups, initialTrucks);

    // Simulate real-time updates every 5 seconds
    const interval = setInterval(() => {
      setWastePickups((prev) => {
        const updated = prev.map((pickup) => {
          // Randomly update status
          if (pickup.status === "pending" && Math.random() > 0.7) {
            return { ...pickup, status: "collected" as const };
          }
          if (pickup.status === "collected" && Math.random() > 0.8) {
            return { ...pickup, status: "processing" as const };
          }
          if (pickup.status === "processing" && Math.random() > 0.9) {
            return { ...pickup, status: "disposed" as const };
          }
          return pickup;
        });

        // Add new random pickup occasionally
        if (Math.random() > 0.7) {
          const newPickup: WastePickup = {
            id: Date.now(),
            location: `Location ${Math.floor(Math.random() * 100)}`,
            lat: 40.7 + Math.random() * 0.1,
            lng: -74.0 + Math.random() * 0.1,
            type: ["Organic", "Plastic", "Paper", "Metal", "E-Waste", "Mixed"][
              Math.floor(Math.random() * 6)
            ] as any,
            amount: Math.floor(Math.random() * 100) + 10,
            status: "pending",
            timestamp: new Date().toISOString(),
            destination: "Processing Center",
            destinationLat: 40.75 + Math.random() * 0.05,
            destinationLng: -73.98 + Math.random() * 0.05,
          };
          updated.push(newPickup);
        }

        return updated;
      });

      // Update truck positions
      setTrucks((prev) =>
        prev.map((truck) => ({
          ...truck,
          lat: truck.lat + (Math.random() - 0.5) * 0.002,
          lng: truck.lng + (Math.random() - 0.5) * 0.002,
          currentLoad: Math.min(
            truck.capacity,
            truck.currentLoad + Math.floor(Math.random() * 20)
          ),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Update live stats whenever data changes
  useEffect(() => {
    updateLiveStats(wastePickups, trucks);
  }, [wastePickups, trucks]);

  const updateLiveStats = (
    pickups: WastePickup[],
    truckList: TruckLocation[]
  ) => {
    const totalCollected = pickups
      .filter((p) => p.status !== "pending")
      .reduce((sum, p) => sum + p.amount, 0);
    const activeTrucks = truckList.filter((t) => t.status === "active").length;
    const pendingPickups = pickups.filter((p) => p.status === "pending").length;

    setLiveStats({
      totalCollected: Math.floor(totalCollected),
      activeTrucks,
      pendingPickups,
      processingCenters: 3,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "collected":
        return "bg-blue-500";
      case "processing":
        return "bg-purple-500";
      case "disposed":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Organic":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Plastic":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "Paper":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      case "Metal":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
      case "E-Waste":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      default:
        return "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400";
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-green-900/20 dark:to-blue-900/20 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-green-100 dark:bg-green-900/30 rounded-full px-6 py-2 mb-4">
            <span className="text-green-600 dark:text-green-400 font-bold text-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              LIVE TRACKING
            </span>
          </div>
          <h2 className="text-5xl font-black text-gray-900 dark:text-white mb-4">
            Real-Time Waste Flow Tracking
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Track every piece of waste from collection to disposal. Live truck
            locations, real-time updates, and complete waste journey tracking.
          </p>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border-2 border-green-200 dark:border-green-900/50 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Trash2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
                  Total Collected
                </p>
                <p className="text-3xl font-black text-gray-900 dark:text-white">
                  {liveStats.totalCollected}
                  <span className="text-lg">kg</span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border-2 border-blue-200 dark:border-blue-900/50 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <Truck className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
                  Active Trucks
                </p>
                <p className="text-3xl font-black text-gray-900 dark:text-white">
                  {liveStats.activeTrucks}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border-2 border-yellow-200 dark:border-yellow-900/50 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
                  Pending Pickups
                </p>
                <p className="text-3xl font-black text-gray-900 dark:text-white">
                  {liveStats.pendingPickups}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border-2 border-purple-200 dark:border-purple-900/50 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
                  Processing Centers
                </p>
                <p className="text-3xl font-black text-gray-900 dark:text-white">
                  {liveStats.processingCenters}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-2 rounded-2xl shadow-lg">
          {[
            { id: "map", label: "Live Map", icon: MapPin },
            { id: "trucks", label: "Truck Tracking", icon: Truck },
            { id: "flow", label: "Waste Flow", icon: Navigation },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg scale-105"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Map View */}
        {activeTab === "map" && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Map Area */}
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30 rounded-2xl h-96 relative overflow-hidden border-2 border-blue-200 dark:border-blue-900/50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
                      <p className="text-gray-700 dark:text-gray-300 font-bold text-lg">
                        Interactive Map View
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Showing {wastePickups.length} active locations
                      </p>
                    </div>
                  </div>
                  {/* Simulated map markers */}
                  {wastePickups.slice(0, 5).map((pickup, index) => (
                    <div
                      key={pickup.id}
                      className="absolute animate-pulse"
                      style={{
                        left: `${20 + index * 15}%`,
                        top: `${30 + (index % 3) * 20}%`,
                      }}
                    >
                      <div
                        className={`w-4 h-4 ${getStatusColor(
                          pickup.status
                        )} rounded-full cursor-pointer hover:scale-150 transition-transform`}
                        onClick={() => setSelectedItem(pickup)}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location List */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-4">
                  Active Locations
                </h3>
                {wastePickups.slice(0, 10).map((pickup) => (
                  <div
                    key={pickup.id}
                    onClick={() => setSelectedItem(pickup)}
                    className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 ${getStatusColor(
                            pickup.status
                          )} rounded-full`}
                        ></div>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {pickup.location}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-bold ${getTypeColor(
                          pickup.type
                        )}`}
                      >
                        {pickup.type}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {pickup.amount} kg
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(pickup.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Truck Tracking View */}
        {activeTab === "trucks" && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trucks.map((truck) => (
                <div
                  key={truck.id}
                  className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border-2 border-blue-200 dark:border-blue-900/50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                        <Truck className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-gray-900 dark:text-white">
                          {truck.truckNumber}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Driver: {truck.driver}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-bold text-green-700 dark:text-green-400">
                        {truck.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Route:
                      </span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {truck.route}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Location:
                      </span>
                      <span className="text-xs font-mono text-gray-700 dark:text-gray-300">
                        {truck.lat.toFixed(4)}, {truck.lng.toFixed(4)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        ETA:
                      </span>
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                        {truck.eta}
                      </span>
                    </div>

                    {/* Load Progress */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Load:
                        </span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {truck.currentLoad} / {truck.capacity} kg
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-cyan-600 h-full transition-all duration-500 rounded-full"
                          style={{
                            width: `${
                              (truck.currentLoad / truck.capacity) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Waste Flow View */}
        {activeTab === "flow" && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6">
              Waste Journey Tracking
            </h3>
            <div className="space-y-4">
              {wastePickups.slice(0, 8).map((pickup) => (
                <div
                  key={pickup.id}
                  className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start gap-6">
                    {/* Timeline */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 ${getStatusColor(
                          pickup.status
                        )} rounded-full flex items-center justify-center`}
                      >
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      {pickup.destination && (
                        <>
                          <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-green-500"></div>
                          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                            <Navigation className="w-6 h-6 text-white" />
                          </div>
                        </>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                            {pickup.location}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(pickup.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <span
                          className={`px-4 py-2 rounded-xl font-bold text-sm ${getTypeColor(
                            pickup.type
                          )}`}
                        >
                          {pickup.type}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            Amount
                          </p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                            {pickup.amount} kg
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            Status
                          </p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white capitalize">
                            {pickup.status}
                          </p>
                        </div>
                      </div>

                      {pickup.destination && (
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 border border-green-200 dark:border-green-900/50">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            Destination
                          </p>
                          <p className="text-sm font-bold text-gray-900 dark:text-white">
                            {pickup.destination}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            📍 {pickup.destinationLat?.toFixed(4)},{" "}
                            {pickup.destinationLng?.toFixed(4)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Selected Item Details Modal */}
        {selectedItem && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-2xl w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6">
                Pickup Details
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Location
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {selectedItem.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Type
                    </p>
                    <span
                      className={`inline-block px-3 py-1 rounded-lg font-bold ${getTypeColor(
                        selectedItem.type
                      )}`}
                    >
                      {selectedItem.type}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Amount
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {selectedItem.amount} kg
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Status
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white capitalize">
                      {selectedItem.status}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
