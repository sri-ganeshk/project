// api/favorites.js
const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');

let cachedClient = null;
let cachedDb = null;

// Function to connect to MongoDB with caching
async function connectToDatabase() {
  if (cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const uri = process.env.MONGODB_URI;
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

module.exports = async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Check for Authorization header and extract token
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
  const token = authHeader.split(' ')[1];

  let decoded;
  try {
    // Verify the token using your JWT secret
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }

  const { movieId } = req.body;
  if (!movieId) {
    return res.status(400).json({ message: 'Missing movieId' });
  }
  const userId = decoded.id; // Ensure your token contains the user id in "id"

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
      // Prevent duplicate entries
      if (userFavorites.movies.includes(movieId)) {
        return res.status(400).json({ message: 'Movie already favorited' });
      }
      await favoritesCollection.updateOne(
        { userId },
        { $push: { movies: movieId } }
      );
    } else {
      // Create a new record for the user
      await favoritesCollection.insertOne({
        userId,
        movies: [movieId],
      });
    }
    res.status(200).json({ message: 'Movie added to favorites' });
  } catch (err) {
    console.error('Error updating favorites:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
