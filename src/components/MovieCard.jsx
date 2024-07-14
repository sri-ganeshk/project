import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
            append_to_response: 'credits', // Append credits to the movie details request
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching movie details</div>;
  }

  const director = movieDetails.credits.crew.find(person => person.job === 'Director');

  return (
    <div
      key={movie.id}
      className="bg-black text-white p-4 rounded-lg shadow-lg m-4 transition transform hover:scale-105"
      style={{ maxWidth: '300px' }}
    >
      <h2 className="bg-red-900 p-2 rounded-t-lg text-lg font-bold">{movie.title}</h2>
      <p className="mt-2 text-sm">Release Date: {movie.release_date}</p>
      <p className="mt-1 text-sm">Rating: {movieDetails.vote_average}</p>
      {director && <p className="mt-1 text-sm">Director: {director.name}</p>}
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-auto rounded-b-lg mt-4"
      />
    </div>
  );
};

export default MovieCard;
