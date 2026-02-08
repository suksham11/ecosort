"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bell,
  BellRing,
  Trash2,
  MapPin,
  Calendar,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Gift,
  Smartphone,
  Settings,
  X,
} from "lucide-react";
import useNotifications from "@/hooks/useNotifications";

export default function NotificationsPage() {
  const [filter, setFilter] = useState<
    "all" | "pickups" | "alerts" | "rewards"
  >("all");
  const { sendNotification, requestPermission, isSupported, permission } =
    useNotifications();
  const [notificationSettings, setNotificationSettings] = useState({
    pickups: true,
    alerts: true,
    rewards: true,
    nearby: true,
  });

  useEffect(() => {
    // Load notification settings from localStorage (browser only)
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("notificationSettings");
      if (saved) {
        setNotificationSettings(JSON.parse(saved));
      }
    }
  }, []);

  const handlePermissionRequest = async () => {
    const granted = await requestPermission();
    if (granted) {
      sendNotification("EcoSort Notifications Enabled!", {
        body: "You'll now receive important waste management updates",
        icon: "/logo.png",
      });
    }
  };

  const handleToggleSetting = (key: keyof typeof notificationSettings) => {
    const newSettings = {
      ...notificationSettings,
      [key]: !notificationSettings[key],
    };
    setNotificationSettings(newSettings);
    if (typeof window !== "undefined") {
      localStorage.setItem("notificationSettings", JSON.stringify(newSettings));
    }
  };

  const sendTestNotification = () => {
    sendNotification("Test Notification", {
      body: "This is a test notification from EcoSort!",
      icon: "/logo.png",
    });
  };

  const notifications = [
    {
      id: 1,
      type: "pickup",
      title: "Pickup Reminder",
      message: "Your waste pickup is scheduled for tomorrow at 10:00 AM",
      time: "2 hours ago",
      read: false,
      icon: <Calendar className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-600",
    },
    {
      id: 2,
      type: "alert",
      title: "Incorrect Disposal Alert",
      message:
        "Non-recyclable item detected in recycling bin. Please review our guide.",
      time: "5 hours ago",
      read: false,
      icon: <AlertTriangle className="w-6 h-6" />,
      color: "from-red-500 to-pink-600",
    },
    {
      id: 3,
      type: "rewards",
      title: "New Achievement Unlocked!",
      message:
        "You've earned the 'Eco Champion' badge for 30-day recycling streak",
      time: "1 day ago",
      read: true,
      icon: <Gift className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-600",
    },
    {
      id: 4,
      type: "pickup",
      title: "Collection Point Nearby",
      message: "A new collection point opened 0.5km from your location",
      time: "1 day ago",
      read: true,
      icon: <MapPin className="w-6 h-6" />,
      color: "from-green-500 to-emerald-600",
    },
    {
      id: 5,
      type: "alert",
      title: "Donation Opportunity",
      message: "Local charity accepting clothing donations this week",
      time: "2 days ago",
      read: true,
      icon: <Gift className="w-6 h-6" />,
      color: "from-purple-500 to-pink-600",
    },
    {
      id: 6,
      type: "rewards",
      title: "Weekly Summary",
      message: "You recycled 15 items this week and earned 250 EcoPoints!",
      time: "3 days ago",
      read: true,
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-indigo-500 to-purple-600",
    },
    {
      id: 7,
      type: "pickup",
      title: "Route Update",
      message: "Collection truck is 3 stops away from your location",
      time: "3 days ago",
      read: true,
      icon: <Trash2 className="w-6 h-6" />,
      color: "from-blue-500 to-indigo-600",
    },
  ];

  const filteredNotifications =
    filter === "all"
      ? notifications
      : notifications.filter((n) => n.type === filter.replace("s", ""));

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-pink-50 dark:from-gray-900 dark:via-violet-900/20 dark:to-fuchsia-900/20 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="w-12 h-12 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </Link>
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                Notifications
              </h1>
              <p className="text-gray-600 dark:text-gray-400 font-semibold">
                Stay updated with pickups, alerts & rewards
              </p>
            </div>
          </div>
          <div className="relative">
            <Bell className="w-12 h-12 text-violet-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                {unreadCount}
              </span>
            )}
          </div>
        </div>

        {/* Notification Settings Card */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-2xl flex items-center justify-center text-white">
                <Smartphone className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white">
                  Browser Notifications
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
                  {permission === "granted"
                    ? "Notifications enabled"
                    : permission === "denied"
                    ? "Notifications blocked"
                    : "Enable notifications"}
                </p>
              </div>
            </div>
            {permission !== "granted" && (
              <button
                onClick={handlePermissionRequest}
                className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                Enable
              </button>
            )}
            {permission === "granted" && (
              <button
                onClick={sendTestNotification}
                className="bg-gray-100 dark:bg-gray-700 px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform text-gray-700 dark:text-gray-300"
              >
                Test
              </button>
            )}
          </div>

          {/* Notification Preferences */}
          {permission === "granted" && (
            <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                Notification Preferences
              </p>
              {Object.entries(notificationSettings).map(([key, value]) => (
                <label
                  key={key}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                >
                  <span className="text-gray-700 dark:text-gray-300 font-semibold capitalize">
                    {key} Notifications
                  </span>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() =>
                      handleToggleSetting(
                        key as keyof typeof notificationSettings
                      )
                    }
                    className="w-5 h-5 rounded accent-violet-600"
                  />
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-2 rounded-2xl shadow-lg">
          {[
            { id: "all", label: "All", count: notifications.length },
            {
              id: "pickups",
              label: "Pickups",
              count: notifications.filter((n) => n.type === "pickup").length,
            },
            {
              id: "alerts",
              label: "Alerts",
              count: notifications.filter((n) => n.type === "alert").length,
            },
            {
              id: "rewards",
              label: "Rewards",
              count: notifications.filter((n) => n.type === "rewards").length,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all ${
                filter === tab.id
                  ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg scale-105"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {tab.label}
              <span
                className={`ml-2 ${
                  filter === tab.id
                    ? "text-white/80"
                    : "text-gray-500 dark:text-gray-500"
                }`}
              >
                ({tab.count})
              </span>
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border-2 transition-all hover:scale-102 ${
                notification.read
                  ? "border-gray-200 dark:border-gray-700"
                  : "border-violet-300 dark:border-violet-700 shadow-2xl"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${notification.color} rounded-2xl flex items-center justify-center text-white flex-shrink-0`}
                >
                  {notification.icon}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-black text-gray-900 dark:text-white">
                        {notification.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {notification.message}
                      </p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-500">
                      {notification.time}
                    </span>
                    {!notification.read && (
                      <span className="bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <BellRing className="w-3 h-3" />
                        New
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-gray-200 dark:border-gray-700 text-center">
            <CheckCircle className="w-20 h-20 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-black text-gray-400 dark:text-gray-500 mb-2">
              All Caught Up!
            </h3>
            <p className="text-gray-500 dark:text-gray-600 font-semibold">
              No {filter} notifications at the moment
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {[
            {
              title: "Pickup Reminders",
              description: "Never miss a collection day",
              icon: <Calendar className="w-6 h-6" />,
              color: "from-blue-500 to-cyan-600",
            },
            {
              title: "Nearby Points",
              description: "Find collection centers",
              icon: <MapPin className="w-6 h-6" />,
              color: "from-green-500 to-emerald-600",
            },
            {
              title: "Disposal Alerts",
              description: "Learn correct sorting",
              icon: <AlertTriangle className="w-6 h-6" />,
              color: "from-orange-500 to-red-600",
            },
          ].map((action, index) => (
            <div
              key={index}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform cursor-pointer"
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center text-white mb-4`}
              >
                {action.icon}
              </div>
              <h3 className="text-lg font-black text-gray-900 dark:text-white mb-1">
                {action.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
                {action.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
