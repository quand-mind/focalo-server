import mongoose from 'mongoose';
import dns from 'dns';

// Override DNS server to fix SRV lookup issues on some Windows machines/routers
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
  try {
    const { MONGODB_URI, MONGODB_USER, MONGODB_PASSWORD } = process.env;

    // Inject credentials into the URI if they are separated
    const uri = (MONGODB_USER && MONGODB_PASSWORD)
      ? MONGODB_URI.replace('mongodb+srv://', `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@`)
      : MONGODB_URI;

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
