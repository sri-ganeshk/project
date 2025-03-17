import { MongoClient } from 'mongodb';

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const uri = 'mongodb+srv://1234:2498@cluster0.bdlu1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  const dbName = process.env.MONGODB_DB || 'yourDB';

  // No options passed because the defaults in the latest driver are sufficient.
  const client = await MongoClient.connect(uri);
  const db = client.db(dbName);
  cachedClient = client;
  cachedDb = db;
  return { client, db };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { movieId, userId } = req.body;
  if (!movieId || !Array.isArray(movieId)) {
    return res.status(400).json({ message: 'Missing or invalid movieId array' });
  }
  if (!userId) {
    return res.status(400).json({ message: 'Missing userId' });
  }

  let db;
  try {
    const connection = await connectToDatabase();
    db = connection.db;
  } catch (err) {
    console.error('MongoDB connection error:', err);
    return res.status(500).json({ message: 'Database connection error' });
  }

  const favoritesCollection = db.collection('favorites');

  try {
    // Try to find an existing favorites document for the user.
    const userFavorites = await favoritesCollection.findOne({ userId });
    if (userFavorites) {
      // Use $addToSet with $each to add only new movie IDs (duplicates are ignored).
      const result = await favoritesCollection.updateOne(
        { userId },
        { $addToSet: { movies: { $each: movieId } } }
      );
      console.log('Update result:', result);
    } else {
      // If no document exists, create one.
      const result = await favoritesCollection.insertOne({
        userId,
        movies: movieId,
      });
      console.log('Insert result:', result);
    }
    return res.status(200).json({ message: 'Movies added to favorites' });
  } catch (err) {
    console.error('Error updating favorites:', err);
    return res.status(500).json({ message: 'Server error' });
  }
}
