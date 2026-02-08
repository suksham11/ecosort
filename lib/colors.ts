// Color System - Centralized theme colors
export const colors = {
  // Primary Brand Colors
  primary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e', // Main green
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  
  // Secondary Colors
  secondary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // Main blue
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },

  // Accent Colors
  accent: {
    purple: '#a855f7',
    pink: '#ec4899',
    orange: '#f97316',
    yellow: '#eab308',
    cyan: '#06b6d4',
    emerald: '#10b981',
    indigo: '#6366f1',
    violet: '#8b5cf6',
    fuchsia: '#d946ef',
  },

  // Neutral Colors
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  // Semantic Colors
  success: '#22c55e',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',

  // Background
  background: {
    light: '#ffffff',
    dark: '#0f172a',
    lightGray: '#f9fafb',
    darkGray: '#1e293b',
  },

  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
    secondary: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    purple: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)',
    sunset: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
    ocean: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
    emerald: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  },
};

// Tailwind class mappings for dynamic use
export const colorClasses = {
  primary: {
    bg: 'bg-green-500',
    text: 'text-green-500',
    border: 'border-green-500',
    gradient: 'from-green-500 to-green-600',
    hover: 'hover:bg-green-600',
  },
  secondary: {
    bg: 'bg-blue-500',
    text: 'text-blue-500',
    border: 'border-blue-500',
    gradient: 'from-blue-500 to-blue-600',
    hover: 'hover:bg-blue-600',
  },
  purple: {
    bg: 'bg-purple-500',
    text: 'text-purple-500',
    border: 'border-purple-500',
    gradient: 'from-purple-500 to-purple-600',
    hover: 'hover:bg-purple-600',
  },
  orange: {
    bg: 'bg-orange-500',
    text: 'text-orange-500',
    border: 'border-orange-500',
    gradient: 'from-orange-500 to-orange-600',
    hover: 'hover:bg-orange-600',
  },
};

export default colors;
