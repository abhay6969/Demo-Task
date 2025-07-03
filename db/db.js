import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'Abhay',
    });
    if (connection) console.log('Connected to DB');
  } catch (error) {
    throw new Error(error);
  }
};

export default connectDB;