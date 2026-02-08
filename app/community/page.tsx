"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  Calendar,
  BookOpen,
  Award,
  MessageCircle,
  Video,
  FileText,
  Clock,
  MapPin,
  Heart,
  Share2,
  ChevronRight,
} from "lucide-react";
import EventRegistrationModal from "@/components/EventRegistrationModal";

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<
    "events" | "workshops" | "education"
  >("events");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [registrationType, setRegistrationType] = useState<
    "event" | "workshop"
  >("event");

  const handleRegister = (event: any, type: "event" | "workshop") => {
    setSelectedEvent(event);
    setRegistrationType(type);
    setShowRegistrationModal(true);
  };

  const upcomingEvents = [
    {
      id: 1,
      title: "Beach Cleanup Drive",
      organizer: "Ocean Guardians",
      date: "Dec 18, 2025",
      time: "8:00 AM - 12:00 PM",
      location: "Sunset Beach",
      participants: 156,
      maxParticipants: 200,
      image: "🏖️",
      category: "Cleanup",
      registered: false,
    },
    {
      id: 2,
      title: "Zero Waste Workshop",
      organizer: "Green Living Co",
      date: "Dec 20, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Community Center",
      participants: 42,
      maxParticipants: 50,
      image: "♻️",
      category: "Workshop",
      registered: true,
    },
    {
      id: 3,
      title: "Kids Eco Education Day",
      organizer: "Future Earth Foundation",
      date: "Dec 22, 2025",
      time: "10:00 AM - 3:00 PM",
      location: "City Park",
      participants: 89,
      maxParticipants: 150,
      image: "🌱",
      category: "Education",
      registered: false,
    },
  ];

  const workshops = [
    {
      id: 1,
      title: "Composting 101",
      instructor: "Dr. Sarah Green",
      duration: "2 hours",
      level: "Beginner",
      nextSession: "Dec 19, 2025",
      enrolled: 234,
      rating: 4.8,
      image: "🌿",
    },
    {
      id: 2,
      title: "DIY Upcycling Techniques",
      instructor: "Mike Craft",
      duration: "3 hours",
      level: "Intermediate",
      nextSession: "Dec 21, 2025",
      enrolled: 187,
      rating: 4.9,
      image: "🎨",
    },
    {
      id: 3,
      title: "E-Waste Management",
      instructor: "Tech Recycle Team",
      duration: "1.5 hours",
      level: "Beginner",
      nextSession: "Dec 23, 2025",
      enrolled: 156,
      rating: 4.7,
      image: "💻",
    },
  ];

  const educationResources = [
    {
      id: 1,
      title: "Complete Guide to Recycling",
      type: "PDF Guide",
      downloads: 5420,
      icon: <FileText className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-600",
    },
    {
      id: 2,
      title: "Waste Segregation Video Series",
      type: "Video Course",
      downloads: 3210,
      icon: <Video className="w-6 h-6" />,
      color: "from-purple-500 to-pink-600",
    },
    {
      id: 3,
      title: "Sustainable Living eBook",
      type: "eBook",
      downloads: 4567,
      icon: <BookOpen className="w-6 h-6" />,
      color: "from-green-500 to-emerald-600",
    },
    {
      id: 4,
      title: "Interactive Waste Quiz",
      type: "Quiz",
      downloads: 8934,
      icon: <Award className="w-6 h-6" />,
      color: "from-orange-500 to-red-600",
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Advanced":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-green-50 to-emerald-50 dark:from-gray-900 dark:via-teal-900/20 dark:to-green-900/20 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="w-12 h-12 bg-gradient-to-br from-teal-600 to-green-600 rounded-xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </Link>
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
                Community & Education
              </h1>
              <p className="text-gray-600 dark:text-gray-400 font-semibold">
                Join events, workshops, and learn about sustainability
              </p>
            </div>
          </div>
          <Users className="w-12 h-12 text-teal-600" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Upcoming Events",
              value: "24",
              icon: <Calendar className="w-6 h-6" />,
            },
            {
              label: "Active Workshops",
              value: "18",
              icon: <BookOpen className="w-6 h-6" />,
            },
            {
              label: "Community Members",
              value: "15K",
              icon: <Users className="w-6 h-6" />,
            },
            {
              label: "Resources",
              value: "156",
              icon: <FileText className="w-6 h-6" />,
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-green-600 rounded-xl flex items-center justify-center mb-3 text-white">
                {stat.icon}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-1">
                {stat.label}
              </p>
              <p className="text-3xl font-black text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Tab Selector */}
        <div className="flex gap-3 mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-2 rounded-2xl shadow-lg">
          <button
            onClick={() => setActiveTab("events")}
            className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === "events"
                ? "bg-gradient-to-r from-teal-600 to-green-600 text-white shadow-lg scale-105"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <Calendar className="w-5 h-5" />
            Eco Events
          </button>
          <button
            onClick={() => setActiveTab("workshops")}
            className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === "workshops"
                ? "bg-gradient-to-r from-teal-600 to-green-600 text-white shadow-lg scale-105"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <BookOpen className="w-5 h-5" />
            Workshops
          </button>
          <button
            onClick={() => setActiveTab("education")}
            className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === "education"
                ? "bg-gradient-to-r from-teal-600 to-green-600 text-white shadow-lg scale-105"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <Award className="w-5 h-5" />
            Education
          </button>
        </div>

        {/* Eco Events */}
        {activeTab === "events" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform"
              >
                <div className="bg-gradient-to-br from-teal-500 to-green-600 h-32 flex items-center justify-center text-6xl">
                  {event.image}
                </div>

                <div className="p-6">
                  <span className="bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 px-3 py-1 rounded-full text-xs font-bold">
                    {event.category}
                  </span>

                  <h3 className="text-xl font-black text-gray-900 dark:text-white mt-3 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    by {event.organizer}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-semibold">
                        {event.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-semibold">
                        {event.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-semibold">
                        {event.location}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                        Participants
                      </span>
                      <span className="text-xs font-bold text-teal-600">
                        {event.participants}/{event.maxParticipants}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-teal-500 to-green-600 rounded-full"
                        style={{
                          width: `${
                            (event.participants / event.maxParticipants) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      !event.registered && handleRegister(event, "event")
                    }
                    disabled={event.registered}
                    className={`w-full py-3 rounded-xl font-bold transition-all ${
                      event.registered
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 cursor-not-allowed"
                        : "bg-gradient-to-r from-teal-600 to-green-600 text-white hover:shadow-lg cursor-pointer"
                    }`}
                  >
                    {event.registered ? "Registered ✓" : "Register Now"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Workshops */}
        {activeTab === "workshops" && (
          <div className="space-y-6">
            {workshops.map((workshop) => (
              <div
                key={workshop.id}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 hover:scale-102 transition-transform"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-6 flex-1">
                    <div className="text-6xl">{workshop.image}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                          {workshop.title}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${getLevelColor(
                            workshop.level
                          )}`}
                        >
                          {workshop.level}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 font-semibold mb-3">
                        Instructor: {workshop.instructor}
                      </p>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                          <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold mb-1">
                            Duration
                          </p>
                          <p className="text-sm font-black text-gray-900 dark:text-white">
                            {workshop.duration}
                          </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                          <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold mb-1">
                            Next Session
                          </p>
                          <p className="text-sm font-black text-gray-900 dark:text-white">
                            {workshop.nextSession}
                          </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                          <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold mb-1">
                            Enrolled
                          </p>
                          <p className="text-sm font-black text-gray-900 dark:text-white">
                            {workshop.enrolled}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className="text-yellow-500 text-lg"
                            >
                              {star <= Math.floor(workshop.rating) ? "★" : "☆"}
                            </span>
                          ))}
                        </div>
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                          {workshop.rating}/5
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRegister(workshop, "workshop")}
                    className="bg-gradient-to-r from-teal-600 to-green-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    Enroll Now
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education Resources */}
        {activeTab === "education" && (
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">
              Learning Resources
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {educationResources.map((resource) => (
                <div
                  key={resource.id}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${resource.color} rounded-2xl flex items-center justify-center text-white`}
                    >
                      {resource.icon}
                    </div>
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                      {resource.type}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">
                    {resource.title}
                  </h3>

                  <div className="flex items-center justify-between">
                    <div className="text-gray-600 dark:text-gray-400">
                      <p className="text-sm font-semibold">
                        {resource.downloads.toLocaleString()} downloads
                      </p>
                    </div>
                    <button className="bg-gradient-to-r from-teal-600 to-green-600 text-white px-6 py-2 rounded-xl font-bold hover:shadow-lg transition-all">
                      Access
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Registration Modal */}
      {showRegistrationModal && selectedEvent && (
        <EventRegistrationModal
          isOpen={showRegistrationModal}
          onClose={() => {
            setShowRegistrationModal(false);
            setSelectedEvent(null);
          }}
          event={selectedEvent}
          type={registrationType}
        />
      )}
    </div>
  );
}
