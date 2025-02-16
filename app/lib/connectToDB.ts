import mongoose from "mongoose";

let initialized = false;

const connect = async () => {
  mongoose.set("strictQuery", true);
  if (initialized) {
    console.log("MongoDB already connected");
    return;
  }

  const mongoUrl = process.env.MONGO_URL as string;

  if (!mongoUrl) {
    console.error("MongoDB connection error: MONGO_URL is undefined.");
    return;
  }

  try {
    await mongoose.connect(mongoUrl, {
      dbName: "Habit_Tracker_App", // ✅ Keep only dbName
    });
    console.log("MongoDB Connected");
    initialized = true;
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connect;
