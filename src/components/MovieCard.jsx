import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { addFavoriteMovie } from '../api'; // Import the API call for adding to favorites

const MovieCard = ({ movie }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false); // State to track favorite status

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const apiKey = '1bf5ead9bb0ad708a1b4daa0e93f9b33';
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}`, {
          params: {
            api_key: apiKey,
            append_to_response: 'credits',
          },
        });
        setMovieDetails(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movie.id]);

  const handleAddToFavorites = async () => {
    try {
      await addFavoriteMovie(movie.id);  // Send the request to add the movie to favorites
      setIsFavorite(true); // Update favorite status after successful addition
      alert('Movie added to favorites!');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to add movie to favorites.';
      if (errorMessage === 'Movie already in favorites') {
        alert('This movie is already in your favorites!');
      } else {
        alert(errorMessage);
      }
    }
  };

  if (loading) {
    return <div> </div>;
  }

  if (error) {
    return <div>Error fetching movie details</div>;
  }

  const ratingColor = () => {
    if (movieDetails.vote_average >= 7) return 'bg-green-600';
    if (movieDetails.vote_average >= 5) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  return (
    <div className="relative h-full w-full bg-black/30 flex justify-center items-center p-4 rounded-lg shadow-lg m-4 transition transform hover:scale-105">
      <Link to={`/movie/${movie.id}`} className="flex flex-col items-center">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg shadow-lg w-full h-auto"
        />
        <div className="text-white text-center mt-4">
          <h2 className="text-lg font-bold">{movie.title}</h2>
        </div>
      </Link>

      {/* Favorite Button */}
      <button
        onClick={handleAddToFavorites}
        className={`absolute top-2 left-2 text-white font-bold text-lg p-2 rounded-full ${isFavorite ? 'bg-red-500' : 'bg-gray-500'} hover:bg-red-600 transition duration-300`}
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 4.248c-3.148-5.402-12-3.735-12 2.944 0 4.713 5.373 7.431 12 15.048 6.627-7.617 12-10.335 12-15.048 0-6.679-8.852-8.346-12-2.944z"></path>
        </svg>
      </button>

      <div
        className={`absolute top-2 right-2 text-white font-bold text-sm w-8 h-8 flex justify-center items-center rounded-full ${ratingColor()}`}
      >
        {movieDetails.vote_average.toFixed(1)}
      </div>
    </div>
  );
};

export default MovieCard;
