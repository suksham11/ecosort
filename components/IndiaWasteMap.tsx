"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Truck, MapPin, Package, Navigation, TrendingUp } from "lucide-react";
// Uncomment to enable database integration:
// import { updateTruckLocation, getTrucks } from "@/lib/api";

// Dynamically import map to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});
const Polyline = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polyline),
  { ssr: false }
);

// Custom truck icon using divIcon
const createTruckIcon = (status: string) => {
  if (typeof window === "undefined") return undefined;
  const L = require("leaflet");

  const color =
    status === "picking_up"
      ? "#EAB308"
      : status === "in_transit"
      ? "#3B82F6"
      : status === "delivering"
      ? "#8B5CF6"
      : "#10B981";

  return L.divIcon({
    html: `
      <div style="position: relative;">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="${color}" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
          <path d="M18 18.5a1.5 1.5 0 0 1-1 1.5a1.5 1.5 0 0 1-1.5-1.5a1.5 1.5 0 0 1 1.5-1.5a1.5 1.5 0 0 1 1 1.5m1.5-9l1.96 2.5H17V9.5m-11 9A1.5 1.5 0 0 1 4.5 17A1.5 1.5 0 0 1 6 15.5A1.5 1.5 0 0 1 7.5 17A1.5 1.5 0 0 1 6 18.5M20 8h-3V4H3c-1.11 0-2 .89-2 2v11h2a3 3 0 0 0 3 3a3 3 0 0 0 3-3h6a3 3 0 0 0 3 3a3 3 0 0 0 3-3h2v-5l-3-4Z"/>
        </svg>
        <div style="position: absolute; top: -8px; right: -8px; background: white; border-radius: 50%; width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
          🚛
        </div>
      </div>
    `,
    className: "custom-truck-icon",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  });
};

// Custom pickup icon
const createPickupIcon = () => {
  if (typeof window === "undefined") return undefined;
  const L = require("leaflet");

  return L.divIcon({
    html: `
      <div style="background: #EF4444; width: 32px; height: 32px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.3); border: 3px solid white;">
        <span style="transform: rotate(45deg); font-size: 16px;">📍</span>
      </div>
    `,
    className: "custom-pickup-icon",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

// Custom facility icon
const createFacilityIcon = () => {
  if (typeof window === "undefined") return undefined;
  const L = require("leaflet");

  return L.divIcon({
    html: `
      <div style="background: #3B82F6; width: 32px; height: 32px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.3); border: 3px solid white;">
        <span style="transform: rotate(45deg); font-size: 16px;">🏭</span>
      </div>
    `,
    className: "custom-facility-icon",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

interface TruckData {
  id: number;
  truckNumber: string;
  driver: string;
  currentLat: number;
  currentLng: number;
  pickupLat: number;
  pickupLng: number;
  dropLat: number;
  dropLng: number;
  pickupLocation: string;
  dropLocation: string;
  wasteType: string;
  amount: number;
  progress: number; // 0-100
  status: "picking_up" | "in_transit" | "delivering" | "completed";
  speed: number; // km/h
  eta: string;
}

interface WastePoint {
  id: number;
  lat: number;
  lng: number;
  city: string;
  state: string;
  type: "pickup" | "dropoff";
  wasteType: string;
  amount: number;
  facility?: string;
}

export default function IndiaWasteTrackingMap() {
  const [trucks, setTrucks] = useState<TruckData[]>([]);
  const [wastePoints, setWastePoints] = useState<WastePoint[]>([]);
  const [showTruckList, setShowTruckList] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [stats, setStats] = useState({
    activeTrucks: 0,
    totalWaste: 0,
    citiesCovered: 0,
    inTransit: 0,
  });

  // Fix hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Initialize real India locations for waste tracking
    const initialWastePoints: WastePoint[] = [
      // Pickup Points
      {
        id: 1,
        lat: 28.6139,
        lng: 77.209,
        city: "Delhi",
        state: "Delhi",
        type: "pickup",
        wasteType: "Mixed",
        amount: 1250,
      },
      {
        id: 2,
        lat: 19.076,
        lng: 72.8777,
        city: "Mumbai",
        state: "Maharashtra",
        type: "pickup",
        wasteType: "Plastic",
        amount: 890,
      },
      {
        id: 3,
        lat: 13.0827,
        lng: 80.2707,
        city: "Chennai",
        state: "Tamil Nadu",
        type: "pickup",
        wasteType: "Organic",
        amount: 1450,
      },
      {
        id: 4,
        lat: 22.5726,
        lng: 88.3639,
        city: "Kolkata",
        state: "West Bengal",
        type: "pickup",
        wasteType: "Paper",
        amount: 670,
      },
      {
        id: 5,
        lat: 12.9716,
        lng: 77.5946,
        city: "Bangalore",
        state: "Karnataka",
        type: "pickup",
        wasteType: "E-Waste",
        amount: 340,
      },
      {
        id: 6,
        lat: 17.385,
        lng: 78.4867,
        city: "Hyderabad",
        state: "Telangana",
        type: "pickup",
        wasteType: "Metal",
        amount: 520,
      },
      {
        id: 7,
        lat: 23.0225,
        lng: 72.5714,
        city: "Ahmedabad",
        state: "Gujarat",
        type: "pickup",
        wasteType: "Plastic",
        amount: 780,
      },
      {
        id: 8,
        lat: 26.9124,
        lng: 75.7873,
        city: "Jaipur",
        state: "Rajasthan",
        type: "pickup",
        wasteType: "Mixed",
        amount: 650,
      },
      {
        id: 9,
        lat: 18.5204,
        lng: 73.8567,
        city: "Pune",
        state: "Maharashtra",
        type: "pickup",
        wasteType: "Organic",
        amount: 920,
      },
      {
        id: 10,
        lat: 21.1702,
        lng: 72.8311,
        city: "Surat",
        state: "Gujarat",
        type: "pickup",
        wasteType: "Paper",
        amount: 560,
      },

      // Drop-off Points (Processing Facilities)
      {
        id: 11,
        lat: 28.5,
        lng: 77.4,
        city: "Ghaziabad",
        state: "Uttar Pradesh",
        type: "dropoff",
        wasteType: "All",
        amount: 0,
        facility: "North India Recycling Center",
      },
      {
        id: 12,
        lat: 19.2,
        lng: 73.0,
        city: "Navi Mumbai",
        state: "Maharashtra",
        type: "dropoff",
        wasteType: "Plastic",
        amount: 0,
        facility: "West Coast Plastic Processing",
      },
      {
        id: 13,
        lat: 13.2,
        lng: 80.1,
        city: "Kanchipuram",
        state: "Tamil Nadu",
        type: "dropoff",
        wasteType: "Organic",
        amount: 0,
        facility: "South India Composting Facility",
      },
      {
        id: 14,
        lat: 22.7,
        lng: 88.5,
        city: "Howrah",
        state: "West Bengal",
        type: "dropoff",
        wasteType: "All",
        amount: 0,
        facility: "East India Waste Management",
      },
      {
        id: 15,
        lat: 12.8,
        lng: 77.8,
        city: "Whitefield",
        state: "Karnataka",
        type: "dropoff",
        wasteType: "E-Waste",
        amount: 0,
        facility: "Electronic Recycling Hub",
      },
    ];

    // Initialize trucks with routes across India
    const initialTrucks: TruckData[] = [
      {
        id: 1,
        truckNumber: "DL-01-WM-1234",
        driver: "Rajesh Kumar",
        currentLat: 28.6139,
        currentLng: 77.209,
        pickupLat: 28.6139,
        pickupLng: 77.209,
        dropLat: 28.5,
        dropLng: 77.4,
        pickupLocation: "Delhi",
        dropLocation: "Ghaziabad Recycling Center",
        wasteType: "Mixed Waste",
        amount: 1250,
        progress: 0,
        status: "picking_up",
        speed: 45,
        eta: "35 mins",
      },
      {
        id: 2,
        truckNumber: "MH-02-WM-5678",
        driver: "Suresh Patil",
        currentLat: 19.15,
        currentLng: 72.95,
        pickupLat: 19.076,
        pickupLng: 72.8777,
        dropLat: 19.2,
        dropLng: 73.0,
        pickupLocation: "Mumbai",
        dropLocation: "Navi Mumbai Processing",
        wasteType: "Plastic",
        amount: 890,
        progress: 45,
        status: "in_transit",
        speed: 52,
        eta: "22 mins",
      },
      {
        id: 3,
        truckNumber: "TN-03-WM-9012",
        driver: "Arun Sharma",
        currentLat: 13.1,
        currentLng: 80.22,
        pickupLat: 13.0827,
        pickupLng: 80.2707,
        dropLat: 13.2,
        dropLng: 80.1,
        pickupLocation: "Chennai",
        dropLocation: "Kanchipuram Composting",
        wasteType: "Organic",
        amount: 1450,
        progress: 30,
        status: "in_transit",
        speed: 48,
        eta: "28 mins",
      },
      {
        id: 4,
        truckNumber: "WB-04-WM-3456",
        driver: "Amit Ghosh",
        currentLat: 22.65,
        currentLng: 88.42,
        pickupLat: 22.5726,
        pickupLng: 88.3639,
        dropLat: 22.7,
        dropLng: 88.5,
        pickupLocation: "Kolkata",
        dropLocation: "Howrah Waste Facility",
        wasteType: "Paper",
        amount: 670,
        progress: 60,
        status: "in_transit",
        speed: 40,
        eta: "18 mins",
      },
      {
        id: 5,
        truckNumber: "KA-05-WM-7890",
        driver: "Venkat Reddy",
        currentLat: 12.92,
        currentLng: 77.65,
        pickupLat: 12.9716,
        pickupLng: 77.5946,
        dropLat: 12.8,
        dropLng: 77.8,
        pickupLocation: "Bangalore",
        dropLocation: "E-Waste Hub Whitefield",
        wasteType: "E-Waste",
        amount: 340,
        progress: 25,
        status: "in_transit",
        speed: 55,
        eta: "32 mins",
      },
      {
        id: 6,
        truckNumber: "TS-06-WM-2345",
        driver: "Krishna Murthy",
        currentLat: 17.385,
        currentLng: 78.4867,
        dropLat: 17.5,
        dropLng: 78.6,
        pickupLat: 17.385,
        pickupLng: 78.4867,
        pickupLocation: "Hyderabad",
        dropLocation: "Secunderabad Processing",
        wasteType: "Metal",
        amount: 520,
        progress: 0,
        status: "picking_up",
        speed: 0,
        eta: "40 mins",
      },
    ];

    setWastePoints(initialWastePoints);
    setTrucks(initialTrucks);
    updateStats(initialTrucks);

    // Simulate real-time truck movement
    const interval = setInterval(() => {
      setTrucks((prevTrucks) => {
        const updatedTrucks = prevTrucks.map((truck) => {
          if (truck.status === "completed") return truck;

          let newProgress = truck.progress + Math.random() * 3;
          let newStatus: TruckData["status"] = truck.status;
          let newLat = truck.currentLat;
          let newLng = truck.currentLng;

          if (newProgress >= 100) {
            newProgress = 100;
            newStatus = "completed";
          } else if (newProgress > 10 && truck.status === "picking_up") {
            newStatus = "in_transit";
          }

          // Calculate new position along the route
          if (newStatus === "in_transit") {
            const latDiff = truck.dropLat - truck.pickupLat;
            const lngDiff = truck.dropLng - truck.pickupLng;
            newLat = truck.pickupLat + (latDiff * newProgress) / 100;
            newLng = truck.pickupLng + (lngDiff * newProgress) / 100;
          }

          // Update ETA
          const remainingDistance = 100 - newProgress;
          const estimatedMinutes = Math.max(
            5,
            Math.floor(remainingDistance * 0.5)
          );
          const newEta = `${estimatedMinutes} mins`;

          const updatedTruck = {
            ...truck,
            progress: newProgress,
            status: newStatus,
            currentLat: newLat,
            currentLng: newLng,
            eta: newEta,
          };

          // Uncomment to sync with database:
          // updateTruckLocation({
          //   truckId: truck.truckNumber,
          //   truckName: `${truck.truckNumber} - ${truck.driver}`,
          //   latitude: newLat,
          //   longitude: newLng,
          //   status: newStatus === 'completed' ? 'inactive' : 'active',
          //   wasteLoad: newProgress,
          //   wasteType: truck.wasteType.toLowerCase().includes('plastic') ? 'recyclable' :
          //              truck.wasteType.toLowerCase().includes('organic') ? 'biodegradable' :
          //              truck.wasteType.toLowerCase().includes('hazard') ? 'hazardous' : 'mixed',
          //   route: `${truck.pickupLocation} → ${truck.dropLocation}`,
          //   speed: truck.speed,
          // }).catch(err => console.error('Failed to sync truck:', err));

          return updatedTruck;
        });

        updateStats(updatedTrucks);
        return updatedTrucks;
      });
    }, 2000); // Update every 2 seconds for smooth movement

    return () => clearInterval(interval);
  }, []);

  const updateStats = (truckList: TruckData[]) => {
    const activeTrucks = truckList.filter(
      (t) => t.status !== "completed"
    ).length;
    const totalWaste = truckList.reduce((sum, t) => sum + t.amount, 0);
    const inTransit = truckList.filter((t) => t.status === "in_transit").length;
    const cities = new Set(truckList.map((t) => t.pickupLocation)).size;

    setStats({
      activeTrucks,
      totalWaste,
      citiesCovered: cities,
      inTransit,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "picking_up":
        return "text-yellow-600";
      case "in_transit":
        return "text-blue-600";
      case "delivering":
        return "text-purple-600";
      case "completed":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 via-green-50 to-cyan-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-green-900/20 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-blue-100 dark:bg-blue-900/30 rounded-full px-6 py-2 mb-4">
            <span className="text-blue-600 dark:text-blue-400 font-bold text-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              LIVE TRACKING - ALL INDIA
            </span>
          </div>
          <h2 className="text-5xl font-black text-gray-900 dark:text-white mb-4">
            India Waste Collection Map
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Real-time tracking of waste collection trucks across India. Watch
            live as trucks move from pickup to processing facilities.
          </p>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 border-2 border-blue-200 dark:border-blue-900/50 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
                  Active Trucks
                </p>
                <p className="text-2xl font-black text-gray-900 dark:text-white">
                  {stats.activeTrucks}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 border-2 border-green-200 dark:border-green-900/50 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
                  Total Waste
                </p>
                <p className="text-2xl font-black text-gray-900 dark:text-white">
                  {stats.totalWaste}
                  <span className="text-sm">kg</span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 border-2 border-purple-200 dark:border-purple-900/50 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
                  Cities Covered
                </p>
                <p className="text-2xl font-black text-gray-900 dark:text-white">
                  {stats.citiesCovered}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 border-2 border-orange-200 dark:border-orange-900/50 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <Navigation className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
                  In Transit
                </p>
                <p className="text-2xl font-black text-gray-900 dark:text-white">
                  {stats.inTransit}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Map and Truck List - Side by Side Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Map Container - Takes 2/3 width on large screens */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border-2 border-blue-200 dark:border-blue-900/50">
              <div className="w-full h-[600px] rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                {isMounted && typeof window !== "undefined" && (
                  <MapContainer
                    center={[20.5937, 78.9629]}
                    zoom={5}
                    style={{ height: "100%", width: "100%" }}
                    className="z-0"
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />

                    {/* Waste Points */}
                    {wastePoints.map((point) => (
                      <Marker
                        key={point.id}
                        position={[point.lat, point.lng]}
                        icon={
                          point.type === "pickup"
                            ? createPickupIcon()
                            : createFacilityIcon()
                        }
                      >
                        <Popup>
                          <div className="p-2">
                            <h3 className="font-bold text-lg mb-2">
                              {point.type === "pickup"
                                ? "📍 Pickup"
                                : "🏭 Facility"}
                            </h3>
                            <p className="font-semibold">
                              {point.city}, {point.state}
                            </p>
                            {point.facility && (
                              <p className="text-sm text-gray-600">
                                {point.facility}
                              </p>
                            )}
                            <p className="text-sm mt-2">
                              <strong>Type:</strong> {point.wasteType}
                            </p>
                            {point.type === "pickup" && (
                              <p className="text-sm">
                                <strong>Amount:</strong> {point.amount} kg
                              </p>
                            )}
                          </div>
                        </Popup>
                      </Marker>
                    ))}

                    {/* Truck Routes and Positions */}
                    {trucks.map((truck) => (
                      <React.Fragment key={truck.id}>
                        {/* Route Line */}
                        <Polyline
                          positions={[
                            [truck.pickupLat, truck.pickupLng],
                            [truck.dropLat, truck.dropLng],
                          ]}
                          pathOptions={{
                            color:
                              truck.status === "completed"
                                ? "#10b981"
                                : "#3b82f6",
                            weight: 3,
                            opacity: 0.6,
                            dashArray: "10, 10",
                          }}
                        />

                        {/* Moving Truck Marker */}
                        {truck.status !== "completed" && (
                          <Marker
                            position={[truck.currentLat, truck.currentLng]}
                            icon={createTruckIcon(truck.status)}
                          >
                            <Popup>
                              <div className="p-2 min-w-[200px]">
                                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                  <Truck className="w-5 h-5" />
                                  {truck.truckNumber}
                                </h3>
                                <p className="text-sm">
                                  <strong>Driver:</strong> {truck.driver}
                                </p>
                                <p className="text-sm">
                                  <strong>From:</strong> {truck.pickupLocation}
                                </p>
                                <p className="text-sm">
                                  <strong>To:</strong> {truck.dropLocation}
                                </p>
                                <p className="text-sm">
                                  <strong>Waste:</strong> {truck.wasteType} (
                                  {truck.amount} kg)
                                </p>
                                <p className="text-sm">
                                  <strong>Speed:</strong> {truck.speed} km/h
                                </p>
                                <p className="text-sm">
                                  <strong>ETA:</strong> {truck.eta}
                                </p>
                                <div className="mt-2">
                                  <div className="flex items-center justify-between text-xs mb-1">
                                    <span>Progress</span>
                                    <span>{truck.progress.toFixed(0)}%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                      style={{ width: `${truck.progress}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </Popup>
                          </Marker>
                        )}
                      </React.Fragment>
                    ))}
                  </MapContainer>
                )}
              </div>
            </div>
          </div>

          {/* Live Truck Status - Right Side with Toggle */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border-2 border-gray-200 dark:border-gray-700 sticky top-24">
              {/* Toggle Button */}
              <button
                onClick={() => setShowTruckList(!showTruckList)}
                className="w-full mb-4 flex items-center justify-between bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Live Truck Status
                </span>
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${
                    showTruckList ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Collapsible Truck List */}
              <div
                className={`transition-all duration-500 overflow-hidden ${
                  showTruckList
                    ? "max-h-[800px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="space-y-3 max-h-[750px] overflow-y-auto pr-2 custom-scrollbar">
                  {trucks.map((truck) => (
                    <div
                      key={truck.id}
                      className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                    >
                      {/* Truck Header */}
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            truck.status === "picking_up"
                              ? "bg-yellow-100 dark:bg-yellow-900/30"
                              : truck.status === "in_transit"
                              ? "bg-blue-100 dark:bg-blue-900/30"
                              : truck.status === "delivering"
                              ? "bg-purple-100 dark:bg-purple-900/30"
                              : "bg-green-100 dark:bg-green-900/30"
                          }`}
                        >
                          <Truck
                            className={`w-5 h-5 ${
                              truck.status === "picking_up"
                                ? "text-yellow-600"
                                : truck.status === "in_transit"
                                ? "text-blue-600"
                                : truck.status === "delivering"
                                ? "text-purple-600"
                                : "text-green-600"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900 dark:text-white">
                            {truck.truckNumber}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {truck.driver}
                          </p>
                        </div>
                      </div>

                      {/* Route Info */}
                      <div className="mb-2">
                        <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                          <MapPin className="w-3 h-3" />
                          <span className="font-semibold">
                            {truck.pickupLocation}
                          </span>
                          <span>→</span>
                          <span className="font-semibold">
                            {truck.dropLocation}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          {truck.wasteType} • {truck.amount} kg
                        </p>
                      </div>

                      {/* Status Badge */}
                      <div className="mb-2">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-bold ${
                            truck.status === "picking_up"
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : truck.status === "in_transit"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                              : truck.status === "delivering"
                              ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                              : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          }`}
                        >
                          {truck.status.replace("_", " ").toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-600 dark:text-gray-400 ml-2">
                          ETA: {truck.eta}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-gray-500 dark:text-gray-400">
                            Progress
                          </span>
                          <span className="font-bold text-gray-900 dark:text-white">
                            {truck.progress.toFixed(0)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${
                              truck.status === "completed"
                                ? "bg-green-500"
                                : truck.status === "in_transit"
                                ? "bg-blue-500"
                                : truck.status === "delivering"
                                ? "bg-purple-500"
                                : "bg-yellow-500"
                            }`}
                            style={{ width: `${truck.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary when collapsed */}
              {!showTruckList && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-center">
                    <p className="text-2xl font-black text-blue-600 dark:text-blue-400">
                      {stats.activeTrucks}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Active
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 text-center">
                    <p className="text-2xl font-black text-green-600 dark:text-green-400">
                      {stats.inTransit}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      In Transit
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
