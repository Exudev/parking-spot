import { DB_HOST, DB_PASSWORD, DB_USER } from "../constants/env";
import mongoose from "mongoose";


async function connect(): Promise<void> {
  try {
    const username = encodeURIComponent(DB_USER);
    const password = encodeURIComponent(DB_PASSWORD);
    const MONGO_URI = `mongodb+srv://${username}:${password}@${DB_HOST}`;
    await mongoose.connect(MONGO_URI, {});
    console.log("[db] Successfully connected");
  } catch (error) {
    console.error("[db] Connection error:", error);
    throw error;
  }
}

export default connect;
