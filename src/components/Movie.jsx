import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Movie = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const movieInfo = async () => {
      const apiKey = '1bf5ead9bb0ad708a1b4daa0e93f9b33';
      //https://api.themoviedb.org/3/movie/

      axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
        params: {
          api_key: apiKey,
          append_to_response: 'credits',
        },
      })
      .then(response => {
        setMovieDetails(response.data);
      })
      .catch(err => {
        console.error('Error fetching movie details:', err);
      });
    };

    movieInfo();
  }, [id]);

  if (!movieDetails) {
    return <div className="text-center text-white">Loading...</div>;
  }

  const director = movieDetails.credits.crew.find(person => person.job === 'Director');

  return (
    <div className="p-4 text-white">
      <div
        className="relative bg-cover bg-center rounded-lg p-4 h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg" />
        <div className="relative z-10 p-4">
          <h1 className="text-2xl font-bold">{movieDetails.title}</h1>
          <p className="mt-2">Release Date: {movieDetails.release_date}</p>
          <p className="mt-2">Rating: {movieDetails.vote_average}</p>
          {director && <p className="mt-2">Director: {director.name}</p>}
          
          <h2 className="mt-4 text-lg font-semibold">Description:</h2>
          <p className="mt-2">{movieDetails.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default Movie;
