# Database Integration Examples

## Overview

This guide shows you how to use the backend API to store and retrieve data from MongoDB.

## Quick Start

### 1. Set up MongoDB (if not done yet)

See `BACKEND_SETUP.md` for complete setup instructions.

### 2. Test the API

Start your development server:

```bash
npm run dev
```

## Usage Examples

### A. Waste Classification Storage

The `WasteClassifier.tsx` component already saves classifications to the database automatically. Every time a user classifies waste (text or image), it's saved with:

- Waste type (biodegradable, recyclable, hazardous, unknown)
- Confidence level
- User ID (currently 'guest-user')
- Image data (for image classifications)

**What's stored:**

```typescript
{
  wasteType: "recyclable",
  confidence: 85,
  userId: "guest-user",
  imageUrl: "data:image/jpeg;base64,..."
}
```

### B. Truck Tracking Integration

To enable real-time truck location storage, uncomment the code in `IndiaWasteMap.tsx`:

1. **Uncomment the import** (line 6):

```typescript
import { updateTruckLocation, getTrucks } from "@/lib/api";
```

2. **Uncomment the database sync** (around line 460):

```typescript
updateTruckLocation({
  truckId: truck.truckNumber,
  truckName: `${truck.truckNumber} - ${truck.driver}`,
  latitude: newLat,
  longitude: newLng,
  status: newStatus === "completed" ? "inactive" : "active",
  wasteLoad: newProgress,
  wasteType: "mixed",
  route: `${truck.pickupLocation} → ${truck.dropLocation}`,
  speed: truck.speed,
}).catch((err) => console.error("Failed to sync truck:", err));
```

3. **Load trucks from database on mount:**

```typescript
useEffect(() => {
  // Fetch trucks from database
  getTrucks({ status: "active" })
    .then((response) => {
      if (response.success && response.data.length > 0) {
        // Convert database trucks to your TruckData format
        const dbTrucks = response.data.map((t) => ({
          id: t.truckId,
          truckNumber: t.truckId,
          driver: t.truckName,
          currentLat: t.latitude,
          currentLng: t.longitude,
          // ... map other fields
        }));
        setTrucks(dbTrucks);
      }
    })
    .catch((err) => console.error("Failed to load trucks:", err));
}, []);
```

### C. User Management

Create a new user:

```typescript
import { createUser } from "@/lib/api";

const handleUserRegistration = async () => {
  try {
    const result = await createUser({
      name: "John Doe",
      email: "john@example.com",
      phoneNumber: "9876543210",
      role: "user",
    });
    console.log("User created:", result.data);
  } catch (error) {
    console.error("Failed to create user:", error);
  }
};
```

Get user by email:

```typescript
import { getUsers } from "@/lib/api";

const fetchUser = async (email: string) => {
  try {
    const result = await getUsers({ email });
    if (result.success && result.data.length > 0) {
      console.log("User found:", result.data[0]);
    }
  } catch (error) {
    console.error("Failed to fetch user:", error);
  }
};
```

### D. Waste Collection Requests

Create a collection request:

```typescript
import { createWasteCollection } from "@/lib/api";

const requestCollection = async () => {
  try {
    const result = await createWasteCollection({
      userId: "user@example.com",
      truckId: "TRK001",
      wasteType: "recyclable",
      weight: 15.5,
      location: {
        latitude: 28.7041,
        longitude: 77.1025,
        address: "Connaught Place, New Delhi",
      },
      collectionDate: new Date(),
      notes: "Please collect from main gate",
    });
    console.log("Collection request created:", result.data);
  } catch (error) {
    console.error("Failed to create collection:", error);
  }
};
```

Get collections for a truck:

```typescript
import { getWasteCollections } from "@/lib/api";

const fetchTruckCollections = async (truckId: string) => {
  try {
    const result = await getWasteCollections({
      truckId,
      status: "pending",
    });
    console.log("Pending collections:", result.data);
  } catch (error) {
    console.error("Failed to fetch collections:", error);
  }
};
```

### E. Statistics and Analytics

Get waste classification statistics:

```typescript
import { getWasteStats } from "@/lib/api";

const fetchStats = async () => {
  try {
    const result = await getWasteStats();
    console.log("Total classifications:", result.data.totalCount);
    console.log("By type:", result.data.byType);
    console.log("Recent:", result.data.recent);
  } catch (error) {
    console.error("Failed to fetch stats:", error);
  }
};
```

Example output:

```json
{
  "success": true,
  "data": {
    "totalCount": 150,
    "byType": [
      {
        "wasteType": "recyclable",
        "count": 67,
        "avgConfidence": 82.5,
        "totalWeight": 145.3
      },
      {
        "wasteType": "biodegradable",
        "count": 55,
        "avgConfidence": 78.2,
        "totalWeight": 98.7
      }
    ],
    "recent": [...]
  }
}
```

## Creating a Dashboard Component

Here's an example dashboard that fetches and displays stats:

```tsx
"use client";
import { useState, useEffect } from "react";
import { getWasteStats, getTrucks, getWasteCollections } from "@/lib/api";

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [trucks, setTrucks] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);

  useEffect(() => {
    // Fetch all data on mount
    const fetchData = async () => {
      try {
        const [statsRes, trucksRes, collectionsRes] = await Promise.all([
          getWasteStats(),
          getTrucks({ status: "active" }),
          getWasteCollections({ status: "pending", limit: 10 }),
        ]);

        setStats(statsRes.data);
        setTrucks(trucksRes.data);
        setCollections(collectionsRes.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">Total Classifications</h3>
            <p className="text-2xl">{stats.totalCount}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">Active Trucks</h3>
            <p className="text-2xl">{trucks.length}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">Pending Collections</h3>
            <p className="text-2xl">{collections.length}</p>
          </div>
        </div>
      )}

      {/* Waste by Type */}
      {stats?.byType && (
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-xl font-bold mb-4">Waste by Type</h2>
          <div className="space-y-2">
            {stats.byType.map((item: any) => (
              <div key={item.wasteType} className="flex justify-between">
                <span className="capitalize">{item.wasteType}</span>
                <span className="font-semibold">{item.count} items</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Collections */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Pending Collections</h2>
        <div className="space-y-2">
          {collections.map((col: any) => (
            <div key={col._id} className="border-b pb-2">
              <p className="font-semibold">
                {col.wasteType} - {col.weight}kg
              </p>
              <p className="text-sm text-gray-600">{col.location.address}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

## Testing with API Client

Use Thunder Client (VS Code extension) or Postman to test:

### Create User

```
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "role": "user"
}
```

### Save Classification

```
POST http://localhost:3000/api/waste-classifications
Content-Type: application/json

{
  "wasteType": "recyclable",
  "confidence": 90,
  "userId": "test@example.com",
  "weight": 2.5
}
```

### Update Truck Location

```
POST http://localhost:3000/api/trucks
Content-Type: application/json

{
  "truckId": "TRK001",
  "truckName": "Delhi Waste Truck",
  "latitude": 28.7041,
  "longitude": 77.1025,
  "wasteLoad": 65,
  "wasteType": "mixed",
  "status": "active",
  "speed": 30
}
```

### Get Statistics

```
GET http://localhost:3000/api/waste-classifications/stats
```

## Next Steps

1. **Set up MongoDB Atlas** - Follow instructions in `BACKEND_SETUP.md`
2. **Update .env.local** - Add your MongoDB connection string
3. **Test API endpoints** - Use the examples above
4. **Enable truck tracking** - Uncomment the code in `IndiaWasteMap.tsx`
5. **Create user system** - Add authentication and user profiles
6. **Build dashboard** - Use the dashboard example above

## Troubleshooting

**Error: "MONGODB_URI is not defined"**

- Make sure you've added `MONGODB_URI` to `.env.local`
- Restart your dev server after adding environment variables

**Error: "Failed to connect to MongoDB"**

- Check your connection string format
- Verify IP whitelist in MongoDB Atlas
- Ensure username and password are correct

**Data not saving**

- Check browser console for errors
- Verify API endpoint is responding (check Network tab)
- Test API endpoint directly with Thunder Client/Postman

**Trucks not appearing on map**

- Database integration is optional and commented out by default
- Current implementation uses simulated data
- Uncomment the code to enable database integration
