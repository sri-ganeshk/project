// components/Favorites.jsx
import React, { useEffect, useState } from 'react';
import { getFavoriteMovies } from '../api'; // Ensure this matches your API call
import MovieCard from './MovieCard'; // Import MovieCard to display each movie

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await getFavoriteMovies();
        setFavorites(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching favorites</div>;

  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      <h1 className="text-white text-2xl font-bold mb-4">Your Favorite Movies</h1>
      {favorites.length === 0 ? (
        <div className="text-center text-white">No favorites found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
