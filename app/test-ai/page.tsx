"use client";
import { useState } from "react";

export default function TestAIPage() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const testAPI = async () => {
    setLoading(true);
    setError("");
    setResult("");

    try {
      // Create a simple test image (1x1 red pixel)
      const canvas = document.createElement("canvas");
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, 1, 1);
      }

      const base64 = canvas.toDataURL("image/png").split(",")[1];

      const response = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: base64,
          mimeType: "image/png",
        }),
      });

      const data = await response.json();

      setResult(JSON.stringify(data, null, 2));

      if (!response.ok) {
        setError(`API returned status ${response.status}`);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          🧪 AI Classification API Test
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            Test Classification API
          </h2>

          <button
            onClick={testAPI}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? "Testing..." : "Test API"}
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
              <p className="text-red-800 dark:text-red-300 font-semibold">
                Error: {error}
              </p>
            </div>
          )}

          {result && (
            <div className="mt-4">
              <h3 className="font-bold mb-2 text-gray-900 dark:text-white">
                API Response:
              </h3>
              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-auto text-sm text-gray-900 dark:text-white">
                {result}
              </pre>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            Environment Check
          </h2>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                API URL:
              </span>
              <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-gray-900 dark:text-white">
                {process.env.NEXT_PUBLIC_API_URL || "Not set"}
              </code>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                Node Environment:
              </span>
              <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-gray-900 dark:text-white">
                {process.env.NODE_ENV}
              </code>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 rounded-lg p-4">
          <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-2">
            📝 Instructions:
          </h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800 dark:text-blue-200">
            <li>Click "Test API" button</li>
            <li>Check the API response below</li>
            <li>If you see an error, check your .env.local file</li>
            <li>Open browser console (F12) for detailed logs</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
