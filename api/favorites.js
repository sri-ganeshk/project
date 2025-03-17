import { MongoClient } from 'mongodb';

let cachedClient = null;
let cachedDb = null;

// Function to connect to MongoDB with caching
async function connectToDatabase() {
  if (cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const uri = 'mongodb+srv://1234:2498@cluster0.bdlu1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  const dbName = process.env.MONGODB_DB || 'yourDB';

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db(dbName);
  cachedClient = client;
  cachedDb = db;
  return { client, db };
}

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Expecting the request body to include movieId (an array) and userId
  const { movieId, userId } = req.body;
  
  // Validate that movieId is an array and userId is provided
  if (!movieId || !Array.isArray(movieId)) {
    return res.status(400).json({ message: 'Missing or invalid movieId array' });
  }
  if (!userId) {
    return res.status(400).json({ message: 'Missing userId' });
  }

  // Connect to MongoDB
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
    // Check if the user already exists in the collection
    const userFavorites = await favoritesCollection.findOne({ userId });
    if (userFavorites) {
      // Add movie ids to the array, ensuring no duplicates
      await favoritesCollection.updateOne(
        { userId },
        { $addToSet: { movies: { $each: movieId } } }
      );
    } else {
      // Create a new record for the user
      await favoritesCollection.insertOne({
        userId,
        movies: movieId,
      });
    }
    res.status(200).json({ message: 'Movies added to favorites' });
  } catch (err) {
    console.error('Error updating favorites:', err);
    res.status(500).json({ message: 'Server error' });
  }
}
