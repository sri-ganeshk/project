import { MongoClient } from 'mongodb';

let cachedClient = null;
let cachedDb = null;

// Function to connect to MongoDB with caching
async function connectToDatabase() {
  if (cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const uri =
    'mongodb+srv://1234:2498@cluster0.bdlu1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  // Make sure to set this environment variable or update 'yourDB' to your actual DB name.
  const dbName =  'yourDB';

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
    // Check if a document for the user already exists
    const userFavorites = await favoritesCollection.findOne({ userId });
    if (userFavorites) {
      // Add new movie ids to the array without duplicates
      const result = await favoritesCollection.updateOne(
        { userId },
        { $addToSet: { movies: { $each: movieId } } }
      );
      console.log('Update result:', result);
    } else {
      // Insert a new document with the userId and movieId array
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
