import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/user/user.models.js"; // Adjust the path as necessary

dotenv.config({ path: '../.env' });

const connectToMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
     console.log('connected')
  } catch (error) {
    console.log('Error connecting to MongoDB:', error.message);
  }
};

export default connectToMongoDb;
