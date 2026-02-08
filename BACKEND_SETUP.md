# Backend Setup Guide

## Database Configuration

### 1. MongoDB Atlas Setup (Free Tier)

1. **Create a MongoDB Atlas Account**

   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
   - Sign up for a free account

2. **Create a New Cluster**

   - Click "Build a Database"
   - Select the FREE tier (M0)
   - Choose a cloud provider and region closest to you
   - Click "Create Cluster"

3. **Create Database User**

   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Enter username and password (save these!)
   - Set privileges to "Read and write to any database"
   - Click "Add User"

4. **Whitelist Your IP Address**

   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (or add your specific IP)
   - Click "Confirm"

5. **Get Connection String**

   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Click "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

6. **Update .env.local**
   - Replace `<username>` with your database username
   - Replace `<password>` with your database password
   - Replace `<cluster-url>` with your cluster URL
   - Add database name: `ecosort` after `.net/`
   - Final format: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ecosort?retryWrites=true&w=majority`

### 2. Environment Variables

Update your `.env.local` file:

```env
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/ecosort?retryWrites=true&w=majority
NEXT_PUBLIC_API_URL=http://localhost:3000
GEMINI_API_KEY=your-existing-key
```

## API Endpoints

### Waste Classifications

**GET** `/api/waste-classifications`

- Query params: `userId`, `wasteType`, `limit`
- Returns all waste classifications

**POST** `/api/waste-classifications`

- Body: `{ wasteType, confidence, imageUrl?, userId?, location?, weight?, barcodeData? }`
- Creates new waste classification

**GET** `/api/waste-classifications/stats`

- Query params: `userId`
- Returns statistics grouped by waste type

### Truck Tracking

**GET** `/api/trucks`

- Query params: `status`, `truckId`
- Returns all truck locations

**POST** `/api/trucks`

- Body: `{ truckId, truckName, latitude, longitude, status?, wasteLoad, wasteType, route?, speed? }`
- Creates or updates truck location

**PUT** `/api/trucks`

- Body: `{ truckId, ...updateData }`
- Updates truck information

### Users

**GET** `/api/users`

- Query params: `email`, `role`
- Returns all users

**POST** `/api/users`

- Body: `{ name, email, phoneNumber?, address?, role? }`
- Creates new user

**PUT** `/api/users`

- Body: `{ email, ...updateData }`
- Updates user information

### Waste Collections

**GET** `/api/waste-collections`

- Query params: `userId`, `truckId`, `status`, `limit`
- Returns all waste collection requests

**POST** `/api/waste-collections`

- Body: `{ userId, truckId, wasteType, weight, location, collectionDate, notes? }`
- Creates new collection request

**PUT** `/api/waste-collections`

- Body: `{ collectionId, status, notes? }`
- Updates collection status

## Testing the API

### Using Thunder Client or Postman

1. **Create a User**

```json
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phoneNumber": "1234567890",
  "role": "user"
}
```

2. **Save Waste Classification**

```json
POST http://localhost:3000/api/waste-classifications
Content-Type: application/json

{
  "wasteType": "recyclable",
  "confidence": 85,
  "userId": "john@example.com",
  "location": {
    "latitude": 28.7041,
    "longitude": 77.1025,
    "address": "Delhi, India"
  },
  "weight": 2.5
}
```

3. **Update Truck Location**

```json
POST http://localhost:3000/api/trucks
Content-Type: application/json

{
  "truckId": "TRK001",
  "truckName": "Delhi Waste Truck 1",
  "latitude": 28.7041,
  "longitude": 77.1025,
  "status": "active",
  "wasteLoad": 65,
  "wasteType": "recyclable",
  "route": "Route A",
  "speed": 25
}
```

4. **Get Statistics**

```
GET http://localhost:3000/api/waste-classifications/stats
```

## Database Models

### WasteClassification

- `wasteType`: biodegradable | recyclable | hazardous | unknown
- `confidence`: 0-100
- `imageUrl`: optional image URL
- `userId`: optional user identifier
- `location`: { latitude, longitude, address }
- `weight`: in kg
- `barcodeData`: optional barcode information

### User

- `name`: user's full name
- `email`: unique email address
- `phoneNumber`: optional phone
- `address`: optional address
- `role`: user | admin | collector
- `wasteClassifications`: array of classification IDs
- `totalWasteClassified`: count
- `points`: reward points

### TruckLocation

- `truckId`: unique truck identifier
- `truckName`: truck display name
- `latitude`, `longitude`: GPS coordinates
- `status`: active | inactive | maintenance
- `wasteLoad`: 0-100 percentage
- `wasteType`: biodegradable | recyclable | hazardous | mixed
- `lastUpdated`: timestamp
- `route`: optional route name
- `speed`: in km/h

### WasteCollection

- `userId`: user requesting collection
- `truckId`: assigned truck
- `wasteType`: type of waste
- `weight`: in kg
- `location`: { latitude, longitude, address }
- `collectionDate`: scheduled date
- `status`: pending | collected | cancelled
- `notes`: optional notes

## Next Steps

1. Set up MongoDB Atlas and update `.env.local`
2. Run `npm run dev` to start the development server
3. Test API endpoints using Thunder Client, Postman, or curl
4. Integrate API calls into your frontend components
5. Update WasteClassifier to save results to database
6. Update IndiaWasteMap to fetch truck data from database

## Troubleshooting

- **Connection Error**: Check your MongoDB connection string and IP whitelist
- **Authentication Failed**: Verify username and password in connection string
- **Database Not Found**: Database will be created automatically on first write
- **CORS Issues**: API routes are on same domain, no CORS needed for Next.js
