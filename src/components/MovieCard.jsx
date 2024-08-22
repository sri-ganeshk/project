import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <div
        className={`absolute top-2 right-2 text-white font-bold text-sm w-8 h-8 flex justify-center items-center rounded-full ${ratingColor()}`}
      >
        {movieDetails.vote_average.toFixed(1)}
      </div>
    </div>
  );
};

export default MovieCard;
