import mongoose from "mongoose";

const connectDb = async () => {
  if (mongoose.connections[0].readyState !== 0) {
    return true;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    return true;
  } catch (err) {
    throw err;
  }
};

export default connectDb;
