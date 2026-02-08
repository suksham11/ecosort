// Simple test to verify MongoDB connection
require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://sukshamk170_db_user:MxHSCfNIcp4AFWgM@ecosort.zsnlrh8.mongodb.net/ecosort?retryWrites=true&w=majority&appName=ecosort";

console.log("🧪 Testing MongoDB Connection...\n");
console.log(
  "Using connection string:",
  MONGODB_URI.replace(/:[^:@]+@/, ":****@")
);

async function testConnection() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✅ Successfully connected to MongoDB Atlas!");
    console.log(`📊 Database: ${mongoose.connection.name}`);
    console.log(`🌐 Host: ${mongoose.connection.host}`);

    // Test creating a document
    const TestSchema = new mongoose.Schema({
      message: String,
      timestamp: Date,
    });

    const Test = mongoose.model("Test", TestSchema);

    const testDoc = await Test.create({
      message: "Hello from EcoSort!",
      timestamp: new Date(),
    });

    console.log("✅ Successfully created test document!");
    console.log(`📝 Document ID: ${testDoc._id}`);

    // Clean up
    await Test.deleteOne({ _id: testDoc._id });
    console.log("✅ Test document deleted (cleanup)");

    await mongoose.connection.close();
    console.log("\n✅ All tests passed! Your MongoDB is configured correctly!");
    console.log("\n🎉 You can now:");
    console.log("   1. Start your server: npm run dev");
    console.log("   2. Use your website - all data will be saved to MongoDB");
    console.log("   3. View data in MongoDB Atlas dashboard");
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.log("\n🔧 Troubleshooting:");
    console.log("   1. Check your internet connection");
    console.log("   2. Verify MongoDB Atlas credentials");
    console.log("   3. Ensure IP address is whitelisted in MongoDB Atlas");
    console.log("   4. Check connection string format in .env.local");
    process.exit(1);
  }
}

testConnection();
