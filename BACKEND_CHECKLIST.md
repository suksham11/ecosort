# 🎯 Backend Setup Checklist

## ✅ Completed (Already Done)

- [x] Installed MongoDB and Mongoose packages
- [x] Created database connection utility (`lib/mongodb.ts`)
- [x] Created 4 database models:
  - [x] WasteClassification
  - [x] User
  - [x] TruckLocation
  - [x] WasteCollection
- [x] Created 5 API route handlers:
  - [x] `/api/waste-classifications` (GET, POST)
  - [x] `/api/waste-classifications/stats` (GET)
  - [x] `/api/trucks` (GET, POST, PUT)
  - [x] `/api/users` (GET, POST, PUT)
  - [x] `/api/waste-collections` (GET, POST, PUT)
- [x] Created API helper utilities (`lib/api.ts`)
- [x] Integrated WasteClassifier to save to database
- [x] Prepared IndiaWasteMap for database integration
- [x] Created comprehensive documentation
- [x] Updated .env.local template

## 📋 To Do (Your Action Items)

### 1. Set Up MongoDB Atlas (5 minutes)

- [ ] Go to https://mongodb.com/cloud/atlas/register
- [ ] Create free account
- [ ] Create new M0 (free) cluster
- [ ] Create database user (save username & password!)
- [ ] Add IP address to whitelist (or allow all)
- [ ] Copy connection string

### 2. Configure Environment (1 minute)

- [ ] Open `.env.local` file
- [ ] Replace the MongoDB URI placeholder with your actual connection string:
  ```
  MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/ecosort?retryWrites=true&w=majority
  ```
- [ ] Save the file

### 3. Test the Backend (2 minutes)

- [ ] Restart dev server: `npm run dev`
- [ ] Go to your website: http://localhost:3000
- [ ] Classify some waste (text or image)
- [ ] Open MongoDB Atlas dashboard
- [ ] Check "ecosort" database → "wasteclassifications" collection
- [ ] See your data! 🎉

### 4. Test API Endpoints (Optional, 5 minutes)

Install Thunder Client extension in VS Code or use Postman:

- [ ] Test GET stats:

  ```
  GET http://localhost:3000/api/waste-classifications/stats
  ```

- [ ] Test POST user:

  ```
  POST http://localhost:3000/api/users
  Body: {"name": "Test", "email": "test@example.com"}
  ```

- [ ] Test GET users:
  ```
  GET http://localhost:3000/api/users?email=test@example.com
  ```

### 5. Enable Truck Tracking (Optional, 2 minutes)

- [ ] Open `components/IndiaWasteMap.tsx`
- [ ] Uncomment line 6: `import { updateTruckLocation, getTrucks } from "@/lib/api";`
- [ ] Uncomment lines ~470-482 (the database sync code)
- [ ] Save and refresh - trucks now save to database!

### 6. Prepare for Viva/Presentation (10 minutes)

- [ ] Read `README_BACKEND.md` - Overview and quick start
- [ ] Review `BACKEND_COMPLETE_SUMMARY.md` - What to say in viva
- [ ] Practice explaining:
  - "We're using Next.js API routes with MongoDB Atlas"
  - "Data is automatically saved when users classify waste"
  - "Our API supports users, trucks, and collection management"
- [ ] Prepare to show:
  - Live classification → Check database
  - API response in Thunder Client/Postman
  - MongoDB Atlas dashboard with real data

## 📚 Documentation Reference

| When You Need...    | Read This File                |
| ------------------- | ----------------------------- |
| Quick overview      | `README_BACKEND.md`           |
| Setup instructions  | `BACKEND_SETUP.md`            |
| Code examples       | `DATABASE_USAGE_EXAMPLES.md`  |
| Viva talking points | `BACKEND_COMPLETE_SUMMARY.md` |
| This checklist      | `BACKEND_CHECKLIST.md`        |

## 🎯 Success Criteria

You'll know everything is working when:

✅ Dev server starts without errors
✅ Waste classification saves to MongoDB
✅ You can see data in MongoDB Atlas dashboard
✅ API endpoints return JSON responses
✅ No errors in browser console

## 🚨 Troubleshooting

### Error: "MONGODB_URI is not defined"

**Fix:**

1. Check `.env.local` has the correct connection string
2. Restart dev server: Stop (Ctrl+C) and run `npm run dev` again

### Error: "Failed to connect to MongoDB"

**Fix:**

1. Verify connection string format
2. Check username and password are correct
3. Ensure IP is whitelisted in MongoDB Atlas

### Data not appearing in MongoDB

**Fix:**

1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Check Network tab - look for API calls
4. Verify API endpoint responds: http://localhost:3000/api/waste-classifications/stats

## 🎉 You're Done When...

- [x] MongoDB Atlas is set up
- [x] .env.local is configured
- [x] Dev server runs without errors
- [x] Classification saves to database
- [x] You can see data in MongoDB Atlas
- [x] API endpoints work
- [x] You understand the architecture
- [x] You're ready to demo!

## 🏆 Final Check

Run this test:

1. **Start server:** `npm run dev`
2. **Open website:** http://localhost:3000
3. **Classify waste:** Type "plastic bottle" and click Classify
4. **Check API:** http://localhost:3000/api/waste-classifications/stats
5. **See result:** Should show `"totalCount": 1` or more
6. **Check MongoDB:** Open Atlas → See your data

**If all 6 steps work → You're ready! 🚀**

---

## 💡 Pro Tips

1. **Keep .env.local secret** - Never commit to GitHub
2. **Use Thunder Client** - Built into VS Code, easy to test APIs
3. **Check MongoDB Atlas regularly** - See your data grow
4. **Practice the demo** - Show live classification → database
5. **Understand the flow** - Frontend → API → Database

## 🎯 What to Say in Viva

**"Our project has a complete full-stack architecture:**

- Frontend: Next.js with React and TypeScript
- Backend: Next.js API routes (serverless)
- Database: MongoDB Atlas (cloud, free tier)
- Features: Automatic data persistence, RESTful API, real-time ready

**We can demonstrate:**

1. Live waste classification with database storage
2. API endpoints returning real data
3. Statistics and analytics
4. Scalable, production-ready architecture"

---

**Need Help?**

- Check documentation files listed above
- Review code comments in files
- Test API endpoints one by one
- Verify MongoDB connection first

**You've got this! 🌟**
