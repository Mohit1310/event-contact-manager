import mongoose from 'mongoose';

const connectDb = async () => {
  if (mongoose.connections[0].readyState) {
    return true;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('mongodb connected');
    return true;
  } catch (err) {
    console.log('mongodb connection error', err);
    return false;
  }
};

export default connectDb;
