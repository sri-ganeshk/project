import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getFavoriteMovies } from '../api'; // Assuming this API call returns movie IDs
import MovieCard from './MovieCard'; // Your MovieCard component

const FavoritesDropdown = () => {
  const [favoriteMovieIds, setFavoriteMovieIds] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError(" Please log in.");
        setLoading(false);
        return;
      }

      try {
        // Fetch movie IDs from the backend
        const response = await getFavoriteMovies(token);
        const favoriteIds = response.data.favorites; // Array of movie IDs

        setFavoriteMovieIds(favoriteIds);

        // Fetch movie details for each movie ID
        const movieDetailsPromises = favoriteIds.map(async (id) => {
          const apiKey = '1bf5ead9bb0ad708a1b4daa0e93f9b33'; // TMDB API Key
          const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
            params: {
              api_key: apiKey,
              append_to_response: 'credits',
            },
          });
          return movieResponse.data; // Movie details for each ID
        });

        const movies = await Promise.all(movieDetailsPromises);
        setFavoriteMovies(movies); // Set the fetched movies to state

      } catch (err) {
        console.error('Error fetching favorites:', err);
        setError("Failed to fetch favorite movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      <h1 className="text-white text-2xl font-bold mb-4">Your Favorite Movies</h1>
      {favoriteMovies.length === 0 ? (
        <div className="text-center text-white">No favorites found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favoriteMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} /> 
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesDropdown;
