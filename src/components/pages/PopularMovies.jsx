import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../MovieCard';

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYmY1ZWFkOWJiMGFkNzA4YTFiNGRhYTBlOTNmOWIzMyIsIm5iZiI6MTcyMDkyNDU2NS4zNDIwNCwic3ViIjoiNjY5MjBhZDJhZDc3MjRhOTAzNmUzZTc1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.fV8rNyhxA_qbY7nMHlMh3ruIhY9UBA86YDBI1WZSFhs',
            'accept': 'application/json'
          }
        });
        setMovies(response.data.results);
      } catch (err) {
        setError(err);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Popular Movies</h1>
      {error && <p>{error.message}</p>}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default PopularMovies;
