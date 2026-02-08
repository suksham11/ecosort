"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Camera,
  Scan,
  Trophy,
  Target,
  Users,
  BarChart3,
  Truck,
  Bell,
  BookOpen,
  Menu,
  X,
  ChevronRight,
  Settings,
  LogOut,
  User,
} from "lucide-react";
import AuthModal from "./AuthModal";

interface SidebarProps {
  children: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleAuthSuccess = () => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: Home,
      path: "/dashboard",
      color: "text-green-500",
    },
    {
      name: "AI Scanner",
      icon: Camera,
      path: "/content",
      color: "text-blue-500",
    },
    {
      name: "Barcode Scan",
      icon: Scan,
      path: "/scanner",
      color: "text-cyan-500",
    },
    {
      name: "Leaderboard",
      icon: Trophy,
      path: "/leaderboard",
      color: "text-yellow-500",
    },
    {
      name: "Challenges",
      icon: Target,
      path: "/challenges",
      color: "text-orange-500",
    },
    {
      name: "Campaigns",
      icon: Users,
      path: "/campaigns",
      color: "text-emerald-500",
    },
    {
      name: "Analytics",
      icon: BarChart3,
      path: "/analytics",
      color: "text-indigo-500",
    },
    {
      name: "Collection",
      icon: Truck,
      path: "/collection",
      color: "text-cyan-600",
    },
    {
      name: "Community",
      icon: BookOpen,
      path: "/community",
      color: "text-teal-500",
    },
    {
      name: "Notifications",
      icon: Bell,
      path: "/notifications",
      color: "text-purple-500",
    },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside
        className={`hidden lg:flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 select-none">
          {isSidebarOpen ? (
            <div className="flex items-center gap-3 pointer-events-none">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">♻</span>
              </div>
              <div>
                <h1 className="text-xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  EcoSort
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Smart Waste
                </p>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg mx-auto pointer-events-none">
              <span className="text-white font-bold text-xl">♻</span>
            </div>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden lg:block text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <ChevronRight
              className={`w-5 h-5 transition-transform ${
                isSidebarOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="space-y-1 px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link key={item.path} href={item.path}>
                  <div
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all cursor-pointer group ${
                      active
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 flex-shrink-0 ${
                        active ? "text-white" : item.color
                      }`}
                    />
                    {isSidebarOpen && (
                      <span className="font-semibold text-sm">{item.name}</span>
                    )}
                    {!isSidebarOpen && active && (
                      <div className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.name}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Profile */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          {isSidebarOpen ? (
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                {user?.avatar || "U"}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  {user?.name || "Guest"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user ? "Eco Warrior" : "Not signed in"}
                </p>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-3">
              {user?.avatar || "U"}
            </div>
          )}
          {user ? (
            <div
              className={`flex ${isSidebarOpen ? "gap-2" : "flex-col gap-2"}`}
            >
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <Settings className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                {isSidebarOpen && (
                  <span className="text-xs font-semibold">Settings</span>
                )}
              </button>
              {isSidebarOpen && (
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-lg font-bold text-sm hover:shadow-lg transition-all"
            >
              {isSidebarOpen ? "Sign In" : <User className="w-4 h-4 mx-auto" />}
            </button>
          )}
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 transform transition-transform duration-300 lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Logo */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 select-none">
          <div className="flex items-center gap-3 pointer-events-none">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">♻</span>
            </div>
            <div>
              <h1 className="text-xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                EcoSort
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Smart Waste
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 pointer-events-auto"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="space-y-1 px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link key={item.path} href={item.path}>
                  <div
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all cursor-pointer ${
                      active
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        active ? "text-white" : item.color
                      }`}
                    />
                    <span className="font-semibold text-sm">{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                  {menuItems.find((item) => item.path === pathname)?.name ||
                    "Dashboard"}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Welcome back to your eco dashboard
                </p>
              </div>
            </div>

            {/* Right Header Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/notifications")}
                className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-gray-700">
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    User
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Eco Warrior
                  </p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                  U
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="p-6">{children}</div>
        </main>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
}
