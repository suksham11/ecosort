"use client";
import { useEffect, useState } from 'react';

interface HealthStatus {
  status: string;
  message: string;
  database?: string;
  collections?: string[];
  timestamp?: string;
  error?: string;
}

interface Stats {
  totalClassifications: number;
  byType: { _id: string; count: number; }[];
  totalUsers: number;
  totalTrucks: number;
}

export default function DatabaseDashboard() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Check database health
        const healthRes = await fetch('/api/health');
        const healthData = await healthRes.json();
        setHealth(healthData);

        // Get statistics
        const statsRes = await fetch('/api/waste-classifications/stats');
        const statsData = await statsRes.json();
        setStats(statsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    // Refresh every 10 seconds
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl">Loading database status...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🗄️ Database Dashboard
          </h1>
          <p className="text-gray-600">Real-time MongoDB Connection Status</p>
        </div>

        {/* Health Status Card */}
        <div className={`p-6 rounded-lg shadow-lg ${
          health?.status === 'success' ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
        } border-2`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">
              {health?.status === 'success' ? '✅ Connected' : '❌ Disconnected'}
            </h2>
            <span className="text-sm text-gray-600">
              {health?.timestamp ? new Date(health.timestamp).toLocaleString() : ''}
            </span>
          </div>
          
          <p className="text-lg mb-4">{health?.message}</p>
          
          {health?.database && (
            <div className="space-y-2">
              <p className="font-semibold">Database: <span className="font-normal">{health.database}</span></p>
              
              {health.collections && health.collections.length > 0 && (
                <div>
                  <p className="font-semibold mb-2">Collections ({health.collections.length}):</p>
                  <div className="flex flex-wrap gap-2">
                    {health.collections.map((collection) => (
                      <span
                        key={collection}
                        className="px-3 py-1 bg-white rounded-full text-sm border border-green-300"
                      >
                        {collection}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {health?.error && (
            <div className="mt-4 p-4 bg-red-50 rounded border border-red-300">
              <p className="text-red-700 font-semibold">Error:</p>
              <p className="text-red-600 text-sm">{health.error}</p>
            </div>
          )}
        </div>

        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Total Classifications */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                📊 Total Classifications
              </h3>
              <p className="text-4xl font-bold text-green-600">
                {stats.totalClassifications}
              </p>
            </div>

            {/* Total Users */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                👥 Total Users
              </h3>
              <p className="text-4xl font-bold text-blue-600">
                {stats.totalUsers}
              </p>
            </div>

            {/* Total Trucks */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                🚛 Active Trucks
              </h3>
              <p className="text-4xl font-bold text-orange-600">
                {stats.totalTrucks}
              </p>
            </div>
          </div>
        )}

        {/* Waste Type Breakdown */}
        {stats && stats.byType && stats.byType.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              🗑️ Waste Classifications by Type
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.byType.map((type) => (
                <div key={type._id} className="p-4 border-2 rounded-lg">
                  <p className="text-sm text-gray-600 capitalize">{type._id}</p>
                  <p className="text-3xl font-bold text-gray-800">{type.count}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 p-6 rounded-lg shadow border-2 border-blue-300">
          <h3 className="text-xl font-bold text-blue-800 mb-3">
            💡 How to Verify Database is Working:
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>
              <strong>Check Status Above:</strong> Green = Connected, Red = Error
            </li>
            <li>
              <strong>Use the App:</strong> Go to <a href="/" className="text-blue-600 underline">homepage</a> or <a href="/test-ai" className="text-blue-600 underline">AI classifier</a>
            </li>
            <li>
              <strong>Classify Some Waste:</strong> Upload images or type waste items
            </li>
            <li>
              <strong>Refresh This Page:</strong> Numbers should increase!
            </li>
            <li>
              <strong>Check MongoDB Atlas:</strong> Login at <a href="https://cloud.mongodb.com" target="_blank" className="text-blue-600 underline">cloud.mongodb.com</a> → Browse Collections
            </li>
          </ol>
        </div>

        {/* API Endpoints */}
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-3">🔌 API Endpoints</h3>
          <div className="space-y-2 font-mono text-sm">
            <p>GET  /api/health → Database status</p>
            <p>GET  /api/waste-classifications → All classifications</p>
            <p>POST /api/waste-classifications → Save new classification</p>
            <p>GET  /api/waste-classifications/stats → Statistics</p>
            <p>GET  /api/users → All users</p>
            <p>GET  /api/trucks → All trucks</p>
          </div>
        </div>

      </div>
    </div>
  );
}
