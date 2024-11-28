import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

async function connect(MONGO_URI: string): Promise<void> {
  try {
    await mongoose.connect(MONGO_URI, {});
    console.log('[db] Successfully connected');
  } catch (error) {
    console.error('[db] Connection error:', error);
    throw error;
  }
}

export default connect;
