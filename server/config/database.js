import mongoose from "mongoose";

/**
 * MongoDB Atlas connection configuration
 * Establishes and manages database connection with proper error handling
 */
export const connectDatabase = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URI, {
      // Explicitly set database name
      dbName: "e-commerceDB", 
    });

    console.log(`MongoDB connected: ${connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    // Exit process with failure if unable to connect to database
    process.exit(1);
  }
};

// Handle MongoDB connection events
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB error:", err);
});

// Handle application termination
process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed through app termination");
    process.exit(0);
  } catch (err) {
    console.error("Error closing MongoDB connection:", err);
    process.exit(1);
  }
});
